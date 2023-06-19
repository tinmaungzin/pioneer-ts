import { Type } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Actions from "./action";
import AvailabilityForm from "./forms/AvailabilityForm";

export const columns: ColumnDef<Type>[] = [
  {
    id: "no",
    header: "No.",
    cell: ({ row }) => {
      return <p>{row.original.rowNumber}</p>;
    },
  },

  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "allowed_people",
    header: "Allowed people",
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
          <Actions type={row.original} />
        </>
      );
    },
  },
];
