import { Booking, Table } from "@/utils/types";
import AvailableTableForm from "./AvailableTableForm";
import PendingTableForm from "./PendingTableForm";
import ConfirmedTableForm from "./ConfirmedTableForm";

type Props = {
  currentBooking: Booking | undefined;
  selectedTable: Table | undefined;
  setOpen: (value: boolean) => void;
};

function BookingHandleForm({ currentBooking, selectedTable, setOpen }: Props) {
  const isAvailableTable =
    !currentBooking && selectedTable?.booking_status === "available";
  const isPendingTable =
    currentBooking &&
    currentBooking.event_table.booking_status === "pending" &&
    selectedTable?.booking_status === "pending";
  const isConfirmedTable =
    currentBooking &&
    currentBooking.event_table.booking_status === "confirmed" &&
    selectedTable?.booking_status === "confirmed";

  return (
    <>
      {isAvailableTable ? (
        <AvailableTableForm
          currentBooking={currentBooking}
          setOpen={setOpen}
          selectedTable={selectedTable}
        />
      ) : null}
      {isPendingTable ? (
        <PendingTableForm
          currentBooking={currentBooking}
          setOpen={setOpen}
          selectedTable={selectedTable}
        />
      ) : null}
      {isConfirmedTable ? (
        <ConfirmedTableForm
          currentBooking={currentBooking}
          setOpen={setOpen}
          selectedTable={selectedTable}
        />
      ) : null}
    </>
  );
}

export default BookingHandleForm;
