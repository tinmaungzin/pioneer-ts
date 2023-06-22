import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Loading from "@/components/util/Loading";
import Layout from "./Layout";
import { usePostModel } from "@/hooks/usePostModel";
import { useToast } from "@/components/ui/use-toast";
import useRegisterUser from "@/store/useRegisterUser";
import { useFetchOneModel } from "@/hooks/useFetchOneModel";
import { User } from "@/utils/types";
import useStore from "@/store/useStore";
import { useRouter } from "next/router";

const schema = yup
  .object({
    password: yup
      .string()
      .required("Password field is required")
      .min(6, "Password must be at least 6 characters"),
    password_confirmation: yup
      .string()
      .required("Confirm Password field is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;
function NewPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const { toast } = useToast();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const changePassword = usePostModel("user/change_password", "", "POST");

  const { model: auth_user } = useFetchOneModel<User>("all", "one_user");
  const registerUser = useStore(useRegisterUser, (state:any) => state.registerUser);
  const setRegisterUser = useRegisterUser((state:any) => state.setRegisterUser);


  const handleLogin = (data: FormData) => {
    if ((!auth_user?.id || !auth_user?.user_type_id) && !registerUser?.id) {
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
      router.push("/");
      return
    }

    setError("");
    setLoading(true);
    const values = {
      user_id: auth_user?.id ? auth_user.id : registerUser?.id,
      password: data.password,
      confirm_password: data.password_confirmation,
    };
    changePassword.mutate(values, {
      onSuccess: () => {
        setLoading(false);
        toast({
          description: "Password changed. Please login with new password!",
        });
        router.push("/login");
        const registerUser = {
          name: undefined,
          phone_number: undefined,
          id: undefined,
        };
        setRegisterUser(registerUser);
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
  return (
    <>
      <Layout>
        <form onSubmit={handleSubmit(handleLogin)}>
          <p className="mb-4 text-center">New Password</p>
          <div className="space-y-2">
            <div>
              <label className="text-gray-600 mb-2 block">Password</label>
              <input
                type="password"
                id="password"
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                placeholder="*******"
                defaultValue=""
                {...register("password")}
              />
              {errors.password && (
                <span className="text-red-500 text-xs">
                  {errors.password?.message}
                </span>
              )}
            </div>
            <div>
              <label>Confirm Password</label>
              <input
                type="password"
                id="password_confirmation"
                autoComplete="off"
                className="input-box"
                placeholder="*******"
                defaultValue=""
                {...register("password_confirmation")}
              />
              {errors.password_confirmation && (
                <span className="text-red-500 text-xs">
                  {errors.password_confirmation?.message}
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
              {loading ? "" : "Confirm"}
            </button>
          </div>
        </form>
      </Layout>
    </>
  );
}

export default NewPassword;
