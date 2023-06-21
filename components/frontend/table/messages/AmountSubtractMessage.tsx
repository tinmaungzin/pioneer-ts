import { Table, User } from "@/utils/types";

type Props = {
  selectedTable: Table | undefined;
  auth_user: User | undefined;
};

function AmountSubtractMessage({ selectedTable, auth_user }: Props) {
  return (
    <>
      <p className="text-sm text-center py-4">
        <strong>{selectedTable?.price}MMK</strong> will be subtracted from your
        current balance of <strong>{auth_user?.balance}MMK</strong>.
      </p>
    </>
  );
}

export default AmountSubtractMessage;
