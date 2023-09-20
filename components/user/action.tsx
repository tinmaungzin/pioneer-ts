import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useState } from "react";
import { User } from "@/utils/types";
import EditForm from "./forms/EditForm";
import DeleteForm from "./forms/DeleteForm";
import ChangePasswordForm from "./forms/ChangePasswordForm";
import { useRouter } from "next/router";
import Link from "next/link";
import AddBalanceForm from "./forms/AddBalanceForm";

type ActionProps = {
  user: User;
  name: string;
  title: string;
};

function Actions({ user, name, title }: ActionProps) {
  const router = useRouter();
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openPassword, setOpenPassword] = useState<boolean>(false);
  const [openBalance, setOpenBalance] = useState<boolean>(false);

  const isUser = router.pathname === "/dashboard/users";
  const isSalesperson = router.pathname === "/dashboard/salespersons";

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {isSalesperson ? (
            <div>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={() => setOpenEdit(true)}
              >
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={() => setOpenPassword(true)}
              >
                Change Password
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer text-red-700"
                onSelect={() => setOpenDelete(true)}
              >
                Delete
              </DropdownMenuItem>
            </div>
          ) : null}
          {isUser || isSalesperson ? (
            <div>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={() => setOpenBalance(true)}
              >
                Add balance
              </DropdownMenuItem>
              <Link href={ isUser ? `/dashboard/users/${user?.id}` : `/dashboard/salespersons/${user?.id}`}>
                <DropdownMenuItem>View bookings</DropdownMenuItem>
              </Link>
            </div>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openBalance} onOpenChange={setOpenBalance}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <AddBalanceForm
              setOpen={setOpenBalance}
              editData={user}
              name={name}
              title={title}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <EditForm
              setOpen={setOpenEdit}
              editData={user}
              name={name}
              title={title}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DeleteForm
              setOpen={setOpenDelete}
              editData={user}
              name={name}
              title={title}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={openPassword} onOpenChange={setOpenPassword}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <ChangePasswordForm
              setOpen={setOpenPassword}
              editData={user}
              name={name}
              title={title}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Actions;
