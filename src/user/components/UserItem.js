import React from "react";
import { Link } from "react-router-dom";
import UserCard from "../../shared/components/UIElement/UserCard";

export default function UserItem({ user }) {
  return (
    <Link to={`/${user.id}/places`}>
      <UserCard user={user} />
    </Link>
  );
}
