import { Link } from "react-router-dom";

export function ChipButton({ pressed, onClick, children }) {
  return (
    <button
      type="button"
      className={pressed ? "chip is-on" : "chip"}
      aria-pressed={pressed}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function ChipLink({ pressed, to, children }) {
  return (
    <Link
      to={to}
      className={pressed ? "chip is-on" : "chip"}
      aria-current={pressed ? "true" : undefined}
    >
      {children}
    </Link>
  );
}
