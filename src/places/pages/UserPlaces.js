import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";

import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorState from "../../shared/pages/Error/ErrorState";

export default function UserPlaces() {
  const { isLoading, isError, sendRequest } = useHttpClient();
  const [isPlaces, setIsPlaces] = useState([]);
  const userId = useParams().userId;
  const history = useHistory();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/places/user/${userId}`
        );
        setIsPlaces(responseData.places);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPlaces();
  }, [sendRequest, userId]);

  console.log(isLoading);

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
      ) : isError || isPlaces.length <= 0 ? (
        <ErrorState
          title={isPlaces.length <= 0 ? "No places yet!" : "Failed to load places."}
          message={
            isPlaces.length <= 0
              ? "Let's post something for yourself, will you?"
              : "Please try reloading this page"
          }
          btnMessage={isPlaces.length <= 0 ? "Create post now!" : "Try again"}
          onClick={() => {
            isPlaces.length <= 0 ? history.push("/places/new") : window.location.reload();
          }}
        />
      ) : (
        <div>
          <PlaceList items={isPlaces} />
        </div>
      )}
    </div>
  );
}
