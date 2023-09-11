import { Link } from "react-router-dom";

const Card = ({ post }) => {
  return (
    <div className="card w-1/3 p-4 rounded-xl shadow-lg gap-px transition-transform transform hover:scale-95">
      <Link className="link" to={`/post/${post.id}`}>
        <span className="title">{post.title}</span>
        <img
          src={post.img}
          alt=""
          className="img w-full h-48 object-cover my-5"
        />
        <p className="text-gray-700 mb-5 leading-6">{post.desc}</p>
        <button className="border-none rounded-lg bg-opacity-70 bg-purple-700 py-2 px-4 text-white font-semibold cursor-pointer">
          Read More
        </button>
      </Link>
    </div>
  );
};

export default Card;
