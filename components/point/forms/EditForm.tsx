import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DialogTitle } from "../../ui/dialog";
import { useForm } from "react-hook-form";
import { usePostModel } from "@/hooks/usePostModel";
import { PointItem } from "@/utils/types";
import { useToast } from "@/components/ui/use-toast";
import { handleError, handleSuccess } from "@/utils/helpers/mutationHandlers";

const schema = yup
  .object({
    details: yup.string().required("Details field is required"),
    point: yup
      .number()
      .typeError("Point must be number")
      .required("Point field is required"),
    id: yup.number().optional(),
    photo: yup.mixed().optional(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;
type FormProps = {
  setOpen: (value: boolean) => void;
  editData: PointItem;
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
  const updatePutPointItem = usePostModel(
    "admin/point_items/" + editData?.id,
    "point_items",
    "PUT"
  );

  const updatePostPointItem = usePostModel(
    "admin/point_items/" + editData?.id,
    "point_items",
    "POST"
  );

  const handleLogin = (data: FormData) => {
    interface DataType {
      point: number;
      details: string;
      photo?: any;
    }
    const { point, details, photo }: DataType = data;

    if (photo && photo[0] instanceof File) {
      const formData = new FormData();
      formData.append("_method", "put");
      formData.append("details", details);
      formData.append("point", String(point));
      formData.append("photo", photo[0] as File);

      updatePostPointItem.mutate(formData, {
        onSuccess: (message) => handleSuccess(message, setOpen, toast),
        onError: (error) => handleError(error, toast),
      });
    } else {
      delete data["photo"];
      updatePutPointItem.mutate(data, {
        onSuccess: (message) => handleSuccess(message, setOpen, toast),
        onError: (error) => handleError(error, toast),
      });
    }
  };

  return (
    <>
      <DialogTitle className="text-center my-4 text-xl">Edit point</DialogTitle>

      <div className="mt-8">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label>Point</label>
                <input
                  type="number"
                  id="point"
                  className="input-box"
                  autoComplete="off"
                  defaultValue={editData?.point ? editData.point : ""}
                  {...register("point")}
                />
                {errors.point && (
                  <span className="text-red-500 text-xs">
                    {errors.point?.message}
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
              <div>
                <label>Details</label>
                <textarea
                  id="details"
                  className="input-box"
                  defaultValue={editData?.details ? editData.details : ""}
                  {...register("details")}
                ></textarea>
                {errors.details && (
                  <span className="text-red-500 text-xs">
                    {errors.details?.message}
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
