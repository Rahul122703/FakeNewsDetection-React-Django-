import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Header from "./header";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_IMAGE_API_URL ;
  //  const API_URL = "http://127.0.0.1:5000";

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image. Try again.");
      }

      const data = await response.json();
      setResult(data.prediction);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setImage(URL.createObjectURL(file));
      handleUpload(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  return (
    <>
      <Header activeContainer={1} />
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <div
          {...getRootProps()}
          className="w-full max-w-md p-10 text-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-white shadow-md"
        >
          <input {...getInputProps()} />
          <span className="text-gray-600">Drag & drop an image here, or click to select one</span>
        </div>

        {image && (
          <div className="mt-4">
            <img src={image} alt="Uploaded Preview" className="w-64 h-64 object-cover rounded-lg" />
          </div>
        )}

        {loading && <p className="mt-4 text-gray-600">Processing...</p>}

        {result && (
          <div className={`mt-4 p-4 text-white text-lg rounded-lg ${result === "Fake" ? "bg-red-500" : "bg-green-500"}`}>
            {result === "Fake" ? "This image is Fake" : "This image is Real"}
          </div>
        )}

        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </>
  );
};

export default ImageUpload;
