import axios from "axios";
import { BiComment } from "react-icons/bi";

export default function postById({ post, postComments, user }) {
  return (
    <>
      <div className="px-4 md:px-20 py-2 bg-gray-200 min-h-screen">
        <div className="bg-white my-5 text-justify rounded-xl drop-shadow-lg lg:max-w-5xl mx-auto">
          <div className="p-5">
            <div className="font-bold text-xl">{post.title}</div>
            <div className="mt-2 text-md font-bold text-slate-600">
              by{" "}
              <span className="text-purple-600">
                {user === null ? "Anonymous" : user && user.name}
              </span>
            </div>
            <div className="mt-3 text-sm">{post.body}</div>
          </div>
        </div>

        <div className="bg-white my-5 text-justify rounded-xl drop-shadow-lg lg:max-w-5xl mx-auto">
          <div className="p-5">
            <h1 className="text-xl font-bold flex items-center">
              {postComments.length} Comments{" "}
              <BiComment className="ml-1 text-sm" />
            </h1>
            {postComments.map((postComment) => (
              <div key={postComment.id} className="py-2">
                <div className="bg-gray-200 rounded-lg p-2">
                  <div className="font-bold text-md text-purple-600">
                    {postComment.name}
                  </div>
                  <div className="mt-2 text-sm">{postComment.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params, user_id }) {
  // Post detail
  const resPostByDetail = await axios.get(
    `${process.env.NEXT_PUBLIC_APIURL}/public/v2/posts/${params.id}?access-token=${process.env.NEXT_PUBLIC_APITOKEN}`
  );
  const post = await resPostByDetail.data;

  // Post Comment
  const resComments = await axios.get(
    `${process.env.NEXT_PUBLIC_APIURL}/public/v2/posts/${post.id}/comments?access-token=${process.env.NEXT_PUBLIC_APITOKEN}`
  );
  const postComments = await resComments.data;

  //Post User
  const resUser = await axios.get(
    `${process.env.NEXT_PUBLIC_APIURL}/public/v2/users/${post.user_id}?access-token=${process.env.NEXT_PUBLIC_APITOKEN}`
  );
  const user = await resUser.data;

  return {
    props: {
      post: post,
      postComments: postComments,
      user: user || null,
    },
  };
}
