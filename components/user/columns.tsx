import { User } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Actions from "./action";
import AvailabilityForm from "./forms/AvailabilityForm";

export const columns: ColumnDef<User>[] = [
  {
    id: "no",
    header: "No.",
    cell: ({ row }) => {
      return <p>{row.original.rowNumber}</p>;
    },
  },

  {
    accessorKey: "phone_number",
    header: "Phone Number",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "is_archived",
    header: "Banned",
    cell: ({ row }) => {
      return (
        <AvailabilityForm editData={row.original} />
      );
    },
  },
];
