import { useFetchAllModel } from "@/hooks/useFetchAllModel";
import * as yup from "yup";
import { Event, Set } from "@/utils/types";
import PhotoInput from "./PhotoInput";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import TableForm from "./TableForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./editFormSchema";
import { usePostModel } from "@/hooks/usePostModel";
import DatePicker from "./DatePicker";
import { useRouter } from "next/router";
import { useFetchOneModel } from "@/hooks/useFetchOneModel";
import { useToast } from "@/components/ui/use-toast";
import { handleError } from "@/utils/helpers/mutationHandlers";
import Loading from "@/components/util/Loading";

type FormD = yup.InferType<typeof schema>;
type EditFormProps = {
  id: string | string[] | undefined;
};

function EditForm({ id }: EditFormProps) {
  const originUrl = process.env.NEXT_PUBLIC_ORIGIN_URL;
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormD>({
    resolver: yupResolver<FormD>(schema),
  });
  const router = useRouter();
  const { model } = useFetchOneModel<any>(
    "admin/events/" + id,
    "one_event_" + id
  );

  const event: Event | undefined = model ? model?.event : undefined;

  const updatePutEvent = usePostModel(
    "admin/events/" + id,
    ["events", "one_event_" + id],
    "PUT"
  );
  const updatePostEvent = usePostModel(
    "admin/events/" + id,
    ["events", "one_event_" + id],
    "POST"
  );
  const [date, setDate] = useState<Date | undefined>();
  const [dateError, setDateError] = useState<string>("");

  const { models: sets } = useFetchAllModel<Set[]>(
    "admin/all_sets",
    "sets",
    "all_sets"
  );
  const [selectedTables, setSelectedTables] = useState<(number | undefined)[]>(
    []
  );
  const [tableError, setTableError] = useState<string>();
  const { toast } = useToast();

  useEffect(() => {
    if (event) {
      setDate(new Date(event.date));
      let tableIds: (number | undefined)[] = [];
      event.tables.map((table) => {
        tableIds.push(table.id);
      });
      if (tableIds.length) setSelectedTables(tableIds);
      if (event?.set_id) setValue("set_id", String(event?.set_id));
    }
  }, [event, setValue]);

  const handleLogin = (data: FormD) => {
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
      photo?: any;
      layout_photo?: any;
    }
    const { name, set_id, walk_in_price, photo, layout_photo }: DataType = data;

    if (photo.length || layout_photo.length) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("walk_in_price", walk_in_price);
      formData.append("date", format(date, "yyyy-MM-dd"));
      formData.append("set_id", String(set_id));
      if (photo.length) formData.append("photo", photo[0] as File);
      if (layout_photo.length)
        formData.append("layout_photo", layout_photo[0] as File);
      formData.append("tables", JSON.stringify(selectedTables));
      updatePostEvent.mutate(formData, {
        onSuccess: (message) => {
          toast({
            description: message,
          });
          router.push("/dashboard/events");
        },
        onError: (error) => handleError(error, toast),
      });
    } else {
      delete data["photo"];
      delete data["layout_photo"];
      const newData: any = { ...data };
      newData.date = format(date, "yyyy-MM-dd");
      newData.tables = JSON.stringify(selectedTables);
      updatePutEvent.mutate(newData, {
        onSuccess: (message) => {
          toast({
            description: message,
          });
          router.push("/dashboard/events");
        },
        onError: (error) => handleError(error, toast),
      });
    }
  };

  return (
    <>
      {event ? (
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
                  editPhoto={`${originUrl}/download_image/${event?.photo}`}
                />
                <div className="p-2">
                  <label>Name</label>
                  <input
                    type="text"
                    id="name"
                    className="input-box"
                    autoComplete="off"
                    defaultValue={event?.name ? event?.name : ""}
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
                  editPhoto={`${originUrl}/download_image/${event?.layout_photo}`}
                />
                <div className="p-2">
                  <label>Walk In Price</label>
                  <input
                    type="number"
                    id="walk_in_price"
                    className="input-box"
                    autoComplete="off"
                    defaultValue={
                      event?.walk_in_price ? event?.walk_in_price : ""
                    }
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
                    defaultValue={event?.set_id ? event?.set_id : ""}
                  >
                    <option value="">Select a set</option>
                    {sets?.map((set, index) => {
                      return (
                        <option
                          selected={set.id === event?.set_id}
                          key={index}
                          value={set.id}
                        >
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
      ) : (
        <div className="flex justify-center items-center">
          <Loading height="h-28" width="w-28" />
        </div>
      )}
    </>
  );
}

export default EditForm;
