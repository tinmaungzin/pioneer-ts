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
    phone_number: yup.string().required("Phone number field is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;
function ForgetPassword() {
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
  const resendCode = usePostModel("user/send_code_by_phone_number", "", "POST");

  const setRegisterUser = useRegisterUser((state) => state.setRegisterUser);

  const handleResend = (data: FormData) => {
    setError("");
    setLoading(true);
    resendCode.mutate(
      { phone_number: data.phone_number },
      {
        onSuccess: (user_id) => {
          setLoading(false);
          toast({
            description: "Verification code is sent to " + data.phone_number,
          });
          if (user_id) {
            const registerUser = {
              name: undefined,
              phone_number: data.phone_number,
              id: user_id,
            };
            setRegisterUser(registerUser);
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
      }
    );
  };
  return (
    <>
      <Layout>
        <form onSubmit={handleSubmit(handleResend)}>
          <p className="mb-4 text-center">
            Enter you phone number to reset password
          </p>
          <div className="space-y-2">
            <div>
              <label>Phone Number</label>
              <input
                type="text"
                id="phone_number"
                className="input-box"
                autoComplete="off"
                defaultValue=""
                placeholder="091234567"
                {...register("phone_number")}
              />
              {errors.phone_number && (
                <span className="text-red-500 text-xs">
                  {errors.phone_number?.message}
                </span>
              )}
              {errors && <span className="text-red-500 text-xs">{error}</span>}
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
              {loading ? "" : "Submit"}
            </button>
          </div>
        </form>
      </Layout>
    </>
  );
}

export default ForgetPassword;
