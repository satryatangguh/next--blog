import { getPostById, getPostComments, getUser } from "../api/api";
import { BiComment } from "react-icons/bi";

export default function postById(props) {
  const { post, postComments, user } = props;
  console.log(postComments);
  console.log(user)
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

export async function getServerSideProps({ params }) {
  // Post detail
  const resPostByDetail = await getPostById(params.id);
  const post = await resPostByDetail.data;

  // Post Comment
  const resComments = await getPostComments(post.id);
  const postComments = await resComments.data;

  //Post User
  const resUser = await getUser(post.user_id);
  const user = await resUser.data;

  return {
    props: {
      post: post,
      postComments: postComments,
      user: user || null,
    },
  };
}
