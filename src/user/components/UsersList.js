import React from "react";

import ErrorState from "../../shared/pages/Error/ErrorState"
import UserItem from "./UserItem";

export default function UsersList(props) {
  if (props.items.length === 0) {
    return (
      <ErrorState
        title={"There are currently no users!"}
        message={"Let's be the first one, yeah?"}
        btnMessage={"Register now"}
        onClick={
          () => {console.log("goodman");}
        }
      />
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
