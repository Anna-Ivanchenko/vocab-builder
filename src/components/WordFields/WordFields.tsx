import { useId } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import Input from "../Input/Input";
import css from "./WordFields.module.css";

interface WordFieldsProps {
  ua: UseFormRegisterReturn;
  en: UseFormRegisterReturn;
  errors: {
    ua?: string;
    en?: string;
  };
}

const languages = [
  { key: "ua", label: "Ukrainian", flag: "ukraine" },
  { key: "en", label: "English", flag: "england" },
] as const;

const WordFields = ({ ua, en, errors }: WordFieldsProps) => {
  const id = useId();
  const fields = { ua, en };

  return (
    <div className={css.fields}>
      {languages.map(({ key, label, flag }) => (
        <div key={key} className={css.field}>
          <label htmlFor={`${id}-${key}`} className={css.label}>
            <img
              src={`/images/${flag}_flag_1x.webp`}
              srcSet={`/images/${flag}_flag_1x.webp 1x, /images/${flag}_flag_2x.webp 2x`}
              alt=""
              width={32}
              height={32}
              className={css.flag}
            />
            {label}
          </label>
          <Input
            id={`${id}-${key}`}
            variant="inverse"
            className={css.input}
            error={errors[key]}
            {...fields[key]}
          />
        </div>
      ))}
    </div>
  );
};

export default WordFields;
