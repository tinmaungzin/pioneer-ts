import { Table } from "@/utils/types";
import PaymentOptions from "../PaymentOptions";
type Props = {
  selectedTable: Table | undefined;
  setPhoto: (value: File | undefined) => void;
};
function PaymentInfoMessage({ selectedTable, setPhoto }: Props) {
  return (
    <>
      <div>
        <p className="text-sm text-center py-4">
          Please transfer the amount of{" "} at least{" "}
          <strong>{selectedTable?.price ? Math.ceil(selectedTable?.price/2) : ""} MMK</strong> to one of the following
          payment options and upload the proof screenshot below!
        </p>
        <PaymentOptions />
        <div>
          <label>Payment screenshot</label>
          <input
            onChange={(e) => e.target.files && setPhoto(e?.target?.files[0])}
            type="file"
            id="photo"
            className="input-box"
          />
        </div>
      </div>
    </>
  );
}

export default PaymentInfoMessage;
