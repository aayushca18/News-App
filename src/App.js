import "./App.css";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
const App =()=> {
  
  const [progress, setProgress] = useState(0)

  
  
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar color="#f11946" progress={progress} />
          <Routes>
            <Route path="/general" element={<News setProgress={setProgress} key="general" country="ca" category="general"/>}/>
            <Route path="/business" element={<News setProgress={setProgress} key="business" country="ca" category="business"/>}/>
            <Route path="/entertainment" element={<News setProgress={setProgress} key="entertainment" country="ca" category="entertainment"/>}/>
            <Route path="/health" element={<News setProgress={setProgress} key="health" country="ca" category="health"/>}/>
            <Route path="/science" element={<News setProgress={setProgress} key="science" country="ca" category="science"/>}/>
            <Route path="/sports" element={<News  setProgress={setProgress} key="sports" country="ca" category="sports"/>} />
            <Route path="/technology" element={<News setProgress={setProgress} key="technology" country="ca" category="technology"/>} />
          </Routes>
        </Router>
      </div>
    );
  
}
export default App;