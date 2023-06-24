import { columns } from "@/components/type/columns";
import { DataTable } from "@/components/data-table/data-table";
import { useFetchModel } from "@/hooks/useFetchModel";
import { Type } from "@/utils/types";
import { useState } from "react";
import Layout from "@/components/layout/dashboard/Layout";
import Form from "@/components/type/forms/Form";

type TypeWithPageCount = {
  data: Type[];
  pageCount: number;
};
function TypeIndex() {
  const [currentPage, setCurrentPage] = useState(1);
  const { models: types } = useFetchModel<TypeWithPageCount>(
    "admin/types?" + "page=" + currentPage,
    "types",
    currentPage
  );
  return (
    <>
      <Layout>
        <div className="container mx-auto py-10">
          <DataTable
            columns={columns}
            data={types?.data}
            pageCount={types?.pageCount}
            setCurrentPage={setCurrentPage}
            title="Types"
            addIcon={<Form />}
          />
        </div>
      </Layout>
    </>
  );
}

export default TypeIndex;
