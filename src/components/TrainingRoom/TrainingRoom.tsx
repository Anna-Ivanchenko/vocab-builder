import { useState, type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../redux/hooks";
import { sendAnswers } from "../../redux/training/operations";
import type { Task, TaskLang } from "../../types/training";
import { matchCase } from "../../utils/matchCase";
import Icon from "../Icon/Icon";
import ProgressBar from "../ProgressBar/ProgressBar";
import TrainingButtons from "../TrainingButtons/TrainingButtons";
import css from "./TrainingRoom.module.css";

const LANGS = {
  en: { name: "English", flag: "england", placeholder: "Enter translation" },
  ua: { name: "Ukrainian", flag: "ukraine", placeholder: "Введіть переклад" },
};

const LangLabel = ({ lang }: { lang: TaskLang }) => (
  <span className={css.lang}>
    <img
      src={`/images/${LANGS[lang].flag}_flag_1x.webp`}
      srcSet={`/images/${LANGS[lang].flag}_flag_1x.webp 1x, /images/${LANGS[lang].flag}_flag_2x.webp 2x`}
      alt=""
      width={32}
      height={32}
      className={css.flag}
    />
    {LANGS[lang].name}
  </span>
);

interface TrainingRoomProps {
  tasks: Task[];
  onSaved: () => void;
}

const TrainingRoom = ({ tasks, onSaved }: TrainingRoomProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Task[]>([]);
  const [value, setValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const task = tasks[index];
  const answerLang = task.task;
  const wordLang: TaskLang = answerLang === "en" ? "ua" : "en";
  const isLast = index === tasks.length - 1;

  const addCurrentAnswer = (): Task[] => {
    const answer = matchCase(value.trim(), task[wordLang] ?? "");
    if (!answer) return answers;
    return [...answers, { ...task, [answerLang]: answer }];
  };

  const handleNext = () => {
    setAnswers(addCurrentAnswer());
    setValue("");
    setIndex((prev) => prev + 1);
  };

  const handleSave = async () => {
    const allAnswers = addCurrentAnswer();

    if (allAnswers.length === 0) {
      toast.error("Please translate at least one word");
      return;
    }

    setIsSaving(true);
    try {
      await dispatch(sendAnswers(allAnswers)).unwrap();
      onSaved();
    } catch (error) {
      toast.error(
        `${typeof error === "string" ? error : "Failed to save answers"}. Your progress was not saved.`,
      );
      navigate("/dictionary");
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!isLast) handleNext();
    }
  };

  return (
    <section className={css.room}>
      <div className={css.progress}>
        <ProgressBar
          variant="training"
          value={(answers.length / tasks.length) * 100}
          label={answers.length}
        />
      </div>

      <div className={css.card}>
        <div className={css.panels}>
          <div className={css.panel}>
            <textarea
              className={css.input}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={LANGS[answerLang].placeholder}
              aria-label={`Translation in ${LANGS[answerLang].name}`}
              autoComplete="off"
            />
            <LangLabel lang={answerLang} />
            {!isLast && (
              <button type="button" className={css.next} onClick={handleNext}>
                Next
                <Icon id="right-horizontal" className={css.nextIcon} />
              </button>
            )}
          </div>

          <div className={css.panel}>
            <p className={css.word}>{task[wordLang]}</p>
            <LangLabel lang={wordLang} />
          </div>
        </div>
      </div>

      <TrainingButtons
        primaryLabel="Save"
        onPrimary={handleSave}
        disabled={isSaving}
        className={css.buttons}
      />
    </section>
  );
};

export default TrainingRoom;
