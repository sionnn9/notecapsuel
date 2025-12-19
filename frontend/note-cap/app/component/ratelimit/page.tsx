import React from "react";
import { IoIosWarning } from "react-icons/io";

const page = () => {
  return (
    <div className="overflow-x-hidden">
      <div className="bg-black h-screen w-screen flex justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="rounded-xl w-96 bg-red-500 h-auto m-7 text-start px-5 border-t-[7px] border-blue-900 ">
            <span className="text-white flex items-center font-bold text-lg mt-4 ">
              <IoIosWarning size={50} className="text-white mt-4 mr-3" />
              Rate Limit Exceeded
            </span>
            <p className="text-white my-4 text-lg">
              You have exceeded the rate limit for this API endpoint.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
