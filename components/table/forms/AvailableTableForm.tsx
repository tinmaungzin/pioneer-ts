import { Booking, Table } from "@/utils/types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { usePostModel } from "@/hooks/usePostModel";
import { useToast } from "@/components/ui/use-toast";
import { handleError, handleSuccess } from "@/utils/helpers/mutationHandlers";
import { useContext } from "react";
import { SocketContext } from "@/context/socket";

type Props = {
  currentBooking: Booking | undefined;
  selectedTable: Table | undefined;
  setOpen: (value: boolean) => void;
};

const schema = yup
  .object({
    name: yup.string().required("Name field is required"),
    phone_number: yup.string().required("Phone number field is required"),
    note: yup.string().optional(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

function AvailableTableForm({ currentBooking, selectedTable, setOpen }: Props) {
  const socket = useContext(SocketContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver<FormData>(schema),
  });
  const { toast } = useToast();
  const bookTable = usePostModel("staff/bookings", "events", "POST");

  const handleBook = (data: FormData) => {
    const newData = { ...data } as Booking;
    newData.event_table_id = selectedTable?.event_table_id;
    newData.booking_status = "confirmed";
    bookTable.mutate(newData, {
      onSuccess: (message) => {
        handleSuccess(message, setOpen, toast)
        socket.emit("event-update", {
          text: "event available",
        });
      } ,
      onError: (error) => handleError(error, toast),
    });
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(handleBook)}>
          <div>
            <label>Name</label>
            <input
              type="text"
              id="name"
              className="input-box"
              defaultValue=""
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
              className="input-box"
              defaultValue=""
              {...register("phone_number")}
            />
            {errors.phone_number && (
              <span className="text-red-500 text-xs">
                {errors.phone_number?.message}
              </span>
            )}
          </div>
          <div>
            <label>Note</label>
            <textarea
              id="note"
              className="input-box"
              defaultValue=""
              {...register("note")}
            ></textarea>
            {errors.note && (
              <span className="text-red-500 text-xs">
                {errors.note?.message}
              </span>
            )}
          </div>
          <div className="flex flex-row justify-center mt-4">
            <button
              type="submit"
              className="mx-2 py-1 px-4 text-center text-white bg-black border border-black rounded-md hover:bg-transparent hover:text-black transition font-medium disabled:cursor-not-allowed "
            >
              Book
            </button>
            <button
              onClick={() => setOpen(false)}
              className="mx-2 py-1 px-4 text-center text-black bg-transparent border border-black rounded-md hover:bg-black hover:text-white transition font-medium "
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AvailableTableForm;
