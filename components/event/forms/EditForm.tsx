import { useFetchAllModel } from "@/hooks/useFetchAllModel";
import * as yup from "yup";
import { Set } from "@/utils/types";
import PhotoInput from "./PhotoInput";
import { format } from "date-fns";
import { useState } from "react";
import TableForm from "./TableForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./formSchema";
import { usePostModel } from "@/hooks/usePostModel";
import DatePicker from "./DatePicker";
import { useRouter } from "next/router";
import { useFetchOneModel } from "@/hooks/useFetchOneModel";

type FormD = yup.InferType<typeof schema>;
type EditFormProps = {
  id: string | string[] | undefined;
};

function EditForm({ id }: EditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormD>({
    resolver: yupResolver<FormD>(schema),
  });
  const router = useRouter();
  const {model, isLoading, isFetching, error} = useFetchOneModel("admin/events/"+id, "events")
  console.log(model)
  const updatePutEvent = usePostModel("admin/events/" + id, "events", "PUT");
  const updatePostEvent = usePostModel(
    "admin/events/" + id,
    "packages",
    "POST"
  );
  const [date, setDate] = useState<Date>();
  const [dateError, setDateError] = useState<string>("");

  const { models: sets } = useFetchAllModel<Set[]>("admin/all_sets", "sets");
  const [selectedTables, setSelectedTables] = useState<(number | undefined)[]>(
    []
  );
  const [tableError, setTableError] = useState<string>();

  const handleLogin = async (data: FormD) => {
    setDateError("");
    setTableError("");
    if (!date) {
      setDateError("Date field is required");
      return;
    }
    if (!selectedTables.length) {
      setTableError("Please select tables");
      return;
    }
    interface DataType {
      name: string;
      set_id: string;
      walk_in_price: string;
      photo: any;
      layout_photo: any;
    }
    const { name, set_id, walk_in_price, photo, layout_photo }: DataType = data;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("walk_in_price", walk_in_price);
    formData.append("date", format(date, "yyyy-MM-dd"));
    formData.append("set_id", String(set_id));
    formData.append("photo", photo[0] as File);
    formData.append("layout_photo", layout_photo[0] as File);
    formData.append("tables", JSON.stringify(selectedTables));
    const message = await updatePostEvent.mutateAsync(formData);
    if (message) router.push("/dashboard/events");
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="p-6 px-32 flex justify-between">
          <p className="text-2xl font-semibold ">Edit event</p>
        </div>
        <div className="">
          <div className="grid grid-cols-2 gap-4 px-24 mb-12">
            <div className=" p-4">
              <PhotoInput
                caption="Event Photo"
                name="photo"
                register={register}
                errors={errors}
              />
              <div className="p-2">
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
              <div className="p-3">
                <DatePicker date={date} setDate={setDate} />
                {dateError && (
                  <span className="text-red-500 text-xs">{dateError}</span>
                )}
              </div>
            </div>
            <div className=" p-4">
              <PhotoInput
                caption="Event Layout Photo"
                name="layout_photo"
                register={register}
                errors={errors}
              />
              <div className="p-2">
                <label>Walk In Price</label>
                <input
                  type="number"
                  id="walk_in_price"
                  className="input-box"
                  autoComplete="off"
                  defaultValue=""
                  {...register("walk_in_price")}
                />
                {errors.walk_in_price && (
                  <span className="text-red-500 text-xs">
                    {errors.walk_in_price?.message}
                  </span>
                )}
              </div>
              <div className="p-2 mt-1">
                <label>Set</label>
                <select
                  id="set_id"
                  className="input-box"
                  {...register("set_id")}
                >
                  <option value="">Select a set</option>
                  {sets?.map((set, index) => {
                    return (
                      <option key={index} value={set.id}>
                        {set.name}
                      </option>
                    );
                  })}
                </select>
                {errors.set_id && (
                  <span className="text-red-500 text-xs">
                    {errors.set_id?.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <TableForm
            selectedTables={selectedTables}
            setSelectedTables={setSelectedTables}
            tableError={tableError}
          />
        </div>
        <div className="p-6 px-32 flex justify-end">
          <button
            type="submit"
            className="py-1 px-4 text-center text-white bg-black border border-black rounded-md hover:bg-transparent hover:text-black transition font-medium"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}

export default EditForm;
