import { User } from "@/utils/types";
import { signOut, useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

function Header() {
  const { data: session } = useSession();
  const user = session?.user as User;
  const [openLogout, setOpenLogout] = useState<boolean>(false);
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
          <i className="fa-solid fa-bell text-xl"></i>
        </div>
      </div>
    </>
  );
}

export default Header;
