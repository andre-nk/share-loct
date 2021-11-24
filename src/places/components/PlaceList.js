import React from "react";

import ErrorState from "../../shared/pages/Error/ErrorState"
import PlaceItem from "./PlaceItem";

export default function PlaceList(props) {
  if (props.items.length === 0) {
    return (
      <ErrorState
        title={"This user haven't post any places!"}
        message={"What about you? Ready to share another place to the world?"}
        btnMessage={"Create a post now"}
        onClick={
          () => {console.log("goodman");}
        }
      />
    );
  }

  return (
    <ul>
      {props.items.map((place) => (
        <li key={place.id}>
          <PlaceItem place={place} />
        </li>
      ))}
    </ul>
  );
}
