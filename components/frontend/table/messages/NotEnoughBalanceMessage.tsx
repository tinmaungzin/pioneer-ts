import { Table, User } from "@/utils/types";
import Link from "next/link";
type Props = {
  selectedTable: Table | undefined;
  auth_user: User | undefined;
};
function NotEnoughBalanceMessage({ selectedTable, auth_user }: Props) {
  return (
    <>
      <p className="text-sm text-center py-4 text-red-500">
        Not enough balance in your account. You current balance is{" "}
        <strong>{auth_user?.balance}MMK</strong> and selected table price is{" "}
        <strong>{selectedTable?.price}MMK</strong>. Please call{" "}
        <Link href="tel:091234567" className="text-black">
          {" "}
          <strong>091234567</strong>{" "}
        </Link>{" "}
        to recharge your balance.
      </p>
    </>
  );
}

export default NotEnoughBalanceMessage;
