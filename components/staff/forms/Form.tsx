import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { usePostModel } from "@/hooks/usePostModel";
import { DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { handleError, handleSuccess } from "@/utils/helpers/mutationHandlers";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const schema = yup
  .object({
    name: yup.string().required("Name field is required"),
    email: yup.string().email().required("Email field is required"),
    password: yup
      .string()
      .required("Password field is required")
      .min(6, "Password must be at least 6 characters"),
    password_confirmation: yup
      .string()
      .required("Confirm Password field is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
    staff_type_id: yup.number().optional(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;
type FormProps = {
  name: string;
  title: string;
};

function Form({  name, title }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver<FormData>(schema),
  });

  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);

  const createAdmin = usePostModel("admin/staffs", name, "POST");

  const handleLogin = (data: FormData) => {
    data.staff_type_id = name === "admins" ? 1 : 2;
    createAdmin.mutate(data, {
      onSuccess: (message) => handleSuccess(message, setOpen, toast),
      onError: (error) => handleError(error, toast),
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <i className="fa-solid fa-plus text-2xl text-gray-600 hover:text-gray-800 cursor-pointer"></i>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <div>
              <DialogTitle className="text-center my-4 text-xl">
                Add new {title}
              </DialogTitle>

              <div className="mt-8">
                <form onSubmit={handleSubmit(handleLogin)}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label>Name</label>
                        <input
                          type="text"
                          id="name"
                          className="input-box"
                          autoComplete="off"
                          defaultValue=""
                          {...register("name")}
                        />
                        {errors.name && (
                          <span className="text-red-500 text-xs">
                            {errors.name?.message}
                          </span>
                        )}
                      </div>
                      <div>
                        <label>Email</label>
                        <input
                          type="email"
                          id="email"
                          autoComplete="off"
                          className="input-box"
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
                        <label>Password</label>
                        <input
                          type="password"
                          id="password"
                          autoComplete="off"
                          className="input-box"
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
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="py-1 px-4 text-center text-white bg-black border border-black rounded-md hover:bg-transparent hover:text-black transition font-medium"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Form;
