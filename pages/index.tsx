import HomeSkeleton from "@/components/frontend/HomeSkeleton";
import Slider from "@/components/frontend/Slider";
import SelectedTableInfo from "@/components/frontend/table/SelectedTableInfo";
import TableTabs from "@/components/frontend/table/TableTabs";
import Layout from "@/components/layout/front/Layout";
import { SocketContext } from "@/context/socket";
import { useFetchAllModel } from "@/hooks/useFetchAllModel";
import { Event, Table, User } from "@/utils/types";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const socket = useContext(SocketContext);

  const { models: events, isLoading } = useFetchAllModel<Event[]>(
    "available_events",
    "events"
  );
  const queryClient = useQueryClient();

  const [activeImageIndex, setActiveImageIndex] = useState<
    number | undefined
  >();
  const [activeEvent, setActiveEvent] = useState<Event | undefined>();
  const [selectedTable, setSelectedTable] = useState<Table | undefined>();

  useEffect(() => {
    socket.on("event-receive", async (data: any) => {
      queryClient.invalidateQueries(["events"]);
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
            <p className="text-center text-4xl font-semibold py-1">
              {activeEvent?.name}
            </p>
            <p className="text-center text-xl font-semibold py-1">
              {activeEvent?.date
                ? format(new Date(activeEvent?.date), "EEEE")
                : ""}
            </p>
            <p className="text-center text-xl font-semibold py-1">
              {activeEvent?.date
                ? format(new Date(activeEvent?.date), "dd MMM yyyy")
                : ""}
            </p>
          </div>
          <TableTabs
            event={activeEvent}
            selectedTable={selectedTable}
            setSelectedTable={setSelectedTable}
          />
          <SelectedTableInfo selectedTable={selectedTable} />
        </div>
      )}
    </Layout>
  );
}
