import React from "react";
import Loader from "react-loader-spinner";

export default function CustomLoader({ isLoading }) {
  return (
    isLoading && (
      <div className="bg-black-main opacity-80 z-30 h-screen w-screen absolute top-0 left-0 flex justify-center items-center">
        <Loader
          type="Rings"
          color="#23C08C"
          height={150}
          width={150}
          visible={isLoading}
        />
      </div>
    )
  );
}
