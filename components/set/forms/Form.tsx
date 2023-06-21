import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { usePostModel } from "@/hooks/usePostModel";
import { DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { handleError, handleSuccess } from "@/utils/helpers/mutationHandlers";

const schema = yup
  .object({
    name: yup.string().required("Name field is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;
type FormProps = {
  setOpen: (value: boolean) => void;
};

function Form({ setOpen }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver<FormData>(schema),
  });
  const { toast } = useToast();
  const createSet = usePostModel("admin/sets", "sets", "POST");

  const handleLogin = (data: FormData) => {
    createSet.mutate(data, {
      onSuccess: (message) => handleSuccess(message, setOpen, toast),
      onError: (error) => handleError(error, toast),
    });
  };

  return (
    <>
      <DialogTitle className="text-center my-4 text-xl">
        Add new set
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

export default Form;
