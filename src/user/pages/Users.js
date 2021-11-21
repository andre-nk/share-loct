import React from "react";
import UsersList from "../components/UsersList";

export default function Users() {
  const USERS = [
    {
      id: "u1",
      name: "Jesse Pinkman",
      location: "Albuquerque",
      image: "https://static.wikia.nocookie.net/breakingbad/images/0/05/Season_2_-_Jesse.jpg",
      places: 3,
    },
  ];

  return (
    <div className="">
      <UsersList items={USERS} />
    </div>
  );
}
