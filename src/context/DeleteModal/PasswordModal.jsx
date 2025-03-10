import React, { useState } from "react";
import { useDelModal } from "./delModalContext";

const PasswordModal = () => {
  const { closeModal, title, onSubmit } = useDelModal();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(email, password); // Call the onSubmit function and pass the password
    } else {
      console.error("onSubmit is not defined");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{zIndex: 1000}}>
      <div className="bg-white rounded-lg shadow-lg w-96 p-5">
        <h2 className="font-normal mb-4 text-[#077eff]" style={{fontSize: '1.1rem', fontWeight: '500'}}>{title || "Enter Password"}</h2>
        <input
          type="email"
          className="w-full border rounded-lg p-2 mb-4"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full border rounded-lg p-2 mb-4"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-200 px-4 py-2 rounded-lg"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
