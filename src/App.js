// Importing libraries

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// Importing other pages

import HomePage from "./Pages/home";
import FormPage from "./Pages/form";
import Mapsearch from "./Pages/mapsearch";
import Ho from "./Components/Temp/h";

// Importing Style

import "./App.css";
import 'antd/dist/antd.css';

function App() {
  return (
    <Router>
      <Routes>

        <Route exact path="/form" element={<FormPage />} />

        <Route exact path="/" element={<Ho />} />
      </Routes>
    </Router>
  );
}

export default App;
