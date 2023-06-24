import Layout from "@/components/layout/dashboard/Layout";
import { columns } from "@/components/package/columns";
import { DataTable } from "@/components/data-table/data-table";
import { useFetchModel } from "@/hooks/useFetchModel";
import { Package } from "@/utils/types";
import { useState } from "react";
import Form from "@/components/package/forms/Form";

type PackageWithPageCount = {
  data: Package[];
  pageCount: number;
};
function PackageIndex() {
  const [currentPage, setCurrentPage] = useState(1);
  const { models: packages } = useFetchModel<PackageWithPageCount>(
    "admin/packages?" + "page=" + currentPage,
    "packages",
    currentPage
  );
  return (
    <>
      <Layout>
        <div className="container mx-auto py-10">
          <DataTable
            columns={columns}
            data={packages?.data}
            pageCount={packages?.pageCount}
            setCurrentPage={setCurrentPage}
            title="Packages"
            addIcon={<Form />}
          />
        </div>
      </Layout>
    </>
  );
}

export default PackageIndex;
