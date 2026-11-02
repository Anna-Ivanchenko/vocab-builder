import { NavLink } from "react-router-dom";
import css from "./UserNav.module.css";

interface UserNavProps {
  variant?: "header" | "menu";
  onLinkClick?: () => void;
}

const links = [
  { to: "/dictionary", label: "Dictionary" },
  { to: "/recommend", label: "Recommend" },
  { to: "/training", label: "Training" },
];

const UserNav = ({ variant = "header", onLinkClick }: UserNavProps) => {
  return (
    <nav className={`${css.nav} ${css[variant]}`}>
      <ul className={css.list}>
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              onClick={onLinkClick}
              className={({ isActive }) =>
                isActive ? `${css.link} ${css.active}` : css.link
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default UserNav;
