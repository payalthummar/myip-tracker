import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import MyIp from "./MyIp";
import Map from "./Map";

function App() {
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}`;

  // const url2 =
  //   "https://geo.ipify.org/api/v2/country,city?apiKey=at_007uK5CyJKclEY1wU5Sle8KIdwYOa";
  const [userIp, setUserIp] = useState("");
  const [position, setPosition] = useState([51.505, -0.09]);
  const [currentCountry, setCurrentCountry] = useState("");
  const [alpha2code, setAlpha2Code] = useState("");
  // const [countries, setCountries] = useState([]);

  function fetchData() {
    axios
      .get(url)
      .then((res) => {
        console.log("response", res);
        // if (!res.statusText === "OK") {
        //   throw Error(res.statusText);
        // }
        setUserIp(res.data);
        setPosition([res.data.location.lat, res.data.location.lng]);
        setAlpha2Code(res.data.location.country);
      })
      .catch((e) => console.log(e));
  }
  const getCountryData = () => {
    try {
      fetch(`https://restcountries.com/v3.1/alpha/${alpha2code}`).then((res) =>
        res.json().then((data) => {
          console.log("contry", data);
          setCurrentCountry(data[0]) || console.log("COUNTRIES", data[0]);
        })
      );
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    alpha2code && getCountryData();
  }, [alpha2code]);
  console.log("Ip", userIp);
  return (
    <div className="App">
      <MyIp userIp={userIp} />
      <Map position={position} />
      <h4>
        You currently live in <i>{currentCountry.name?.common}</i>
      </h4>
      <h4>
        Capital of <i>{currentCountry.name?.common}</i> is{" "}
        <i>{currentCountry.capital}</i>
      </h4>
      <h4>
        Flag of <i>{currentCountry.name?.common}</i> is{" "}
        <i>{currentCountry.flag}</i>
      </h4>

      <img src={currentCountry.flags.png} alt="Germany" />

      <h4>
        Country Region is <i>{currentCountry.region}</i>
      </h4>
      <h4>
        Country SubRegion is <i>{currentCountry.subregion}</i>
      </h4>
    </div>
  );
}

export default App;
