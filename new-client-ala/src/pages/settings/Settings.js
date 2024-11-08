//zmiana danych użytkownika: imienia, emaila, hasła,
import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const Settings = () => {
  const { user, logout } = useContext(AuthContext);
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState("");

  //Funkcja wysyłająca zaaktualizowane dane so serwera
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/users/settings",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Dane zaktualizowane pomyślnie");
    } catch (error) {
      console.error("Błąd aktualizacji danych: ", error.message);
      alert("Wystąpił błąd podczas aktualizacji danych");
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
