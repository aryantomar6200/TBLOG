import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/authService";
import { useForm } from "react-hook-form";
import logoBlack from "../assets/image/logoBlack.png";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  async function create(data) {
    setError("");

    try {
      const userRes = await authService.createAccount(data);

      if (userRes) {
        const userData = await authService.getCurrentUser();
        console.log(userRes);

        if (userData) {
          dispatch(login({ userData }));
        }

        navigate("/");
      }
    } catch (error) {
      let  message = "Something went wrong. Please try again.";

      if (error.message.includes("Password must be between")) {
        message = "Password must be between 8 and 256 characters.";
      }

      console.log(error);
      setError(message);
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-25">
            <Logo width="100%" logo={logoBlack} />
          </span>
        </div>
        <h2 className="text-center text-xl font-bold leading-tight text-primary">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-secondarytxt text-sm font-semibold">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-sm text-primary transition-all duration-200 hover:underline font-bold"
          >
            Sign In
          </Link>
        </p>

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name"
              placeholder="enter your full name"
              type="text"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="email"
              type="email"
              placeholder="enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "please enter a valid email address",
                },
              })}
            />

            <Input
              label="password"
              type="password"
              placeholder="enter your passwor"
              {...register("password", {
                required: true,
              })}
            />

            {error && <p className="text-error font-semibold font text-xs text-center">{error}</p>}

            <Button
              type="submit"
              className="w-full font-bold py-4 text-sm mt-4 cursor-pointer active:scale-95 transition-transform"
            >
              SignUp
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
