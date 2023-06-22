import { useFetchByPost } from "@/hooks/useFetchByPost";
import { useFetchOneModel } from "@/hooks/useFetchOneModel";
import { Booking, User } from "@/utils/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function BookingHistory() {
  const { data: session, status } = useSession();
  const user = session?.user as User;
  const { model: auth_user } = useFetchOneModel<User>("all", "one_user");

  const bookingsByUser = useFetchByPost(`all/bookingByUserId?type=all`);

  const [bookings, setBookings] = useState<Booking[] | undefined>();

  useEffect(() => {
    const fetchBookings = async () => {
      const data = await bookingsByUser.mutateAsync({
        user_id: user?.id,
      });
      setBookings(data.bookings);
    };
    fetchBookings();
  }, [user]);

  return (
    <>
      <div className="my-12">
        <div>
          <p className="text-center text-lg font-semibold">Booking History</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 item-center mt-8">
          {bookings?.map((booking, index) => {
            return (
              <div key={index} className="bg-white m-4 w-100 p-8 rounded-md">
                <div>
                  <p className="text-center">
                    {booking?.event_table?.event.name}
                  </p>
                  <p className="text-center">
                    {booking?.event_table?.table.name}(
                    {booking?.event_table?.event.date})
                  </p>
                </div>

                <table className="mx-auto my-2 mb-4" id="table-detail">
                  <tbody className="text-sm">
                    <tr>
                      <td className="text-right pr-2 py-1 text-black">
                        Status:
                      </td>
                      <td className="text-left pl-2 text-gray-600 ">
                        {booking?.event_table?.booking_status}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-right pr-2 py-1 text-black">
                        Price:
                      </td>
                      <td className="text-left pl-2 text-gray-600 ">
                        {booking?.price}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default BookingHistory;
