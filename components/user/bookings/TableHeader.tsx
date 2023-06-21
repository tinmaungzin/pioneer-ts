import { User } from "@/utils/types";

type TableHeaderProps = {
  user?: User;
  total: number | undefined;
};
function TableHeader({ total }: TableHeaderProps) {
  return (
    <>
      <div className="flex justify-between items-center px-4 py-4">
        <h2 className="text-lg font-semibold">Bookings </h2>
        <h2 className="text-lg font-semibold">
          Money spent : {total ? total : 0} MMK
        </h2>
      </div>
    </>
  );
}

export default TableHeader;
