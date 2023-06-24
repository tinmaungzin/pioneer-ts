import { Event } from "@/utils/types";
import Image from "next/image";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

type Props = {
  activeEvent: Event | undefined;
}
function EventInfo({activeEvent}: Props) {

  const [openLayoutDialog, setOpenLayoutDialog] = useState<boolean>(false);
  const originUrl = process.env.NEXT_PUBLIC_ORIGIN_URL;

  return (
    <>
      <div>
        <p className="text-center text-4xl font-semibold py-1">
          {activeEvent?.name}
        </p>
        <p className="text-center text-xl font-semibold py-1">
          {activeEvent?.date ? format(new Date(activeEvent?.date), "EEEE") : ""}
        </p>
        <p className="text-center text-xl font-semibold py-1">
          {activeEvent?.date
            ? format(new Date(activeEvent?.date), "dd MMM yyyy")
            : ""}
        </p>

        <Dialog open={openLayoutDialog} onOpenChange={setOpenLayoutDialog}>
          <div className="flex justify-center my-2">
            <DialogTrigger data-testid="book-button">
              <button className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10">
                View Table Layout
              </button>
            </DialogTrigger>
          </div>

          <DialogContent className="bg-white w-[90%]">
            <DialogTitle className="text-center">Table Layout Plan</DialogTitle>
            <DialogHeader>
              <div>
                <Image
                  alt="layout photo"
                  src={`${originUrl}/download_image/${activeEvent?.layout_photo}`}
                  width={500}
                  height={300}
                  className="w-full h-full p-1"
                />
              </div>
            </DialogHeader>
            <div className="flex justify-center">
              <button
                onClick={() => setOpenLayoutDialog(false)}
                className="mx-2 py-1 px-4 text-center text-black bg-transparent border border-black rounded-md hover:bg-black hover:text-white transition font-medium "
              >
                Cancel
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default EventInfo;
