import { useState } from "react";

const UploadDb = () => {
  const [file, setFile] = useState();
  return (
    <>
      <form
        action="http://localhost:3001/journey"
        method="post"
        encType="multipart/form-data"
        className="light-border"
        style={{ textAlign: "left", padding: "10px" }}
        onSubmit={async (evt) => {
          evt.preventDefault();
          const fd = new FormData();
          fd.append("file", file);
          const fetchOptions = {
            method: "POST",
            body: fd,
          };
          await fetch("http://localhost:3001/journey", fetchOptions);
        }}
      >
        <input
          className="light-border"
          type="file"
          name="file"
          onChange={(evt) => {
            setFile(evt.target.files[0]);
          }}
        />
        <button
          className="light-border"
          type="submit"
          style={{ width: "150px" }}
        >
          Upload Journey
        </button>
      </form>
      <form
        action="http://localhost:3001/station"
        method="post"
        encType="multipart/form-data"
        className="light-border"
        style={{ textAlign: "left", padding: "10px" }}
        onSubmit={async (evt) => {
          evt.preventDefault();
          const fd = new FormData();
          fd.append("file", file);
          const fetchOptions = {
            method: "POST",
            body: fd,
          };
          await fetch("http://localhost:3001/station", fetchOptions);
        }}
      >
        <input
          className="light-border"
          type="file"
          name="file"
          onChange={(evt) => {
            setFile(evt.target.files[0]);
          }}
        />
        <button
          className="light-border"
          type="submit"
          style={{ width: "150px" }}
        >
          Upload Station
        </button>
      </form>
    </>
  );
};

export { UploadDb };
