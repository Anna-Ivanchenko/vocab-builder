import CircularProgress from "@mui/material/CircularProgress";
import css from "./ProgressBar.module.css";

interface ProgressBarProps {
  value: number;
  variant?: "table" | "training";
  label?: number;
}

const ProgressBar = ({ value, variant = "table", label }: ProgressBarProps) => {
  const progress = Math.min(Math.max(Math.round(value), 0), 100);
  const thickness = variant === "training" ? 2.4 : 7;

  return (
    <div className={`${css.wrapper} ${css[variant]}`}>
      {variant === "table" && <span className={css.label}>{progress}%</span>}

      <div className={css.circle}>
        <CircularProgress
          variant="determinate"
          value={100}
          size="100%"
          thickness={thickness}
          sx={{ color: "var(--progress-track)" }}
          className={css.track}
          aria-hidden="true"
        />
        <CircularProgress
          variant="determinate"
          value={progress}
          size="100%"
          thickness={thickness}
          sx={{ color: "var(--progress-bar)" }}
          aria-label={`Progress ${progress}%`}
        />
        {variant === "training" && <span className={css.count}>{label}</span>}
      </div>
    </div>
  );
};

export default ProgressBar;
