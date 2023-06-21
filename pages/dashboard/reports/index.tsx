import { DataTableWithDefaultPagination } from "@/components/data-table/data-table-with-default-pagination";
import Layout from "@/components/layout/dashboard/Layout";
import TableHeader from "@/components/report/TableHeader";
import { columns } from "@/components/report/columns";
import { useFetchByPost } from "@/hooks/useFetchByPost";
import { Booking, User } from "@/utils/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function ReportIndex() {
  const { data: session } = useSession();
  const user = session?.user as User;

  const [eventId, setEventId] = useState<number | string | undefined>("all");
  const [month, setMonth] = useState<string | undefined>("all");
  const [year, setYear] = useState<string | undefined>("all");

  const bookingsByUser: any = useFetchByPost(
    `staff/bookingsForReport?event_id=${eventId}&month=${month}&year=${year}`
  );

  const [bookings, setBookings] = useState<Booking[] | undefined>();
  const [total, setTotal] = useState<number | undefined>();

  useEffect(() => {
    const fetchBookings = async () => {
      const data = await bookingsByUser.mutateAsync({});
      setBookings(data.bookings);
      setTotal(data.total);
    };
    fetchBookings();
  }, [eventId, month, year, user?.token]);


  return (
    <>
      <Layout>
        <div className="container mx-auto py-10">
          <DataTableWithDefaultPagination
            columns={columns}
            data={bookings}
            tableHeader={
              <TableHeader
                setEventId={setEventId}
                setMonth={setMonth}
                setYear={setYear}
                total={total}
                eventId={eventId}
                month={month}
                year={year}
              />
            }
          />
        </div>
      </Layout>
    </>
  );
}

export default ReportIndex;
