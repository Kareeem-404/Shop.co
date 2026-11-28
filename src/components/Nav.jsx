import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Heart, Menu, Moon, ShoppingCart, Sun, UserRound, X } from "lucide-react";
import Container from "./Ui-components/Container.jsx";
import { useCartStore } from "../store/cartStore.js";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => window.localStorage.getItem("shop-co-theme") === "dark",
  );
  const cartCount = useCartStore((state) =>
    state.items.reduce((count, item) => count + item.quantity, 0),
  );
  const favoriteCount = useCartStore((state) => state.favorites.length);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    window.localStorage.setItem("shop-co-theme", darkMode ? "dark" : "light");
  }, [darkMode]);
  // -------------------------- Styles --------------------------
  const headerStyle =
    "sticky top-0 z-20 border-b border-black/5 bg-white text-black dark:border-white/10 dark:bg-zinc-950 dark:text-white";
  const navStyle =
    "flex min-h-[68px] items-center gap-3 sm:min-h-[84px] sm:gap-7";
  const logoStyle =
    "font-display text-2xl font-black leading-none tracking-[-.08em] text-black dark:text-white sm:text-[30px]";
  const iconStyle =
    "grid size-9 place-items-center rounded-full transition hover:bg-black/5 dark:hover:bg-white/10";
  const accountStyle = `${iconStyle} hidden sm:grid`;
  const mobileMenuStyle =
    "grid size-9 place-items-center text-current sm:hidden";
  const actionsStyle = "ml-auto flex items-center gap-1 sm:gap-2";
  const themeButtonStyle = `${iconStyle} text-current`;
  const linksStyle = `${menuOpen ? "flex" : "hidden"} absolute left-0 right-0 top-full flex-col gap-5 bg-white px-6 py-5 text-black shadow-lg dark:bg-zinc-950 dark:text-white sm:static sm:flex sm:flex-row sm:items-center sm:gap-6 sm:bg-transparent sm:p-0 sm:shadow-none`;
  const linkStyle = "flex items-center gap-1 text-sm transition hover:opacity-60";
  const cartLinkStyle = `${iconStyle} relative`;
  const cartBadgeStyle = "absolute -right-1 -top-1 grid min-w-4 place-items-center rounded-full bg-black px-1 text-[9px] font-bold leading-4 text-white dark:bg-white dark:text-black";
  const favoriteLinkStyle = `${iconStyle} relative`;
  const favoriteBadgeStyle = cartBadgeStyle;
  // -------------------------- Styles --------------------------
  return (
    <header className={headerStyle}>
      <Container>
        <div className={navStyle}>
          <button
            className={mobileMenuStyle}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Link className={logoStyle} to="/">
            SHOP.CO
          </Link>
          <nav className={linksStyle} aria-label="Main navigation">
            <Link to="/" className={linkStyle} onClick={() => setMenuOpen(false)}>Shop <ChevronDown size={15} /></Link>
            <a href="/#products" className={linkStyle} onClick={() => setMenuOpen(false)}>On Sale</a>
            <a href="/#products" className={linkStyle} onClick={() => setMenuOpen(false)}>New Arrivals</a>
            <a href="/#brands" className={linkStyle} onClick={() => setMenuOpen(false)}>Brands</a>
          </nav>
          <div className={actionsStyle}>
            <Link aria-label={`Favorites, ${favoriteCount} items`} to="/favorites" className={favoriteLinkStyle}>
              <Heart size={21} />
              {favoriteCount > 0 && <span className={favoriteBadgeStyle}>{favoriteCount}</span>}
            </Link>
            <Link aria-label={`Shopping cart, ${cartCount} items`} to="/cart" className={cartLinkStyle}>
              <ShoppingCart size={21} />
              {cartCount > 0 && <span className={cartBadgeStyle}>{cartCount}</span>}
            </Link>
            <Link aria-label="Account" to="/" className={accountStyle}>
              <UserRound size={21} />
            </Link>
            <button
              type="button"
              className={themeButtonStyle}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              onClick={() => setDarkMode((enabled) => !enabled)}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
