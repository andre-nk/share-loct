import React from "react";

export default function ErrorState({ title, message, btnMessage, onClick }) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <img src="/404.png" alt="404" className="h-72" />
      <h2 className="font-serif text-2xl font-semibold">{title}</h2>
      <p className="text-lg mt-2">{message}</p>
      {btnMessage && onClick && (
        <button
          className="mt-6 bg-black-main text-white-main pt-2 pb-2.5 px-6"
          onClick={onClick}
        >
          {btnMessage}
        </button>
      )}
    </div>
  );
}
