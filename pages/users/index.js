import { getUsers } from "../api/api";
import { BsFillTrashFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import axios from "axios";
import { useEffect } from "react";

export default function Users(props) {
  const { users } = props;

  useEffect(() => {
    getUsers()
  }, [])

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure want to delete this user?`)) {
      axios({
        method: "delete",
        url: `${process.env.NEXT_PUBLIC_APIURL}/public/v2/users/${id}`,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_APITOKEN}`,
        },
      }).then((response) => {
        getUsers();
      }).catch((error) => {
        console.log(error);
      })
    }
  };

  return (
    <>
      <div className="px-4 md:px-20 py-5 bg-gray-200 min-h-screen">
        <h1 className="text-4xl text-center font-medium">List of Users</h1>
        <div className="w-full relative overflow-x-auto my-5">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            {users.map((user) => (
              <div key={user.id} className="bg-white rounded-lg">
                <div className="flex flex-col divide-y-2 divide-gray-300">
                  <div className="flex items-center gap-2 p-4">
                    <FaUserCircle className="w-24 h-24" />
                    <div>
                      <div className="text-purple-600 text-md font-bold">
                        {user.name}
                      </div>
                      <div className="text-gray-600 text-sm font-medium">
                        {user.email}
                      </div>
                      <div className="text-sm">{user.gender}</div>
                      <div className="text-sm">{user.status}</div>
                    </div>
                  </div>
                  <div className="p-4">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const res = await getUsers();
  const users = await res.data;

  return {
    props: {
      users: users,
    },
  };
}
