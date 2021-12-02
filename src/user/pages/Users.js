import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";

import UsersList from "../components/UsersList";
import ErrorState from "../../shared/pages/Error/ErrorState";
import { useHttpClient } from "../../shared/hooks/http-hook";

export default function Users() {
  const [users, setUsers] = useState([]);
  const { isLoading, isError, sendRequest } = useHttpClient();

  const history = useHistory();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + "/users/");

      if (response) {
        setUsers(response.users);
      }
    };

    fetchUsers();
  }, [sendRequest]);

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader
            type="Rings"
            color="#23C08C"
            height={150}
            width={150}
            visible={isLoading}
          />
        </div>
      ) : isError || users.length <= 0 ? (
        <ErrorState
          title={users.length <= 0 ? "No users yet!" : "Failed to load users."}
          message={
            users.length <= 0
              ? "Be the first one, will you?"
              : "Please try reloading this page"
          }
          btnMessage={users.length <= 0 ? "Register now!" : "Try again"}
          onClick={() => {
            users.length <= 0 ? history.push("/auth/") : history.push("/");
          }}
        />
      ) : (
        <div className="mb-8">
          <UsersList items={users} />
        </div>
      )}
    </div>
  );
}
