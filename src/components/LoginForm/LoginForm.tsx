import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { login } from "../../redux/auth/operations";
import { selectIsAuthLoading } from "../../redux/auth/selectors";
import { loginSchema } from "../../utils/validation";
import type { LoginCredentials } from "../../types/auth";
import css from "../../styles/authForm.module.css";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsAuthLoading);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<LoginCredentials>({
    resolver: yupResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (values: LoginCredentials) => {
    try {
      await dispatch(login(values)).unwrap();
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Login failed");
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={css.fields}>
        <Input
          type="email"
          placeholder="Email"
          aria-label="Email"
          autoComplete="email"
          error={errors.email?.message}
          success={
            touchedFields.email && !errors.email ? "Success email" : undefined
          }
          {...register("email")}
        />
        <Input
          type="password"
          placeholder="Password"
          aria-label="Password"
          autoComplete="current-password"
          error={errors.password?.message}
          success={
            touchedFields.password && !errors.password
              ? "Success password"
              : undefined
          }
          {...register("password")}
        />
      </div>

      <Button type="submit" disabled={isLoading}>
        Login
      </Button>

      <Link to="/register" className={css.authLink}>
        Register
      </Link>
    </form>
  );
};

export default LoginForm;
