import "./App.css";
import { WebBar } from "./components/WebBar";
import { MainProvider } from "./contexts/MainContext";

function App() {
  return (
    <div>
      <MainProvider>
        <WebBar></WebBar>
      </MainProvider>
    </div>
  );
}

export default App;
