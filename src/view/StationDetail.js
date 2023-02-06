import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { useStation } from "../hooks/Apihooks";
import { createStationDetail, headCells } from "../utils/table";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableHead, TableSortLabel, Toolbar, Typography } from "@mui/material";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import { Icon } from "leaflet";

const StationDetail = () => {
  const { id } = useContext(MainContext);
  const { getStationById } = useStation();

  const [rows, setRows] = useState();

  const { loading, journeyData } = useContext(MainContext);

  const getData = async () => {
    if (id !== "" && journeyData) {
      try {
        const response = await getStationById(id);
        if (response) {
          response.forEach((element) => {
            const start = journeyData.filter((obj) => obj.departureId === id);
            const end = journeyData.filter((obj) => obj.returnId === id);
            const totalStart = start.reduce((a, b) => a + b.distance, 0.0);
            const totalEnd = end.reduce((a, b) => a + b.distance, 0.0);
            setRows(
              createStationDetail(
                element.Name,
                element.Address,
                start.length,
                end.length,
                Math.round((totalStart / start.length) * 10) / 10 || 0,
                Math.round((totalEnd / end.length) * 10) / 10 || 0,
                element.x,
                element.y
              )
            );
          });
        }
      } catch (error) {
        console.log("error when get detail station", error);
      }
    }
  };
  useEffect(() => {
    getData();
  }, [loading]);

  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Station detail
        </Typography>
      </Toolbar>
      {rows !== undefined ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {headCells[2].map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align={"center"}
                      padding={"normal"}
                    >
                      <TableSortLabel>{headCell.label}</TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow
                  key={rows.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {rows.name}
                  </TableCell>
                  <TableCell key={rows.address} align="center">
                    {rows.address}
                  </TableCell>
                  <TableCell align="center">{rows.start}</TableCell>
                  <TableCell align="center">{rows.end}</TableCell>
                  <TableCell align="center">{rows.distanceStart}</TableCell>
                  <TableCell align="center">{rows.distanceEnd}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <MapContainer
            center={[rows.y, rows.x]}
            zoom={15}
            scrollWheelZoom={true}
            style={{ height: 1000 }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[rows.y, rows.x]}
              icon={
                new Icon({
                  iconUrl: markerIconPng,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })
              }
            >
              <Popup>
                {rows.name} station<br /> {rows.address}
              </Popup>
            </Marker>
          </MapContainer>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export { StationDetail };
