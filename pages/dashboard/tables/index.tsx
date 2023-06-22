import TableInfoTooltip from "@/components/util/TableInfoTooltip";
import Layout from "@/components/layout/dashboard/Layout";
import DashboardSingleTable from "@/components/table/DashboardSingleTable";
import { useFetchAllModel } from "@/hooks/useFetchAllModel";
import { Event, Table, Type } from "@/utils/types";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

function TableIndex({ socket }: any) {
  const { models: events } = useFetchAllModel<Event[]>(
    "available_events",
    "events",
    "available_events"
  );
  const queryClient = useQueryClient();

  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();
  const [selectedTable, setSelectedTable] = useState<Table | undefined>();

  useEffect(() => {
    socket.on("event-receive", async (data: any) => {
      queryClient.invalidateQueries(["available_events"]);
    });
  }, [queryClient, socket]);

  useEffect(() => {
    if (events?.length) {
      const newSelectedEvent = events.filter(
        (event) => event.id === selectedEvent?.id
      );
      setSelectedEvent(newSelectedEvent[0]);
    }
  }, [events, selectedEvent?.id]);

  const types: Type[] = [];
  const type_names: string[] = [];

  selectedEvent?.tables.forEach((table) => {
    if (!type_names.includes(table.type.name)) {
      type_names.push(table.type.name);
      types.push(table.type);
    }
  });

  return (
    <>
      <Layout>
        <div className="flex p-6">
          <div className="w-48 h-96">
            <p className=" text-lg pb-8 mt-4">Events</p>
            <ul>
              {events?.map((event, index) => {
                const isSelected = event.id === selectedEvent?.id;
                return (
                  <li
                    className={`bg-gray-100 text-gray-600 hover:text-gray-900 my-2 py-2 rounded text-center cursor-pointer ${
                      isSelected ? "text-black font-semibold bg-gray-200" : ""
                    }`}
                    key={index}
                    onClick={() => setSelectedEvent(event)}
                  >
                    {event.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <div className="px-32 pb-8 flex items-center">
              <p className="mr-4 mt-4 text-lg">Tables</p>
              <TableInfoTooltip />
            </div>
            {types?.map((type) => {
              return (
                <div key={type.id} className="col-span-6 py-4 ">
                  <h2 className="text-base  px-32 pb-4">{type.name}</h2>
                  <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4  mx-32 ">
                    {selectedEvent?.tables.map((table, index) => {
                      if (table.type.id === type.id) {
                        return (
                          <DashboardSingleTable
                            table={table}
                            selectedTable={selectedTable}
                            setSelectedTable={setSelectedTable}
                            key={index}
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default TableIndex;
