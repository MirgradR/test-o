import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useTheme } from "../context/ThemeContext";

const Layout = () => {
  const { theme } = useTheme();
  console.log(theme);
  return (
    <div className={theme}>
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
