import React, { useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import Button from "@mui/material/Button";
import MuiMenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import { Box, Typography } from "@mui/material";
import { data } from "./MakeData";
import * as Models from "./Models";
const MenuItem = styled(MuiMenuItem)({
  display: "flex",
  gap: "0.75rem",
});

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
        size: 20,
      },
      {
        accessorKey: "bass",
        header: "Bass",
        size: 20,
      },
      {
        accessorKey: "duration",
        header: "Duration",
        size: 50,
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
        gridTemplateColumns: { xs: "auto", lg: "48% 50% " },
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
          <Typography color="primary" variant="h4">
            All Songs
          </Typography>
        )}
      />
      <MaterialReactTable
        {...commonTableProps}
        data={data2}
        getRowId={(originalRow) => `table-2-${originalRow.firstName}`}
        enableRowActions
        enableRowOrdering
        renderRowActionMenuItems={({ row, closeMenu }) => [
          <MenuItem
            key={1}
            onClick={() => {
              console.log("View Profile", row);
              closeMenu();
            }}
          >
            <AccountCircleIcon /> View Profile
          </MenuItem>,
          <MenuItem
            key={2}
            onClick={() => {
              console.info("Remove", row);
              closeMenu();
            }}
          >
            <DeleteIcon /> Remove
          </MenuItem>,
          <MenuItem
            key={3}
            onClick={() => {
              console.info("Share", row);
              closeMenu();
            }}
          >
            <ShareIcon /> Share
          </MenuItem>,
        ]}
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
          <Typography color="secondary" variant="h4">
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
