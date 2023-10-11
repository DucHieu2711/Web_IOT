import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./components/Home/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import DetailsAir from "./components/DetailsAir/DetailsAir";
import DetailsWater from "./components/DetailsWater/DetailsWater";
import { useState } from "react";
import Statiscal from "./components/Statistical/Statistical";
import AirStatistical from "./components/AirStatistical/AirStatistical";

function App() {
  const [humidity, setHumidity] = useState(null);
  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detailsAir/:stationId" element={ <DetailsAir />}/>
        <Route path="/detailsWater/:stationId" element={<DetailsWater />} />
        <Route path="/statistical" element={<Statiscal />} />
        <Route path="/abc" element={<AirStatistical />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
