import React, { useState, useEffect } from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result"
import Help from "./pages/Help";

const App = () =>{
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element ={<Home/>}/>
        <Route path="/Home" element ={<Home/>}/>
        <Route path="/results" element ={<Result/>}/>
        <Route path = "/help" element = {<Help/>}/>
      </Routes>
    </BrowserRouter>
  )

}


export default App;

