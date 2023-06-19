import { TableSet } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TableSet>[] = [
  {
    id: "no",
    header: "No.",
    cell: ({ row }) => {
      return <p>{row.index + 1}</p>;
    },
  },

  {
    accessorKey: "type_name",
    header: "Type",
  },
  {
    accessorKey: "table_count",
    header: "Table Count",
  },
];
