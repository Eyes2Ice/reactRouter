import { Outlet } from "react-router-dom";
import CustomLink from "./CustomLink";

const Layout = () => {
  return (
    <div className="container">
      <header className="header">
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/about">About</CustomLink>
        <CustomLink to="/posts">Blog</CustomLink>
      </header>
      <Outlet />
      <footer>2026</footer>
    </div>
  );
};

export { Layout };
