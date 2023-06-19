import { Package } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Actions from "./action";

export const columns: ColumnDef<Package>[] = [
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
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      return <p>{row.original.type.name}</p>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <>
          <Actions pakage={row.original} />
        </>
      );
    },
  },
];
