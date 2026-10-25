import { Suspense } from "react";
import { Await, useAsyncValue, useLoaderData } from "react-router-dom";

const Post = () => {
  const post = useAsyncValue();

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </>
  );
};

const Singlepost = () => {
  const { post } = useLoaderData();

  return (
    <div>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Await resolve={post}>
          <Post />
        </Await>
      </Suspense>
    </div>
  );
};

async function getPostById(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.json();
}

const postLoader = async ({ params }) => {
  const id = params.id;

  return { post: getPostById(id), id };
};

export { Singlepost, postLoader };
