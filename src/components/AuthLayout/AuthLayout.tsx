import type { ReactNode } from "react";
import Logo from "../Logo/Logo";
import css from "./AuthLayout.module.css";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className={css.page}>
      <header className={`container ${css.header}`}>
        <Logo />
      </header>

      <main className={`container ${css.main}`}>
        <div className={css.card}>{children}</div>

        <div className={css.hero}>
          <img
            className={css.image}
            src="/images/illustration_1x.webp"
            srcSet="/images/illustration_1x.webp 1x, /images/illustration_2x.webp 2x"
            alt="Two young people reading books"
            width={498}
            height={435}
          />
          <p className={css.caption}>Word · Translation · Grammar · Progress</p>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
