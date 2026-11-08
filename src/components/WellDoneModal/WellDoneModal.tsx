import { useEffect } from "react";
import type { AnswerResult } from "../../types/training";
import Modal from "../Modal/Modal";
import css from "./WellDoneModal.module.css";

interface WellDoneModalProps {
  results: AnswerResult[];
  onClose: () => void;
}

const AUTO_CLOSE_MS = 5000;

const getOriginalWord = ({ task, en, ua }: AnswerResult) =>
  task === "en" ? ua : en;

const WellDoneModal = ({ results, onClose }: WellDoneModalProps) => {
  const correct = results.filter((result) => result.isDone);
  const mistakes = results.filter((result) => !result.isDone);
  const title = mistakes.length === 0 ? "Well done" : "Keep practicing";

  useEffect(() => {
    const timerId = setTimeout(onClose, AUTO_CLOSE_MS);
    return () => clearTimeout(timerId);
  }, [onClose]);

  return (
    <Modal onClose={onClose} className={css.modal}>
      <h2 className={css.title}>{title}</h2>

      <div className={css.results}>
        <div className={css.correct}>
          <p className={css.label}>Correct answers:</p>
          <ul className={css.list}>
            {correct.map((result) => (
              <li key={`${result._id}-${result.task}`}>
                {getOriginalWord(result)}
              </li>
            ))}
          </ul>
        </div>

        <div className={css.mistakes}>
          <p className={css.label}>Mistakes:</p>
          <ul className={css.list}>
            {mistakes.map((result) => (
              <li key={`${result._id}-${result.task}`}>
                {getOriginalWord(result)}
              </li>
            ))}
          </ul>
        </div>

        <img
          src="/images/open_book_1x.webp"
          srcSet="/images/open_book_1x.webp 1x, /images/open_book_2x.webp 2x"
          alt=""
          width={212}
          height={179}
          className={css.image}
        />
      </div>
    </Modal>
  );
};

export default WellDoneModal;
