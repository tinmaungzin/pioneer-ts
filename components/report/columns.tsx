import { Booking } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";

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
];
