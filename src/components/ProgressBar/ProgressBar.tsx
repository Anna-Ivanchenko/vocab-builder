import CircularProgress from "@mui/material/CircularProgress";
import css from "./ProgressBar.module.css";

interface ProgressBarProps {
  value: number;
}

const ProgressBar = ({ value }: ProgressBarProps) => {
  const progress = Math.min(Math.max(Math.round(value), 0), 100);

  return (
    <div className={css.wrapper}>
      <span className={css.label}>{progress}%</span>

      <div className={css.circle}>
        <CircularProgress
          variant="determinate"
          value={100}
          size="100%"
          thickness={7}
          sx={{ color: "var(--color-progress-bg)" }}
          className={css.track}
          aria-hidden="true"
        />
        <CircularProgress
          variant="determinate"
          value={progress}
          size="100%"
          thickness={7}
          sx={{ color: "var(--color-progress)" }}
          aria-label={`Progress ${progress}%`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
