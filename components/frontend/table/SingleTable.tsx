import { Table } from "@/utils/types";
import Link from "next/link";

type TableProps = {
  table: Table;
  selectedTable: Table | undefined;
  setSelectedTable: (value: Table | undefined) => void;
};
function SingleTable({ table, selectedTable, setSelectedTable }: TableProps) {
  const isSelected = selectedTable?.id === table.id;
  const isAvailable = table?.booking_status == "available";
  const isBooked = table?.booking_status == "confirmed";
  const isPending = table?.booking_status == "pending";

  return (
    <>
      <Link href="#table-detail" passHref>
        <div
          onClick={() => setSelectedTable(table)}
          className={`w-32 h-12 shadow-md border  m-2 rounded-md cursor-pointer text-sm flex justify-center items-center 
            ${isBooked ? "bg-red-300" : ""}
            ${isPending ? "bg-yellow-300" : ""}
            ${isSelected ? "bg-gray-200" : ""}
          `}
        >
          <span className="text-center text-gray-600">{table.name}</span>
        </div>
      </Link>
    </>
  );
}

export default SingleTable;
