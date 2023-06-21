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
    name: yup.string().required("Name field is required"),
    phone_number: yup.string().required("Phone number field is required"),
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
function Register() {
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

  const handleLogin = async (data: FormData) => {
    setError("");
    setLoading(true);
    try {
      const values = {
        phone_number: data.phone_number,
        password: data.password,
      };
      const res = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/");
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
          <p className="mb-4 text-center">Create a new account</p>
          <div className="space-y-2">
            <div>
              <label>Name</label>
              <input
                type="text"
                id="name"
                className="input-box"
                autoComplete="off"
                defaultValue=""
                placeholder="Ko Kyaw Kyaw"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-red-500 text-xs">
                  {errors.name?.message}
                </span>
              )}
            </div>
            <div>
              <label className="text-gray-600 mb-2 block">Phone Number</label>
              <input
                type="text"
                autoComplete="off"
                id="email"
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                placeholder="091234567"
                defaultValue=""
                {...register("phone_number")}
              />
              {errors.phone_number && (
                <span className="text-red-500 text-xs">
                  {errors.phone_number?.message}
                </span>
              )}
            </div>
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
              {loading ? "" : "Register"}
            </button>
          </div>
        </form>
      </Layout>
    </>
  );
}

export default Register;
