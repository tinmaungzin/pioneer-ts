import Layout from "@/components/layout/dashboard/Layout";
import TableHeader from "@/components/set/TableHeader";
import { columns } from "@/components/set/columns";
import { DataTable } from "@/components/table/data-table";
import { useFetchModel } from "@/hooks/useFetchModel";
import { Set } from "@/utils/types";
import { useState } from "react";

type SetWithPageCount = {
  data: Set[];
  pageCount: number;
};
function SetIndex() {
  const [currentPage, setCurrentPage] = useState(1);
  const { models: sets } = useFetchModel<SetWithPageCount>(
    "admin/sets?" + "page=" + currentPage,
    "sets",
    currentPage
  );
  return (
    <>
      <Layout>
        <div className="container mx-auto py-10">
          <DataTable
            columns={columns}
            data={sets?.data}
            pageCount={sets?.pageCount}
            setCurrentPage={setCurrentPage}
            tableHeader={
              <TableHeader  />
            }
          />
        </div>
      </Layout>
    </>
  );
}

export default SetIndex;
