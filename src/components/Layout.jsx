import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useTheme } from "../hooks/useTheme";

function Layout() {
  const { theme } = useTheme();

  return (
    <div className={theme}>
      <Header />

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
