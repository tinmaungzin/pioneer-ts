import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Event, Table, Type } from "@/utils/types";
import SingleTable from "./SingleTable";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type TableTabProps = {
  event: Event | undefined;
  selectedTable: Table | undefined;
  setSelectedTable: (value: Table | undefined) => void;
};
function TableTabs({ event, selectedTable, setSelectedTable }: TableTabProps) {
  const types: Type[] = [];
  const type_names: string[] = [];

  event?.tables.forEach((table) => {
    if (!type_names.includes(table.type.name)) {
      type_names.push(table.type.name);
      types.push(table.type);
    }
  });

  return (
    <>
      <div className="py-6 flex justify-center">
        {types.length ? (
          <Tabs
            defaultValue={String(types[0]?.id)}
            className="flex flex-col justify-center"
          >
            <TabsList>
              {types.map((type, index) => {
                return (
                  <TabsTrigger
                    onClick={() => setSelectedTable(undefined)}
                    className="bg-gray-200 w-20 border-r rounded-none border-gray-400"
                    key={index}
                    value={String(type.id)}
                  >
                    {type.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            <Popover>
              <PopoverTrigger>
                <div className="flex justify-center mt-4">
                  <i className="fa-solid fa-circle-info text-xl"></i>
                </div>
              </PopoverTrigger>
              <PopoverContent className="bg-white">
                <div className="text-gray-600 text-sm">
                  <div className="flex items-center">
                    <div className="bg-gray-100 w-4 h-4 rounded-full border mx-2"></div>
                    <p>Available tables(can book)</p>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-yellow-300 w-4 h-4 rounded-full border mx-2"></div>
                    <p>Pending tables(can check later)</p>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-red-300 w-4 h-4 rounded-full border mx-2"></div>
                    <p>Booked tables(cannot book)</p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {types.map((type, index) => {
              return (
                <TabsContent
                  value={String(type.id)}
                  key={index}
                  className="grid grid-cols-2 md:grid-cols-4"
                >
                  {event?.tables.map((table, index) => {
                    if (type.id === table.type.id) {
                      return (
                        <div key={index}>
                          <SingleTable
                            table={table}
                            selectedTable={selectedTable}
                            setSelectedTable={setSelectedTable}
                          />
                        </div>
                      );
                    }
                    return null;
                  })}
                </TabsContent>
              );
            })}
          </Tabs>
        ) : null}
      </div>
    </>
  );
}

export default TableTabs;
