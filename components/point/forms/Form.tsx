import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { usePostModel } from "@/hooks/usePostModel";
import { DialogTitle } from "@/components/ui/dialog";

const schema = yup
  .object({
    details: yup.string().required("Details field is required"),
    point: yup
      .number()
      .typeError("Point must be number")
      .required("Point field is required"),
    photo: yup
      .mixed()
      .test("file", "Photo field is required", (value: any) => {
        if (value?.length > 0) {
          return true;
        }
        return false;
      })
      .required("Photo field is required"),
  })
  .required();

type FormD = yup.InferType<typeof schema>;
type FormProps = {
  setOpen: (value: boolean) => void;
};

function Form({ setOpen }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormD>({
    resolver: yupResolver<FormD>(schema),
  });
  const createPointItem = usePostModel(
    "admin/point_items",
    "point_items",
    "POST"
  );

  const handleLogin = async (data: FormD) => {
    interface DataType {
      point: number;
      details: string;
      photo: any;
    }
    const { point, details, photo }: DataType = data;

    const formData = new FormData();
    formData.append("details", details);
    formData.append("point", String(point));
    formData.append("photo", photo[0] as File);

    const message = await createPointItem.mutateAsync(formData);
    if (message) setOpen(false);
  };

  return (
    <>
      <DialogTitle className="text-center my-4 text-xl">
        Add new point
      </DialogTitle>

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
                  defaultValue=""
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
                  defaultValue=""
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

export default Form;
