import React from "react";
import { AiFillWarning } from "react-icons/ai";

export default function ErrorMessage({ isError }) {
  return (
    isError && (
      <div className="w-full border border-danger-border flex items-center justify-start text-left text-md space-x-6 px-6 py-4 text-danger-light mb-8">
        <AiFillWarning size={32} />
        <p>{isError}</p>
      </div>
    )
  );
}
