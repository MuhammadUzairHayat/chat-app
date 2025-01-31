import {
  DeleteForever,
  DeleteForeverOutlined,
  DeleteForeverSharp,
  DeleteOutline,
  DeleteOutlineSharp,
} from "@mui/icons-material";
import React from "react";
import { deleteAccountAndHandleChats } from "../../config/firebase";
import { useDelModal } from "../../context/DeleteModal/delModalContext";
import { toast } from "react-toastify";

const DelAccountOption = () => {
  const { openModal, closeModal } = useDelModal();

  const handleDeleteAccount = async (password) => {
    console.log("Password entered:", password);
    try {
      deleteAccountAndHandleChats(password);
    } catch (error) {
      toast.error(error.code.split("/")[1].split("-").join(" "));
    } finally {
      closeModal();
      toast.success("Account deleted successfully");  
    }
  };

  return (
    <li>
      <span
        className="flex gap-2 items-center"
        onClick={() =>
          openModal("Confirm Password to Delete Account", handleDeleteAccount)
        }
      >
        <DeleteForeverSharp />
        <p>Delete Account</p>
      </span>
    </li>
  );
};

export default DelAccountOption;
