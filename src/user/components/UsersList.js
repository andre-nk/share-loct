import React from "react";
import UserItem from "./UserItem";

export default function UsersList(props) {
  if (props.items.length === 0) {
    return (
      <div>
        <h2>No users found.</h2>
      </div>
    );
  }

  return (
    <ul>
      {props.items.map((user) => {
        return <UserItem key={user.id} user={user} />;
      })}
    </ul>
  );
}
