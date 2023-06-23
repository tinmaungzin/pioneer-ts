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
              <tr>
                <td className="text-right pr-2 py-1 text-black">
                  Package includes:
                </td>
                <Dialog
                  open={openPackageDialog}
                  onOpenChange={setOpenPackageDialog}
                >
                  <DialogTrigger
                    className="w-full flex justify-center"
                    data-testid="book-button"
                  >
                    <td className="text-left pl-2 text-gray-600 underline">
                      View
                    </td>
                  </DialogTrigger>
                  <DialogContent className="bg-white overflow-auto w-[90%]">
                    <DialogTitle className="text-center">
                      Package includes:
                    </DialogTitle>
                    <DialogHeader>
                      <div className="grid grid-cols-2">
                        {selectedTable?.packages?.map((pakage, index) => {
                          return (
                            <Image
                              key={index}
                              alt="package photo"
                              src={`${originUrl}/download_image/${pakage?.photo}`}
                              width={500}
                              height={300}
                              className="w-full h-[50%]"
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
              <DialogTrigger
                className="w-full flex justify-center"
                data-testid="book-button"
              >
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
