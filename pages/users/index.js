import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import axios from "axios";
import Link from "next/link";
import Seo from "@/components/Seo";

export default function Users({ users }) {
  const handleDelete = (id) => {
    if (window.confirm(`Are you sure want to delete this user?`)) {
      axios({
        method: "delete",
        url: `${process.env.NEXT_PUBLIC_APIURL}/public/v2/users/${id}`,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_APITOKEN}`,
        },
      })
        .then((response) => {
          users();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Seo title="Welcome to Next Blog | Next Blog Users" description="Next Blog User Page"/>
      <div className="px-4 md:px-20 py-5 bg-gray-200 min-h-screen">
        <h1 className="text-4xl text-center font-medium">List of Users</h1>
        <div className="w-full relative overflow-x-auto my-5">
          <div className="grid gap-4">
            {users.map((user) => (
              <Link href={`/users/${user.id}`} key={user.id} className="bg-white rounded-lg hover:bg-gray-100">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between gap-2 p-4">
                    <div>
                      <div className="text-purple-600 text-md font-bold">
                        {user.name}
                      </div>
                      <div className="text-gray-600 text-sm font-medium">
                        {user.email}
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-x-2">
                      <button>
                        <AiFillEdit className="text-blue-500 hover:text-blue-700 text-lg" />
                      </button>
                      <button onClick={() => handleDelete(user.id)}>
                        <BsFillTrashFill className="text-red-500 hover:text-red-700 text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_APIURL}/public/v2/users?access-token=${process.env.NEXT_PUBLIC_APITOKEN}`
  );
  const users = await res.data;

  return {
    props: {
      users: users,
    },
  };
}
