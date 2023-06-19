import { PointItem } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Actions from "./action";

export const columns: ColumnDef<PointItem>[] = [
  {
    id: "no",
    header: "No.",
    cell: ({ row }) => {
      return <p>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "point",
    header: "Point",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <>
          <Actions point_item={row.original} />
        </>
      );
    },
  },
];
