import React, { useEffect, useState } from "react";

const FileUploader = ({handleMedia}) => {
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState();

  const fileReader = new FileReader();
  fileReader.onloadend = () => {
    setImageURL(fileReader.result);
  };

  useEffect(() => {
    if (imageURL) {
      handleMedia(imageURL)
    }
  }, [imageURL])

  const handleOnChange = (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      setImage(file);
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label
        htmlFor="file-loader-button"
      >
        Загрузить файл
      </label>
      <input
        id="file-loader-button"
        type="file"
        onChange={handleOnChange}
      />
    </div>
  );
};

export default FileUploader;