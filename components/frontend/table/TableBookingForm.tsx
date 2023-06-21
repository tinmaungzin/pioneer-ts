import { DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Table, User } from "@/utils/types";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import GoToLogin from "./GoToLogin";
import { useFetchOneModel } from "@/hooks/useFetchOneModel";
import { usePostModel } from "@/hooks/usePostModel";
import PaymentInfoMessage from "./messages/PaymentInfoMessage";
import NotEnoughBalanceMessage from "./messages/NotEnoughBalanceMessage";
import AmountSubtractMessage from "./messages/AmountSubtractMessage";
import SalespersonMessage from "./messages/SalespersonMessage";
import { useToast } from "@/components/ui/use-toast";
import { handleError, handleSuccess } from "@/utils/helpers/mutationHandlers";
import { SocketContext } from "@/context/socket";

type Props = {
  selectedTable: Table | undefined;
  setOpen: (value: boolean) => void;
};

function TableBookingForm({ selectedTable, setOpen }: Props) {
  const socket = useContext(SocketContext);

  const { data: session, status } = useSession();
  const user = session?.user as User;
  const { toast } = useToast();
  const { model: auth_user } = useFetchOneModel<User>("all", "user"); // because user from session data is updating only when user login
  const bookTable = usePostModel("sales_user/bookings", "events", "POST");
  const [useBalance, setUseBalance] = useState<boolean>(false);
  const [note, setNote] = useState<string>();
  const [photo, setPhoto] = useState<File | undefined>();
  const [photoRequired, setPhotoRequired] = useState<string>("");

  const unauthenticated =
    status === "unauthenticated" || (user && !("user_type_id" in user));

  const isSalePerson =
    status === "authenticated" &&
    user &&
    "user_type_id" in user &&
    user.user_type_id === 2;

  const notEnoughBalance =
    !isSalePerson &&
    selectedTable?.price &&
    auth_user?.balance &&
    useBalance &&
    selectedTable?.price > auth_user?.balance;
  const enoughBalance =
    !isSalePerson &&
    selectedTable?.price &&
    auth_user?.balance &&
    useBalance &&
    selectedTable?.price <= auth_user?.balance;

  const isButtonDisabled = !!(notEnoughBalance && useBalance);

  useEffect(() => {
    if (photo) setPhotoRequired("");
  }, [photo]);

  const handleBook = () => {
    setPhotoRequired("");
    if (!useBalance && !photo && !isSalePerson) {
      setPhotoRequired("You need to upload payment proof!");
      return;
    }
    let data = {
      event_table_id: selectedTable?.event_table_id,
      user_id: auth_user?.id,
      booking_status: useBalance || isSalePerson ? "confirmed" : "pending",
      note,
      use_balance: +useBalance,
    };
    if (photo) {
      const formData = new FormData();
      formData.append("event_table_id", String(data.event_table_id));
      formData.append("user_id", String(data.user_id));
      formData.append("booking_status", data.booking_status);
      formData.append("note", String(data.note));
      formData.append("photo", photo as File);
      formData.append("use_balance", String(data.use_balance));
      bookTable.mutate(formData, {
        onSuccess: (message) => {
          handleSuccess(message, setOpen, toast);
          socket.emit("event-update", {
            text: "event updated",
          });
        },
        onError: (error) => handleError(error, toast),
      });
    } else {
      bookTable.mutate(data, {
        onSuccess: (message) => {
          handleSuccess(message, setOpen, toast);
          socket.emit("event-update", {
            text: "event updated",
          });
        },
        onError: (error) => handleError(error, toast),
      });
    }
  };

  if (unauthenticated) {
    return <GoToLogin setOpen={setOpen} />;
  }
  return (
    <>
      <DialogTitle className="text-center">
        Book {selectedTable?.name} table
      </DialogTitle>

      <div>
        {isSalePerson ? (
          <SalespersonMessage selectedTable={selectedTable} />
        ) : null}
        {!useBalance && !isSalePerson ? (
          <PaymentInfoMessage
            selectedTable={selectedTable}
            setPhoto={setPhoto}
          />
        ) : null}

        {notEnoughBalance ? (
          <NotEnoughBalanceMessage
            selectedTable={selectedTable}
            auth_user={auth_user}
          />
        ) : null}

        {enoughBalance ? (
          <AmountSubtractMessage
            selectedTable={selectedTable}
            auth_user={auth_user}
          />
        ) : null}

        <div>
          <label>Note</label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="input-box"
          ></textarea>
        </div>
        {!isSalePerson ? (
          <div className="my-8">
            <Switch
              checked={useBalance}
              onCheckedChange={() => {
                setUseBalance(!useBalance);
                setPhotoRequired("");
              }}
              className="bg-gray-400 mr-2"
            />
            <span>Use account balance</span>
          </div>
        ) : null}

        <div className="flex justify-center">
          <span className="text-sm text-center text-red-500">
            {photoRequired}
          </span>
        </div>

        <div className="flex flex-row justify-center mt-4">
          <button
            onClick={handleBook}
            disabled={isButtonDisabled}
            className="mx-2 py-1 px-4 text-center text-white bg-black border border-black rounded-md hover:bg-transparent hover:text-black transition font-medium disabled:cursor-not-allowed "
          >
            Book
          </button>
          <button
            onClick={() => setOpen(false)}
            className="mx-2 py-1 px-4 text-center text-black bg-transparent border border-black rounded-md hover:bg-black hover:text-white transition font-medium "
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default TableBookingForm;
