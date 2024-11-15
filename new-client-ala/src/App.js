import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { AuthWrapper } from "./pages/settings/AuthWrapper";

//layouts
import { RootLayout } from "./layouts/RootLayout";
import { ArticleLayout } from "./layouts/ArticleLayout";
//pages
import { Home } from "./pages/Home";
import { LoginForm } from "./pages/LoginForm";
import { ArticleForm } from "./pages/ArticleForm";
import { NotFound } from "./pages/NotFound";
import { ArticleList, articleLoader } from "./pages/articles/ArticleList";
import {
  ArticleDetails,
  articleDetailsLoader,
} from "./pages/articles/ArticleDetails";
import { ArticleError } from "./pages/articles/ArticleError";

import { ProtectedRoute } from "./pages/settings/ProtectedRoute";
import { Settings } from "./pages/settings/Settings";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//funkcja router = router przeglądarki
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AuthWrapper />}>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="form" element={<ArticleForm />} />

        <Route path="articles" element={<ArticleLayout />}>
          <Route index element={<ArticleList />} loader={articleLoader} />
          <Route
            path=":id"
            element={<ArticleDetails />}
            loader={articleDetailsLoader}
            errorElement={<ArticleError />}
          />
        </Route>

        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />;
      <ToastContainer toastClassName="custom-toast" />
    </>
  );
}

export default App;
