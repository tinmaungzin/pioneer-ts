import { Event } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Actions from "./action";
import AvailabilityForm from "./forms/AvailabilityForm";

export const columns: ColumnDef<Event>[] = [
  {
    id: "no",
    header: "No.",
    cell: ({ row }) => {
      return <p>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "walk_in_price",
    header: "Walk In Price",
  },
  {
    accessorKey: "is_available",
    header: "Availability",
    cell: ({ row }) => {
      return (
        <AvailabilityForm editData={row.original} />
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <>
          <Actions event={row.original} />
        </>
      );
    },
  },
];
