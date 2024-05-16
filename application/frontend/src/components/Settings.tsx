import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Settings.css";
import Navbar from "./Navbar.tsx";

const Settings: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [newPassword, setNewPassword] = useState<string>("");
  const [showCreatePostOverlay, setShowCreatePostOverlay] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      alert("Please login first!");
      window.location.href = "/";
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleProfilePictureUpload = async () => {
    if (!selectedFile) return;
    const id = localStorage.getItem("id");
    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/users/${id}/profile-picture`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error updating profile picture", error);
      alert("Error updating profile picture");
    }
  };

  const handlePasswordChange = async () => {
    if (!newPassword) return;
    console.log(localStorage.getItem("authToken"));
    const id = localStorage.getItem("id");
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/users/${id}/change-password?password=${newPassword}`,{},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      alert("Password updated successfully!");
      setNewPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Error updating password");
    }
  };


  return (
    <div className="settings-container">
      <Navbar setShowCreatePostOverlay={setShowCreatePostOverlay} />
      <h1>Settings</h1>
      <div className="settings-section">
        <h2>Profile Photo</h2>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleProfilePictureUpload}>Upload</button>
      </div>
      <div className="settings-section">
        <h2>Change Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handlePasswordChange}>Change Password</button>
      </div>
    </div>
  );
};

export default Settings;
