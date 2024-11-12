import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importuje useNavigate
import { jwtDecode } from "jwt-decode";

export const Login = () => {
  //STAN DOT. WALIDACJI EMAIL, HASŁA
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [touchedPassword, setTouchedPassword] = useState(false);
  const navigate = useNavigate(); // Inicjalizacja hooka useNavigate

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

      localStorage.setItem("token", response.data.token);

      const decoddedToken = jwtDecode(response.data.token);
      console.log("Dekodowany token: ", decoddedToken);

      //obsługa odpowiedzi z serwera
      console.log("Użytkownik zalogowany: ", response.data);
      navigate("/"); // Przekierowanie na stronę główną po zalogowaniu
    } catch (error) {
      //obsługa błędu logowania
      console.error("Błąd logowania: ", error.message);
    }
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        width: "400px",
      }}
      onSubmit={handleSubmit}
    >
      <h1>Formularz logowania</h1>
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
      <button type="submit">Zaloguj</button>
    </form>
  );
};
