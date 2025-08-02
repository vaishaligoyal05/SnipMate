import React, { useState } from "react";
import api from "./api/axios";

function AuthTest() {
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const res = await api.post("/auth/register", {
        username: "testuser",
        email: "test@example.com",
        password: "123456",
      });
      setMessage("Registered! Token: " + res.data.token);
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      setMessage("Error: " + error.response?.data?.message);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email: "test@example.com",
        password: "123456",
      });
      setMessage("Logged in! Token: " + res.data.token);
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      setMessage("Error: " + error.response?.data?.message);
    }
  };

  return (
    <div>
      <button onClick={handleRegister}>Test Register</button>
      <button onClick={handleLogin}>Test Login</button>
      <p>{message}</p>
    </div>
  );
}

export default AuthTest;
