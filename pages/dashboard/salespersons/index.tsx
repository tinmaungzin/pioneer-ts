import { columns } from "@/components/user/columns";
import { DataTable } from "@/components/data-table/data-table";
import Layout from "@/components/layout/dashboard/Layout";
import { useFetchModel } from "@/hooks/useFetchModel";
import { User } from "@/utils/types";
import TableHeader from "@/components/user/TableHeader";
import { useState } from "react";
import Actions from "@/components/user/action";

type UserWithPageCount = {
  data: User[];
  pageCount: number;
};

function SalespersonIndex() {
  const [currentPage, setCurrentPage] = useState(1);
  const { models: salespersons } = useFetchModel<UserWithPageCount>(
    "staff/users?user_type_id=" + 2 + "&page=" + currentPage,
    "salespersons",
    currentPage
  );

  const additionalColumns = [
    {
      id: "actions",
      cell: ({ row }: any) => {
        return (
          <>
            <Actions
              user={row.original}
              name="salespersons"
              title="salesperson"
            />
          </>
        );
      },
    },
  ];

  const updatedColumns = [...columns, ...additionalColumns];

  return (
    <>
      <Layout>
        <div className="container mx-auto py-10">
          <DataTable
            columns={updatedColumns}
            data={salespersons?.data}
            pageCount={salespersons?.pageCount}
            setCurrentPage={setCurrentPage}
            tableHeader={
              <TableHeader
                title="Salesperson"
                subtitle="salesperson"
                name="salespersons"
              />
            }
          />
        </div>
      </Layout>
    </>
  );
}

export default SalespersonIndex;
