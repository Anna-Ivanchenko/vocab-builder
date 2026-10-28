import { useId, useState } from "react";
import type { InputHTMLAttributes, Ref } from "react";
import Icon from "../Icon/Icon";
import css from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  success?: string;
  ref?: Ref<HTMLInputElement>;
}

const Input = ({
  error,
  success,
  type = "text",
  className,
  ref,
  ...rest
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const helperId = useId();

  const isPassword = type === "password";
  const inputType = isPassword && isPasswordVisible ? "text" : type;

  const stateClass = error ? css.error : success ? css.success : "";
  const helperText = error ?? success;

  return (
    <div className={`${css.wrapper} ${className ?? ""}`}>
      <div className={css.field}>
        <input
          ref={ref}
          type={inputType}
          className={`${css.input} ${stateClass} ${isPassword ? css.withIcon : ""}`}
          aria-invalid={Boolean(error)}
          aria-describedby={helperText ? helperId : undefined}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            className={css.eyeBtn}
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
          >
            <Icon id={isPasswordVisible ? "eye-on" : "eye-off"} size={20} />
          </button>
        )}
      </div>

      {helperText && (
        <p id={helperId} className={`${css.helper} ${stateClass}`}>
          <Icon id={error ? "error" : "success"} size={16} />
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
