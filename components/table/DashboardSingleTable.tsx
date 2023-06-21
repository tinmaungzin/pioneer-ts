import { Table } from "@/utils/types";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useFetchByPost } from "@/hooks/useFetchByPost";
import BookingHandleForm from "./forms/BookingHandleForm";

type Props = {
  table: Table;
  selectedTable: Table | undefined;
  setSelectedTable: (value: Table | undefined) => void;
};
function DashboardSingleTable({
  table,
  selectedTable,
  setSelectedTable,
}: Props) {
  const fetchBookingMutation = useFetchByPost("staff/bookingByEventTableId");

  const [openTableDialog, setOpenTableDialog] = useState<boolean>(false);
  const [currentBooking, setCurrentBooking] = useState();
  const isSelected = table.id === selectedTable?.id;
  const isAvailable = table?.booking_status == "available";
  const isBooked = table?.booking_status == "confirmed";
  const isPending = table?.booking_status == "pending";

  const handleBookingFetch = async (table: Table) => {
    const data = await fetchBookingMutation.mutateAsync({
      event_table_id: table?.event_table_id,
    });
    setCurrentBooking(data.booking);
  };

  useEffect(() => {
    setCurrentBooking(undefined);
  }, [openTableDialog]);

  return (
    <>
      <div
        onClick={() => {
          setSelectedTable(table);
          setOpenTableDialog(true);
          if (!(table?.booking_status === "available")) {
            handleBookingFetch(table);
          }
        }}
        className={`bg-gray-300 p-8 rounded flex justify-center items-center cursor-pointer 
        ${isBooked ? "bg-red-300" : ""}
        ${isPending ? "bg-yellow-300" : ""} 
        ${isSelected ? "bg-gray-400" : ""} 
        `}
      >
        <p className=" text-gray-600">{table.name}</p>
      </div>
      <Dialog open={openTableDialog} onOpenChange={setOpenTableDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <p className="text-center">
              {selectedTable?.name} is{" "}
              <span className="uppercase font-semibold">
                {selectedTable?.booking_status}
              </span>{" "}
            </p>
            <BookingHandleForm
              selectedTable={selectedTable}
              currentBooking={currentBooking}
              setOpen={setOpenTableDialog}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DashboardSingleTable;
