import { Route, Routes } from "react-router-dom";

import "./styles/App.css";
import Homepage from "./pages/Homepage";
import Aboutpage from "./pages/Aboutpage";
import Blogpage from "./pages/Blogpage";
import Notfoundpage from "./pages/Notfoundpage";
import { Layout } from "./components/Layout";
import Singlepost from "./pages/Singlepost";
import { AuthProvider } from "./hoc/AuthProvider";
import RequireAuth from "./hoc/RequireAuth";
import Createpostpage from "./pages/Createpostpage";
import Loginpage from "./pages/Loginpage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="about" element={<Aboutpage />} />
          <Route path="posts" element={<Blogpage />} />
          <Route path="login" element={<Loginpage />} />
          <Route path="posts/:id" element={<Singlepost />} />
          <Route
            path="posts/new"
            element={
              <RequireAuth>
                <Createpostpage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Notfoundpage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
