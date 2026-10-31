import AuthLayout from "../../components/AuthLayout/AuthLayout";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

const RegisterPage = () => {
  return (
    <AuthLayout
      title="Register"
      text="To start using our services, please fill out the registration form below. All fields are mandatory:"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
