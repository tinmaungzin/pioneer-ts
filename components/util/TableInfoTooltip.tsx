import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
function TableInfoTooltip() {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <div className="flex justify-center mt-4">
            <i className="fa-solid fa-circle-info text-xl"></i>
          </div>
        </PopoverTrigger>
        <PopoverContent className="bg-white">
          <div className="text-gray-600 text-sm">
            <div className="flex items-center">
              <div className="bg-gray-100 w-4 h-4 rounded-full border mx-2"></div>
              <p>Available tables(can book)</p>
            </div>
            <div className="flex items-center">
              <div className="bg-yellow-300 w-4 h-4 rounded-full border mx-2"></div>
              <p>Pending tables(can check later)</p>
            </div>
            <div className="flex items-center">
              <div className="bg-red-300 w-4 h-4 rounded-full border mx-2"></div>
              <p>Booked tables(cannot book)</p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default TableInfoTooltip;
