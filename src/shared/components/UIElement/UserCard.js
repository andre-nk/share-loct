import React from "react";

export default function UserCard({ user }) {
  return (
    <div className="p-4 border border-black-main bg-white-main hover:bg-gray-100 h-32 w-full lg:w-5/12 xl:w-4/12 flex justify-start space-x-5 hover:scale-101 duration-200 transform">
      <img
        src={user.image}
        alt={user.name + " avatar"}
        className="object-cover"
      />
      <div className="flex flex-col justify-between">
        <span className="space-y-0.5">
          <h2 className="text-lg lg:text-xl font-semibold font-serif">
            {user.name}
          </h2>
          <p className="text-xs lg:text-sm font-medium">
            based on {user.location}
          </p>
        </span>
        <p className="text-xs lg:text-sm font-light">{user.places} places</p>
      </div>
    </div>
  );
}
