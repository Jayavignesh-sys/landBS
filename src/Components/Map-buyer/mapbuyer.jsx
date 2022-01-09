import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import "./mapbuyer.scss";
import axios from 'axios'

mapboxgl.accessToken = 'pk.eyJ1IjoiMTliY2UxNTg5IiwiYSI6ImNreDZmZ3BiYjJkbTUydHB6cTJsNnp3YWMifQ.TJvAZRxMbuzSAqsza-eKnQ';

function Mapbuyer({ lati, long}) {
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



  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: 14,
    }

    );

    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    var marker1 = new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

    return () => map.remove();
  }, [longitude, latitude]);

  return (
    <div>
      <div className="mapContainerbuyer" ref={mapContainerRef} />
    </div>
  );
};

export default Mapbuyer;