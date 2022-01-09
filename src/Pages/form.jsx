// Importing libraries

import { Link } from "react-router-dom";

// Importing Components

import Upload from "../Components/Upload/upload";
import axios from "axios";
import Map from "../Components/Map/map.component";
import { useState } from "react";
import "./form-style.scss";
import PopUp from "../Components/PopUp/Popup";
import PopupLoader from "../Components/PopUpLoader/PopupLoader";
import Nav from "../Components/Tailwind/Nav";

// Importing Style

import "./form.scss";

function FormPage() {
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [initlat, setInitLat] = useState(0);
  const [initlng, setInitLng] = useState(0);
  var loading = false;

  const IP_API = "https://api.ipify.org?format=json";
  const lat_lng_API = "https://freegeoip.app/json/";

  const getIP = async () => {
    loading = true;
    const response = await axios.get(IP_API);
    const response2 = await axios.get(lat_lng_API + response.data.ip);
    if(lat===0 && lng===0){
      setLat(response2.data.latitude);
      setLng(response2.data.longitude);
    }
    loading = false;
  }

  getIP();



  const [loader, setLoader] = useState(false); 

  const GEO_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
  const GEO_TOKEN = ".json?access_token=pk.eyJ1IjoiMTliY2UxNTg5IiwiYSI6ImNreDZmZ3BiYjJkbTUydHB6cTJsNnp3YWMifQ.TJvAZRxMbuzSAqsza-eKnQ";

  function render_check() {
    return (
      <Map lat={lat} lng={lng} />
    )
  }

  const getlatlng = async (e) => {
    console.log(city, area);
    const response = await axios.get(GEO_URL + city + "%20" + area + GEO_TOKEN);
    setLat(response.data.features[0].geometry.coordinates[1]);
    setLng(response.data.features[0].geometry.coordinates[0]);
    render_check();
  }



  return (
    <div className="form">
      {console.log("initlat", initlat)}
      {console.log("initlng", initlng)}
        <div>
          {console.log("lat", lat)}
          <Nav showmaps={false}/>
          <div className="form-container">
            <Upload lat={lat} lng={lng} setCity={setCity} setArea={setArea} getlatlng={getlatlng} setLoader={setLoader} initlat={initlat} initlng={initlng}/>
          </div>
          <PopupLoader loader={loader} setLoader={setLoader}/>
        </div>
    </div>
  );
}

export default FormPage;
