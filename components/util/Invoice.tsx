import { Booking } from "@/utils/types";
import Image from "next/image";
import { forwardRef } from "react";
import { format } from "date-fns";

interface InvoiceProps {
  currentBooking: Booking | undefined;
}

const Invoice = forwardRef<HTMLDivElement, InvoiceProps>((props, ref) => {
  const { currentBooking } = props;
  return (
    <div ref={ref}>
      <div className="flex flex-col p-4 sm:p-10 bg-white rounded-xl">
        <div className="flex justify-between pb-12">
          <div>
            <Image
              src="/images/logo_black.png"
              width={500}
              height={300}
              className="h-full w-32"
              alt="logo"
            />
          </div>

          <div className="text-right">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200">
              Pioneer Entertainment
            </h2>
            <p>Mandalay</p>
          </div>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Bill to:
            </h3>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {currentBooking?.name
                ? currentBooking?.name
                : currentBooking?.user?.name}{" "}
              (
              {currentBooking?.phone_number
                ? currentBooking?.phone_number
                : currentBooking?.user?.phone_number}
              )
            </h3>
            {currentBooking?.user && currentBooking?.user.user_type_id === 2 ? (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Salesperson:
                </h3>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {currentBooking?.user.name}
                </h3>
              </div>
            ) : null}
          </div>

          <div className="sm:text-right space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                  Invoice date:
                </dt>
                <dd className="col-span-2 text-gray-500">
                  {currentBooking?.created_at
                    ? format(
                        new Date(currentBooking?.created_at),
                        "dd MMM yyyy"
                      )
                    : ""}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="border border-gray-200 p-4 rounded-lg space-y-4 dark:border-gray-700">
            <div className="hidden sm:grid sm:grid-cols-5">
              <div className="sm:col-span-3 text-xs font-medium text-gray-500 uppercase">
                Item
              </div>
              <div className="text-left text-xs font-medium text-gray-500 uppercase">
                Qty
              </div>

              <div className="text-right text-xs font-medium text-gray-500 uppercase">
                Amount
              </div>
            </div>

            <div className="hidden sm:block border-b border-gray-200 dark:border-gray-700"></div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              <div className="col-span-full sm:col-span-3">
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {currentBooking?.event_table?.table?.name}(
                  {currentBooking?.event_table?.event?.name})
                </p>
              </div>
              <div>
                <p className="text-gray-800 dark:text-gray-200">1</p>
              </div>

              <div>
                <p className="sm:text-right text-gray-800 dark:text-gray-200">
                  {currentBooking?.event_table.price} MMK
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex sm:justify-end">
          <div className="w-full max-w-2xl sm:text-right space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                  Total:
                </dt>
                <dd className="col-span-2 text-gray-500">
                  {currentBooking?.event_table.price} MMK
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Thank you!
          </h4>
          <p className="text-gray-500">
            If you have any questions concerning this invoice, use the following
            contact information:
          </p>
          <div className="mt-2">
            <p className="block text-sm font-medium text-gray-800 dark:text-gray-200">
              pioneerentertainment@gmail.com
            </p>
            <p className="block text-sm font-medium text-gray-800 dark:text-gray-200">
              092588884471
            </p>
            <p className="block text-sm font-medium text-gray-800 dark:text-gray-200">
              09780290666
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
Invoice.displayName = "Invoice";

export default Invoice;
