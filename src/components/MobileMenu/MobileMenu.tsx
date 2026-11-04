import { useEffect } from "react";
import UserBar from "../UserBar/UserBar";
import UserNav from "../UserNav/UserNav";
import LogoutBtn from "../LogoutBtn/LogoutBtn";
import Icon from "../Icon/Icon";
import css from "./MobileMenu.module.css";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <div className={`${css.wrapper} ${isOpen ? css.open : ""}`} inert={!isOpen}>
      <div className={css.backdrop} onClick={onClose} />

      <aside className={css.menu}>
        <div className={css.top}>
          <UserBar variant="menu" />
          <button
            type="button"
            className={css.close}
            onClick={onClose}
            aria-label="Close menu"
          >
            <Icon id="close" className={css.closeIcon} />
          </button>
        </div>

        <div className={css.content}>
          <UserNav variant="menu" onLinkClick={onClose} />
          <div className={css.logout}>
            <LogoutBtn variant="menu" />
          </div>
        </div>

        <img
          className={css.image}
          src="/images/illustration_1x.webp"
          srcSet="/images/illustration_1x.webp 1x, /images/illustration_2x.webp 2x"
          alt=""
          width={363}
          height={318}
        />
      </aside>
    </div>
  );
};

export default MobileMenu;
