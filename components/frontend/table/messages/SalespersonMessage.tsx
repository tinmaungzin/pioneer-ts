import { Table } from "@/utils/types";

type Props = {
  selectedTable: Table | undefined;
};

function SalespersonMessage({ selectedTable }: Props) {
  return (
    <>
      <div className="py-4">
        <p className="text-center">Table price is {selectedTable?.price}MMK</p>
      </div>
    </>
  );
}

export default SalespersonMessage;
