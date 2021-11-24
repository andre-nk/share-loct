import React from "react";
import MapBox from "../../shared/components/UIElement/MapBox";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineShareAlt } from "react-icons/ai";

export default function PlaceItem({ place }) {
  return (
    <div>
      <div className="w-full h-auto flex flex-col-reverse lg:flex lg:flex-row justify-between lg:space-x-16 bg-white-main border-black-main border py-5 px-4 lg:py-14 lg:px-16">
        <div className="w-full mt-6 lg:mt-0 lg:w-5/12 flex flex-col justify-between space-y-12">
          <div>
            <h2 className="font-serif font-bold text-xl lg:text-3xl">
              {place.title}
            </h2>
            <p className="mt-1 lg:mt-2">
              posted by: <span className="font-medium">{place.creator}</span>
            </p>
            <p className="mt-4 lg:mt-6 font-medium">Description</p>
            <p className="mt-1 w-auto text-black-main">{place.description}</p>
          </div>
          <div className="h-full hidden lg:block">
            <MapBox zoom={10} center={place.location} />
          </div>
          <button
            onClick={() =>
              window.open(
                `https://maps.google.com/?q=${place.location.lat},${place.location.lng}`,
                "_blank"
              )
            }
            className="block lg:hidden border border-black-main bg-white-sub hover:bg-black-main text-black-main hover:text-white-main duration-200 w-full pt-2 pb-2.5 px-7"
          >
            Show on Maps
          </button>
        </div>
        <div className="w-full lg:w-7/12 p-2 border border-dashed border-gray-main bg-white-sub">
          <img
            className="object-cover w-full"
            src={place.imageUrl}
            alt={place.title}
          />
        </div>
      </div>
      <div className="mt-8 w-full flex space-x-8 justify-end">
        <button
          onClick={() => {}}
          className="border border-black-main bg-white-sub hover:bg-black-main text-black-main hover:text-white-main duration-200 px-3.5 py-3.5"
        >
          <AiOutlineEdit className="text-xl" />
        </button>
        <button
          onClick={() => {}}
          className="border border-black-main bg-white-sub hover:bg-black-main text-black-main hover:text-white-main duration-200 px-3.5 py-3.5"
        >
          <AiOutlineShareAlt className="text-xl" />
        </button>
        <button
          onClick={() => {}}
          className="border border-black-main bg-white-sub hover:bg-danger-light text-black-main hover:text-white-main duration-200 px-3.5 py-3.5"
        >
          <AiOutlineDelete className="text-xl" />
        </button>
      </div>
    </div>
  );
}
