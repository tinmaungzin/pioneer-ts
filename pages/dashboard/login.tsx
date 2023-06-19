// import { signIn } from "next-auth/react";
// import { useState } from "react";
// import { useRouter } from "next/router";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import Login from "@/components/auth/staff/Login";
// import * as yup from "yup";
// import Loading from "@/components/util/Loading";

// const schema = yup
//   .object({
//     email: yup.string().email().required("Email field is required"),
//     password: yup
//       .string()
//       .required("Password field is required")
//       .min(6, "Password must be at least 6 characters"),
//   })
//   .required();

// type FormData = yup.InferType<typeof schema>;

export default function StaffLogin() {
  // const router = useRouter();
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<FormData>({
  //   resolver: yupResolver(schema),
  // });

  // const [error, setError] = useState<string>("");
  // const [loading, setLoading] = useState(false);
  // const [isHovered, setIsHovered] = useState(false);

  // const handleLogin = async (data: FormData) => {
  //   setError(""); // Clear any previous error
  //   setLoading(true); // Set loading state to true
  //   try {
  //     const values = {
  //       email: data.email,
  //       password: data.password,
  //     };
  //     const res = await signIn("credentials", {
  //       ...values,
  //       redirect: false,
  //     });
  //     if (res?.error) {
  //       setError(res.error);
  //     } else {
  //       router.push("/admin/admins");
  //     }
  //   } catch (error) {
  //     console.error("Login Error:", error);
  //     setError("An error occurred during login.");
  //   } finally {
  //     setLoading(false); // Set loading state to false
  //   }
  // };

  return (
    <>
      {/* <div className="contain py-16">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-4 text-center">
            Login
          </h2>
          <form onSubmit={handleSubmit(handleLogin)}>
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
            </div>
            <div
              className="mt-4"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <button
                type="submit"
                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium relative"
              >
                {loading && (
                  <div className="flex items-center justify-center">
                    <Loading
                      stroke={isHovered ? "stroke-primary" : "stroke-white"}
                    />
                  </div>
                )}
                {loading ? "" : "Login"}
              </button>
            </div>
          </form>

          {error ? (
            <div className="flex justify-center mt-4">
              <span className=" text-red-500 text-sm">{error}</span>
            </div>
          ) : null}
        </div>
      </div> */}
      <Login />
      
    </>
  );
}
