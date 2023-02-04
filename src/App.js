import logo from './logo.svg';
import './App.css';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <>
      <form
        action="http://localhost:3001/journeyFile"
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
        action="http://localhost:3001/stationFile"
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
}

export default App;
