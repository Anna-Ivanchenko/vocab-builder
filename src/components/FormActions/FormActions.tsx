import Button from "../Button/Button";
import css from "./FormActions.module.css";

interface FormActionsProps {
  submitText: string;
  onCancel: () => void;
  disabled?: boolean;
}

const FormActions = ({ submitText, onCancel, disabled }: FormActionsProps) => (
  <div className={css.actions}>
    <Button
      type="submit"
      variant="light"
      className={css.button}
      disabled={disabled}
    >
      {submitText}
    </Button>
    <Button variant="ghost" className={css.button} onClick={onCancel}>
      Cancel
    </Button>
  </div>
);

export default FormActions;
