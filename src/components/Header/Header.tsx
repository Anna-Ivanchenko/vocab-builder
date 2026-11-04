import Logo from "../Logo/Logo";
import UserNav from "../UserNav/UserNav";
import UserBar from "../UserBar/UserBar";
import LogoutBtn from "../LogoutBtn/LogoutBtn";
import Icon from "../Icon/Icon";
import css from "./Header.module.css";
import { useState } from "react";
import MobileMenu from "../MobileMenu/MobileMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={css.header}>
      <div className={`container ${css.wrapper}`}>
        <Logo className={css.logo} />

        <div className={css.desktopOnly}>
          <UserNav />
        </div>

        <div className={css.actions}>
          <UserBar />

          <div className={css.desktopOnly}>
            <LogoutBtn />
          </div>

          <button
            type="button"
            className={css.burger}
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <Icon id="nav" className={css.burgerIcon} />
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};

export default Header;
