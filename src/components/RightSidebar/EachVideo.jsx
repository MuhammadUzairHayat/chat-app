import React, { useEffect, useRef, useState } from "react";

const EachVideo = ({ src }) => {
  const videoRef = useRef(null);
  const [isTall, setIsTall] = useState(false);
  useEffect(() => {
    const checkAspectRatio = () => {
      if (videoRef.current) {
        const { videoWidth, videoHeight } = videoRef.current;
        if (videoHeight > videoWidth) {
          setIsTall(true);
        }
      }
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("loadedmetadata", checkAspectRatio);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("loadedmetadata", checkAspectRatio);
      }
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={"min-h-[5rem] flex items-center justify-center rounded-md "+(isTall ? " row-span-2 max-h-[10.5rem]" : "")}
      controls
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default EachVideo;
