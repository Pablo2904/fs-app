//zmiana danych użytkownika: imienia, emaila, hasła,
import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const Settings = () => {
  const { user, logout } = useContext(AuthContext);
  const [username, setUsername] = useState(user ? user.username : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState("");

  //Funkcja wysyłająca zaaktualizowane dane so serwera
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/users/settings",
        {
          username,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Dane zaktualizowane pomyślnie");
    } catch (error) {
      console.error("Błąd aktualizacji danych: ", error.message);
      console.log("Wystąpił błąd podczas aktualizacji danych");
    }
  };

  //Fcn wylogowująca
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="settings-form">
      <h2>Settings</h2>
      <div className="settings-form">
        <label className="setting-form-label">
          Name:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div className="settings-form">
        <label className="setting-form-label">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <div className="settings-form">
        <label className="setting-form-label">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleUpdate} className="setting-btn">
        Update
      </button>
      <button onClick={handleLogout} className="setting-btn">
        Logout
      </button>
    </div>
  );
};
