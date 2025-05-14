import AuthForm from "../components/AuthForm";
import { signupUser } from "../services/authServices";

export default function Signup() {
  return <AuthForm type="signup" onSubmit={signupUser} />;
}
