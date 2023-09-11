import { useLocation } from "react-router";
import { posts } from "../data";

const Post = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const post = posts.find((p) => p.id.toString() === path);

  console.log(location);
  return (
    <div className="flex flex-col items-center">
      <img src={post.img} alt="" className="w-full h-64 object-cover mb-5" />
      <h1 className="postTitle">{post.title}</h1>
      <p className="postDesc px-16 text-gray-500 text-2xl font-light mt-10 ">{post.desc}</p>
      <p className="p-16 pt-8 text-base leading-6">{post.longDesc}</p>
    </div>
  );
};

export default Post;
