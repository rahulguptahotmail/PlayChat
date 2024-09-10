import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function VideoUpload() {
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      setVideoPreviewUrl(URL.createObjectURL(file));
    } else {
      alert("Please select a valid video file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fileFound = document.getElementById("videoFile").files[0];
    if (fileFound) {
      document.getElementById("loader").classList.remove("d-none");
      await axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/video/upload`,
          {
            file: document.getElementById("videoFile").files[0],
            title,
            description,
            tags,
            id: localStorage.getItem("token"),
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          setError(res.data.message);
          document.getElementById("loader").classList.add("d-none");
          navigate("/");
        })
        .catch((err) => {
          document.getElementById("loader").innerHTML =
            "Error While Uploading because of Big Data try Again...";
          console.log(err);
          setError(err.response.data.message);
        });
      
    } else setError("Please Select Your Video");
  };

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center">Upload Your Video</h1>
      <div className="video-upload text-center mb-4">
        <label htmlFor="videoFile" className="btn btn-primary">
          Choose Video
        </label>
        <input
          type="file"
          id="videoFile"
          accept="video/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <p className="mt-2">
          Less than 100 mb of video
        </p>
      </div>

      {videoPreviewUrl && (
        <div className="video-preview mb-4 w-100 text-center">
          <video
            className=" rounded shadow"
            style={{
              width: "350px",
              height: "300px",
            }}
            controls
          >
            <source src={videoPreviewUrl} type={videoFile.type} />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="videoTitle">Title</label>
          <input
            type="text"
            className="form-control shadow border"
            id="videoTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter video title"
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="videoDescription">Description</label>
          <textarea
            className="form-control shadow border"
            id="videoDescription"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter video description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="videoTags">Tags (comma separated)</label>
          <input
            type="text"
            className="form-control shadow border"
            id="videoTags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter video tags"
          />
        </div>
        <div className=" text-danger mb-2 mt-2 ms-3">{error}</div>
        <div
          id="loader"
          className=" d-flex justify-content-center gap-2 d-none"
        >
          Uploading video
          <div className="loader"> </div>
        </div>
        <button type="submit" className="btn btn-primary mb-5 mt-4 ms-3">
          Upload Video
        </button>
      </form>
    </div>
  );
}

export default VideoUpload;
