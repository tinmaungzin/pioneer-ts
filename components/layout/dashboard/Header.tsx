import { Event, User } from "@/utils/types";
import { signOut, useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useFetchAllModel } from "@/hooks/useFetchAllModel";
import Link from "next/link";

function Header() {
  const { models: events } = useFetchAllModel<Event[]>(
    "available_events",
    "events",
    "available_events"
  );
  const { data: session } = useSession();
  const user = session?.user as User;
  const [openLogout, setOpenLogout] = useState<boolean>(false);

  const eventsWithPendingTables = events?.filter((event) => {
    return event.tables.some((table) => {
      return table.booking_status === "pending";
    });
  });
  const pendingTables = events?.flatMap((event) => {
    return event.tables.filter((table) => {
      return table.booking_status === "pending";
    });
  });

  return (
    <>
      <div className="flex justify-between px-8 py-5  bg-white shadow">
        <div>
          <span className="text-sm">Hello, </span>{" "}
          <span className="text-base">{user?.name}</span>
        </div>
        <div className=" flex items-center">
          <Dialog open={openLogout} onOpenChange={setOpenLogout}>
            <DialogTrigger>
              <p className="cursor-pointer mr-8">Logout</p>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <p className="text-center font-semibold ">Account Logout</p>
              </DialogHeader>
              <p className="text-center py-4">
                Are you sure you want to logout?
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => signOut()}
                  className="mx-2 py-1 px-4 text-center text-white bg-black border border-black rounded-md hover:bg-transparent hover:text-black transition font-medium"
                >
                  Logout
                </button>
                <button
                  onClick={() => setOpenLogout(false)}
                  className="mx-2 py-1 px-4 text-center text-black bg-transparent border border-black rounded-md hover:bg-black hover:text-white transition font-medium"
                >
                  Cancel
                </button>
              </div>
            </DialogContent>
          </Dialog>
          <Sheet>
            <SheetTrigger>
              <i className="fa-solid fa-bell text-xl"></i>
              {pendingTables?.length && eventsWithPendingTables?.length ? (
                <p className="absolute -mt-8 ml-3 w-4 h-4 bg-red-500 text-center text-white rounded-full text-xs">
                  !
                </p>
              ) : null}
            </SheetTrigger>
            <SheetContent className="bg-white overflow-auto" size="sm">
              <SheetHeader>
                <SheetTitle>Notifications</SheetTitle>
                <SheetDescription>
                  <div>
                    <p>
                      You have {pendingTables?.length} pending table(s) from{" "}
                      {eventsWithPendingTables?.length} event(s).
                    </p>
                    <ul className="mt-8">
                      {eventsWithPendingTables?.map((event, index) => {
                        return (
                          <div key={index}>
                            <p className="text-lg font-bold">{event.name}</p>
                            <ul className="list-decimal ml-6">
                              {event.tables.map((table, index) => {
                                if (table.booking_status === "pending") {
                                  return (
                                    <li key={index} className="py-1">
                                      {table.name}
                                    </li>
                                  );
                                }
                              })}
                            </ul>
                          </div>
                        );
                      })}
                    </ul>
                    <div className="mt-12">
                      <Link
                        href="/dashboard/tables"
                        className="bg-gray-200 p-4 rounded"
                      >
                        Go to tables
                      </Link>
                    </div>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}

export default Header;
