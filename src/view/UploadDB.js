const UploadDb = () => {
  return (
    <>
      <form
        action="http://localhost:3001/journey"
        method="post"
        enctype="multipart/form-data"
        class="light-border"
      >
        <input class="light-border" type="file" name="file" />
        <button class="light-border" type="submit">
          Upload Journey
        </button>
      </form>
      <form
        action="http://localhost:3001/station"
        method="post"
        enctype="multipart/form-data"
        class="light-border"
      >
        <input class="light-border" type="file" name="file" />
        <button class="light-border" type="submit">
          Upload Station
        </button>
      </form>
    </>
  );
};

export { UploadDb };
