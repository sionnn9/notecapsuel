"use client";

import React, { use } from "react";
import Navabar from "@/app/component/navbar/page";
import Ratelimit from "@/app/component/ratelimit/page";
import { useRouter } from "next/navigation";

const page = () => {
  const [Isratelimited, setIsratelimited] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (Isratelimited) {
      router.push("/component/ratelimit");
    }
  }, [Isratelimited, router]);
  return (
    <div className="bg-black min-h-screen w-screen">
      <Navabar />

      <section className=" mt-16 ">
        <div className="flex justify-center items-center">
          <div className="rounded-xl w-96 bg-red-500 h-auto m-7 text-start px-5 border-t-[7px] border-blue-900 ">
            <span className="text-white font-bold text-lg mt-4 block">
              Headding msg
            </span>
            <p className="text-white my-4">
              SQL (Structured Query Language) is a standard language for
              managing and manipulating relational databases.
            </p>

            <span className="text-white text-sm mb-2 block">
              date:16-12-2005
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
