import AuthLayout from "../../components/AuthLayout/AuthLayout";
import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <AuthLayout
      title="Login"
      text="Please enter your login details to continue using our service:"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
