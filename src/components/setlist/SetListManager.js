import React, { useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Typography } from "@mui/material";
import { data } from "./MakeData";
import * as Models from "./Models";

const SetListManager = () => {
  const [dataRead, setData] = useState({});
  const [data1, setData1] = useState(() => data.slice(0, 3));
  const [data2, setData2] = useState(() => data.slice(3, 5));

  const [draggingRow, setDraggingRow] = useState(null);
  const [hoveredTable, setHoveredTable] = useState(null);
  const [rowSelection, setRowSelection] = useState({});
  useEffect(() => {
    getRecordData();
  }, []);

  const getRecordData = async () => {
    let response = await Models.getData();
    console.log("response = ", response);
    return response;
  };

  useEffect(() => {
    //do something when the row selection changes...
  }, [rowSelection]);
  // const columns = [];
  //column definitions...
  const columns = useMemo(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Song",
        size: 150,
      },
      {
        accessorKey: "guitar",
        header: "Guitar",
        size: 150,
      },
      {
        accessorKey: "bass",
        header: "Bass",
        size: 150,
      },
      {
        accessorKey: "duration",
        header: "Duration",
        size: 150,
      },
    ],
    []
  );

  const commonTableProps = {
    columns,
    enableRowDragging: true,
    enableFullScreenToggle: false,
    muiTableContainerProps: {
      sx: {
        minHeight: "320px",
      },
    },
    onDraggingRowChange: setDraggingRow,
    state: { draggingRow },
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "auto", lg: "1fr 1fr" },
        gap: "1rem",
        overflow: "auto",
        p: "4px",
      }}
    >
      <MaterialReactTable
        {...commonTableProps}
        data={data1}
        defaultColumn={{
          size: 100,
        }}
        getRowId={(originalRow) => `table-1-${originalRow.firstName}`}
        muiTableBodyRowDragHandleProps={{
          onDragEnd: () => {
            if (hoveredTable === "table-2") {
              setData2((data2) => [...data2, draggingRow.original]);
              setData1((data1) => data1.filter((d) => d !== draggingRow.original));
            }
            setHoveredTable(null);
          },
        }}
        muiTablePaperProps={{
          onDragEnter: () => setHoveredTable("table-1"),
          sx: {
            outline: hoveredTable === "table-1" ? "2px dashed pink" : undefined,
          },
        }}
        renderTopToolbarCustomActions={() => (
          <Typography color="success.main" variant="h4">
            All Songs
          </Typography>
        )}
      />
      <MaterialReactTable
        {...commonTableProps}
        data={data2}
        getRowId={(originalRow) => `table-2-${originalRow.firstName}`}
        muiTableBodyRowDragHandleProps={{
          onDragEnd: () => {
            if (hoveredTable === "table-1") {
              setData1((data1) => [...data1, draggingRow.original]);
              setData2((data2) => data2.filter((d) => d !== draggingRow.original));
            }
            setHoveredTable(null);
          },
        }}
        muiTablePaperProps={{
          onDragEnter: () => setHoveredTable("table-2"),
          sx: {
            outline: hoveredTable === "table-2" ? "2px dashed pink" : undefined,
          },
        }}
        renderTopToolbarCustomActions={() => (
          <Typography color="error.main" variant="h4">
            Set List
          </Typography>
        )}
        enableRowSelection
        onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
        state={{ rowSelection }} //pass our managed row selection state to the table to use
      />
    </Box>
  );
};

export default SetListManager;
