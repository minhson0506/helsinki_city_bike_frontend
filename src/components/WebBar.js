import * as React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import { Journey } from "../view/Journey";
import { Station } from "../view/Station";
import { UploadDb } from "../view/UploadDB";

const WebBar = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <>
      <div>
        <div>
          <Button
            variant="text"
            onClick={() => {
              toggleTab(1);
            }}
          >
            Journey
          </Button>
          <Button
            variant="text"
            onClick={() => {
              toggleTab(2);
            }}
          >
            Station
          </Button>
          <Button
            variant="text"
            onClick={() => {
              toggleTab(3);
            }}
          >
            Upload data
          </Button>
        </div>
        {toggleState === 1 ? (
          <Journey />
        ) : (
          <> {toggleState === 2 ? <Station /> : <UploadDb />} </>
        )}
      </div>
    </>
  );
};

export { WebBar };
