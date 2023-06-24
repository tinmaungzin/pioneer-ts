import Layout from "@/components/layout/dashboard/Layout";
import { columns } from "@/components/point/columns";
import { DataTable } from "@/components/data-table/data-table";
import { useFetchModel } from "@/hooks/useFetchModel";
import { PointItem } from "@/utils/types";
import { useState } from "react";
import Form from "@/components/point/forms/Form";

type PointItemWithPageCount = {
  data: PointItem[];
  pageCount: number;
};
function PointIndex() {
  const [currentPage, setCurrentPage] = useState(1);
  const { models: point_items } = useFetchModel<PointItemWithPageCount>(
    "admin/point_items?" + "page=" + currentPage,
    "point_items",
    currentPage
  );
  return (
    <>
      <Layout>
        <div className="container mx-auto py-10">
          <DataTable
            columns={columns}
            data={point_items?.data}
            pageCount={point_items?.pageCount}
            setCurrentPage={setCurrentPage}
            title="Points"
            addIcon={<Form />}
          />
        </div>
      </Layout>
    </>
  );
}

export default PointIndex;
