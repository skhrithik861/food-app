import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "../../styles/createFood.css";

const CreateFood = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setVideoFile(null);
      setPreviewUrl(null);
      return;
    }
    setVideoFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setVideoFile(null);
    setPreviewUrl(null);
    setStatus("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name.trim() || !description.trim() || !videoFile) {
      setStatus("Please add a food name, description, and video.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("video", videoFile);

      await api.post("/api/food", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus("Food item created successfully.");
      resetForm();
    } catch (error) {
      console.error("Create food error:", error);
      setStatus(
        error.response?.data?.message ||
          "Unable to create food item. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="create-food-page">
      <section className="create-food-card">
        <div className="create-food-header">
          <p className="eyebrow">Create food</p>
          <h1 className="create-food-title">Add a new food reel</h1>
        </div>

        <form className="create-food-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="food-name">Food name</label>
            <input
              id="food-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Avocado toast"
            />
          </div>

          <div className="input-group">
            <label htmlFor="food-description">Description</label>
            <textarea
              id="food-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe the flavor, ingredients, or story behind this dish."
            />
          </div>

          <div className="input-group file-input-wrapper">
            <label className="input-label" htmlFor="food-video">
              Food video
            </label>

            <label className="upload-dropzone" htmlFor="food-video">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="upload-icon"
              >
                <path
                  fill="currentColor"
                  d="M4.5 18.5a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-3.5l-1-2h-4l-1 2H6.5a2 2 0 0 0-2 2v9Zm7-4.5 3.5 3.5H12v-3h-1v3H8L11.5 14Z"
                />
              </svg>
              <div>
                <p className="upload-title">Choose a video file</p>
                <p className="upload-note">Supports MP4 and WebM</p>
              </div>
            </label>

            <input
              id="food-video"
              className="file-input"
              type="file"
              accept="video/mp4,video/webm"
              onChange={handleVideoChange}
            />

            {videoFile && (
              <p className="file-name">Selected file: {videoFile.name}</p>
            )}
          </div>

          {previewUrl && (
            <div className="video-preview">
              <video
                src={previewUrl}
                controls
                muted
                playsInline
                className="preview-video"
              />
            </div>
          )}

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Create food"}
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={resetForm}
              disabled={loading}
            >
              Clear fields
            </button>
          </div>

          {status && <p className="status-text">{status}</p>}
        </form>

        {/* Footer with Home button */}
        <footer className="create-food-footer">
          <button
            className="home-btn"
            onClick={() => navigate("/Home")}
          >
            🏠 Home
          </button>
        </footer>
      </section>
    </main>
  );
};

export default CreateFood;
