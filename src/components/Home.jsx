import Card from "./Card";
import { posts } from "../data";

const Home = () => {
  return (
    <div className="flex flex-wrap justify-between p-12">
      {posts.map((post) => (
        <Card key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Home;
