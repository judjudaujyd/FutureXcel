import React, { useState } from "react";

const AuthForm = ({ activeForm, setActiveForm }) => {
  // storing the input values here
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // all input errors will go here
  const [errors, setErrors] = useState({});

  // message that shows after submit
  const [submitMessage, setSubmitMessage] = useState("");

  // toggle for showing password text
  const [showPassword, setShowPassword] = useState(false);

  // runs whenever user types in any field
  const handleChange = (event) => {
    const { name, value } = event.target;

    // cleaning old messages while typing
    setSubmitMessage("");
    setErrors((prev) => ({ ...prev, [name]: "" }));

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // validation function for both login + signup
  const validateInputs = () => {
    let temp = {};

    // username required only if on signup
    if (!activeForm && !formData.username.trim()) {
      temp.username = "Username cannot be empty.";
    }

    // basic email validation
    if (!formData.email.trim()) {
      temp.email = "Email cannot be empty.";
    } else if (!/\S+@\S+\.\S+$/.test(formData.email)) {
      temp.email = "Enter a valid email address.";
    }

    // strong password validation
    const pass = formData.password;
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!pass.trim()) {
      temp.password = "Password is required.";
    } else if (!strongPassword.test(pass)) {
      temp.password =
        "Password must be 8+ chars, include upper, lower, number, and a symbol.";
    }

    setErrors(temp);

    // return true if no errors
    return Object.keys(temp).length === 0;
  };

  // handles submit event
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    // SETTING REQUEST OPTIONS AND RETRIVING BACKEND API ENDPOINTS
    const API_URL = import.meta.env.VITE_BACKEND_API;
    console.log(API_URL);
    const reqOpts = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include"
    };

    // don't send username when logging in
    if (activeForm) {
      // SEND REQUEST FOR LOGING USER IN
      try {
        // APPENDING LOGIN FORM BODY
        reqOpts.body = JSON.stringify({
          email: formData.email,
          password: formData.password,
        });

        const response = await fetch(`${API_URL}/users/login`, reqOpts);

        const responseData = await response.json();

        if (response.ok) {
          setSubmitMessage("Login Succesfull");
        } else {
          console.error("Error Processing Request - ", responseData.error);
          setSubmitMessage(responseData.error);
        }

        console.log(responseData);
      } catch (error) {
        console.error(error.message);
      }
    } else {
      // REQUEST FOR CREATION OF AN ACCOUNT
      try {
        // APPENDING SIGNUP FORM BODY
        reqOpts.body = JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });

        const response = await fetch(`${API_URL}/users`, reqOpts);

        const responseData = await response.json();

        if (response.ok) {
          setSubmitMessage(responseData.msg);
        } else {
          console.error("Error Processing Request - ", responseData.error);
          setSubmitMessage(responseData.error);
        }

        console.log(responseData);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  // resets whole form when switching login/signup
  const resetAndSwitch = (formState) => {
    setSubmitMessage("");
    setErrors({});
    setFormData({ username: "", email: "", password: "" });
    setActiveForm(formState);
  };

  return (
    <div className="w-full rounded-lg p-6">
      {/* heading text */}
      <h2 className="text-2xl font-bold text-center text-gray-700">
        {activeForm ? "Welcome Back" : "Create Account"}
      </h2>

      <p className="text-center text-gray-500 mt-1">
        {activeForm ? "Log in to continue" : "Sign up to begin"}
      </p>

      {/* success message */}
      {submitMessage && (
        <p className="text-center text-green-600 font-semibold my-2">
          {submitMessage}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col gap-5 items-center"
      >
        {/* username only for signup */}
        {!activeForm && (
          <div className="w-full flex flex-col items-center">
            <label className="w-4/5 text-sm text-gray-600">Username</label>

            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              className="w-4/5 bg-gray-100 px-[8px!important] py-[12px!important] rounded-md outline-none 
                         focus:ring-2 focus:ring-[var(--orange)] transition"
            />

            {errors.username && (
              <small className="text-red-600 w-4/5 text-left">
                {errors.username}
              </small>
            )}
          </div>
        )}

        {/* email input */}
        <div className="w-full flex flex-col items-center">
          <label className="w-4/5 text-sm text-gray-600">Email</label>

          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            className="w-4/5 bg-gray-100 px-[8px!important] py-[12px!important] rounded-md outline-none 
                       focus:ring-2 focus:ring-[var(--orange)] transition"
          />

          {errors.email && (
            <small className="text-red-600 w-4/5 text-left">
              {errors.email}
            </small>
          )}
        </div>

        {/* password input */}
        <div className="w-full flex flex-col items-center">
          <label className="w-4/5 text-sm text-gray-600">Password</label>

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="w-4/5 bg-gray-100 px-[8px!important] py-[12px!important] rounded-md outline-none 
                       focus:ring-2 focus:ring-[var(--orange)] transition"
          />

          {errors.password && (
            <small className="text-red-600 w-4/5 text-left">
              {errors.password}
            </small>
          )}

          {/* password text toggle */}
          <label className="w-4/5 flex items-center gap-2 mt-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-600">Show Password</span>
          </label>
        </div>

        {/* submit button */}
        <button
          type="submit"
          className="w-4/5 py-[12px!important] rounded-md bg-gradient-to-r 
                     from-[var(--orange)] to-[var(--grey)] text-white font-semibold 
                     hover:opacity-90 transition"
        >
          {activeForm ? "Login" : "Sign Up"}
        </button>
      </form>

      {/* switch login/signup */}
      <div className="text-center mt-4">
        {activeForm ? (
          <p className="text-gray-600">
            Don’t have an account?{" "}
            <button
              onClick={() => resetAndSwitch(false)}
              className="text-[var(--orange)] hover:underline font-semibold"
            >
              Sign Up
            </button>
          </p>
        ) : (
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => resetAndSwitch(true)}
              className="text-[var(--orange)] hover:underline font-semibold"
            >
              Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
