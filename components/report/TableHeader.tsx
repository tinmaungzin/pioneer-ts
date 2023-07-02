import { useFetchAllModel } from "@/hooks/useFetchAllModel";
import { Event } from "@/utils/types";

const months = [
  { id: "01", name: "January" },
  { id: "02", name: "February" },
  { id: "03", name: "March" },
  { id: "04", name: "April" },
  { id: "05", name: "May" },
  { id: "06", name: "June" },
  { id: "07", name: "July" },
  { id: "08", name: "August" },
  { id: "09", name: "September" },
  { id: "10", name: "October" },
  { id: "11", name: "November" },
  { id: "12", name: "December" },
];

const years = [
  { id: "2022", name: "2022" },
  { id: "2023", name: "2023" },
  { id: "2024", name: "2024" },
  { id: "2025", name: "2025" },
];

type TableHeaderProps = {
  total: number | undefined;
  eventId: number | string | undefined;
  month: string | undefined;
  year: string | undefined;
  setEventId: (value: number | string | undefined) => void;
  setMonth: (value: string | undefined) => void;
  setYear: (value: string | undefined) => void;
};
function TableHeader({
  total,
  setEventId,
  setMonth,
  setYear,
  eventId,
  month,
  year
}: TableHeaderProps) {
  const { models: events } = useFetchAllModel<Event[]>("staff/all_events", "events", "all_events");
  return (
    <>
      <div className=" items-center px-4 py-4">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold">Reports </h2>

          <h2 className="text-lg font-semibold">
            Money spent : {total ? total : 0} MMK
          </h2>
        </div>

        <div className="flex my-4 items-center">
          <div className="mr-4">
            <select
              id="event_id"
              className="input-box"
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
            >
              <option value="all">All</option>
              {events?.map((event, index) => {
                return (
                  <option key={index} value={event.id}>
                    {event.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mr-4">
            <select
              id="month"
              className="input-box"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="all">All</option>
              {months?.map((month, index) => {
                return (
                  <option key={index} value={month.id}>
                    {month.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mr-4">
            <select
              id="year"
              className="input-box"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="all">All</option>
              {years?.map((year, index) => {
                return (
                  <option key={index} value={year.id}>
                    {year.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => {
              setEventId("all");
              setMonth("all");
              setYear("all");
            }}
          >
            Reset filters
          </div>
        </div>
      </div>
    </>
  );
}

export default TableHeader;
