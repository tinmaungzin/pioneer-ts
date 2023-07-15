import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import Invoice from "@/components/util/Invoice";
import { SocketContext } from "@/context/socket";
import { usePostModel } from "@/hooks/usePostModel";
import { handleError, handleSuccess } from "@/utils/helpers/mutationHandlers";
import { Booking, Table } from "@/utils/types";
import { useContext, useRef, useState } from "react";
import ReactToPrint from "react-to-print";

type Props = {
  currentBooking: Booking | undefined;
  selectedTable: Table | undefined;
  setOpen: (value: boolean) => void;
};
function ConfirmedTableForm({ currentBooking, selectedTable, setOpen }: Props) {
  const socket = useContext(SocketContext);
  const invoiceRef = useRef<HTMLDivElement | null>(null);

  const [customerLeft, setCustomerLeft] = useState<boolean>(false);
  const { toast } = useToast();
  const updateBooking = usePostModel(
    "staff/bookings/" + currentBooking?.id,
    "available_events",
    "PUT"
  );

  const handleClear = () => {
    let data = {
      id: currentBooking?.id,
      event_table_id: currentBooking?.event_table_id,
      booking_status: "available",
      customers_left: !!customerLeft,
    };
    updateBooking.mutate(data, {
      onSuccess: (message) => {
        handleSuccess(message, setOpen, toast);
        socket.emit("event-update", {
          text: "event confirmed",
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
                {currentBooking?.name
                  ? currentBooking?.name
                  : currentBooking?.user?.name}
              </td>
            </tr>

            <tr>
              <td className="text-right pr-2 py-1 text-black">
                Booker Phone number:
              </td>
              <td className="text-left pl-2 text-gray-600 ">
                {currentBooking?.phone_number
                  ? currentBooking?.phone_number
                  : currentBooking?.user?.phone_number}
              </td>
            </tr>
            {currentBooking?.user && currentBooking?.user.user_type_id === 2 ? (
              <tr>
                <td className="text-right pr-2 py-1 text-black">
                  Salesperson:
                </td>
                <td className="text-left pl-2 text-gray-600 ">
                  {currentBooking?.user?.name}
                </td>
              </tr>
            ) : null}
            <tr>
              <td className="text-right pr-2 py-1 text-black">Note:</td>
              <td className="text-left pl-2 text-gray-600 ">
                {currentBooking?.note}
              </td>
            </tr>
          </tbody>
        </table>
        <ReactToPrint
          trigger={() => (
            <p className="text-center underline cursor-pointer text-sm">
              Print invoice
            </p>
          )}
          content={() => (invoiceRef?.current ? invoiceRef.current : null)}
        />
        <div className="hidden">
          <Invoice ref={invoiceRef} currentBooking={currentBooking} />
        </div>

        <div className="my-8 flex justify-center">
          <Switch
            checked={customerLeft}
            onCheckedChange={() => setCustomerLeft(!customerLeft)}
            className="bg-gray-400 mr-2"
          />
          <span>Customers left</span>
        </div>
        <div className="flex flex-row justify-center mt-6">
          <button
            onClick={handleClear}
            className="mx-2 py-1 px-4 text-center text-white bg-black border-black rounded-md hover:bg-transparent hover:text-black transition font-medium disabled:cursor-not-allowed "
          >
            Clear Booking
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

export default ConfirmedTableForm;
