import React from "react";
import Game from "./pages/Game";
import { BrowserRouter} from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Game />
      </BrowserRouter>
    </>
  );
}

export default App;
