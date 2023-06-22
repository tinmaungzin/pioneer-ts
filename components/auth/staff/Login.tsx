import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Loading from "@/components/util/Loading";
import Layout from "./Layout";

const schema = yup
  .object({
    email: yup.string().email().required("Email field is required"),
    password: yup
      .string()
      .required("Password field is required")
      .min(6, "Password must be at least 6 characters"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;
function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async (data: FormData) => {
    setError("");
    setLoading(true);
    try {
      const values = {
        email: data.email,
        password: data.password,
      };
      const res = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      if (res?.status === 401) {
        setError("Incorrect email or password. Please try again!");
      } else {
        router.push("/dashboard/loading");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("An error occurred during login.");
    } finally {
      setLoading(false); // Set loading state to false
    }
  };
  return (
    <>
      <Layout>
        <form onSubmit={handleSubmit(handleLogin)}>
          <p className="mb-4 text-center">Please login to your account</p>
          <div className="space-y-2">
            <div>
              <label className="text-gray-600 mb-2 block">Email</label>
              <input
                type="text"
                autoComplete="off"
                id="email"
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                placeholder="someone@example.com"
                defaultValue=""
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email?.message}
                </span>
              )}
            </div>
            <div>
            <div className="flex items-center justify-between">
                <label className="text-gray-600 mb-2 block">Password</label>
                <i
                  id="password-toggle"
                  className={`" ml-4 cursor-pointer" ${
                    passwordVisible ? "fa-solid fa-eye" : " fas fa-eye-slash"
                  }`}
                  onClick={() => setPasswordVisible(!passwordVisible)}
                ></i>
              </div>
              <input
                type={passwordVisible ? "text" : "password"}
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
                    stroke={isHovered ? "stroke-black" : "stroke-white"}
                  />
                </div>
              )}
              {loading ? "" : "Login"}
            </button>
          </div>
        </form>
      </Layout>
    </>
  );
}

export default Login;
