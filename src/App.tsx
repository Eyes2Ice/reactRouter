import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./styles/App.css";
import Homepage from "./pages/Homepage";
import Aboutpage from "./pages/Aboutpage";
import { Blogpage, blogLoader } from "./pages/Blogpage";
import Notfoundpage from "./pages/Notfoundpage";
import { Layout } from "./components/Layout";
import { postLoader, Singlepost } from "./pages/Singlepost";
import { AuthProvider } from "./hoc/AuthProvider";
import RequireAuth from "./hoc/RequireAuth";
import Createpostpage from "./pages/Createpostpage";
import Loginpage from "./pages/Loginpage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Homepage />} />
      <Route path="about" element={<Aboutpage />}>
        <Route path="contacts" element={<p>Our Contacts</p>} />
        <Route path="team" element={<p>Our Team</p>} />
      </Route>
      <Route path="posts" element={<Blogpage />} loader={blogLoader} />
      <Route path="login" element={<Loginpage />} />
      <Route path="posts/:id" element={<Singlepost />} loader={postLoader} />
      <Route
        path="posts/new"
        element={
          <RequireAuth>
            <Createpostpage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Notfoundpage />} />
    </Route>,
  ),
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
