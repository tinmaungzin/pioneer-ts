import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DialogTitle } from "../../ui/dialog";
import { useForm } from "react-hook-form";
import { usePostModel } from "@/hooks/usePostModel";
import { User } from "@/utils/types";
import { useToast } from "@/components/ui/use-toast";
import { handleError, handleSuccess } from "@/utils/helpers/mutationHandlers";

const schema = yup
  .object({
    name: yup.string().required("Name field is required"),
    phone_number: yup.string().required("Email field is required"),
    user_type_id: yup.number().optional(),
    allowed_table: yup.number().required("Allowed table field is required"),
    id: yup.number().optional(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;
type FormProps = {
  setOpen: (value: boolean) => void;
  editData: User;
  name: string;
  title: string;
};

function EditForm({ setOpen, editData, name, title }: FormProps) {
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
    data.user_type_id = editData?.staff_type_id;
    data.id = editData?.id;
    updateUser.mutate(data, {
      onSuccess: (message) => handleSuccess(message, setOpen, toast),
      onError: (error) => handleError(error, toast),
    });
  };

  return (
    <>
      <DialogTitle className="text-center my-4 text-xl">
        Edit {title}
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
                  defaultValue={editData?.name ? editData.name : ""}
                  {...register("name")}
                />
                {errors.name && (
                  <span className="text-red-500 text-xs">
                    {errors.name?.message}
                  </span>
                )}
              </div>
              <div>
                <label>Phone Number</label>
                <input
                  type="text"
                  id="phone_number"
                  autoComplete="off"
                  className="input-box"
                  defaultValue={
                    editData?.phone_number ? editData.phone_number : ""
                  }
                  {...register("phone_number")}
                />
                {errors.phone_number && (
                  <span className="text-red-500 text-xs">
                    {errors.phone_number?.message}
                  </span>
                )}
              </div>
              <div>
                <label>Allowed Table</label>
                <input
                  type="text"
                  id="allowed_table"
                  autoComplete="off"
                  className="input-box"
                  defaultValue={
                    editData?.allowed_table ? editData.allowed_table : ""
                  }
                  {...register("allowed_table")}
                />
                {errors.allowed_table && (
                  <span className="text-red-500 text-xs">
                    {errors.allowed_table?.message}
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

export default EditForm;
