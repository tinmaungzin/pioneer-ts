import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import Form from "./forms/Form";
import { useRouter } from "next/router";

type TableHeaderProps = {
  title: string;
  name: string;
  subtitle: string;
};
function TableHeader({ title, name, subtitle }: TableHeaderProps) {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      <div className="flex justify-between items-center px-4 py-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {router.pathname === "/dashboard/salespersons" ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
              <i className="fa-solid fa-plus text-2xl text-gray-600 hover:text-gray-800 cursor-pointer"></i>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <Form setOpen={setOpen} name={name} title={subtitle} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ) : null}
      </div>
    </>
  );
}

export default TableHeader;
