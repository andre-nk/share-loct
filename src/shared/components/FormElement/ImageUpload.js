import React, { useRef, useState, useEffect } from "react";

export default function ImageUpload(props) {
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImagePreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="w-full h-full max-h-full flex justify-center items-center">
      <div
        style={{
          width: props.isMini ? "20vh" : "100vh",
          height: props.isMini && "20vh",
        }}
        className="sm:h-64 lg:h-full flex justify-center items-center border self-center outline-none cursor-pointer border-black-border border-dashed py-4"
      >
        <label>
          <input
            type="file"
            accept=".jpg,.png,.jpeg"
            onClick={pickImageHandler}
            onChange={pickedHandler}
            id={props.id}
            ref={filePickerRef}
            className="hidden"
          />
          {imagePreviewUrl ? (
            <img
              src={imagePreviewUrl}
              alt="preview"
              style={{
                width: props.isMini ? "19vh" : "100vh",
                height: props.isMini && "19vh",
              }}
              className="object-cover m-0.5 sm:h-64 lg:h-full"
            />
          ) : (
            <p className="font-light px-1 w-full h-full bg-red-50 cursor-pointer text-gray-main text-caption text-center select-none duration-200">
              Please pick an image
            </p>
          )}
        </label>
      </div>
    </div>
  );
}
