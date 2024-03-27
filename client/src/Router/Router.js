import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import LoginForm from "../LoginForm/LoginForm";
import NotFound from "../NotFound/NotFound";
import Home from "../Home/Home";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="about" element={<div>ABOUT</div>} />
          <Route path="login" element={<LoginForm />} />
          <Route path="home" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
