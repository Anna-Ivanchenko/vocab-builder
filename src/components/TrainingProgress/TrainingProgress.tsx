import CircularProgress from "@mui/material/CircularProgress";
import css from "./TrainingProgress.module.css";

interface TrainingProgressProps {
  done: number;
  total: number;
}

const TrainingProgress = ({ done, total }: TrainingProgressProps) => {
  const percent = total > 0 ? (done / total) * 100 : 0;

  return (
    <div className={css.progress}>
      <CircularProgress
        variant="determinate"
        value={100}
        size="100%"
        thickness={2.4}
        sx={{ color: "var(--color-green-bg)" }}
        className={css.track}
        aria-hidden="true"
      />
      <CircularProgress
        variant="determinate"
        value={percent}
        size="100%"
        thickness={2.4}
        sx={{ color: "var(--color-green)" }}
        aria-label={`Answered ${done} of ${total}`}
      />
      <span className={css.count}>{done}</span>
    </div>
  );
};

export default TrainingProgress;
