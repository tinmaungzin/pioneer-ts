import Image from "next/image";
import { Booking } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import ReactToPrint from "react-to-print";
import Invoice from "@/components/util/Invoice";
import PaymentProof from "@/components/util/PaymentProof";
import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Print: React.FC<{ row: any }> = ({ row }) => {
  const invoiceRef = useRef<HTMLDivElement | null>(null);
  const paymentRef = useRef<HTMLDivElement | null>(null);
  const originUrl = process.env.NEXT_PUBLIC_ORIGIN_URL;
  const [openProofDialog, setOpenProofDialog] = useState<boolean>(false);

  return (
    <div className="flex gap-2 justify-center items-center">
      <div>
        <ReactToPrint
          trigger={() => (
            <p className="text-center underline cursor-pointer text-sm">
              Print invoice
            </p>
          )}
          content={() => (invoiceRef?.current ? invoiceRef.current : null)}
        />
        <div className="hidden">
          <Invoice ref={invoiceRef} currentBooking={row.original} />
        </div>
      </div>
      <div>
        <ReactToPrint
          trigger={() => (
            <p className="text-center underline cursor-pointer text-sm">
              Print Payment Proof
            </p>
          )}
          content={() => (paymentRef?.current ? paymentRef.current : null)}
        />
        <div className="hidden">
          <PaymentProof ref={paymentRef} currentBooking={row.original} />
        </div>
      </div>

      {/* <Dialog open={openProofDialog} onOpenChange={setOpenProofDialog}>
        <div className="flex justify-center">
          <DialogTrigger data-testid="book-button">
            <p className="text-left pl-2 text-gray-600 underline text-sm">
              Payment Proof
            </p>
          </DialogTrigger>
        </div>

        <DialogContent className="bg-white w-full">
          <DialogTitle className="text-center">
            Payment Proof  
          </DialogTitle>
          <DialogHeader>
            {row?.original?.photo ? (
              <div>
                <Image
                  alt="Payment Proof"
                  src={`${originUrl}/download_image/${row?.original?.photo}`}
                  width={500}
                  height={300}
                  className="w-full p-1"
                />
              </div>
            ) : (
              <p className="text-center py-6">No Payment Proof for this booking</p>
            )}
          </DialogHeader>
          <div className="flex justify-center">
            <button
              onClick={() => setOpenProofDialog(false)}
              className="mx-2 py-1 px-4 text-center text-black bg-transparent border border-black rounded-md hover:bg-black hover:text-white transition font-medium "
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog> */}

      {/* <p>Payment Proof</p> */}
    </div>
  );
};

export const columns: ColumnDef<Booking>[] = [
  {
    id: "no",
    header: "No.",
    cell: ({ row }) => {
      return <p>{row.index + 1}</p>;
    },
  },

  {
    accessorKey: "event_table.event.name",
    header: "Event",
  },
  {
    accessorKey: "event_table.table.name",
    header: "Table",
  },
  {
    accessorKey: "event_table.event.date",
    header: "Date",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    header: "Action",
    cell: Print,
  },
];
