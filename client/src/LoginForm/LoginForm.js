import { useRef, useState, useEffect } from "react";
import { Grid, Paper, Avatar } from "@material-ui/core";

function LoginForm() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <h3>Login</h3>
      <input type="text" />
      <h3>Password</h3>

      <input type="password" />
      <button type="submit"> Zaloguj</button>
    </form>
  );
}

export default LoginForm;
