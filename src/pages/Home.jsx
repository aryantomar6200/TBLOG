import React, { useEffect, useState } from "react";
import authServices from "../appwrite/authService";
import { Container, PostCard } from "../components";
import databaseService from "../appwrite/databaseService";
import { useSelector } from "react-redux";
import homeImage from "../assets/image/homeImage.jpg";


function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    databaseService.getPosts().then((response) => {

      if (response) {
        setPosts(response.rows);
      }
    });
  }, []);

  return (
    <div className="flex w-full items-center justify-center ">
      <div className="flex flex-col  items-center">
        <div className="  w-fit flex flex-col items-center mt-15">
          <h1 className="text-txtColor text-4xl px-4 py-2 leading-tight font-semibold">
            <span className="block pl-4 pb-1 ">TBlog – A Minimalist</span>
            <span className="block ">Personal Blog Template</span>
          </h1>

          <h3 className="text-secondarytxt flex-wrap flex flex-col items-center mt-5 ">
            <span>
              A community-driven platform where developers and tech enthusiasts
            </span>
            <span>publish knowledge, exchange ideas, and grow together.</span>
          </h3>
          <img
            src={homeImage}
            width={750}
            height={100}
            className="rounded-3xl mt-12"
          />
        </div>

        <div className="w-full mt-20">
          
            <div className="flex flex-wrap flex-col w-full ">
              {posts.map((post) => (
                
                <div key={post.$id} className="p-2 w-full  h-auto">   
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          
        </div>
      </div>
    </div>
  );

  // if (posts.length === 0) {

  //   const message = authStatus ? "No Posts added Yet!!" : "Login to See Posts"
  //   return (
  //       <div className="w-full py-8 mt-4 text-center">
  //         <Container>
  //           <div className="flex flex-wrap">
  //             <div className="p-2 w-full">
  //               <h1 className="text-2xl font-bold hover:text-gray-500">
  //                 {message}
  //               </h1>
  //             </div>
  //           </div>
  //         </Container>
  //       </div>
  //     );
  // }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
