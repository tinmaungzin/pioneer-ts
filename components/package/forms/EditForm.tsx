import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DialogTitle } from "../../ui/dialog";
import { useForm } from "react-hook-form";
import { usePostModel } from "@/hooks/usePostModel";
import { Package, Type } from "@/utils/types";
import { useFetchAllModel } from "@/hooks/useFetchAllModel";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { handleError, handleSuccess } from "@/utils/helpers/mutationHandlers";

const schema = yup
  .object({
    name: yup.string().required("Name field is required"),
    id: yup.number().optional(),
    type_id: yup.string().required("Type field is required"),
    // type_id: yup.string().optional(),

    photo: yup.mixed().optional(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;
type FormProps = {
  setOpen: (value: boolean) => void;
  editData: Package;
};

function EditForm({ setOpen, editData }: FormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver<FormData>(schema),
  });
  const { toast } = useToast();

  const updatePutPackages = usePostModel(
    "admin/packages/" + editData?.id,
    "packages",
    "PUT"
  );
  const updatePostPackages = usePostModel(
    "admin/packages/" + editData?.id,
    "packages",
    "POST"
  );
  const { models: types } = useFetchAllModel<Type[]>("all_types", "types", "all_types");

  const handleLogin = (data: FormData) => {
    interface DataType {
      name: string;
      type_id: string;
      photo?: any;
    }
    const { name, type_id, photo }: DataType = data;

    if (photo && photo[0] instanceof File) {
      const formData = new FormData();
      formData.append("_method", "put");
      formData.append("name", name);
      formData.append("type_id", String(type_id));
      formData.append("photo", photo[0] as File);

      updatePostPackages.mutate(formData, {
        onSuccess: (message) => handleSuccess(message, setOpen, toast),
        onError: (error) => handleError(error, toast),
      });
    } else {
      delete data["photo"];
      updatePutPackages.mutate(data, {
        onSuccess: (message) => handleSuccess(message, setOpen, toast),
        onError: (error) => handleError(error, toast),
      });
    }
  };

  useEffect(() => {
    if (editData?.type_id) setValue("type_id", String(editData?.type_id));
  }, [editData, setValue]);

  return (
    <>
      <DialogTitle className="text-center my-4 text-xl">
        Edit package
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
                <label>Type</label>
                <select
                  id="type_id"
                  className="input-box"
                  {...register("type_id")}
                >
                  <option value="">Select a type</option>
                  {types?.map((type, index) => {
                    return (
                      <option
                        selected={type.id === editData.type_id ? true : false}
                        key={index}
                        value={type.id}
                      >
                        {type.name}
                      </option>
                    );
                  })}
                </select>
                {errors.type_id && (
                  <span className="text-red-500 text-xs">
                    {errors.type_id?.message}
                  </span>
                )}
              </div>
              <div>
                <label>Photo</label>
                <input
                  type="file"
                  id="photo"
                  className="input-box"
                  {...register("photo")}
                />
                {errors.photo && (
                  <span className="text-red-500 text-xs">
                    {errors.photo?.message}
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
