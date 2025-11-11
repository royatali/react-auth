import ForgotPasswordForm from "../../components/auth/forgotPassword/ForgotPasswordForm";
import ForgotPasswordPrompt from "../../components/auth/forgotPassword/ForgotPasswordPrompt";
import AuthLayout from "../../components/layout/AuthLayout";

const ForgotPassword = () => {
  return (
    <AuthLayout title="Forgot Password">
      <ForgotPasswordPrompt />
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPassword;
