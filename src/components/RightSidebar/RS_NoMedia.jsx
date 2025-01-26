import React from "react";

const RS_NoMedia = ({assets}) => {
  return (
    <div className="col-span-3 flex flex-col items-center justify-center w-full ">
      <img className="mt-5" src={assets.media_icon2} alt="" />
      <p className="text-gray-200 mt-4 text-sm">This is Your Media</p>
    </div>
  );
};

export default RS_NoMedia;
