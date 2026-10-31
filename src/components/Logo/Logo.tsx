import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";
import css from "./Logo.module.css";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Link to="/" className={`${css.logo} ${className ?? ""}`}>
      <Icon id="logo" size={36} className={css.icon} />
      <span className={css.text}>VocabBuilder</span>
    </Link>
  );
};

export default Logo;
