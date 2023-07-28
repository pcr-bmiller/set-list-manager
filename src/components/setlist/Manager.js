import React, { useMemo, useState, useEffect, useCallback } from "react";
import { MaterialReactTable } from "material-react-table";
import Button from "@mui/material/Button";
import MuiMenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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
import { midi } from "./MidiData";
import * as Models from "./Models";
import Stats from "./Stats";
import axios from "axios";
import dayjs from "dayjs";

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

    if (songsRead) {
      // Set All Songs

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

      setSetLists(setlistsRead);
    }
    return setlistsRead;
  };
  const refreshSetLists = async (pSetList = null) => {
    let setLists = await getSetlists();

    await handleSetlist(pSetList, setLists);
  };
  const handleSetlist = async (sl = null, pSetlists = null, pSetList = null) => {
    if (pSetlists === null) {
      pSetlists = setLists;
    }

    let slId = null;
    setIsDirty(false);
    console.log("handleSetlist = ", sl);
    let sls = pSetlists;

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
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const searchArtists = async (e) => {
    let token = window.localStorage.getItem("token");
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
        scope: "playlist-modify-public",
      },
    });
    // const { data } = await axios.post("https://api.spotify.com/v1/users/1l0zk6d4pz0q134u03wfv2fzq/playlists", {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    //   params: {
    //     q: searchKey,
    //     type: "artist",
    //   },
    // });
    setArtists(data.artists.items);
  };
  const handleCreateNewRow = (values) => {
    console.log("POST VALUES = ", values);
    allSongs.push(values);
    setAllSongs([...allSongs]);
  };
  const handleCreateNewSetList = async (values) => {
    console.log("POST VALUES = ", values);
    let songs = await getSongsBody();
    let body = {};
    body["PartitionKey"] = "ROTTEN";
    body["RowKey"] = `${values.Name}_${values.Date}`;
    body = { ...body, ...songs, ...values, Version: 1 };

    let response = await Models.postTable({ table: "SETLIST", body });
    props.handleAlert("Setlist Created!", "success");
    document.cookie = `x_setlist=${values.Name}_${values.Date}`;
    refreshSetLists();

    // allSongs.push(values);
    // setAllSongs([...allSongs]);
  };
  const handleEditSetList = (values) => {
    console.log("PATCH VALUES = ", values);
    updateSetlistName(values.Name);
    refreshSetLists();
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

  const updateSetlistName = async (name = null) => {
    let id = setListDetails ? setListDetails.rowkey : null;
    if (name && id) {
      let body = { Name: name };
      console.log("body = ", body);
      let response = await Models.patchTable({ table: "SETLIST", id, body });
      props.handleAlert("Setlist Name Updated!", "success");
    }
  };

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
  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id}>
        {artist.images.length ? (
          <img width={"100%"} src={artist.images[0].url} alt="" />
        ) : (
          <div>No Image</div>
        )}
        {artist.name}
      </div>
    ));
  };

  // const saveSetlist = async () => {
  //   console.log("setListDetails = ", setListDetails);
  //   console.log("setList = ", setList);
  //   if (setListDetails) {
  //     console.log("setList = ", setList);
  //     console.log("setListDetails = ", setListDetails);
  //     let id = setListDetails.rowkey;
  //     let body = await getSongsBody();
  //     // console.log("body = ", body);
  //     // let response = await Models.patchTable({ table: "SETLIST", id, body });
  //     // props.handleAlert("Setlist Updated!", "success");
  //     // console.log("Patch response = ", response);
  //   }
  // };

  const getSongsBody = async () => {
    let body = {};
    body = { setlist: [...setList] };
    body = { Songs: JSON.stringify(body) };
    return body;
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
          mode="New"
          onSubmit={handleCreateNewSetList}
        />
        <SetListModal
          columns={setListColumns}
          open={editSetListModalOpen}
          onClose={() => setEditSetListModalOpen(false)}
          mode="Edit"
          setListDetails={setListDetails}
          onSubmit={handleEditSetList}
        />
      </Box>
      {/* <form onSubmit={searchArtists}>
        <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
        <button type={"submit"}>Search</button>
      </form>
      {renderArtists()} */}
      <br />
      {/* <Box
        sx={{
          display: "grid",
          align: "center",
          // gridTemplateColumns: { xs: "auto", lg: "48% 50% " },
          // gap: "1rem",
          // overflow: "auto",
        }}
      >
        <Table size="small" className="preview-panel" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Guitar</TableCell>
              <TableCell align="center">
                <img src="../filter-logo.png" className="preview-logo" alt="Filter" />
              </TableCell>

              <TableCell align="right">V2</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((x) => {
              return (
                <TableRow>
                  <TableCell className={`preview-tuning preview-${x.Guitar}`}>{x.Guitar}</TableCell>
                  <TableCell className={`preview-tuning preview-title`}>{x.Name}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <br />
        <Table size="small" className="preview-panel" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Bass</TableCell>
              <TableCell align="center">
                <img src="../filter-logo.png" className="preview-logo" alt="Filter" />
              </TableCell>
              <TableCell align="right">V2</TableCell>
            </TableRow>
          </TableHead>
        </Table>
        <Table size="small" className="preview-panel" aria-label="a dense table">
          <TableBody>
            {data.map((x, i) => {
              return (
                <TableRow>
                  <TableCell>
                    <TableCell className={`preview-tuning preview-group-${midi[i].group}`}>
                      {midi[i].button}
                    </TableCell>
                    <TableCell className={`preview-tuning preview-${x.Bass}`}>{x.Bass}</TableCell>
                  </TableCell>
                  <TableCell className={`preview-tuning preview-title`}>{x.Name}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box> */}
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
export const SetListModal = ({
  open,
  columns,
  onClose,
  onSubmit,
  mode = "New",
  setListDetails = null,
}) => {
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
            {console.log(
              "setListDetails component = ",
              mode === "Edit" && setListDetails ? setListDetails.Name : null
            )}
            {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                defaultValue={mode === "Edit" && setListDetails ? setListDetails.Name : null}
                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
              />
            ))}
            {mode === "New" && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="muiDateControlInput"
                  name="showDate"
                  id="Date"
                  onChange={(e) => {
                    let date = dayjs(e).format("YYYY-MM-DD");
                    setValues({ ...values, Date: date });
                    // handleDateChange(date, 'datetime-from');
                  }}
                  // value={dateTimeFrom && dayjs.utc(dateTimeFrom)} onChange={() => {}} />
                />
              </LocalizationProvider>
              // <TextField
              //   key={"date"}
              //   label={"Show Date"}
              //   name={"showdate"}
              //   defaultValue={mode === "Edit" && setListDetails ? setListDetails.Date : null}
              //   onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
              // />
            )}
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
