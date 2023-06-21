import { DataTableWithDefaultPagination } from "@/components/data-table/data-table-with-default-pagination";
import Layout from "@/components/layout/dashboard/Layout";
import TableHeader from "@/components/user/bookings/TableHeader";
import { columns } from "@/components/user/bookings/columns";
import { useFetchByPost } from "@/hooks/useFetchByPost";
import { Booking, User } from "@/utils/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function UserBooking() {
  const router = useRouter();
  const { query } = router;
  const { id } = query;
  const { data: session } = useSession();
  const user = session?.user as User;

  const bookingsByUser = useFetchByPost(`all/bookingByUserId?type=all`);

  const [bookings, setBookings] = useState<Booking[] | undefined>();
  const [total, setTotal] = useState<number | undefined>();

  useEffect(() => {
    const fetchBookings = async () => {
      const data = await bookingsByUser.mutateAsync({
        user_id: id,
      });
      setBookings(data.bookings);
      setTotal(data.total);
    };
    fetchBookings();
  }, [user?.token, id]);


  return (
    <>
      <Layout>
        <div className="container mx-auto py-10">
          <DataTableWithDefaultPagination
            columns={columns}
            data={bookings}
            tableHeader={<TableHeader total={total} />}
          />
        </div>
      </Layout>
    </>
  );
}

export default UserBooking;
