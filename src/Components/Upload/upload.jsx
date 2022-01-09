import "./upload.scss";
import { db } from "../Firebase/storage/firestore.storage";
import { useState, useEffect } from "react";
import "react-dropzone";
import React, { useCallback } from "react";
import AntDrag from "../AntDrag/AntDrag";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

import Map from "../Map/map.component";

import FormInput from "../FormInput/form-input.component";
import CustomButton from "../CustomButton/custom-button.component";

console.log("Hii");

let fi = [];
let url = [];
let j = 0;
const deleted_map = [];

function Upload({ lat, lng, setCity, setArea, getlatlng, setLoader }) {
  var lati = lat;
  var long = lng;
  const [images, setImages] = useState([]);

  const [fileList, setFileList] = useState([]);

  const popFI = (index) => {
    console.log(fi[index]);
    console.log("deleting element at index " + index);
    deleted_map[index] = false;
    console.log(deleted_map);
  };

  const initialUserState = {
    address: "",
    city: "",
    location: "",
    landarea: "",
    proparea: "",
    price: "",
    amenities: "",
    distance: "",
    prevuse: "",
    contact: "",
    zone: "",
    lat: "",
    lng: "",
    pincode: "",
    url: [],
  };

  const [user, setUser] = useState(initialUserState);
  const onDrop = useCallback((acceptedFiles) => {
    // Loop through accepted files
    acceptedFiles.map((file) => {
      console.log("fire: ", file);
      fi.push(file);
      deleted_map[j] = true;
      j++;
      console.log("fi: ", fi[0]);
      // Initialize FileReader browser API
      const reader = new FileReader();
      // onload callback gets called after the reader reads the file data
      reader.onload = function (e) {
        // add the image into the state. Since FileReader reading process is asynchronous, its better to get the latest snapshot state (i.e., prevState) and update it.
        setImages((prevState) => [
          ...prevState,
          { id: "a1", src: e.target.result },
        ]);
      };
      // Read the file as Data URL (since we accept only images)
      reader.readAsDataURL(file);
      return file;
    });
  }, []);
  const storage = getStorage();

  const handleChange = (event) => {
    if (event.target.name === "city") {
      console.log("City", event.target.value);
      setCity(event.target.value);
    }
    if (event.target.name === "location") {
      console.log("Area", event.target.value);
      setArea(event.target.value);
    }
    setUser(() => {
      return { ...user, [event.target.name]: event.target.value };
    });
  };

  const mapMarker = (lat, lng) => {
    setUser(() => {
      return { ...user, ["lat"]: lat, ["lng"]: lng };
    });
  };

  const clearObj = () => {
    setImages([]);
    lati = 0;
    long = 0;
    setUser(() => {
      return { ...initialUserState };
    });
  };

  useEffect(() => {
    console.log("Search message inside useEffect: ", user);
  }, [user]);

  const handleSubmit = () => {
    fileList.map((file) => {
      fi.push(file.originFileObj);
    });
    console.log("FI: ", fi);
    setLoader(true);
    var noele = fileList.length;
    fi.forEach((ele, index) => {
      // console.log("ele: ", ele);
      console.log("fiiii: ", fi);
      const storageRef = ref(storage, `${ele.name}`);
      console.log("name: ", ele.name);
      uploadBytes(storageRef, ele).then((snapshot) => {
        // console.log("print Storage Ref: ", storageRef);
        // console.log("Print Snapshot: ", snapshot);
        // console.log("Uploaded a blob or file!");
        getDownloadURL(storageRef).then((u) => {
          console.log("Url: ", u);
          url.push(u);
          console.log("loop: ", url);
          console.log("out id: ", index);
          if (url.length == noele) {
            console.log("id: ", index);
            console.log("inside if loop: ", url);
            addDoc(collection(db, "ver0.1"), {
              address: user.address,
              city: user.city,
              location: user.location,
              landarea: user.landarea,
              proparea: user.proparea,
              price: user.price,
              amenities: user.amenities,
              distance: user.distance,
              prevuse: user.prevuse,
              contact: user.contact,
              zone: user.zone,
              lat: user.lat,
              lng: user.lng,
              pincode: user.pincode,
              url: url,
            }).then((dec) => {
              setFileList([]);
              clearObj();
              setLoader(false);
              console.log("Document written with ID: ", dec.id);
            });
          }
        });
      });
    });
  };

  return (
    <div className="upload">
      <FormInput
        type="text"
        value={user.city}
        name="city"
        label="city"
        handleChange={handleChange}
        validateStatus="error"
        required
      />
      <FormInput
        type="text"
        value={user.location}
        name="location"
        label="location"
        onBlur={getlatlng}
        handleChange={handleChange}
        required
      />
      <FormInput
        type="text"
        value={user.pincode}
        name="pincode"
        label="pincode"
        handleChange={handleChange}
        required
      />
      <Map lati={lati} long={long} mapMarker={mapMarker} />
      <h1 className="text-center">Upload Images</h1>
      <AntDrag fi={fi} fileList={fileList} setFileList={setFileList} />
      {console.log("fileList: ", fileList)}
      <FormInput
        name="landarea"
        type="text"
        value={user.landarea}
        handleChange={handleChange}
        label="land area"
        required
      />
      <FormInput
        name="proparea"
        type="text"
        value={user.proparea}
        handleChange={handleChange}
        label="proparea"
        required
      />
      <FormInput
        name="price"
        type="text"
        value={user.price}
        handleChange={handleChange}
        label="price"
        required
      />
      <FormInput
        name="amenities"
        type="text"
        value={user.amenities}
        handleChange={handleChange}
        label="amenities"
        required
      />
      <FormInput
        name="distance"
        type="text"
        value={user.distance}
        handleChange={handleChange}
        label="distance"
        required
      />
      <FormInput
        name="prevuse"
        type="text"
        value={user.prevuse}
        handleChange={handleChange}
        label="prevuse"
        required
      />
      <FormInput
        name="contact"
        type="text"
        value={user.contact}
        handleChange={handleChange}
        label="contact"
        required
      />
      <FormInput
        name="zone"
        type="text"
        value={user.zone}
        handleChange={handleChange}
        label="zone"
        required
      />
      <CustomButton onClick={handleSubmit} />
    </div>
  );
}

export default Upload;
