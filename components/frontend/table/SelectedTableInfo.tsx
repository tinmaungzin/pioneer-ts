import { Table } from "@/utils/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TableBookingForm from "./TableBookingForm";
import { useState } from "react";
import Image from "next/image";

type Props = {
  selectedTable: Table | undefined;
};
function SelectedTableInfo({ selectedTable }: Props) {
  const originUrl = process.env.NEXT_PUBLIC_ORIGIN_URL;
  const isAvailable = selectedTable?.booking_status == "available";
  const [openBookingDialog, setOpenBookingDialog] = useState<boolean>(false);
  const [openPackageDialog, setOpenPackageDialog] = useState<boolean>(false);

  return (
    <>
      {selectedTable ? (
        <div className="my-4 bg-white py-12 px-32 mx-12 rounded-md border">
          <div className="flex justify-center">
            <p className="text-2xl">{selectedTable?.name}</p>
          </div>
          <div className="flex justify-center py-2">
            <p className="text-gray-600">{selectedTable?.price} MMK</p>
          </div>
          <table className="mx-auto my-2 mb-2" id="table-detail">
            <tbody className="text-sm">
              {/* <tr>
                <td className="text-right pr-2 py-1 text-black">Price:</td>
                <td className="text-left pl-2 text-gray-600 ">
                  {selectedTable?.price} MMK
                </td>
              </tr> */}
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
          <Dialog open={openPackageDialog} onOpenChange={setOpenPackageDialog}>
            <div className="flex justify-center pb-6">
              <DialogTrigger data-testid="book-button">
                <p className="text-left pl-2 text-gray-600 underline text-sm">View packages</p>
              </DialogTrigger>
            </div>

            <DialogContent className="bg-white w-[90%]">
              <DialogTitle className="text-center">
                Package includes:
              </DialogTitle>
              <DialogHeader>
                <div>
                  {selectedTable?.packages?.map((pakage, index) => {
                    return (
                      <Image
                        key={index}
                        alt="package photo"
                        src={`${originUrl}/download_image/${pakage?.photo}`}
                        width={500}
                        height={300}
                        className="w-full h-[50%] p-1"
                      />
                    );
                  })}
                </div>
              </DialogHeader>
              <div className="flex justify-center">
                <button
                  onClick={() => setOpenPackageDialog(false)}
                  className="mx-2 py-1 px-4 text-center text-black bg-transparent border border-black rounded-md hover:bg-black hover:text-white transition font-medium "
                >
                  Cancel
                </button>
              </div>
            </DialogContent>
          </Dialog>
          {!isAvailable ? (
            <p className="text-center text-sm text-red-400">
              This table is not available!
            </p>
          ) : (
            <Dialog
              open={openBookingDialog}
              onOpenChange={setOpenBookingDialog}
            >
              <DialogTrigger
                className="w-full flex justify-center"
                data-testid="book-button"
              >
                <button className="mx-2 py-2 px-4 text-center text-white bg-black border border-black rounded-md hover:bg-transparent hover:text-black transition font-medium">
                  Book Table
                </button>
              </DialogTrigger>
              <DialogContent className="bg-white ">
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
