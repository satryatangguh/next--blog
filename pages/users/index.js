import { useState } from "react";
import {
  AiFillDelete,
  AiFillEye,
} from "react-icons/ai";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Seo from "@/components/Seo";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function Users({ users }) {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    gender: "",
    status: "",
  });

  const resetForm = () => {
    setUserData({
      ...userData,
      name: "",
      email: "",
      gender: "",
      status: "",
    })
  }

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_APIURL}/public/v2/users/`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_APITOKEN}`,
          },
        }
      );
      refreshData();
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_APIURL}/public/v2/users/${id}?access-token=${process.env.NEXT_PUBLIC_APITOKEN}`
    );
    refreshData();
  };

  return (
    <>
      <Seo
        title="Welcome to Next Blog | Next Blog Users"
        description="Next Blog User Page"
      />
      <div className="px-4 py-5 bg-gray-200 min-h-screen">
        <div className="container w-[1000px] mx-auto bg-white px-4 rounded-lg divide-y-2 divide-purple-600">
          <h1 className="text-2xl font-medium text-purple-600 py-4">
            Add New User
          </h1>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-4 text-md py-4"
          >
            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-600">Name</label>
              <input
                className="text-sm p-2 rounded-md border border-gray-600"
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-600">Email</label>
              <input
                className="text-sm p-2 rounded-md border border-gray-600"
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-600">Gender</label>
              <select
                className="text-sm p-2 rounded-md border border-gray-600"
                value={userData.gender}
                onChange={(e) =>
                  setUserData({ ...userData, gender: e.target.value })
                }
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-600">Status</label>
              <select
                className="text-sm p-2 rounded-md border border-gray-600"
                value={userData.status}
                onChange={(e) =>
                  setUserData({ ...userData, status: e.target.value })
                }
              >
                <option value="">Select status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <button
              type="submit"
              className="md:w-1/3 bg-purple-600 hover:bg-purple-800 p-2 text-white font-medium rounded-md"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="w-full relative overflow-x-auto py-5">
          <div className="grid gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex flex-col bg-white rounded-lg md:w-[1000px] mx-auto"
              >
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
                    <Link
                      className="text-green-500 hover:text-green-700 text-lg"
                      href={`/users/${user.id}`}
                    >
                      <AiFillEye
                        data-tooltip-id="action-tooltip"
                        data-tooltip-content="Detail"
                        data-tooltip-place="top"
                      />
                    </Link>
                    <button onClick={() => deleteUser(user.id)}>
                      <AiFillDelete
                        data-tooltip-id="action-tooltip"
                        data-tooltip-content="Delete"
                        data-tooltip-place="top"
                        className="text-red-500 hover:text-red-700 text-lg"
                      />
                    </button>
                    <Tooltip id="action-tooltip" />
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
