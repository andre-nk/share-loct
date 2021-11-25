import React from "react";
import { useHistory } from "react-router-dom";

import ErrorState from "../../shared/pages/Error/ErrorState"
import PlaceItem from "./PlaceItem";

export default function PlaceList(props) {
  const history = useHistory();

  if (props.items.length === 0) {
    return (
      <ErrorState
        title={"This user haven't post any places!"}
        message={"What about you? Ready to share another place to the world?"}
        btnMessage={"Create a post now"}
        onClick={
          () => {
            history.push("/places/new");
          }
        }
      />
    );
  }

  return (
    <ul>
      {props.items.map((place) => (
        <li key={place.id} className="mb-12">
          <PlaceItem place={place} />
        </li>
      ))}
    </ul>
  );
}
