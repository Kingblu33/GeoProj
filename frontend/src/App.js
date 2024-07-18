import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result"
import Content from "./pages/Content";
import LandingPage from "./pages/LandingPage";

const App = () =>{
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element ={<LandingPage/>}/>
        <Route path="/Home" element ={<Home/>}/>
        <Route path="/results" element ={<Result/>}/>
        <Route path = "/help" element = {<Content/>}/>
        <Route path = "/LandingPage" element = {<LandingPage/>}/>
      </Routes>
    </BrowserRouter>
  )

}


export default App;

