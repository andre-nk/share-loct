import React from "react";

import PlaceItem from "./PlaceItem";

export default function PlaceList(props) {
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
