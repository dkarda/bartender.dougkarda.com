import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const links = [
  { to: "/recipes", label: "Recipes", activeOn: ["/recipes"] },
  { to: "/shelf", label: "Shelf", activeOn: ["/shelf", "/bottles", "/wines"] },
  { to: "/shop", label: "Shop", activeOn: ["/shop"] },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  return (
    <>
      <nav>
        <Link to="/" className="site-title">
          Behind the Bar
        </Link>
        <button
          type="button"
          className="menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
        <ul className={menuOpen ? "open" : ""}>
          {links.map((link) => (
            <li
              key={link.to}
              className={
                link.activeOn.some(
                  (path) =>
                    location.pathname === path ||
                    location.pathname.startsWith(`${path}/`)
                )
                  ? "active"
                  : ""
              }
            >
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
