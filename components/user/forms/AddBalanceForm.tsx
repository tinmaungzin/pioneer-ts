import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DialogTitle } from "../../ui/dialog";
import { useForm } from "react-hook-form";
import { usePostModel } from "@/hooks/usePostModel";
import { User } from "@/utils/types";
import { handleError, handleSuccess } from "@/utils/helpers/mutationHandlers";
import { useToast } from "@/components/ui/use-toast";

const schema = yup
  .object({
    new_balance: yup.number().required("Balance field is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;
type FormProps = {
  setOpen: (value: boolean) => void;
  editData: User;
  name: string;
  title: string;
};

function AddBalanceForm({ setOpen, editData, name, title }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver<FormData>(schema),
  });
  const { toast } = useToast();
  const updateUser = usePostModel("staff/users/" + editData?.id, name, "PUT");

  const handleLogin = (data: FormData) => {
    let newData = { ...editData };
    newData.balance = editData?.balance
      ? data.new_balance + editData?.balance
      : data.new_balance;
    updateUser.mutate(newData, {
      onSuccess: (message) => handleSuccess(message, setOpen, toast),
      onError: (error) => handleError(error, toast),
    });
  };

  return (
    <>
      <DialogTitle className="text-center my-4 text-xl">
        Add balance to {title}
      </DialogTitle>

      <div className="mt-8">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label>Balance</label>
                <input
                  type="text"
                  id="new_balance"
                  autoComplete="off"
                  className="input-box"
                  {...register("new_balance")}
                />
                {errors.new_balance && (
                  <span className="text-red-500 text-xs">
                    {errors.new_balance?.message}
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

export default AddBalanceForm;
