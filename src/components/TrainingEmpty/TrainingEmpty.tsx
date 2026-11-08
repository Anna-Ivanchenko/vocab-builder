import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import css from "./TrainingEmpty.module.css";

interface TrainingEmptyProps {
  onAddWord: () => void;
}

const TrainingEmpty = ({ onAddWord }: TrainingEmptyProps) => {
  const navigate = useNavigate();

  return (
    <section className={css.empty}>
      <img
        src="/images/blood_report_1x.webp"
        srcSet="/images/blood_report_1x.webp 1x, /images/blood_report_2x.webp 2x"
        alt=""
        width={265}
        height={282}
        className={css.image}
      />

      <div className={css.content}>
        <h2 className={css.title}>
          You don't have a single word to learn right now.
        </h2>
        <p className={css.text}>
          Please create or add a word to start the workout. We want to improve
          your vocabulary and develop your knowledge, so please share the words
          you are interested in adding to your study.
        </p>

        <div className={css.buttons}>
          <Button className={css.addBtn} onClick={onAddWord}>
            Add word
          </Button>
          <Button
            variant="outlined"
            className={css.cancelBtn}
            onClick={() => navigate("/dictionary")}
          >
            Cancel
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrainingEmpty;
