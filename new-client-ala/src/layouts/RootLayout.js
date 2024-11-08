//pasek nawigacyjny
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>APPLICATION FOR ARTICLES</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="articles">Available articles</NavLink>
          <NavLink to="/login">Log in</NavLink>
          <NavLink to="/form">Submit Article</NavLink>
        </nav>
      </header>

      <main>
        {/*wyświetla zawartość poszcególnych podstron*/}
        <Outlet />
      </main>
    </div>
  );
};
