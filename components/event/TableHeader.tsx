import Link from "next/link";

function TableHeader() {
  return (
    <>
      <div className="flex justify-between items-center px-4 py-4">
        <h2 className="text-lg font-semibold">Events</h2>
        <Link href="/dashboard/events/new">
        <i className="fa-solid fa-plus text-2xl text-gray-600 hover:text-gray-800 cursor-pointer"></i>

        </Link>
      </div>
    </>
  );
}

export default TableHeader;
