import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { register as registerUser } from "../../redux/auth/operations";
import { selectIsAuthLoading } from "../../redux/auth/selectors";
import { registerSchema } from "../../utils/validation";
import type { RegisterCredentials } from "../../types/auth";
import css from "../../styles/authForm.module.css";

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsAuthLoading);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<RegisterCredentials>({
    resolver: yupResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = async (values: RegisterCredentials) => {
    try {
      await dispatch(registerUser(values)).unwrap();
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Registration failed");
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={css.fields}>
        <Input
          placeholder="Name"
          aria-label="Name"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
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
          autoComplete="new-password"
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
        Register
      </Button>

      <Link to="/login" className={css.authLink}>
        Login
      </Link>
    </form>
  );
};

export default RegisterForm;
