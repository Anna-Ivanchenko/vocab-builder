import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/auth/operations";
import Icon from "../Icon/Icon";
import css from "./LogoutBtn.module.css";

interface LogoutBtnProps {
  variant?: "header" | "menu";
}

const LogoutBtn = ({ variant = "header" }: LogoutBtnProps) => {
  const dispatch = useAppDispatch();

  return (
    <button
      type="button"
      className={`${css.btn} ${css[variant]}`}
      onClick={() => dispatch(logout())}
    >
      Log out
      <Icon id="right-horizontal" size={16} />
    </button>
  );
};

export default LogoutBtn;
