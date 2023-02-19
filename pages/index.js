import axios from "axios";
import Link from "next/link";

export default function Home({ posts }) {
  return (
    <>
      <div className="px-4 md:px-20 py-2 bg-gray-200 min-h-screen">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white my-5 text-justify rounded-xl drop-shadow-lg"
          >
            <div className="p-5">
              <Link href={`/posts/${post.id}`}>
                <div className="font-bold text-xl hover:text-purple-600 line-clamp-1">
                  {post.title}
                </div>
              </Link>
              <div className="mt-3 line-clamp-2">{post.body}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps(page) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_APIURL}/public/v2/posts?page=${page}&per_page=10?access-token=${process.env.NEXT_PUBLIC_APITOKEN}`
  );
  const posts = await res.data;

  return {
    props: {
      posts: posts,
    },
  };
}
