import Register from "@/components/auth/user/Register";
import VerifyCode from "@/components/auth/user/VerifyCode";
import useRegisterUser from "@/store/useRegisterUser";
import useStore from "@/store/useStore";

export default function UserRegister() {
  const registerUser = useStore(useRegisterUser, (state:any) => state.registerUser);

  return <>{registerUser?.id ? <VerifyCode /> : <Register />}</>;
}
