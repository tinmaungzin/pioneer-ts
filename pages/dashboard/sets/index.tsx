import Layout from "@/components/layout/dashboard/Layout";
import { columns } from "@/components/set/columns";
import { DataTable } from "@/components/data-table/data-table";
import { useFetchModel } from "@/hooks/useFetchModel";
import { Set } from "@/utils/types";
import { useState } from "react";
import Form from "@/components/set/forms/Form";

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
            title="Sets"
            addIcon={<Form /> }
          />
        </div>
      </Layout>
    </>
  );
}

export default SetIndex;
