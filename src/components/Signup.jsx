import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
      const formData = new FormData();
      formData.append("file", file);
      await api
        .post("/fileUpload/file-upload", formData)
        .then((res) => {
          setPreviewUrl(res.data.data);
          toast.success("Image uploaded successfully");
        })
        .catch((error) => {
          toast.error("something went wrong");
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!username.trim() || !email.trim() || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");

    try {
      const payload = {
        userName: username.trim(),
        emailId: email.trim(),
        password,
        profileImage: previewUrl,
      };
      const cleanedPayload = Object.fromEntries(
        Object.entries(payload).filter(
          ([_, value]) => value !== "" && value !== null && value !== undefined
        )
      );
      await api.post("/userAuth/signup", cleanedPayload);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.errors[0] || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src="https://images.pexels.com/photos/15307542/pexels-photo-15307542/free-photo-of-close-up-of-a-blue-fabric-surface.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Finance Background"
      />
      <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-2xl shadow-lg w-full max-w-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-600 mt-1">Join us and track your expenses</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3  ">
          {error && (
            <div className="text-red-500 text-sm text-center" role="alert">
              {error}
            </div>
          )}
          {success && (
            <div className="text-green-600 text-sm text-center">{success}</div>
          )}
          <div className="grid grid-cols-2 space-x-3 space-y-3">
            <div>
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium mb-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                placeholder="Choose a username"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                placeholder="********"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                placeholder="Re-enter your password"
              />
            </div>
            <div className="max-w-[245px]">
              <label className="block text-gray-700 font-medium mb-1">
                Upload Image
              </label>

              <label
                htmlFor="fileUpload"
                className="flex items-center justify-center w-full px-4 py-2 border border-dashed border-gray-400 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 transition text-sm text-gray-600"
              >
                {image ? "Change Image" : "Click to upload image"}
              </label>

              <input
                id="fileUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              {previewUrl && (
                <div className="mt-3 relative w-fit">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="rounded-lg w-16 h-16 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setPreviewUrl(null);
                      toast.info("Image removed");
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full shadow"
                  >
                    <FaTrashAlt size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 font-medium hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
