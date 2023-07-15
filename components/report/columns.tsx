import { Booking } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import ReactToPrint from "react-to-print";
import Invoice from "@/components/util/Invoice";
import { useRef } from "react";

const Print: React.FC<{ row: any }> = ({ row }) => {
  const invoiceRef = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <ReactToPrint
        trigger={() => (
          <p className="text-center underline cursor-pointer text-sm">
            Print invoice
          </p>
        )}
        content={() => (invoiceRef?.current ? invoiceRef.current : null)}
      />
      <div className="hidden">
        <Invoice ref={invoiceRef} currentBooking={row.original} />
      </div>
    </div>
  );
};

export const columns: ColumnDef<Booking>[] = [
  {
    id: "no",
    header: "No.",
    cell: ({ row }) => {
      return <p>{row.index + 1}</p>;
    },
  },

  {
    accessorKey: "event_table.event.name",
    header: "Event",
  },
  {
    accessorKey: "event_table.table.name",
    header: "Table",
  },
  {
    accessorKey: "event_table.event.date",
    header: "Date",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    header: "Action",
    cell: Print
   
  },
];
