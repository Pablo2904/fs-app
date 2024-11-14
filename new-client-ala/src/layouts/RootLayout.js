//pasek nawigacyjny
import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../pages/settings/AuthContext";

export const RootLayout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>APPLICATION FOR ARTICLES</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="articles">Available articles</NavLink>
          <NavLink to="/form">Add Article</NavLink>

          {/*sprawdzenie, czy user jest zalogowany*/}
          {user ? (
            <NavLink to="/settings">User Panel</NavLink>
          ) : (
            <NavLink to="/login">Log in</NavLink>
          )}
        </nav>
      </header>

      <main>
        {/*wyświetla zawartość poszcególnych podstron*/}
        <Outlet />
      </main>
    </div>
  );
};
