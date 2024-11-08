import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./settings/AuthContext";

export const LoginForm = () => {
  //walidacja email, hasła
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [touchedPassword, setTouchedPassword] = useState(false);

  //CONTEXT API
  const { login } = useContext(AuthContext);

  //WALIDACJA EMAIL
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    setTouchedEmail(true); //sprawdzenie czy pole email zostało dotknięte
  };

  useEffect(() => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email) && touchedEmail) {
      setEmailError("Nieprawidłowy format E-maila");
    } else {
      setEmailError("");
    }
  }, [email, touchedEmail]);

  //WALIDACJA HASŁA
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (password.length < 8 && touchedPassword) {
      setPasswordError("Hasło musi zawierać co najmniej 8 znaków");
    } else {
      setPasswordError("");
    }
  }, [password, touchedPassword]);

  const navigate = useNavigate();

  //OBSŁUGA ZDARZENIA LOGOWANIA - ŻĄDANIE DO SERWERA (axios)
  const handleSubmit = async (event) => {
    event.preventDefault();

    //sprawdzenie czy warunki walidacji są spełnione
    if (!email || !password || emailError || passwordError) {
      alert("Proszę poprawnie uzupełnić wszystkie pola");
      return;
    }

    try {
      //wysyłanie żadania POST do serwera
      const response = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });

      //zapisanie tokenu w pamięci
      localStorage.setItem("token", response.data.token);

      const decoddedToken = jwtDecode(response.data.token);
      console.log("Dekodowany token: ", decoddedToken);

      //obsługa odpowiedzi z serwera
      console.log("Użytkownik zalogowany: ", response.data);

      navigate("/settings"); // Przekierowanie na stronę główną po zalogowaniu
    } catch (error) {
      //obsługa błędu logowania
      console.error("Błąd logowania: ", error.message);

      //obsługa błędu logowania
      if (error.response && error.response.status === 401) {
        alert("Invalid email or password");
      }
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1>Logowanie</h1>
      <input type="text" placeholder="Email" onChange={handleChangeEmail} />
      {emailError && <p style={{ color: "red" }}>{emailError}</p>}
      <input
        type="password"
        placeholder="Password"
        onChange={handleChangePassword}
        onClick={() => setTouchedPassword(true)}
      />
      {touchedPassword && passwordError && (
        <p style={{ color: "red" }}>{passwordError}</p>
      )}
      <button className="login-btn" type="submit">
        Zaloguj
      </button>
    </form>
  );
};
