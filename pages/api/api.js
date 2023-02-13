import axios from "axios";

export async function getPosts(page) {
  return await axios
    .get(
      `${process.env.NEXT_PUBLIC_APIURL}/public/v2/posts?page=${page}&per_page=10`
    )
    .catch((error) => {
      return error;
    });
}

export async function getPostById(id) {
  return await axios
    .get(
      `${process.env.NEXT_PUBLIC_APIURL}/public/v2/posts/${id}?access-token=${process.env.NEXT_PUBLIC_TOKEN}`
    )
    .catch((error) => {
      return error;
    });
}

export async function getPostComments(post_id) {
  return await axios
    .get(
      `${process.env.NEXT_PUBLIC_APIURL}/public/v2/posts/${post_id}/comments?access-token=${process.env.NEXT_PUBLIC_APITOKEN}`
    )
    .catch((error) => {
      return error;
    });
}

export async function getUser(user_id) {
  return await axios
    .get(
      `${process.env.NEXT_PUBLIC_APIURL}/public/v2/users/${user_id}?access-token=${process.env.NEXT_PUBLIC_APITOKEN}`
    )
    .catch((error) => {
      return error;
    });
}