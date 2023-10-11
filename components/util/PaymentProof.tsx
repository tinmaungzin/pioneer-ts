import { Booking } from "@/utils/types";
import Image from "next/image";
import { forwardRef } from "react";
import { format } from "date-fns";

interface InvoiceProps {
  currentBooking: Booking | undefined;
}

const PaymentProof = forwardRef<HTMLDivElement, InvoiceProps>((props, ref) => {
  const { currentBooking } = props;
  const originUrl = process.env.NEXT_PUBLIC_ORIGIN_URL;
  return (
    <div ref={ref}>
      <div className="flex flex-col p-4 sm:p-10 bg-white rounded-xl">
        <p className="text-center py-2 text-xl font-bold">Payment Proof</p>
        <div>
          <p className="text-center py-1">
            Name:{" "}
            {currentBooking?.name
              ? currentBooking?.name
              : currentBooking?.user?.name}
          </p>
          <p className="text-center py-1">
            Phone:{" "}
            {currentBooking?.phone_number
              ? currentBooking?.phone_number
              : currentBooking?.user?.phone_number}
          </p>
          <p className="text-center py-1">
            Table: {currentBooking?.event_table?.table?.name}(
            {currentBooking?.event_table?.event?.name})
          </p>
          <p className="text-center py-1">
            Date:{" "}
            {currentBooking?.created_at
              ? format(new Date(currentBooking?.created_at), "dd MMM yyyy")
              : ""}
          </p>
        </div>

        <Image
          alt="Payment Proof"
          src={`${originUrl}/download_image/${currentBooking?.photo}`}
          width={500}
          height={300}
          className="w-full p-1"
        />
      </div>
    </div>
  );
});
PaymentProof.displayName = "PaymentProof";

export default PaymentProof;
