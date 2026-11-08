import Icon from "../Icon/Icon";
import css from "./AddToDictionaryBtn.module.css";

interface AddToDictionaryBtnProps {
  onClick: () => void;
}

const AddToDictionaryBtn = ({ onClick }: AddToDictionaryBtnProps) => {
  return (
    <button type="button" className={css.button} onClick={onClick}>
      <span className={css.text}>Add to dictionary</span>
      <Icon id="right-horizontal" className={css.icon} />
    </button>
  );
};

export default AddToDictionaryBtn;
