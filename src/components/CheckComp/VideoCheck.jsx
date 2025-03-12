import React, { useState } from "react";
import { uploadVideoToCloudinary } from "../../config/firbaseUtility";

const VideoCheck = () => {
  const [videoURL, setVideoURL] = useState(null);

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const createVideoURL = await uploadVideoToCloudinary(file);
    setVideoURL(createVideoURL);
    console.log("Uploaded Video URL:", videoURL);
  };
  return (
    <div>
      <input type="file" accept="video/*" onChange={handleVideoUpload} />;
      {videoURL && <video controls>
        <source src={videoURL} type="video/mp4" />
      </video>}
    </div>
  );
};

export default VideoCheck;
