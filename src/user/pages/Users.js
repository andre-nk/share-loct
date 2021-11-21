import React from "react";
import UsersList from "../components/UsersList";

export default function Users() {
  const USERS = [
    {
      id: "u1",
      name: "Jesse Pinkman",
      image:
        "https://static.wikia.nocookie.net/breakingbad/images/9/95/JesseS5.jpg/revision/latest/scale-to-width-down/700?cb=20120620012441",
      places: 3,
    },
  ];

  return (
    <div>
      <h2>Users Works!</h2>
      <UsersList items={USERS} />
    </div>
  );
}
