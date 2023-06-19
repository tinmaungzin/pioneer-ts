import { Table } from "@/utils/types";

type Props = {
  selectedTable: Table | undefined;
};
function SelectedTableInfo({ selectedTable }: Props) {
  const isAvailable = selectedTable?.booking_status == "available";
  return (
    <>
      {selectedTable ? (
        <div className="my-4">
          <table className="mx-auto my-2 mb-4" id="table-detail">
            <tbody className="text-sm">
              <tr>
                <td className="text-right pr-2 py-1 text-black">Table name:</td>
                <td className="text-left pl-2 text-gray-600 ">
                  {selectedTable?.name}
                </td>
              </tr>
              <tr>
                <td className="text-right pr-2 py-1 text-black">Price:</td>
                <td className="text-left pl-2 text-gray-600 ">
                  {selectedTable?.price} MMK
                </td>
              </tr>
              <tr>
                <td className="text-right pr-2 py-1 text-black">
                  Allowed people:
                </td>
                <td className="text-left pl-2 text-gray-600 ">
                  {selectedTable?.allowed_people}
                </td>
              </tr>
              <tr>
                <td className="text-right pr-2 py-1 text-black">Status:</td>
                <td className="text-left pl-2 text-gray-600 uppercase">
                  {selectedTable?.booking_status}
                </td>
              </tr>
            </tbody>
          </table>
          {!isAvailable ? (
            <p className="text-center text-sm text-red-400">
              This table is not available!
            </p>
          ) : (
            <div className="flex justify-center">
              <button className="block px-4 py-2 text-center text-white bg-black border border-black rounded hover:bg-transparent hover:text-black transition uppercase font-roboto font-medium relative">
                Book Table
              </button>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}

export default SelectedTableInfo;
