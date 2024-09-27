import React from "react";
import Game from "./pages/Game";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
