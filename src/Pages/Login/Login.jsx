// import React from 'react'
import { useState } from "react";
import assets from "../../assets/assets";
import "./Login.css";
import { useForm } from "react-hook-form";
import { signIn, signUp } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../config/firbaseUtility";

const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState("Sign In");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signUpSubmit = (data) => {
    if(formState === "Sign Up") {
      signUp(data.name, data.email, data.password)
      navigate('/')
    } else if (formState === "resetPassword") {
      resetPassword(data.email)
    } else {
      signIn(data.email, data.password)
      
    }
  };


  return (
    <div className="login">
      <img src={assets.logo_big} alt="" className="logo" />
      <form
        action=""
        className="login-form"
        onSubmit={handleSubmit(signUpSubmit)}
      >
        <div className="login-input-div">
          <h2 className="login-head">{formState === "resetPassword" ? "Reset Password" : formState}</h2>
          {formState === "Sign Up" ? (
            <input
              className="login-input"
              type="text"
              placeholder="Enter Username"
              {...register("name", { required: "Name is required." })}
            />
          ) : (
            ""
          )}
          {errors.name && <p style={{ color: "red", fontSize: "11px" }}>{errors.name.message}</p>}

          <input
            className="login-input"
            type="email"
            placeholder="Enter Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p style={{ color: "red", fontSize: "11px" }}>{errors.email.message}</p>
          )}

          {formState !== "resetPassword" ? <input
            className="login-input"
            type="password"
            placeholder="Enter Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                message:
                  "Password must include uppercase, lowercase, number, and special character",
              },
            })}
          /> : ""}
          {errors.password && (
            <p style={{ color: "red", fontSize: "11px" }}>{errors.password.message}</p>
          )} 
        </div>
        <button type="submit" className="login-button">
          {formState === "resetPassword" ? "Send Reset Email" : formState}
        </button>

        <div className="login-terms">
          <input type="checkbox" id="agree" name="agree" required/>
          <label htmlFor="agree">I agree to the Terms and Conditions</label>
        </div>

{/* ---- Reset Password ----- */}
        <p className="login-forgot">
          {formState === "resetPassword"
            ? "Already have an account."
            : "Reset the password."}{" "}
          <span
            onClick={() =>
              formState !== "resetPassword"
                ? setFormState("resetPassword")
                : setFormState("Sign In")
            }
          >
            {formState === "resetPassword" ? "Sign In" : "Reset"}
          </span>
        </p>

{/* ---- SignUp ----- */}
        <p className="login-forgot">
          {formState === "Sign Up"
            ? "Already have an account."
            : "If you have no account."}{" "}
          <span
            onClick={() =>
              formState === "Sign Up"
                ? setFormState("Sign In")
                : setFormState("Sign Up")
            }
          >
            {formState === "Sign Up" ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
