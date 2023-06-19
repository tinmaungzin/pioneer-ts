import { Set } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Actions from "./action";

export const columns: ColumnDef<Set>[] = [
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
    id: "actions",
    cell: ({ row }) => {
      return (
        <>
          <Actions set={row.original} />
        </>
      );
    },
  },
];
