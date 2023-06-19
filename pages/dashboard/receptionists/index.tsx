import { columns } from "@/components/staff/columns";
import { DataTable } from "@/components/table/data-table";
import { useFetchModel } from "@/hooks/useFetchModel";
import { Staff } from "@/utils/types";
import TableHeader from "@/components/staff/TableHeader";
import { useState } from "react";
import Layout from "@/components/layout/dashboard/Layout";
type StaffWithPageCount = {
  data: Staff[];
  pageCount: number;
};

function ReceptionistIndex() {
  const [currentPage, setCurrentPage] = useState(1);
  const { models: staffs } = useFetchModel<StaffWithPageCount>(
    "admin/staffs?staff_type_id=" + 2+ "&page=" + currentPage,
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
            tableHeader={
              <TableHeader
                title="Receptionists"
                subtitle="receptionist"
                name="receptionists"
              />
            }
          />
        </div>
      </Layout>
    </>
  );
}

export default ReceptionistIndex;
