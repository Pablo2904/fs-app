import React from "react";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
// import { AuthContext, AuthProvider } from "./pages/settings/AuthContext";

export const AuthWrapper = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};
