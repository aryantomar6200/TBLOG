import { useEffect, useState } from "react";
import "./App.css";
import config from "./config/config";
import { useDispatch } from "react-redux";
import authServices from "./appwrite/authService";
import { login, logout } from "./features/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authServices
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(
            login({
              userData: JSON.parse(JSON.stringify(userData)), //here insted of direct userdata make it a js object as - Redux Toolkit expects everything in the store to be serializable. - means it should be plain js object
            }),
          );
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  return !isLoading ? (
    <div className= "min-h-screen flex flex-wrap content-between bg-primary ">
      <div className="w-full block ">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
