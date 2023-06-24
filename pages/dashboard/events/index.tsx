import { columns } from "@/components/event/columns";
import Layout from "@/components/layout/dashboard/Layout";
import { DataTable } from "@/components/data-table/data-table";
import { useFetchModel } from "@/hooks/useFetchModel";
import { Event } from "@/utils/types";
import { useState } from "react";
import AddNewPage from "@/components/layout/dashboard/AddNewPage";
type EventWithPageCount = {
  data: Event[];
  pageCount: number;
};
function EventIndex() {
  const [currentPage, setCurrentPage] = useState(1);
  const { models: events } = useFetchModel<EventWithPageCount>(
    "admin/events?" + "page=" + currentPage,
    "events",
    currentPage
  );
  return (
    <>
      <Layout>
        <div className="container mx-auto py-10">
          <DataTable
            columns={columns}
            data={events?.data}
            pageCount={events?.pageCount}
            setCurrentPage={setCurrentPage}
            title="Events"
            addIcon={<AddNewPage newPageLink="/dashboard/events/new" />}
          />
        </div>
      </Layout>
    </>
  );
}

export default EventIndex;
