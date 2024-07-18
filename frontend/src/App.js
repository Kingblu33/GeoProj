import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Content from "./pages/Content";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import ResultsChange from "../src/pages/ResultsChange"

const App = () =>{
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element ={<LandingPage/>}/>
        <Route path="/TBD" element ={<Home/>}/>
        <Route path="/Home" element ={<Home/>}/>
        <Route path = "/help" element = {<Content/>}/>
        <Route path = "/Dashboard" element = {<LandingPage/>}/>
        <Route path = "/Notfound" element = {<NotFound/>}/>
        <Route path = "/TestResult" element = {<ResultsChange/>}/>
      </Routes>
    </BrowserRouter>
  )

}


export default App;

