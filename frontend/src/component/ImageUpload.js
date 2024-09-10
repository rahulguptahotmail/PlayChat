import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function VideoUpload() {
  const navigate = useNavigate();
  // const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImagePreviewUrl(URL.createObjectURL(file));
    } else {
      setError("Please select a valid Image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fileFound = document.getElementById("imageFile").files[0];
    if (fileFound) {
      document.getElementById("loader").classList.remove("d-none");
      await axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/image/upload`,
          {
            file: document.getElementById("imageFile").files[0],
            title,
            description,
            tags,
            id: localStorage.getItem("token"),
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "multipart/form-data",
            },
          }
        )
        .then((res) => navigate("/"))
        .catch((err) => console.log(err));

      document.getElementById("loader").classList.add("d-none");
    } else setError("Please Select Your Image");
  };

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center">Upload Your Image</h1>
      <div className="image-upload text-center mb-4">
        <label htmlFor="imageFile" className="btn btn-primary">
          Choose Image
        </label>
        <input
          type="file"
          id="imageFile"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <p className="mt-2">
          Drag and drop a imgage file here or click to select one.
        </p>
      </div>

      {imagePreviewUrl && (
        <div className="image-preview mb-4 w-100 text-center">
          <img
            className=" rounded shadow"
            style={{
              width: "350px",
              height: "350px",
            }}
            src={imagePreviewUrl}
          />
        </div>
      )}

      <form>
        <div className="form-group">
          <label htmlFor="imageTitle">Title</label>
          <input
            type="text"
            className="form-control shadow border"
            id="imageTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter image title"
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="imageDescription">Description</label>
          <textarea
            className="form-control shadow border"
            id="imageDescription"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter image description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageTags">Tags (comma separated)</label>
          <input
            type="text"
            className="form-control shadow border"
            id="imageTags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter image tags"
          />
        </div>
        <div className=" text-danger mb-2 mt-2 ms-3">{error}</div>
        <div
          id="loader"
          className=" d-flex justify-content-center gap-2 d-none"
        >
          Uploading Image
          <div className="loader"> </div>
        </div>
        <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          className="btn btn-primary mb-5 mt-4 ms-3"
        >
          Upload Image
        </button>
      </form>
    </div>
  );
}

export default VideoUpload;
