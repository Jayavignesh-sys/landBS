import MapS from '../Components/Mapsearchmap/Map';
import { useState } from "react";
import HS from '../Components/Mapsearchhome/h';
import { Header } from '../Components/Header/header.component';
import React from 'react';
import axios from 'axios';

export default function Mapsearch() {
    console.log("Mapsearch");
    const [nlocs, setNlocs] = useState([]);
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
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

    return (
        <div className="App">
        <MapS lati={lat} long={lng} setNlocs={setNlocs}/>
        {console.log("nlocs: ", nlocs)}
        <HS nlocs={nlocs}/>
        </div>
    );
}


