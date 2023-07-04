import React, { useMemo, useState, useEffect, useCallback } from "react";
import { MaterialReactTable } from "material-react-table";
import Button from "@mui/material/Button";
import MuiMenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PrintIcon from "@mui/icons-material/Print";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import Badge from "@mui/material/Badge";
import { Box, Typography } from "@mui/material";
import { getCookie } from "../utils/HelperFunctions";
import { data } from "./MakeData";
import * as Models from "./Models";
import Stats from "./Stats";

const SetlistManager = (props) => {
  const [dataRead, setData] = useState({});

  const [allSongs, setAllSongs] = useState([]);
  const [setList, setSetList] = useState([]);
  const [setLists, setSetLists] = useState([]);
  const [setListDetails, setSetListDetails] = useState(null);

  const [numberOfSongs, setNumberOfSongs] = useState("");
  // const [allSongs, setAllSongs] = useState([]);
  // const [setLists, setSetLists] = useState([]);

  const [draggingRow, setDraggingRow] = useState(null);
  const [hoveredTable, setHoveredTable] = useState(null);
  const [rowSelection, setRowSelection] = useState({});
  useEffect(() => {
    getRecordData();
  }, []);

  const getRecordData = async () => {
    let songs = await getSongs();
    let setLists = await getSetlists();

    await handleSetlist(null, setLists, songs);
  };

  const getSongs = async () => {
    let songsRead = await Models.getTable({ table: "SONG" });
    console.log("songsRead= ", songsRead);
    if (songsRead) {
      // Set All Songs
      console.log("set all songs = ", songsRead);
      setAllSongs(songsRead);
    }
    return songsRead;
  };
  const getSetlists = async () => {
    let setlistsRead = await Models.getTable({ table: "SETLIST" });
    if (setlistsRead) {
      // Set All Songs

      for (let sl of setlistsRead) {
        sl["label"] = sl.Name;
        sl["value"] = sl.rowkey;
      }
      console.log("set setlists = ", setlistsRead);
      setSetLists(setlistsRead);
    }
    return setlistsRead;
  };
  const handleSetlist = async (sl = null, pSetlists = null, pSetList = null) => {
    if (pSetlists === null) {
      pSetlists = setLists;
    }

    let slId = null;
    setIsDirty(false);
    console.log("handleSetlist = ", sl);
    let sls = pSetlists;
    console.log("SL 1=== ", sl);
    // if (sl === null) {
    //   if (setList !== null) {
    //     sl = setList;
    //     console.log("SL 2=== ", sl);
    //   }
    // }
    if (sl !== null) {
      slId = sl.value;
      console.log("slid 1= ", slId);
      document.cookie = `x_setlist=${slId}`;
    } else {
      if (getCookie("x_setlist")) {
        slId = getCookie("x_setlist");
        console.log("slid2 = ", slId);
      }
    }

    if (pSetlists.length > 0 && slId) {
      sl = sls.filter((x) => {
        return x.value === slId;
      });
      console.log("SL3 === ", sl);
      if (sl.length > 0) {
        setSetListDetails(sl[0]);
        if (sl[0]["Songs"]) {
          console.log("json string = ", sl[0].Songs);
          sl = JSON.parse(sl[0].Songs);
          console.log("parse = ", sl);
          console.log("after = ", sl.setlist);

          setSetList(sl.setlist);
        }
      }
    }
  };

  useEffect(() => {
    if (setList.length > 0) {
    }
  }, [setList]);

  useEffect(() => {
    //do something when the row selection changes...
  }, [rowSelection]);
  // const columns = [];
  //column definitions...
  const columns = useMemo(
    () => [
      {
        accessorKey: "Name", //access nested data with dot notation
        header: "Song",
        size: 150,
      },
      {
        accessorKey: "Guitar",
        header: "Guitar",
        size: 20,
      },
      {
        accessorKey: "Bass",
        header: "Bass",
        size: 20,
      },
      {
        accessorKey: "Duration",
        header: "Duration",
        size: 50,
      },
    ],
    []
  );
  const setListColumns = useMemo(
    () => [
      {
        accessorKey: "Name", //access nested data with dot notation
        header: "Name",
        size: 150,
      },
    ],
    []
  );
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createSetListModalOpen, setCreateSetListModalOpen] = useState(false);
  const [editSetListModalOpen, setEditSetListModalOpen] = useState(false);
  const [tableData, setTableData] = useState(() => [...setList]);
  const [validationErrors, setValidationErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);

  const handleCreateNewRow = (values) => {
    console.log("POST VALUES = ", values);
    allSongs.push(values);
    setAllSongs([...allSongs]);
  };
  const handleCreateNewSetList = (values) => {
    console.log("POST VALUES = ", values);
    // allSongs.push(values);
    // setAllSongs([...allSongs]);
  };
  const handleEditSetList = (values) => {
    console.log("PATCH VALUES = ", values);
    // allSongs.push(values);
    // setAllSongs([...allSongs]);
  };
  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      allSongs[row.index] = values;
      console.log("allSongs", allSongs);
      //send/receive api updates here, then refetch or update local table data for re-render
      setAllSongs([...allSongs]);
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    (row) => {
      // if (!confirm(`Are you sure you want to delete ${row.getValue("firstName")}`)) {
      //   return;
      // }
      //send api delete request here, then refetch or update local table data for re-render
      allSongs.splice(row.index, 1);
      setAllSongs([...allSongs]);
    },
    [allSongs]
  );

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid = true;
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors]
  );

  const commonTableProps = {
    columns,
    enableRowDragging: true,
    enableFullScreenToggle: false,
    muiTableContainerProps: {
      sx: {
        minHeight: "450px",
      },
    },
    onDraggingRowChange: setDraggingRow,
    state: { draggingRow, rowSelection },
  };

  return (
    <>
      <Stats
        allSongs={allSongs}
        setLists={setLists}
        setList={setList}
        setListDetails={setListDetails}
        setCreateSetListModalOpen={setCreateSetListModalOpen}
        setEditSetListModalOpen={setEditSetListModalOpen}
        handleSetlist={handleSetlist}
        handleAlert={props.handleAlert}
        isDirty={isDirty}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "auto", lg: "48% 50% " },
          gap: "1rem",
          overflow: "auto",
        }}
      >
        <MaterialReactTable
          {...commonTableProps}
          data={allSongs}
          initialState={{ density: "compact" }}
          editingMode="modal" //default
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton color="inherit" onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="inherit" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          renderTopToolbarCustomActions={() => (
            <Button color="primary" onClick={() => setCreateModalOpen(true)} variant="contained">
              Add New Song
            </Button>
          )}
          defaultColumn={{
            size: 100,
          }}
          getRowId={(originalRow) => `table-1-${originalRow.firstName}`}
          muiTableBodyRowDragHandleProps={{
            onDragEnd: () => {
              if (hoveredTable === "table-2") {
                setSetList((setList) => [...setList, draggingRow.original]);
                setAllSongs((allSongs) => allSongs.filter((d) => d !== draggingRow.original));
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
          // renderTopToolbarCustomActions={() => (
          //   <Typography color="primary" variant="h4">
          //     All Songs
          //   </Typography>
          // )}
        />
        {/* SETLIST  */}
        <MaterialReactTable
          {...commonTableProps}
          data={setList}
          getRowId={(originalRow) => `table-2-${originalRow.Name}`}
          initialState={{ density: "compact" }}
          enableRowOrdering
          muiTableBodyRowDragHandleProps={({ table }) => ({
            onDragEnd: () => {
              if (hoveredTable === "table-1") {
                setAllSongs((allSongs) => [...allSongs, draggingRow.original]);
                setSetList((setList) => setList.filter((d) => d !== draggingRow.original));
                setIsDirty(true);
              }
              setHoveredTable(null);
              const { draggingRow, hoveredRow } = table.getState();
              console.log("hoveredRow", hoveredRow);
              if (hoveredRow && draggingRow) {
                setList.splice(hoveredRow.index, 0, setList.splice(draggingRow.index, 1)[0]);
                setSetList([...setList]);
                setIsDirty(true);
              }
            },
          })}
          muiTablePaperProps={{
            onDragEnter: () => setHoveredTable("table-2"),
            sx: {
              outline: hoveredTable === "table-2" ? "2px dashed pink" : undefined,
            },
          }}
          renderTopToolbarCustomActions={() => (
            <Typography color="primary" variant="h4">
              Setlist
            </Typography>
          )}
          onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
          // enableRowActions
          // renderRowActionMenuItems={({ row, closeMenu }) => [
          //   <MenuItem
          //     key={1}
          //     onClick={() => {
          //       console.log("View Profile", row);
          //       closeMenu();
          //     }}
          //   >
          //     <AccountCircleIcon /> View Profile
          //   </MenuItem>,
          //   <MenuItem
          //     key={2}
          //     onClick={() => {
          //       console.info("Remove", row);
          //       closeMenu();
          //     }}
          //   >
          //     <DeleteIcon /> Remove
          //   </MenuItem>,
          //   <MenuItem
          //     key={3}
          //     onClick={() => {
          //       console.info("Share", row);
          //       closeMenu();
          //     }}
          //   >
          //     <ShareIcon /> Share
          //   </MenuItem>,
          // ]}
          // enableRowSelection
          // state={{ rowSelection }} //pass our managed row selection state to the table to use
        />
        <CreateNewSongModal
          columns={columns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handleCreateNewRow}
        />
        <SetListModal
          columns={setListColumns}
          open={createSetListModalOpen}
          onClose={() => setCreateSetListModalOpen(false)}
          onSubmit={handleCreateNewSetList}
        />
        <SetListModal
          columns={setListColumns}
          open={editSetListModalOpen}
          onClose={() => setEditSetListModalOpen(false)}
          onSubmit={handleEditSetList}
        />
      </Box>
    </>
  );
};

export const CreateNewSongModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Add New Song</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export const SetListModal = ({ open, columns, onClose, onSubmit, mode = "New" }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">{mode} Setlist</DialogTitle>
      <DialogContent className="modal-padding">
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SetlistManager;
