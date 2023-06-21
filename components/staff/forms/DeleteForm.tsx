import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useDeleteModel } from "@/hooks/useDeleteModel";
import { Staff } from "@/utils/types";
import { handleError, handleSuccess } from "@/utils/helpers/mutationHandlers";

type FormProps = {
  setOpen: (value: boolean) => void;
  editData: Staff;
  name: string;
  title: string;
};

function DeleteForm({ setOpen, editData, name, title }: FormProps) {
  const { toast } = useToast();

  const deleteAdmin = useDeleteModel("admin/staffs/" + editData?.id, name);
  const handleDelete = () => {
    deleteAdmin.mutate(undefined, {
      onSuccess: (message) => handleSuccess(message, setOpen, toast),
      onError: (error) => handleError(error, toast),
    });
  };
  return (
    <>
      <DialogTitle className="text-center my-4 text-xl">
        Delete {title}
      </DialogTitle>
      <DialogDescription className="text-center">
        Are you sure you want to delete?
      </DialogDescription>
      <div className="flex justify-center">
        <button
          onClick={handleDelete}
          className="mt-7 py-1 px-4 text-center text-white bg-red-600 border border-red-600 rounded-md hover:bg-transparent hover:text-red-600 transition font-medium"
        >
          Delete
        </button>
      </div>
    </>
  );
}

export default DeleteForm;
