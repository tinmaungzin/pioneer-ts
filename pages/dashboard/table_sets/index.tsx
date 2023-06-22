import TableHeader from "@/components/table_set/TableHeader";
import { columns } from "@/components/table_set/columns";
import { DataTable } from "@/components/data-table/data-table";
import { useFetchModel } from "@/hooks/useFetchModel";
import { TableSet } from "@/utils/types";
import { useState } from "react";
import Actions from "@/components/table_set/action";
import Layout from "@/components/layout/dashboard/Layout";

type TableSetWithPageCount = {
  data: TableSet[];
  pageCount: number;
};

function TableSetIndex() {
  const [currentPage, setCurrentPage] = useState(1);
  const { models: table_sets } = useFetchModel<TableSetWithPageCount>(
    "admin/set_types?" + "page=" + currentPage,
    "set_types",
    currentPage
  );

  const updatedColumns = [...columns];
  if (table_sets && table_sets.data.length) {
    const lengths = table_sets.data.map((a) => a?.set_prices?.length);
    const calculatedSetTable =
      table_sets?.data[lengths.indexOf(Math.max(...lengths))];
    calculatedSetTable?.set_prices.map((set_price, index) => {
      const obj = {
        header: set_price?.set_name,
        accessorFn: (row: any) =>
          row.set_prices[index]?.price
            ? `${row.set_prices[index]?.price}`
            : "-",
      };
      updatedColumns.push(obj);
    });
    updatedColumns.push({
      id: "actions",
      cell: ({ row }) => {
        return (
          <>
            <Actions table_set={row.original} />
          </>
        );
      },
    });
  }

  return (
    <>
      <Layout>
        <div className="container mx-auto py-10">
          <DataTable
            columns={updatedColumns}
            data={table_sets?.data}
            pageCount={table_sets?.pageCount}
            setCurrentPage={setCurrentPage}
            tableHeader={<TableHeader />}
          />
        </div>
      </Layout>
    </>
  );
}

export default TableSetIndex;
