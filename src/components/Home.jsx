import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useTable, useSortBy } from "react-table";
import axios from "axios";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import DataTable from "react-data-table-component";
import { TextField } from "./styles/styled.jsx";
import { useApiCall } from "../Utils/api";

const Home = () => {
  const client = new W3CWebSocket("ws://eagle.bitstreak.in/ws");

  const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
      {/* <TextField
      id="search"
      type="text"
      placeholder="Filter By Name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 mr-1 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"  onClick={onClear}>X</button> */}
      <div className="relative">
        <div className="absolute top-4 left-3">
          <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500" />
        </div>
        <input
          type="text"
          value={filterText}
          onChange={onFilter}
          className="h-14 w-96 pl-10 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
          placeholder="Search Stock..."
        />
        <div className="absolute top-2 right-2">
          <button
            className="h-10 w-20 text-white rounded-lg bg-purple-500 hover:bg-purple-600"
            onClick={onClear}>
            Search
          </button>
        </div>
      </div>
    </>
  );

  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const [ltp, setltp] = useState([]);
  const [ltp2, setltp2] = useState([]);
  const [tab2, setTab2] = useState([]);

  const [m1, setm1] = useState({ 5000: {}, 30000: {}, 60000: {}, 300000: {}, 1800000: {} });
  const [m5, setm5] = useState([]);
  const [ltpD, setltpD] = useState({
    5000: {},
    30000: {},
    60000: {},
    300000: {},
    1800000: {},
  });
  const [time, settime] = useState({
    5000: Date.now(),
    30000: Date.now(),
    60000: Date.now(),
    300000: Date.now(),
    1800000: Date.now(),
  });
  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    client.onmessage = (message) => {
      if (isJsonString(message.data)) {
        let data = JSON.parse(message.data);
        if (data.ltp) {
          setltp(data.ltp);
        }
        if (data.candle1m) {
        }
      }
    };
  }, []);
  useEffect(() => {
    let dNow = Date.now();
    let mMap = { ...m1 };
    let timeMap = { ...time };
    let ltpMap = { ...ltp };
    let ltpDMap = { ...ltpD };
    Object.keys(timeMap).map((timeItem, index) => {
      let newSet = false;
      if (parseInt(dNow) > parseInt(timeMap[timeItem])) {
        Object.keys(ltp).map((item, index) => {
          if (m1[timeItem][item] !== undefined) {
            ltpDMap[timeItem][item] = Number(
              parseFloat(((ltp[item] - m1[timeItem][item]) * 100) / m1[timeItem][item]).toFixed(2)
            );
          } else {
            newSet = true;
            ltpDMap[5000] = {};
            ltpDMap[30000] = {};
            ltpDMap[60000] = {};
            ltpDMap[300000] = {};
            ltpDMap[1800000] = {};

            ltpDMap[5000][item] = "0.0";
            ltpDMap[30000][item] = "0.0";
            ltpDMap[60000][item] = "0.0";
            ltpDMap[300000][item] = "0.0";
            ltpDMap[1800000][item] = "0.0";
          }
        });
        if (timeItem === "30000") {
          console.log(
            "🚀 ~ file: Home.js ~ line 104 ~ Object.keys ~ timeItem",
            timeItem,
            typeof timeItem
          );
          let lt1 = [];
          Object.keys(ltpDMap[30000]).map((item, index) => {
            let t2 = { Symbol: item, Value: ltpDMap[30000][item] };
            lt1.push({ ...t2 });
          });
          setltp2(lt1);
        }
        if (timeItem === "5000") {
          console.log("🚀 ~ file: Home.js ~ line 113 ~ Object.keys ~ timeItem", timeItem, ltpDMap);
          let lt1 = [];
          Object.keys(ltpDMap[5000]).map((item, index) => {
            let t2 = {
              Symbol: item,
              LTP: ltp[item],
              PCT5: ltpDMap[5000][item],
              PCT30: ltpDMap[30000][item],
              PCT1m: ltpDMap[60000][item],
              PCT5m: ltpDMap[300000][item],
              PCT30m: ltpDMap[1800000][item],
            };
            lt1.push({ ...t2 });
          });
          console.log("🚀 ~ file: Home.js ~ line 129 ~ Object.keys ~ lt1", lt1);
          setTab2(lt1);
        }

        mMap[timeItem] = { ...ltp };
        timeMap[timeItem] = parseInt(dNow) + parseInt(timeItem);
      }
    });
    setltpD({ ...ltpDMap });
    setm1({ ...mMap });
    settime({ ...timeMap });
  }, [ltp]);

  const columns = [
    {
      name: "Symbol",
      selector: (row) => row.Symbol,
      sortable: true,
    },
    {
      name: "LTP",
      selector: (row) => row.LTP,
      sortable: true,
    },
    {
      name: "5 seconds",
      selector: (row) => row.PCT5,
      sortable: true,
    },
    {
      name: "30 seconds",
      selector: (row) => row.PCT30,
      sortable: true,
    },
    {
      name: "1 minute",
      selector: (row) => row.PCT1m,
      sortable: true,
    },
    {
      name: "5 minutes",
      selector: (row) => row.PCT5m,
      sortable: true,
    },
    {
      name: "30 minutes",
      selector: (row) => row.PCT30m,
      sortable: true,
    },
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const filteredItems = tab2
    ? tab2.filter(
        (item) => item.Symbol && item.Symbol.toLowerCase().includes(filterText.toLowerCase())
      )
    : [];
  console.log("🚀 ~ file: Sheets.js ~ line 96 ~ Filtering ~ filteredItems", filteredItems);

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

  return (
    <>
      <div className="flex flex-row">
        <main className="w-full">
          <div className="mx-auto max-w-5xl py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col">
              {/* <h1>LTP</h1> */}
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <DataTable
                      // title="LTP"
                      columns={columns}
                      data={filteredItems}
                      striped
                      // pagination
                      // paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                      subHeader
                      subHeaderComponent={subHeaderComponentMemo}
                      // selectableRows
                      persistTableHead
                    />{" "}
                  </div>
                </div>
              </div>
            </div>
            {/* <span>The WebSocket is currently {connectionStatus}</span> */}
            {/* <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4 text-center text-gray-400">
                Here goes your content. You can also go the About page.
              </div>
            </div> */}
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
};

// const Styles = styled.div`
//   padding: 1rem;

//   table {
//     border-spacing: 0;
//     border: 1px solid black;

//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }

//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;

//       :last-child {
//         border-right: 0;
//       }
//     }
//   }
// `

// function Table({ columns, data }) {
//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
//     {
//       columns,
//       data,
//     },
//     useSortBy
//   );

//   // We don't want to render all 2000 rows for this example, so cap
//   // it at 20 for this use case
//   // const firstPageRows = rows.slice(0, 20)
//   const firstPageRows = rows;

//   return (
//     <>
//       <table {...getTableProps()}>
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 // Add the sorting props to control sorting. For this example
//                 // we can add them into the header props
//                 <th {...column.getHeaderProps(column.getSortByToggleProps())}>
//                   {column.render("Header")}
//                   {/* Add a sort direction indicator */}
//                   <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {firstPageRows.map((row, i) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map((cell) => {
//                   return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <br />
//       {/* <div>Showing the first 20 results of {rows.length} rows</div> */}
//     </>
//   );
// }
export { Home };
