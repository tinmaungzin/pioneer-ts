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
import { Staff } from "@/utils/types";
import EditForm from "./forms/EditForm";
import DeleteForm from "./forms/DeleteForm";
import ChangePasswordForm from "./forms/ChangePasswordForm";

type ActionProps = {
  staff: Staff;
  name: string;
  title: string;
};

function Actions({ staff, name, title }: ActionProps) {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openPassword, setOpenPassword] = useState<boolean>(false);

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
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <EditForm
              setOpen={setOpenEdit}
              editData={staff}
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
              editData={staff}
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
              editData={staff}
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
