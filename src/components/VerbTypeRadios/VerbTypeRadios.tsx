import { useId } from "react";
import css from "./VerbTypeRadios.module.css";

interface VerbTypeRadiosProps {
  value: boolean;
  onChange: (isIrregular: boolean) => void;
  variant?: "default" | "inverse";
  className?: string;
}

const verbTypes = [
  { label: "Regular", isIrregular: false },
  { label: "Irregular", isIrregular: true },
];

const VerbTypeRadios = ({
  value,
  onChange,
  variant = "default",
  className,
}: VerbTypeRadiosProps) => {
  const name = useId();

  return (
    <div
      className={`${css.radios} ${css[variant]} ${className ?? ""}`}
      role="radiogroup"
      aria-label="Verb type"
    >
      {verbTypes.map((type) => (
        <label key={type.label} className={css.radio}>
          <input
            type="radio"
            name={name}
            className={css.radioInput}
            checked={value === type.isIrregular}
            onChange={() => onChange(type.isIrregular)}
          />
          <span className={css.radioMark} />
          {type.label}
        </label>
      ))}
    </div>
  );
};

export default VerbTypeRadios;
