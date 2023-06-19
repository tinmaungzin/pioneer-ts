import { DialogTitle } from "@/components/ui/dialog";
import { usePostModel } from "@/hooks/usePostModel";
import { TableSet } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
  .object({
    table_count: yup.number().required("Name field is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;
type FormProps = {
  setOpen: (value: boolean) => void;
  editData: TableSet;
};
function AddTableCountForm({ setOpen, editData }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver<FormData>(schema),
  });

  const updateTableCount = usePostModel("admin/set_types", "set_types", "POST");

  const handleLogin = async (data: FormData) => {
    const newData = {
      type_id: editData.type_id,
      table_count: data.table_count,
    };
    const message = await updateTableCount.mutateAsync(newData);
    if (message) setOpen(false);
  };
  return (
    <>
      <DialogTitle className="text-center my-4 text-xl">
        Edit table count for {editData.type_name}
      </DialogTitle>

      <div className="mt-8">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label>Table Count</label>
                <input
                  type="number"
                  id="name"
                  className="input-box"
                  autoComplete="off"
                  defaultValue=""
                  {...register("table_count")}
                />
                {errors.table_count && (
                  <span className="text-red-500 text-xs">
                    {String(errors.table_count.message)}
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

export default AddTableCountForm;
