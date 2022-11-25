import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import MyApi from "./MyApi";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function App() {
  const url = `https://geo.ipify.org/api/v2/country?apiKey=${process.env.REACT_APP_API_KEY}`;

  // const url2 =
  //   "https://geo.ipify.org/api/v2/country?apiKey=at_007uK5CyJKclEY1wU5Sle8KIdwYOa";
  const position = [51.505, -0.09];

  const [api, setApi] = useState([]);

  function fetchData() {
    axios
      .get(url)
      .then((res) => {
        console.log("response", res);
        if (!res.statusText === "OK") {
          throw Error(res.statusText);
        }
        return setApi(res.data);
      })
      .catch((e) => console.log(e));
  }
  useEffect(() => {
    fetchData();
  }, []);
  console.log("api", api);
  return (
    <div className="App">
      {/* <MyIp api={api} /> */}
      <h1>My Ip Address is : {api.ip}</h1>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "400px", margin: "auto", width: "60%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;
