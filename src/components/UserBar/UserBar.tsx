import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/auth/selectors";
import Icon from "../Icon/Icon";
import css from "./UserBar.module.css";

interface UserBarProps {
  variant?: "header" | "menu";
}

const UserBar = ({ variant = "header" }: UserBarProps) => {
  const { name } = useAppSelector(selectUser);

  return (
    <div className={`${css.bar} ${css[variant]}`}>
      <p className={css.name} title={name}>
        {name}
      </p>
      <span className={css.avatar}>
        <Icon id="user" className={css.icon} />
      </span>
    </div>
  );
};

export default UserBar;
