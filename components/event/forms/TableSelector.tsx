import { Table } from "@/utils/types";

type TableSelectorProps = {
  table: Table;
  isChecked: boolean | undefined;
  onChange: any;
};

const TableSelector = ({ table, isChecked, onChange }: TableSelectorProps) => {
  return (
    <label
      className={`rounded-md h-24 ${
        isChecked ? "bg-green-400" : "bg-gray-200"
      } cursor-pointer `}
    >
      <div className="text-xl flex justify-end p-2 ">
        <input type="checkbox" onChange={onChange} checked={isChecked} hidden />
        {isChecked ? (
          <i className="fa-solid fa-circle-minus text-gray-700"></i>
        ) : (
          <i className="fa-solid fa-circle-check text-gray-700"></i>
        )}
      </div>
      <div className="w-full h-100 flex items-center justify-center text-sm text-gray-500">
        {table.name}
      </div>
    </label>
    
  );
};

export default TableSelector;
