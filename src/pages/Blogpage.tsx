import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import BlogFilter from "../components/BlogFilter";

const Blogpage = () => {
  const [posts, setPosts] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const postQuery = searchParams.get("post") || "";
  const latest = searchParams.has("latest");

  const startsFrom = latest ? 80 : 1;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      <h1>This is blog page</h1>
      <Link to="/posts/new">Add new post!</Link>
      <BlogFilter
        postQuery={postQuery}
        latest={latest}
        setSearchParams={setSearchParams}
      />
      <ul className="posts-list">
        {posts
          .filter(
            (post) => post.title.includes(postQuery) && post.id >= startsFrom,
          )
          .map((post) => (
            <Link key={post.id} to={`/posts/${post.id}`}>
              {post.title}
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default Blogpage;
