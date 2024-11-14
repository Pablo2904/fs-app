import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

//tworzenie kontekstu
export const AuthContext = createContext();

//zdefiniowanie kompoenntu AuthProvider, który dostarcza kontekst
export const AuthProvider = ({ children }) => {
  //user=inf.o zalogowanym userze
  const [user, setUser] = useState(null);
  //inf.czy dane użytkownika są w trakcie ładowania
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  //efekt uboczny ładowania danych użytkownika (po 1 renderowaniu komponentu)
  useEffect(() => {
    const token = localStorage.getItem("token");
    //sprawdzanie czy token istnieje
    if (token) {
      const decodedToken = jwtDecode(token); //dekodowanie tokena
      console.log("DEKODOWANY TOKEN: ", decodedToken);
      setUser(decodedToken);
    }
    //false = bo ładowanie danych zakończone
    setLoading(false);
  }, []);

  //FCN. LOGOWANIA I WYLOGOWYWANIA
  const login = (token) => {
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode(token);
    setUser(decodedToken);
    navigate("/settings"); //przekierowanie do /settings
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null); //null= user wylogowany
    navigate("/login");
  };

  return (
    //przekazanie user, login, logout, loading do potomnych komponentów
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
