import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";

type Props = {
  form: ReactNode;
};

function AddDialog({ form }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <i className="fa-solid fa-plus text-2xl text-gray-600 hover:text-gray-800 cursor-pointer"></i>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>{form}</DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddDialog;
