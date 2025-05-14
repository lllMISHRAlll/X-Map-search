import AuthForm from "../components/AuthForm";
import { loginUser } from "../services/authServices";

export default function Login() {
  return <AuthForm type="login" onSubmit={loginUser} />;
}
