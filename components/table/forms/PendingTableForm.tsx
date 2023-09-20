import { useToast } from "@/components/ui/use-toast";
import { SocketContext } from "@/context/socket";
import { usePostModel } from "@/hooks/usePostModel";
import { handleError, handleSuccess } from "@/utils/helpers/mutationHandlers";
import { Booking, Table } from "@/utils/types";
import Image from "next/image";
import { useContext, useState } from "react";

type Props = {
  currentBooking: Booking | undefined;
  selectedTable: Table | undefined;
  setOpen: (value: boolean) => void;
};

function PendingTableForm({
  currentBooking,
  selectedTable,
  setOpen,
}: Props) {
  const socket = useContext(SocketContext);
  const originUrl = process.env.NEXT_PUBLIC_ORIGIN_URL;
  const { toast } = useToast();
  const [adminNote, setAdminNote] = useState("")
  const updateBooking = usePostModel(
    "staff/bookings/" + currentBooking?.id,
    "available_events",
    "PUT"
  );

  const handleConfirm = async () => {

    let data = {
      id: currentBooking?.id,
      event_table_id: currentBooking?.event_table_id,
      booking_status: "confirmed",
      admin_note: adminNote
    };

    updateBooking.mutate(data, {
      onSuccess: (message) => {
        handleSuccess(message, setOpen, toast);
        socket.emit("event-update", {
          text: "event confirm",
        });
      },
      onError: (error) => handleError(error, toast),
    });

  };

  const handleReject = () => {
    let data = {
      id: currentBooking?.id,
      event_table_id: currentBooking?.event_table_id,
      booking_status: "available",
      admin_note: adminNote
    };
    updateBooking.mutate(data, {
      onSuccess: (message) => {
        handleSuccess(message, setOpen, toast);
        socket.emit("event-update", {
          text: "event reject",
        });
      },
      onError: (error) => handleError(error, toast),
    });
  };

  return (
    <>
      <div>
        <table className="mx-auto my-2 mb-4" id="table-detail">
          <tbody className="text-sm">
            <tr>
              <td className="text-right pr-2 py-1 text-black">Booker name:</td>
              <td className="text-left pl-2 text-gray-600 ">
                {currentBooking?.user?.name
                  ? currentBooking?.user?.name
                  : currentBooking?.name}
              </td>
            </tr>
            <tr>
              <td className="text-right pr-2 py-1 text-black">
                Booker Phone number:
              </td>
              <td className="text-left pl-2 text-gray-600 ">
                {currentBooking?.user?.phone_number
                  ? currentBooking?.user?.phone_number
                  : currentBooking?.phone_number}
              </td>
            </tr>
            <tr>
              <td className="text-right pr-2 py-1 text-black">Note:</td>
              <td className="text-left pl-2 text-gray-600 ">
                {currentBooking?.note}
              </td>
            </tr>
          </tbody>
        </table>
        <div>
            <label>Note By Admin</label>
            <textarea
              id="note"
              className="input-box"
              onChange={(e) => setAdminNote(e.target.value)}
            >{adminNote}</textarea>
            
          </div>
        <p className="text-center text-sm text-gray-600 py-2">Payment Proof</p>
        <Image
          className=" h-72 object-contain "
          src={`${originUrl}/download_image/${currentBooking?.photo}`}
          alt="payment proof"
          width={500}
          height={300}
        />
        <div className="flex flex-row justify-center mt-6">
          <button
            onClick={handleConfirm}
            className="mx-2 py-1 px-4 text-center text-white bg-green-400 border border-green-400 rounded-md hover:bg-transparent hover:text-black transition font-medium disabled:cursor-not-allowed "
          >
            Confirm
          </button>
          <button
            onClick={handleReject}
            className="mx-2 py-1 px-4 text-center text-white bg-red-400 border border-red-400 rounded-md hover:bg-transparent hover:text-black transition font-medium disabled:cursor-not-allowed "
          >
            Reject
          </button>
          <button
            onClick={() => setOpen(false)}
            className="mx-2 py-1 px-4 text-center text-black bg-transparent border border-black rounded-md hover:bg-black hover:text-white transition font-medium "
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default PendingTableForm;
