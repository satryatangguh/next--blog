import axios from "axios";
import Link from "next/link";
import { FaUserCircle, FaArrowLeft } from "react-icons/fa";
import Seo from "@/components/Seo";

export default function userById({ userDetails }) {
  return (
    <>
      <Seo title={userDetails.name} description={userDetails.name}/>
      <div className="px-4 md:px-20 py-2 bg-gray-200 min-h-screen">
        <div className="bg-white my-5 rounded-xl drop-shadow-lg w-[440px] mx-auto divide-y-2 divide-gray-200">
          <div className="flex justify-start p-4">
            <Link
              href={`/users`}
              className="text-gray-600 hover:text-blue-600 text-md font-medium flex items-center"
            >
              <FaArrowLeft className="mr-3" /> Go Back
            </Link>
          </div>
          <div className="p-4 text-center">
            <div className="flex justify-center">
              <FaUserCircle className="w-32 h-32 text-gray-500" />
            </div>
            <h1 className="font-bold text-xl text-purple-600">
              {userDetails.name}
            </h1>
            <h3 className="text-gray-600 text-lg font-medium">
              {userDetails.email}
            </h3>
            <h4 className="text-md font-medium">{userDetails.gender}</h4>
            <h4 className="text-md font-medium">{userDetails.status}</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const resUserDetails = await axios.get(
    `${process.env.NEXT_PUBLIC_APIURL}/public/v2/users/${context.params.id}`
  );
  const userDetails = await resUserDetails.data;

  return {
    props: {
      userDetails: userDetails,
    },
  };
}
