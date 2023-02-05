import { Link } from "@mui/material";

const UploadDb = () => {
  return (
    <>
      <form
        action="http://localhost:3001/journey"
        method="post"
        encType="multipart/form-data"
        className="light-border"
        style={{ textAlign: "left", padding: "10px" }}
      >
        <input className="light-border" type="file" name="file" />
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
      >
        <input className="light-border" type="file" name="file" />
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
