import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import css from "./TrainingButtons.module.css";

interface TrainingButtonsProps {
  primaryLabel: string;
  onPrimary: () => void;
  disabled?: boolean;
  className?: string;
}

const TrainingButtons = ({
  primaryLabel,
  onPrimary,
  disabled = false,
  className,
}: TrainingButtonsProps) => {
  const navigate = useNavigate();

  return (
    <div className={`${css.buttons} ${className ?? ""}`}>
      <Button className={css.primary} onClick={onPrimary} disabled={disabled}>
        {primaryLabel}
      </Button>
      <Button
        variant="outlined"
        className={css.cancel}
        onClick={() => navigate("/dictionary")}
      >
        Cancel
      </Button>
    </div>
  );
};

export default TrainingButtons;
