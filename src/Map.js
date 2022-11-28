import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import FlyToLocation from "./FlyToLocation";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function Map({ position }) {
  console.log("positions", position);

  return (
    <div id="map">
      <p>You are approximately here:</p>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "300px", margin: "auto", width: "300px" }}
      >
        <FlyToLocation position={position} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>You are here.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
