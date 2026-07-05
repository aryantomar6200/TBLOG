import React from "react";
import { Link } from "react-router-dom";
import storageService from "../appwrite/storageService";

function PostCard({ $id, title, featuredImage, $createdAt }) {
  const imageUrl = storageService.getFilePreview(featuredImage);

  const date = new Date($createdAt);
  const postDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const time = new Date($createdAt);
  const postTime = time.toLocaleTimeString();
  

  return (
    <Link to={`/post/${$id}`}>
      <div className="flex w-full pt-5 p-4 pb-2 gap-5 ">
        <div className="flex flex-col  w-110 mb-4 ">
          <p className="text-secondarytxt font-bold text-xs pb-3 ">
            {postDate}
          </p>
          <h2 className="text-txtColor">{title}</h2>
        </div>
        <div className=" shrink-0 h-fit  ">
          <img
            src={imageUrl}
            alt="Post"
            className=" object-cover rounded-lg w-50 h-28 mt-0"
          />
        </div>
      </div>
    </Link>

    // <Link to={`/post/${$id}`}>
    //     <div className='w-full bg-gray-200 rounded-xl p-4'>
    //         <div className='w-full justify-center mb-4'>

    //             <img
    //                 src={imageUrl}
    //                 alt='Post-Image'
    //                 className='rounded-2xl'
    //             />
    //         </div>
    //         <h2 className='text-xl font-bold'>
    //             {title}
    //         </h2>
    //     </div>
    // </Link>
  );
}

export default PostCard;
