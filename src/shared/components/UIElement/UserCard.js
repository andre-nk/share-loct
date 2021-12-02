import React from "react";

export default function UserCard({ user }) {
  return (
    <div className="p-4 border border-black-main bg-white-main hover:bg-gray-100 h-32 w-full flex justify-start space-x-5 hover:scale-101 duration-200 transform">
      <img
        src={process.env.REACT_APP_ASSET_URL + user.image}
        alt={user.name + " avatar"}
        style={{
          width: "6rem",
          height: "6rem",
        }}
        className="object-cover"
      />
      <div className="flex flex-col justify-between py-1.5">
        <h2 className="text-xl font-semibold font-serif">{user.name}</h2>
        <p className="text-sm lg:text-md font-light">
          {user.places.length > 0
            ? user.places.length + " place(s)"
            : "No places yet"}
        </p>
      </div>
    </div>
  );
}
