import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  { Product }  from "../models/Product";

export default function Profile() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  // Check if user is already logged in
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignup) {
      // Signup → save user in localStorage
      localStorage.setItem("user", JSON.stringify({ name: formData.name, email: formData.email }));
      alert("Account created successfully!");
    } else {
      // Signin → check email and password (basic demo validation)
      const savedUser = JSON.parse(localStorage.getItem("user") || "null");
      if (savedUser && savedUser.email === formData.email) {
        alert("Signed in successfully!");
      } else {
        alert("Invalid email or account not found!");
        return;
      }
    }

    navigate("/"); // redirect to homepage
    window.location.reload(); // reload so header/profile updates
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out!");
    window.location.reload();
  };

  // If logged in → show account
  if (user) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">My Account</h2>
        <div className="border rounded-lg p-4 shadow-md bg-white">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button
            onClick={handleLogout}
            className="mt-4 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  // If not logged in → show signin/signup
  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{isSignup ? "Sign Up" : "Sign In"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-6 shadow-md bg-white">
        {isSignup && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          {isSignup ? "Sign Up" : "Sign In"}
        </button>
      </form>
      <p className="mt-4 text-center">
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          onClick={() => setIsSignup(!isSignup)}
          className="text-blue-600 hover:underline"
        >
          {isSignup ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}
