import axios from "axios";
import { useState } from "react";
import env from "../../config/env";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    setFormData({
      ...formData,
      username: formData.username.trim(),
      email: formData.email.trim(),
    });

    try {
      const response = await axios.post(`${env.BASE_URL}/api/users/login`, formData, {
        withCredentials: true,
      });
      console.log("user logged in successfully");
      console.log("response: ", response)
      navigate("/todo");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <div className="h-screen w-full flex justify-center items-center">
        <div className="w-[50%] border p-3 rounded-xl bg-blue-100">
          <h1 className="text-[2em] font-bold mb-3 text-center">Log in</h1>
          <form onSubmit={submitHandler} className="flex flex-col gap-2">
            {/* username input */}
            <div className={`flex flex-col gap-1 mx-5 ${formData.email ? "hidden": ""}`}>
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

            <p className={`mx-auto ${!formData.username && !formData.email ? "visible": "hidden"}`}>or</p>
            {/* Email input */}
            <div className={`flex flex-col gap-1 mx-5 ${formData.username ? "hidden": ""}`}>
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

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md w-fit"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
