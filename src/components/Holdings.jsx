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
    selector: (row) => row.exch_tsym ? row["exch_tsym"][0]["tsym"] : "",
    sortable: true,
    grow:4
  },
  
  {
    name: "Qty",
    selector: (row) =>  parseInt(row["brkcolqty"]) || 0 + parseInt(row["npoadqty"]) || 0,
    sortable: true,
  },
  {
    name: "Price",
    selector: (row) => parseInt(row["upldprc"]),
    sortable: true,
  },
  // {
  //   name: "Total",
  //   selector: (row) => parseInt(row["upldprc"]) * (parseInt(row["brkcolqty"]) || 0 + parseInt(row["npoadqty"]) || 0),
  //   sortable: true,
  //   conditionalCellStyles: [
  //     {
  //         when: row => row.urmtom < 0,
  //         style: {
  //             backgroundColor: 'rgba(185, 28, 28, 0.4)',
             
  //         },
  //     },
  //   ],
  // },
  {
    name:"Buy/Sell",
    selector: (row)=>{
      return <>
        <Button  color="green" className="bg-green-400 mx-2" onClick={()=>{
        // sheetsQuery.refetch();
      }}>
        Buy
      </Button>
        <Button  color="red" className="bg-red-700" onClick={()=>{
        // sheetsQuery.refetch();
      }}>
        Sell
      </Button>
      </>
    },
    
    grow:2
  }
  // {
  //   name: "p% change",
  //   selector: (row) => parseInt(row["rpnl"]),
  //   sortable: true,
  //   conditionalCellStyles: [
  //     {
  //         when: row => row.rpnl < 0,
  //         style: {
  //             backgroundColor: 'rgba(185, 28, 28, 1)',
  //         },
  //     },
  //   ]
  // },
  // {
  //   name: "Today % change",
  //   selector: (row) => row["netqty"],
  //   sortable: true,
  // },
  // {
  //   name: "Day Qty",
  //   selector: (row) => row["daybuyqty"],
  //   sortable: true,
  // },
];

const Holdings = () => {
  const sheetsQuery = useApiCall(
    ["positions"],
    "get",
    "/holding",
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
  console.log("🚀 ~ file: Holdings.js:95 ~ Positions ~ sheetsQuery:", filterText);

  

  useEffect(() => {
    if(sheetsQuery.data)
      settotalPnl(Array.isArray(sheetsQuery.data)? sheetsQuery.data?.reduce((acc,cur)=>acc+parseInt(cur["upldprc"]) * (parseInt(cur["brkcolqty"]) || 0 + parseInt(cur["npoadqty"]) || 0),0):0)
     
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
      // <></>
    );
  }, [filterText, resetPaginationToggle]);

  // if (sheetsQuery.isLoading) {
  //   return (
  //     <div className="text-center mt-20">
  //       <LoadingOverlay visible={true} overlayBlur={2} />
  //     </div>
  //   );
  // }

  if(sheetsQuery.isLoading){
    return (
      <div className="text-center mt-20">
        <LoadingOverlay visible={true} overlayBlur={2} />
      </div>
    );
  }

  return (
    <div className="m-2 flex flex-col items-center justify-center align-middle justify-items-center self-center place-items-center">
  {/* <TextField
      id="search"
      type="text"
      placeholder="Filter By Name"
      aria-label="Search Input"
      value={filterText}
      onChange={()=>{}}
    /> */}
       <Button  color="cyan" className="bg-cyan-900" onClick={()=>{
        sheetsQuery.refetch();
      }}>
        Refresh
      </Button>
      <h3>Pnl: {totalPnl}</h3>
     
      <div
        className="max-w-5xl w-11/12 border-2 border-gray-500">
      <DataTable
        title="Holdings"
        columns={columns}
        data={filteredItems}
        // conditionalRowStyles={conditionalRowStyles}
        striped
        subHeader
        theme="solarized"
        progressPending={sheetsQuery.isLoading}
        expandableRows
        subHeaderComponent={subHeaderComponentMemo}
        // selectableRows
        persistTableHead
      />
      </div>
      
    </div>
  );
}

export {Holdings};