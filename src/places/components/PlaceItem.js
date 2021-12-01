import React, { useState, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { RWebShare } from "react-web-share";

import { AuthContext } from "../../shared/context/AuthContext";
import { useHttpClient } from "../../shared/hooks/http-hook";
import MapBox from "../../shared/components/UIElement/MapBox";
import Modal from "../../shared/components/UIElement/Modal";
import CustomLoader from "../../shared/components/UIElement/Loader";

export default function PlaceItem({ place }) {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const { isLoading, sendRequest } = useHttpClient();

  const openConfirmModal = () => {
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const openMapModal = () => {
    console.log(place.location);
    setShowMap(true);
  };

  const closeMapModal = () => {
    setShowMap(false);
  };

  const confirmDeleteHandler = async () => {
    try {
      closeConfirmModal();
      await sendRequest(
        `http://localhost:2000/api/places/${place.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      window.location.reload();
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <CustomLoader isLoading={isLoading} />
      <Modal
        show={showMap}
        onCancel={closeMapModal}
        headerClass="w-full"
        contentClass="p-8 flex flex-col justify-center items-center space-y-3"
        className="z-50 fixed bg-white-main inset-x-8 lg:inset-x-1/4 top-1/3"
        footerClass="flex justify-center space-x-8 px-8 pb-8"
        footer={
          <React.Fragment>
            <button
              onClick={closeMapModal}
              className="block border border-black-main bg-white-sub hover:bg-black-main text-black-main hover:text-white-main duration-200 w-full pt-2 pb-2.5 px-7"
            >
              Close
            </button>
          </React.Fragment>
        }
      >
        <p className="text-xl font-semibold font-serif text-center">
          {place.title} Map View
        </p>
        <MapBox zoom={10} center={place.location} />
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={closeConfirmModal}
        headerClass="w-full"
        contentClass="p-8 flex flex-col justify-center items-center space-y-3"
        className="z-50 fixed bg-white-main inset-x-8 lg:inset-x-1/4 top-1/3"
        footerClass="flex justify-center space-x-8 px-8 pb-8"
        footer={
          <React.Fragment>
            <button
              onClick={closeConfirmModal}
              className="block border border-black-main bg-white-sub hover:bg-black-main text-black-main hover:text-white-main duration-200 w-full pt-2 pb-2.5 px-7"
            >
              Cancel
            </button>
            <button
              onClick={confirmDeleteHandler}
              className="block border border-danger-light bg-white-sub hover:bg-danger-light text-danger-light hover:text-white-main duration-200 w-full pt-2 pb-2.5 px-7"
            >
              Delete
            </button>
          </React.Fragment>
        }
      >
        <p className="text-xl font-semibold font-serif text-center">
          Delete {place.title}?
        </p>
        <p className="text-center">
          You won't be able to recover this post afterward
        </p>
      </Modal>
      <div className="w-full h-auto flex flex-col-reverse lg:flex lg:flex-row justify-between lg:space-x-16 bg-white-main border-black-main border py-5 px-4 lg:py-14 lg:px-16">
        <div className="w-full mt-6 lg:mt-0 lg:w-5/12 flex flex-col justify-between space-y-12">
          <div className="px-2">
            <h2 className="font-serif font-bold text-xl lg:text-3xl">
              {place.title}
            </h2>
            <p className="mt-4 text-sm lg:text-md w-auto text-black-main">
              {place.description}
            </p>
            <p className="border-t text-sm font-medium mt-8 lg:mx-0 border-gray-main pt-3 pb-1.5">
              Location's Address:
            </p>
            <p className="text-sm w-full">{place.address}</p>
          </div>
          <button
            onClick={openMapModal}
            className="block border border-black-main bg-white-sub hover:bg-black-main text-black-main hover:text-white-main duration-200 w-full pt-2 pb-2.5 px-7"
          >
            Show on Maps
          </button>
        </div>
        <div className="w-full lg:w-7/12 p-2 border border-dashed border-gray-main bg-white-sub">
          <img
            className="object-cover w-full"
            src={"http://localhost:2000/" + place.image}
            alt={place.title}
          />
        </div>
      </div>
      <div className="mt-8 w-full flex space-x-8 justify-end">
        <RWebShare
          data={{
            text: `Check out ${place.title} photos only on ShareLoct`,
            url: location.pathname,
            title: `Share ${place.title}?`,
          }}
        >
          <button
            className="border self-end border-black-main bg-white-sub hover:bg-black-main text-black-main hover:text-white-main duration-200 px-3.5 py-3.5"
          >
            <AiOutlineShareAlt className="text-xl" />
          </button>
        </RWebShare>
        {(auth.userInstance !== null && place.creator === auth.userInstance.id) && (
          <div className="flex space-x-8 justify-end">
            <button
              onClick={() => {
                history.push(`/places/${place.id}`);
              }}
              className="border border-black-main bg-white-sub hover:bg-black-main text-black-main hover:text-white-main duration-200 px-3.5 py-3.5"
            >
              <AiOutlineEdit className="text-xl" />
            </button>

            <button
              onClick={openConfirmModal}
              className="border border-black-main bg-white-sub hover:bg-danger-light text-black-main hover:text-white-main duration-200 px-3.5 py-3.5"
            >
              <AiOutlineDelete className="text-xl" />
            </button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
