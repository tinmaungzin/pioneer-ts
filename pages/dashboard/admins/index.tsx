import { columns } from "@/components/staff/columns";
import { DataTable } from "@/components/data-table/data-table";
import Layout from "@/components/layout/dashboard/Layout";
import { useFetchModel } from "@/hooks/useFetchModel";
import { Staff } from "@/utils/types";
import TableHeader from "@/components/staff/TableHeader";
import { useState } from "react";

type StaffWithPageCount = {
  data: Staff[];
  pageCount: number;
};

function AdminIndex() {
  const [currentPage, setCurrentPage] = useState(1);
  const { models: staffs } = useFetchModel<StaffWithPageCount>(
    "admin/staffs?staff_type_id=" + 1 + "&page=" + currentPage,
    "admins",
    currentPage
  );

  return (
    <>
      <Layout>
        <div className="container mx-auto py-10">
          <DataTable
            columns={columns}
            data={staffs?.data}
            pageCount={staffs?.pageCount}
            setCurrentPage={setCurrentPage}
            tableHeader={
              <TableHeader title="Admins" subtitle="admin" name="admins" />
            }
          />
        </div>
      </Layout>
    </>
  );
}

export default AdminIndex;
