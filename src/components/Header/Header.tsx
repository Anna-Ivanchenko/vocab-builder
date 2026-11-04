import Logo from "../Logo/Logo";
import UserNav from "../UserNav/UserNav";
import UserBar from "../UserBar/UserBar";
import LogoutBtn from "../LogoutBtn/LogoutBtn";
import Icon from "../Icon/Icon";
import css from "./Header.module.css";

const Header = () => {
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

          <button type="button" className={css.burger} aria-label="Open menu">
            <Icon id="nav" className={css.burgerIcon} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
