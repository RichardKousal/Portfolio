import React from "react";
import userData from "../constants/data";

export default function Footer() {
  return (
    <div className="max-w-6xl  mx-auto px-4 py-10 md:py-20">
      <div className="h-0.5 w-full"></div>
      <div className=" flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between md:items-center mt-8">
        <div>
          <p> Mobile: {userData.phone}</p>
        </div>
        <p> E-mail: {userData.email}</p>
        <div>
          <div>
            Developed by
            <div className="inline-block transform hover:scale-110 hover:-rotate-3 transition duration-300">
              <a
                className="hover:bg-green-700/75 rounded-md px-2 py-1  hover:text-gray-50"
                href="/about"
              >
                {userData.name}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
