import React from "react";

const SelectedUserBio = ({assets, receiver}) => {
  return (
    <div className="rs-user-bio">
      <img
        className="rs-bio-img"
        src={
          !receiver ? assets.logo_icon : receiver?.avatar || assets.avatar_icon
        }
        alt=""
      />
      <h3 className="rs-bio-name">
        {!receiver
          ? `Chat-App`
          : receiver?.username
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ") || "User Name"}
        {receiver && <span className="chat-user-status">online</span>}
      </h3>

      <p className="rs-bio-desc">
        {!receiver
          ? `Welcome! Make your Friends Here 😊`
          : receiver?.bio || `Hey, I'm using chat-app 😊`}
      </p>
    </div>
  );
};

export default SelectedUserBio;
