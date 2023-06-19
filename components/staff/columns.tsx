import { Staff } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Actions from "./action";

export const columns: ColumnDef<Staff>[] = [
  {
    id: "no",
    header: "No.",
    cell: ({ row }) => {
      return <p>{row.original.rowNumber}</p>
    },
  },

  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const name =
        row.original.staff_type_id === 1 ? "admins" : "receptionists";
      const title = row.original.staff_type_id === 1 ? "admin" : "receptionist";
      return (
        <>
          <Actions staff={row.original} name={name} title={title} />
        </>
      );
    },
  },
];
