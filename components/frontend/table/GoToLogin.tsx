import { DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";
type Props = {
  setOpen: (value: boolean) => void;
};
function GoToLogin({ setOpen }: Props) {
  return (
    <>
      <DialogTitle className="text-center">You are not logged in!</DialogTitle>
      <p className="text-center py-8">
        You need to login first to book tables.
      </p>
      <div className="flex flex-row justify-center mt-4">
        <button className="mx-2 py-1 px-4 text-center text-white bg-black border border-black rounded-md hover:bg-transparent hover:text-black transition font-medium">
          <Link href="/login" data-testid="login-dialog-button">
            Login
          </Link>
        </button>
        <button
          onClick={() => setOpen(false)}
          className="mx-2 py-1 px-4 text-center text-black bg-transparent border border-black rounded-md hover:bg-black hover:text-white transition font-medium"
        >
          Cancel
        </button>
      </div>
    </>
  );
}

export default GoToLogin;
