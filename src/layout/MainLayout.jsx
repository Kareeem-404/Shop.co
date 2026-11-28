import { Outlet } from "react-router-dom";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
export default function MainLayout() {

  // -------------------------- Styles --------------------------
  const layoutStyle = "min-h-screen bg-white text-black transition-colors duration-300 dark:bg-zinc-950 dark:text-white";
  // -------------------------- Styles --------------------------
  
  return (
    <div className={layoutStyle}>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
