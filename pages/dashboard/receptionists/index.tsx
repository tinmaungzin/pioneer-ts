import { columns } from "@/components/staff/columns";
import { DataTable } from "@/components/data-table/data-table";
import { useFetchModel } from "@/hooks/useFetchModel";
import { Staff } from "@/utils/types";
import { useState } from "react";
import Layout from "@/components/layout/dashboard/Layout";
import Form from "@/components/staff/forms/Form";
type StaffWithPageCount = {
  data: Staff[];
  pageCount: number;
};

function ReceptionistIndex() {
  const [currentPage, setCurrentPage] = useState(1);
  const { models: staffs } = useFetchModel<StaffWithPageCount>(
    "admin/staffs?staff_type_id=" + 2 + "&page=" + currentPage,
    "receptionists",
    currentPage
  );
  return (
    <>
      <Layout>
        <div className="container mx-auto py-10">
          <DataTable
            columns={columns}
            setCurrentPage={setCurrentPage}
            data={staffs?.data}
            pageCount={staffs?.pageCount}
            title="Receptionists"
            addIcon={<Form title="receptionist" name="receptionists" />}
          />
        </div>
      </Layout>
    </>
  );
}

export default ReceptionistIndex;
