import { getUsers } from "../api/api";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai"

export default function Users(props) {
  const { users } = props;

  return (
    <>
      <div className="relative overflow-x-auto px-4 md:px-20 py-5 min-h-screen">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 font-bold text-gray-600 uppercase">
            <tr className="border-b">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Gender</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="font-medium">
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="px-6 py-3">{user.name}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">{user.gender}</td>
                <td className="px-6 py-3">{user.status}</td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-x-2">
                    <button>
                      <AiFillEdit className="text-blue-300 hover:text-blue-500 text-lg" />
                    </button>
                    <button>
                      <BsFillTrashFill className="text-red-500 hover:text-red-700 text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
