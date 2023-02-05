import * as React from "react";
import { useState } from "react";
import { Journey } from "../view/Journey";
import { Station } from "../view/Station";
import { UploadDb } from "../view/UploadDB";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import {MainContext} from "../contexts/MainContext";
import {StationDetail} from "../view/StationDetail";

const WebBar = () => {
  const [toggleState, setToggleState] = useState(1);

  const {navigator, setNavigator}  = React.useContext(MainContext)

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const pages = ["JOURNEY", " STATION", "UPLOAD DATA"];
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, index) => (
                <Button
                  key={page}
                  onClick={() => {
                    setNavigator(false)
                    toggleTab(index);
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {navigator? <StationDetail></StationDetail> : toggleState === 0 ? (
        <Journey />
      ) : (
        <> {toggleState === 1 ? <Station /> : <UploadDb />} </>
      )}
      
    </>
  );
};

export { WebBar };
