import "./h.scss";
import React from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/storage/firestore.storage";
import { Header } from "../Header/header.component";
import { useState } from "react";
import PopUp from "../PopUp/Popup";
import Search from "antd/lib/transfer/search";
import Rev from "./rev.js";
import Mapsearch from "../../Pages/mapsearch.js";
import { Link } from "react-router-dom";

import MapS from '../Mapsearchmap/Map';
import HS from '../Mapsearchhome/h';
import axios from 'axios';
import Nav from "../Tailwind/Nav.js";

import { Card } from 'antd';

let unsub;

class Ho extends React.Component {
  constructor() {
    super();

    this.state = {
      properties: [],
      trigger: false,
      search: false,
      url: "",
      curr_property: {},
      nlocs: [],
      lat: 0,
      lng: 0,
    };
  }



  componentDidMount() {
    unsub = onSnapshot(collection(db, "ver0.1"), (qs) => {
      console.log("dkjcblaj: ", qs);
      var li = [];
      if (qs.isEmpty) {
        console.log("It is empty");
      } else {
        console.log("qs: ", qs);
        qs.forEach((doc) => {
          console.log("Current data: ", doc.data());
          li.push(doc.data());
        });
        this.setState({ properties: li });
        console.log("properties: ", this.state.properties);
      }
    });
  }

  componentWillUnmount() {
    unsub();
  }

  setTrigger = (tf) => {
    this.setState({ trigger: tf });
    console.log("trigger: ", this.state.trigger);
  };

  setName = (name) => {
    this.setState({ name: name });
    console.log("name: ", this.state.name);
  };

  setSearch = (tf) => {
    this.setState({ search: tf });
    console.log("search: ", this.state.search);
  };

  setUrl = (url) => {
    this.setState({url: url});
    console.log("urll: ", this.state.url);
  }

  setLat = (lat) => {
    this.setState({lat: lat});
  }

  setLng = (lng) => {
    this.setState({lng: lng});
  }

  setNlocs = (nlocs) => {
    this.setState({nlocs: nlocs});
  }

  setproperty = (property) => {
    console.log("property-type: ", typeof property.property);
    var prop = property.property;
    console.log("Current property: ", this.state.curr_property);
    this.setState({ curr_property: prop });
    this.state.curr_property = prop;
    console.log("Current property: ", this.state.curr_property);
  };

  render() {
    const {search, setSearch} = this.state;
    const { properties, trigger } = this.state;
    console.log("damn: ", properties);
    const {nlocs, setNlocs} = this.state;
    const {lat, setLat} = this.state;
    var loading = false;
    const {lng, setLng} = this.state;
    const IP_API = "https://api.ipify.org?format=json";
    const lat_lng_API = "https://freegeoip.app/json/";
    const getIP = async () => {
        loading = true;
        const response = await axios.get(IP_API);
        const response2 = await axios.get(lat_lng_API + response.data.ip);
        if(lat===0 && lng===0){
            this.setLat(response2.data.latitude);
            this.setLng(response2.data.longitude);
        }
        loading = false;
    }
    getIP();
    var prop = "";
    return (
      <div className="dark">
        <Nav setSearch={this.setSearch} setUrl={this.setUrl} search={search} showmaps={true}/>
        {search?
          <div className="drop">
            <MapS lati={lat} long={lng} setNlocs={this.setNlocs}/>
              {console.log("nlocs: ", nlocs)}
            <HS nlocs={nlocs}/>
          </div>
          :
          ""
        }
        <div>
          <div className="card-stack">
            {properties.map((property, index) => (
              <div className="items">
                <Card style={{ width: 300 }}
                  id={index}
                  className="card-items"
                  onClick={() => {
                    this.setTrigger(true);
                    this.setproperty({ property });
                  }}
                >
                  <img src={property.url[0]} className="card-item"></img>
                </Card>
              </div>
            ))}
          </div>
          <PopUp
            trigger={trigger}
            setTrigger={this.setTrigger}
            curr_property={this.state.curr_property}
          />
        </div>
      </div>
    );
  }
}

export default Ho;
