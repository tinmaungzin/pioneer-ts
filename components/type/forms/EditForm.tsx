import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DialogTitle } from "../../ui/dialog";
import { useForm } from "react-hook-form";
import { usePostModel } from "@/hooks/usePostModel";
import { Type } from "@/utils/types";
import { useToast } from "@/components/ui/use-toast";
import { handleError, handleSuccess } from "@/utils/helpers/mutationHandlers";

const schema = yup
  .object({
    // name: yup.string().required("Name field is required"),
    allowed_people: yup.number().required("Allowed people field is required"),
    id: yup.number().optional(),
    is_available: yup.number().optional(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;
type FormProps = {
  setOpen: (value: boolean) => void;
  editData: Type;
};

function EditForm({ setOpen, editData }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver<FormData>(schema),
  });
  const { toast } = useToast();
  const updateType = usePostModel(
    "admin/types/" + editData?.id,
    "types",
    "PUT"
  );

  const handleLogin = (data: FormData) => {
    let newData = { ...editData };
    newData.allowed_people = String(data.allowed_people);
    // data.id = editData?.id;
    // data.is_available = editData?.is_available;
    updateType.mutate(newData, {
      onSuccess: (message) => handleSuccess(message, setOpen, toast),
      onError: (error) => handleError(error, toast),
    });
  };

  return (
    <>
      <DialogTitle className="text-center my-4 text-xl">Edit type</DialogTitle>

      <div className="mt-8">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {/* <div>
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
              </div> */}
              <div>
                <label>Allowed people</label>
                <input
                  type="number"
                  id="allowed_people"
                  className="input-box"
                  autoComplete="off"
                  defaultValue={
                    editData?.allowed_people ? editData.allowed_people : ""
                  }
                  {...register("allowed_people")}
                />
                {errors.allowed_people && (
                  <span className="text-red-500 text-xs">
                    {errors.allowed_people?.message}
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
