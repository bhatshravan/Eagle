import DataTable from "react-data-table-component";

import React, { useEffect, useState } from "react";
import { TextField } from "./styles/styled.jsx";
import { useApiCall } from "../Utils/api";
import { Button, LoadingOverlay } from "@mantine/core";
// import { useDisclosure } from "@mantine/hooks";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="Filter By Name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <button
      type="button"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 mr-1 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      onClick={onClear}>
      X
    </button>
  </>
);

const columns = [
  {
    name: "Symbol",
    selector: (row) => row["dname"] ?? row["tsym"],
    sortable: true,
    grow:4
  },
  
  {
    name: "Total",
    selector: (row) => parseInt(row["urmtom"])+parseInt(row["rpnl"]),
    sortable: true,
  },
  {
    name: "LTP",
    selector: (row) => parseInt(row["lp"]),
    sortable: true,
  },
  {
    name: "Unrealized",
    selector: (row) => parseInt(row["urmtom"]),
    sortable: true,
    conditionalCellStyles: [
      {
          when: row => row.urmtom < 0,
          style: {
              backgroundColor: 'rgba(185, 28, 28, 0.4)',
             
          },
      },
    ]
  },
  {
    name: "Realized",
    selector: (row) => parseInt(row["rpnl"]),
    sortable: true,
    conditionalCellStyles: [
      {
          when: row => row.rpnl < 0,
          style: {
              backgroundColor: 'rgba(185, 28, 28, 1)',
          },
      },
    ]
  },
  {
    name: "Net Qty",
    selector: (row) => row["netqty"],
    sortable: true,
  },
  {
    name: "Day Qty",
    selector: (row) => row["daybuyqty"],
    sortable: true,
  },
  {
    name: "Buy/Sell",
    // selector: (row) => row["daybuyqty"],
    button:true,
    sortable: true,
  },
];

export default function Positions() {
  const sheetsQuery = useApiCall(
    ["positions"],
    "get",
    "/position",
    {},
    {
      cacheTime: 0,
    }
  );
  // const [visible, { toggle }] = useDisclosure(false);
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

  const filteredItems = sheetsQuery?.data ?? [];
  const [totalPnl, settotalPnl] = useState(0);

  

  useEffect(() => {
    if(sheetsQuery.data)
      settotalPnl(Array.isArray(sheetsQuery.data)? sheetsQuery.data?.reduce((acc,cur)=>acc+parseFloat(cur.rpnl)+parseFloat(cur.urmtom),0):0)
     
  }, [sheetsQuery.data])
  
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  // if (sheetsQuery.isLoading) {
  //   return (
  //     <div className="text-center mt-20">
  //       <LoadingOverlay visible={true} overlayBlur={2} />
  //     </div>
  //   );
  // }

  // const conditionalRowStyles = [
  //   {
  //     when: row => row.rpnl < 0,
  //     style: {
  //       color: '#FFACAC'
  //     }
  //     //   color: 'white',
  //     //   '&:hover': {
  //     //     cursor: 'pointer',
  //     //   },
  //     // },
  //   }
  // ];

  return (
    <div className="m-2 flex flex-col items-center justify-center align-middle justify-items-center self-center place-items-center">
       {/* <button onClick={()=>{
        sheetsQuery.refetch();
      }}>
        Refresh
      </button> */}
       <Button  color="cyan" className="bg-cyan-900" onClick={()=>{
        sheetsQuery.refetch();
      }}>
        Refresh
      </Button>
      <h3>Pnl: {totalPnl}</h3>
     
      <div
        className="max-w-5xl w-11/12 border-2 border-gray-500">
      <DataTable
        title="Positions"
        columns={columns}
        data={filteredItems}
        // conditionalRowStyles={conditionalRowStyles}
        striped
        progressPending={sheetsQuery.isLoading}
        subHeader
        theme="solarized"
        subHeaderComponent={subHeaderComponentMemo}
        // selectableRows
        persistTableHead
      />
      </div>
      
    </div>
  );
}
