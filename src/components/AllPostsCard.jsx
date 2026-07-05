import React from "react";
import storageService from "../appwrite/storageService";
import Button from "./Header/Button";
import { Link } from "react-router-dom";

function AllPostsCard({ title, featuredImage, $createdAt, $id }) {
  const imgUrl = storageService.getFilePreview(featuredImage);

  const date = new Date($createdAt);
  const postDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="w-full h-full ">
      <div className="bg-txtColor rounded-3xl elevated flex flex-col h-full">
        <div className="pt-3">
          <img
            src={imgUrl}
            alt=""
            className="w-full h-56 object-cover rounded-3xl p-4"
          />
        </div>

        <div className="p-4">
          <div className="text-secondarytxt font-bold text-sm">
            Punlished on: {postDate}
          </div>

          <div className="pt-1 text-primary font-semibold text-lg line-clamp-2">
            {title}...
          </div>
        </div>

        <div className="mt-auto">
          <Link to={`/post/${$id}`}>
            <Button className="m-6 font-semibold py-4 text-sm cursor-pointer active:scale-95 transition-transform">
              Read More →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AllPostsCard;
