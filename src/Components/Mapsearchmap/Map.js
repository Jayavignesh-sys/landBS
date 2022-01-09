import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import "./map.style.css";
import {circle} from '@turf/turf';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/storage/firestore.storage";

mapboxgl.accessToken = 'pk.eyJ1IjoiMTliY2UxNTg5IiwiYSI6ImNreDZmZ3BiYjJkbTUydHB6cTJsNnp3YWMifQ.TJvAZRxMbuzSAqsza-eKnQ';


function MapS({ lati, long, setNlocs }) {
    console.log("Maps");
    var latitude = lati;
    var longitude = long;
    const mapContainerRef = useRef(null);
    var clicklocs = [];

    const prevlat = useRef(latitude);
    const prevlong = useRef(longitude);
    useEffect(() => {
        prevlat.current = lati;
        prevlong.current = long;
    });

    const center = [long, lati];
    const radius = 1;
    const options = {
        steps: 20,
        units: "kilometers",
    };


    const Circle = circle(center, radius, options);
    console.log(Circle);

    const R_GEO_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=";

    

    useEffect(() => {

        var li = [];

        onSnapshot(collection(db, "ver0.1"), (qs) => {
            console.log("dkjcblaj: ", qs);
            if (qs.isEmpty) {
                console.log("It is empty");
            } else {
                console.log("qs: ", qs);
                qs.forEach((doc) => {
                    console.log("Current data: ", doc.data());
                    li.push(doc.data());
                    console.log("li: ", li);
                });
            }
        });

        //console.log("li OUT : ", li);

        var createGeoJSONCircle = function(center, radiusInKm, nearby, points) {
            if(!points) points = 64;
        
            var coords = {
                latitude: center[1],
                longitude: center[0]
            };
        
            var km = radiusInKm;
        
            var ret = [];
            var distanceX = km/(111.320*Math.cos(coords.latitude*Math.PI/180));
            var distanceY = km/110.574;
        
            var theta, x, y;
            for(var i=0; i<points; i++) {
                theta = (i/points)*(2*Math.PI);
                x = distanceX*Math.cos(theta);
                y = distanceY*Math.sin(theta);
        
                ret.push([coords.longitude+x, coords.latitude+y]);
                nearby.push([coords.longitude+x, coords.latitude+y]);
            }
            ret.push(ret[0]);
        
            return {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [ret]
                        }
                    }]
                }
            };
        };

        var inc = 0;

        var i = 'a' + inc;
        var j = 'b' + inc;
        var k = 'c' + inc;
        var l = 'd' + inc;
        var m = 'e' + inc;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [longitude, latitude],
            zoom: 14,
        });

        map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
        var marker1 = new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
        var markers = [];

        var clicks = 0;

        map.on('click', function (e) {
            clicks++;
            clicklocs = [];
            if(clicks>1){
                markers.forEach(function(marker) {
                    marker.remove();
                });
            }

            console.log(li);
            inc = inc + 1;
            i = 'a' + inc;
            j = 'b' + inc;
            k = 'c' + inc;
            l = 'd' + inc;
            m = 'e' + inc;

            var nearby = [];
            map.removeLayer(('a' + (inc-1)).toString());
            map.removeLayer(('b' + (inc-1)).toString());
            map.removeLayer(('c' + (inc-1)).toString());
            map.removeLayer(('d' + (inc-1)).toString());
            map.removeLayer(('e' + (inc-1)).toString());

            marker1.setLngLat(e.lngLat);
            var lat = e.lngLat.lat;
            var lng = e.lngLat.lng;
            console.log("latitute: ", lat);
            console.log("longitude: ", lng);


            map.setZoom(16);
            map.setCenter(e.lngLat);


            map.addSource(i.toString(), createGeoJSONCircle([lng, lat], 0.5, nearby));
            map.addSource(j.toString(), createGeoJSONCircle([lng, lat], 0.1, nearby));
            map.addSource(k.toString(), createGeoJSONCircle([lng, lat], 0.2, nearby));
            map.addSource(l.toString(), createGeoJSONCircle([lng, lat], 0.3, nearby));
            map.addSource(m.toString(), createGeoJSONCircle([lng, lat], 0.4, nearby));

            console.log(nearby);

            var count = 0;
            

            map.addLayer({
                id: i.toString(),
                source: i.toString(),
                type: 'fill',
                radius: 0.5,
                paint: {
                    "fill-color": "blue",
                    "fill-opacity": 0.6
                }
            });

            map.addLayer({
                id: j.toString(),
                source: j.toString(),
                type: 'fill',
                radius: 0.5,
                paint: {
                    "fill-color": "black",
                    "fill-opacity": 1
                }
            });

            map.addLayer({
                id: k.toString(),
                source: k.toString(),
                type: 'fill',
                radius: 0.5,
                paint: {
                    "fill-color": "red",
                    "fill-opacity": 0.6
                }
            });

            map.addLayer({
                id: l.toString(),
                source: l.toString(),
                type: 'fill',
                radius: 0.5,
                paint: {
                    "fill-color": "yellow",
                    "fill-opacity": 0.6
                }
            });

            map.addLayer({
                id: m.toString(),
                source: m.toString(),
                type: 'fill',
                radius: 0.5,
                paint: {
                    "fill-color": "orange",
                    "fill-opacity": 0.6
                }
            });

            const popup = new mapboxgl.Popup({ offset: 25 }).setText(
                'Construction on the Washington Monument began in 1848.'
            );

            var res = [[]];

            li.forEach((doc) => {
                var distance = Math.sqrt(Math.pow(doc.lng - lng, 2) + Math.pow(doc.lat - lat, 2));
                console.log("distance: ", distance);
                if(distance<0.005)
                {
                    var marker = new mapboxgl.Marker();
                    markers.push(marker);
                    markers[count].setLngLat([doc.lng, doc.lat]).addTo(map);
                    res.push([doc.lng, doc.lat, count]);
                    clicklocs.push(doc);
                    count = count + 1;
                }
            });
            setNlocs(clicklocs);
            console.log("i: ", i);
        });
        return () => map.remove();
    }, [longitude, latitude]);

    return (
        <div >
        <div className="mapContainer" ref={mapContainerRef} />
        </div>
    );
    };

    export default MapS;