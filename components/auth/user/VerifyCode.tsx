import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Loading from "@/components/util/Loading";
import Layout from "./Layout";
import { usePostModel } from "@/hooks/usePostModel";
import { useToast } from "@/components/ui/use-toast";
import useRegisterUser from "@/store/useRegisterUser";
import useStore from "@/store/useStore";
import { useRouter } from "next/router";

const schema = yup
  .object({
    code: yup.number().required("Code field is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;
function VerifyCode() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const { toast } = useToast();
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [timer, setTimer] = useState(60);
  const confirmCode = usePostModel("user/confirm_code", "", "POST");
  const resendCode = usePostModel("user/send_code_by_user_id", "", "POST");

  const registerUser = useStore(useRegisterUser, (state:any) => state.registerUser);
  const setRegisterUser = useRegisterUser((state:any) => state.setRegisterUser);

  const handleLogin = (data: FormData) => {
    setError("");
    setLoading(true);
    const values = {
      code: data.code,
      user_id: registerUser?.id,
    };
    confirmCode.mutate(values, {
      onSuccess: () => {
        setLoading(false);
        

        if (router.pathname === "/register") {
          toast({
            description: "Verification success. Please Login",
          });
          const registerUser = {
            name: undefined,
            phone_number: undefined,
            id: undefined,
          };
          setRegisterUser(registerUser);
          router.push("/login");
        }
        if (router.pathname === "/forget_password") {
          toast({
            description: "Verification success. Change new password",
          });
          router.push("/new_password");
        }
      },
      onError: (error: any) => {
        setLoading(false);
        toast({
          variant: "destructive",
          description: error.message,
        });
        setError(error.message);
      },
    });
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    if (timer === 0) {
      clearInterval(countdown);
    }
    return () => {
      clearInterval(countdown);
    };
  }, [timer]);

  const handleResend = () => {
    if (timer === 0) {
      resendCode.mutate(
        { user_id: registerUser?.id },
        {
          onSuccess: (message) => {
            setLoading(false);
            toast({
              description: message,
            });
          },
          onError: (error: any) => {
            setLoading(false);
            toast({
              variant: "destructive",
              description: error.message,
            });
            setError(error.message);
          },
        }
      );
      setTimer(60);
    }
  };
  return (
    <>
      <Layout>
        <form onSubmit={handleSubmit(handleLogin)}>
          <p className="mb-4 text-center">
            Verify {registerUser?.phone_number}
          </p>
          <div className="space-y-2">
            <div>
              <label>Code</label>
              <input
                type="text"
                id="code"
                className="input-box"
                autoComplete="off"
                defaultValue=""
                placeholder="123456"
                {...register("code")}
              />
              {errors.code && (
                <span className="text-red-500 text-xs">
                  {errors.code?.message}
                </span>
              )}
              {errors && <span className="text-red-500 text-xs">{error}</span>}
            </div>
          </div>
          <div className="flex justify-between py-2 text-sm">
            <div>
              <p
                onClick={() => {
                  const registerUser = {
                    name: undefined,
                    phone_number: undefined,
                    id: undefined,
                  };
                  setRegisterUser(registerUser);
                }}
                className="cursor-pointer"
              >
                Restart process
              </p>
            </div>
            <div className="flex justify-center">
              <p
                onClick={handleResend}
                className={`cursor-pointer ${
                  timer !== 0 ? "text-gray-400" : ""
                }`}
              >
                Resend code
              </p>
              <p className="px-2 text-red-400">
                {timer === 0 ? "" : `${timer.toString().padStart(2, "0")}s`}
              </p>
            </div>
          </div>
          <div
            className="mt-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button
              type="submit"
              className="block w-full py-2 text-center text-white bg-black border border-black rounded hover:bg-transparent hover:text-black transition uppercase font-roboto font-medium relative"
            >
              {loading && (
                <div className="flex items-center justify-center">
                  <Loading
                    stroke={isHovered ? "stroke-primary" : "stroke-white"}
                  />
                </div>
              )}
              {loading ? "" : "Verify"}
            </button>
          </div>
        </form>
      </Layout>
    </>
  );
}

export default VerifyCode;
