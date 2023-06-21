import { Table } from "@/utils/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import TableBookingForm from "./TableBookingForm";
import { useState } from "react";

type Props = {
  selectedTable: Table | undefined;
};
function SelectedTableInfo({ selectedTable }: Props) {
  const isAvailable = selectedTable?.booking_status == "available";
  const [openBookingDialog, setOpenBookingDialog] = useState<boolean>(false);

  return (
    <>
      {selectedTable ? (
        <div className="my-4">
          <table className="mx-auto my-2 mb-4" id="table-detail">
            <tbody className="text-sm">
              <tr>
                <td className="text-right pr-2 py-1 text-black">Table name:</td>
                <td className="text-left pl-2 text-gray-600 ">
                  {selectedTable?.name}
                </td>
              </tr>
              <tr>
                <td className="text-right pr-2 py-1 text-black">Price:</td>
                <td className="text-left pl-2 text-gray-600 ">
                  {selectedTable?.price} MMK
                </td>
              </tr>
              <tr>
                <td className="text-right pr-2 py-1 text-black">
                  Allowed people:
                </td>
                <td className="text-left pl-2 text-gray-600 ">
                  {selectedTable?.allowed_people}
                </td>
              </tr>
              <tr>
                <td className="text-right pr-2 py-1 text-black">Status:</td>
                <td className="text-left pl-2 text-gray-600 uppercase">
                  {selectedTable?.booking_status}
                </td>
              </tr>
            </tbody>
          </table>
          {!isAvailable ? (
            <p className="text-center text-sm text-red-400">
              This table is not available!
            </p>
          ) : (
            <Dialog
              open={openBookingDialog}
              onOpenChange={setOpenBookingDialog}
            >
              <DialogTrigger className="w-full flex justify-center">
                <button className="mx-2 py-2 px-4 text-center text-white bg-black border border-black rounded-md hover:bg-transparent hover:text-black transition font-medium">
                  Book Table
                </button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <TableBookingForm
                    selectedTable={selectedTable}
                    setOpen={setOpenBookingDialog}
                  />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
        </div>
      ) : null}
    </>
  );
}

export default SelectedTableInfo;
