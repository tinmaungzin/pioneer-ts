import HomeSkeleton from "@/components/frontend/HomeSkeleton";
import Slider from "@/components/frontend/Slider";
import SelectedTableInfo from "@/components/frontend/table/SelectedTableInfo";
import TableTabs from "@/components/frontend/table/TableTabs";
import Layout from "@/components/layout/front/Layout";
import { SocketContext } from "@/context/socket";
import { useFetchAllModel } from "@/hooks/useFetchAllModel";
import { Event, Table } from "@/utils/types";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

import EventInfo from "@/components/frontend/event/EventInfo";

export default function Home() {
  const socket = useContext(SocketContext);
  const { models: events, isLoading } = useFetchAllModel<Event[]>(
    "available_events",
    "events",
    "available_events"
  );
  const queryClient = useQueryClient();

  const [activeImageIndex, setActiveImageIndex] = useState<number | undefined>(
    0
  );
  const [activeEvent, setActiveEvent] = useState<Event | undefined>();
  const [selectedTable, setSelectedTable] = useState<Table | undefined>();

  useEffect(() => {
    socket.on("event-receive", async (data: any) => {
      queryClient.invalidateQueries(["available_events"]);
    });
  }, [queryClient, socket]);

  useEffect(() => {
    if (events && events.length && activeImageIndex !== undefined) {
      setActiveEvent(events[activeImageIndex]);
    }
  }, [activeImageIndex, events]);

  useEffect(() => {
    setSelectedTable(undefined);
  }, [activeEvent]);

  return (
    <Layout>
      {isLoading ? (
        <HomeSkeleton />
      ) : (
        <div>
          <Slider events={events} setActiveImageIndex={setActiveImageIndex} />
          <div>
            <EventInfo activeEvent={activeEvent} />
            <div className="grid grid-cols-1 lg:grid-cols-1 mt-6 gap-4">
              <div className="flex justify-center">
                <TableTabs
                  event={activeEvent}
                  selectedTable={selectedTable}
                  setSelectedTable={setSelectedTable}
                />
              </div>
              <div className="flex justify-center">
                <SelectedTableInfo selectedTable={selectedTable} />
              </div>
            </div>
          </div>
        </div>
      )}
      {!isLoading && !events?.length ? (
        <div className="flex justify-center items-center flex-col">
          <p>No event at that moment!</p>
          <p
            className="bg-gray-300 my-8 p-4 rounded cursor-pointer hover:bg-gray-400"
            onClick={() => window.location.reload()}
          >
            Refresh
          </p>
        </div>
      ) : null}
    </Layout>
  );
}
