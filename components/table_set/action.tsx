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
import {  TableSet } from "@/utils/types";
import EditForm from "./forms/EditForm";
import AddTableCountForm from "./forms/AddTableCountForm";

type ActionProps = {
  table_set: TableSet;
};

function Actions({ table_set }: ActionProps) {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openTableCountEdit, setOpenTableCountEdit] = useState<boolean>(false);


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
            Edit prices
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={() => setOpenTableCountEdit(true)}
          >
            Edit table count
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <EditForm setOpen={setOpenEdit} editData={table_set} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={openTableCountEdit} onOpenChange={setOpenTableCountEdit}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <AddTableCountForm setOpen={setOpenEdit} editData={table_set} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Actions;
