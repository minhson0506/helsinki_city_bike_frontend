const UploadDb = () => {
  return (
    <>
      <form
        action="http://localhost:3001/journey"
        method="post"
        enctype="multipart/form-data"
        class="light-border"
        style={{textAlign: "left", padding: "10px"}}
      >
        <input class="light-border" type="file" name="file" />
        <button class="light-border" type="submit" style={{width: "150px"}}>
          Upload Journey
        </button>
      </form>
      <form
        action="http://localhost:3001/station"
        method="post"
        enctype="multipart/form-data"
        class="light-border"
        style={{textAlign: "left", padding: "10px"}}
      >
        <input class="light-border" type="file" name="file" />
        <button class="light-border" type="submit" style={{width: "150px"}}>
          Upload Station
        </button>
      </form>
    </>
  );
};

export { UploadDb };
