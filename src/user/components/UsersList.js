import React from "react";

import UserItem from "./UserItem";

export default function UsersList(props) {
  return (
    <ul className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {props.items.map((user) => {
        return <UserItem key={user.id} user={user} />;
      })}
    </ul>
  );
}
