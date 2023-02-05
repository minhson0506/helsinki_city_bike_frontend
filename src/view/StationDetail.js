import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { useJourney, useStation } from "../hooks/Apihooks";
import { createJourney, createStationDetail, headCells } from "../utils/table";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableHead, TableSortLabel, Toolbar, Typography } from "@mui/material";

const StationDetail = () => {
  const { id } = useContext(MainContext);
  const { getStationById } = useStation();
  const { getAllJourneys } = useJourney();

  const [rows, setRows] = useState();

  const { loading, setLoading } = useContext(MainContext);

  const [journeyData, setJourneyData] = useState();

  // get data of journey
  const getJourneys = async () => {
    try {
      const response = await getAllJourneys();
      if (response) {
        let data = [];
        response.forEach(async (element) => {
          data.push(
            createJourney(
              element.Id,
              element.Departure.split("T")[0] +
                " " +
                element.Departure.split("T")[1].substr(0, 8),
              element.Return_.split("T")[0] +
                " " +
                element.Departure.split("T")[1].substr(0, 8),
              element.Departure_station,
              element.Departure_station_name,
              element.Return_station,
              element.Return_station_name,
              element.Distance / 1000,
              Math.round(element.Duration / 6) / 10
            )
          );
        });
        setJourneyData(data);
        setLoading(!loading);
      }
    } catch (error) {
      console.log("error when get all journeys", error);
    }
  };

  const getData = async () => {
    await getJourneys();
    if (id !== "" && journeyData) {
      try {
        const response = await getStationById(id);
        if (response) {
          response.forEach((element) => {
            const start = journeyData.filter(
              (obj) => obj.departureId === id
            );
            const end = journeyData.filter((obj) => obj.returnId === id);
            const totalStart = 
              start
              .reduce((a, b) => a + b.distance, 0.0);
            const totalEnd = end
              .reduce((a, b) => a + b.distance, 0.0);
            setRows(
              createStationDetail(
                element.Name,
                element.Address,
                start.length,
                end.length,
                Math.round(totalStart / start.length * 10) /10 || 0,
                Math.round(totalEnd / end.length * 10) /10 || 0
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
      ) : (
        <></>
      )}
    </>
  );
};

export { StationDetail };
