import Slider from "@/components/frontend/Slider";
import SelectedTableInfo from "@/components/frontend/table/SelectedTableInfo";
import TableTabs from "@/components/frontend/table/TableTabs";
import Layout from "@/components/layout/front/Layout";
import { useFetchAllModel } from "@/hooks/useFetchAllModel";
import { Event, Table } from "@/utils/types";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function Home() {
  const {
    models: events,
    isLoading,
    isFetching,
    error,
  } = useFetchAllModel<Event[]>("available_events", "events");
  const [activeImageIndex, setActiveImageIndex] = useState<
    number | undefined
  >();
  const [activeEvent, setActiveEvent] = useState<Event | undefined>();
  const [selectedTable, setSelectedTable] = useState<Table | undefined>();

  useEffect(() => {
    if (events && events.length && activeImageIndex !== undefined) {
      setActiveEvent(events[activeImageIndex]);
    }
  }, [activeImageIndex, events]);
  useEffect(() => {
    setSelectedTable(undefined)
  }, [activeEvent])

  return (
    <Layout>
      <Slider events={events} setActiveImageIndex={setActiveImageIndex} />
      <div>
        <p className="text-center text-4xl font-semibold py-1">
          {activeEvent?.name}
        </p>
        <p className="text-center text-xl font-semibold py-1">
          {activeEvent?.date ? format(new Date(activeEvent?.date), "EEEE") : ""}
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
    </Layout>
  );
}
