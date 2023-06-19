import { Switch } from "@/components/ui/switch";
import TableSelector from "./TableSelector";
import { useEffect, useState } from "react";
import { useFetchAllModel } from "@/hooks/useFetchAllModel";
import { Table, Type } from "@/utils/types";

type TableFormProps = {
  selectedTables: (number | undefined)[];
  setSelectedTables: (value: (number | undefined)[]) => void;
  tableError: string | undefined;
};

function TableForm({ selectedTables, setSelectedTables, tableError }: TableFormProps) {
  const [selectAll, setSelectAll] = useState(false);
  const { models: types } = useFetchAllModel<Type[]>("all_types", "types");
  const { models: tables } = useFetchAllModel<Table[]>(
    "admin/all_tables",
    "tables"
  );

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);

    if (!selectAll) {
      const tableIds = tables
        ?.filter((table) => table.type.is_available)
        .map((table) => table.id) as (number | undefined)[];
      setSelectedTables(tableIds);
    } else {
      setSelectedTables([]);
    }
  };
  useEffect(() => {
    setSelectAll(
      selectedTables?.length ===
        tables?.filter((table) => table.type.is_available).length
    );
  }, [selectedTables, tables]);

  return (
    <>
      <div className="pt-4">
        <div className="px-32 py-4 flex justify-between">
          <div className="flex items-center space-x-3">
            <p className="text-xl font-medium">Tables</p>
            {tableError && (
              <span className="text-red-500 text-xs">{tableError}</span>
            )}
          </div>
          <div className="mt-1">
            <Switch
              checked={selectAll}
              onCheckedChange={handleSelectAllChange}
              className="bg-gray-400 mr-2"
            />
            <span>Select all tables</span>
          </div>
        </div>
        {types?.map((type) => {
          const filteredTables = tables?.filter(
            (table) => table.type.id === type.id && type.is_available
          );
          if (filteredTables?.length === 0) {
            return null;
          }

          return (
            <div key={type.id} className="col-span-6 py-4 ">
              <h2 className="text-base  px-32 pb-4">{type.name}</h2>
              <div className="grid grid-cols-5 xl:grid-cols-8 gap-4  mx-32 ">
                {filteredTables?.map((table, index) => (
                  <TableSelector
                    table={table}
                    isChecked={selectedTables?.includes(table?.id)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const isChecked = e.target.checked;
                      const tableId = table?.id;
                      setSelectedTables(
                        isChecked
                          ? [...selectedTables, tableId]
                          : selectedTables.filter((table) => table !== tableId)
                      );
                    }}
                    key={index}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default TableForm;
