import ForgetPassword from "@/components/auth/user/ForgetPassword";
import VerifyCode from "@/components/auth/user/VerifyCode";
import useRegisterUser from "@/store/useRegisterUser";
import useStore from "@/store/useStore";

function ForgetPasswordIndex() {

  const registerUser = useStore(useRegisterUser, (state) => state.registerUser);
  return <>{registerUser?.id ? <VerifyCode /> : <ForgetPassword />}</>;
}

export default ForgetPasswordIndex;
