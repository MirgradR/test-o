import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="container header-inner">
        <h1 className="logo">MiniBlog</h1>
        <nav className="nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/posts">Posts</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
