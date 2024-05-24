import { useEffect, useState } from "react";
import env from "../../config/env";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  // useEffect(() => {
  //   console.log(formData);
  //   console.log(confirmPassword);
  // });

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      console.log("password do not match");
    } else {
      setFormData({
        ...formData,
        username: formData.username.trim(),
        email: formData.email.trim(),
      });

      try {
        await axios.post(`${env.BASE_URL}/api/users/signup`, formData);
        console.log("user registered successfully");
        navigate("/login")
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-[50%] border p-3 rounded-xl bg-blue-100">
        <h1 className="text-[2em] font-bold mb-3 text-center">Sign Up</h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-2">
          {/* Username input */}
          <div className="flex flex-col gap-1 mx-5">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              className="rounded focus:outline-blue-500 py-1 px-2"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

          {/* Email input */}
          <div className="flex flex-col gap-1 mx-5">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              className="rounded focus:outline-blue-500 py-1 px-2"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* Password input */}
          <div className="flex flex-col gap-1 mx-5">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="rounded focus:outline-blue-500 py-1 px-2"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value.trim() })
              }
            />
          </div>

          {/* Confirm password input */}
          <div className="flex flex-col gap-1 mx-5">
            <label htmlFor="password">Confirm Password</label>
            <input
              id="confirmpassword"
              type="password"
              className="rounded focus:outline-blue-500 py-1 px-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value.trim())}
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md w-fit"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
