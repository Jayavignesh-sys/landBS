import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import "./map.style.scss";
import axios from 'axios'

mapboxgl.accessToken = 'pk.eyJ1IjoiMTliY2UxNTg5IiwiYSI6ImNreDZmZ3BiYjJkbTUydHB6cTJsNnp3YWMifQ.TJvAZRxMbuzSAqsza-eKnQ';

function Map({ lati, long, mapMarker, initlat, initlng }) {
  console.log("Inside Map Component :- ",initlat, initlng);
  var latitude = lati;
  var longitude = long;
  const mapContainerRef = useRef(null);

  const prevlat = useRef(latitude);
  const prevlong = useRef(longitude);
  useEffect(() => {
    prevlat.current = lati;
    prevlong.current = long;
  });


  const R_GEO_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=";


  const getLocation = async (lati, long) => {
    const response = await axios.get(R_GEO_URL + lati + "%2C" + long);
  }

  var j = 0;
  const i = useRef(0);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: 6,
    }

    );
    j++;
    i.current = j;
    console.log("i :- ",i);
    mapMarker(latitude, longitude);

    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    var marker1 = new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

    map.on('click', function (e) {
      marker1.setLngLat(e.lngLat);
      var lat = e.lngLat.lat;
      var lng = e.lngLat.lng;
      console.log("latitute: ", lat);
      console.log("longitude: ", lng);
      mapMarker(lat, lng);
      getLocation(lng, lat);
    });

    return () => map.remove();
  }, [longitude, latitude]);

  return (
    <div>
      <div className="mapContainer" ref={mapContainerRef} />
    </div>
  );
};

export default Map;