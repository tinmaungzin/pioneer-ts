import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DialogTitle } from "../../ui/dialog";
import { useForm } from "react-hook-form";
import { usePostModel } from "@/hooks/usePostModel";
import { Staff } from "@/utils/types";
import { useToast } from "@/components/ui/use-toast";
import { handleError, handleSuccess } from "@/utils/helpers/mutationHandlers";

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
    id: yup.number().optional(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;
type FormProps = {
  setOpen: (value: boolean) => void;
  editData: Staff;
  name: string;
  title: string;
};

function ChangePasswordForm({ setOpen, editData, name, title }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver<FormData>(schema),
  });
  const { toast } = useToast();
  const updateAdmin = usePostModel(
    "admin/staffs/" + editData?.id + "/change_password",
    name,
    "POST"
  );

  const handleLogin = (data: FormData) => {
    data.id = editData?.id;
    updateAdmin.mutate(data, {
      onSuccess: (message) => handleSuccess(message, setOpen, toast),
      onError: (error) => handleError(error, toast),
    });
  };

  return (
    <>
      <DialogTitle className="text-center my-4 text-xl">
        Change {title} password
      </DialogTitle>

      <div className="mt-8">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
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
    </>
  );
}

export default ChangePasswordForm;
