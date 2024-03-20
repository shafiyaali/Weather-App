import { useEffect, useState } from 'react';
import './App.css';
import WeatherPage from './WeatherPage';
const  api = {
  key : "7afc1012a5fd65a2269005cf4e2aa78c",
  base: "https://api.openweathermap.org/data/2.5/",
}

function App() {
  const [ showWeather, setShowWeather ] = useState(false);
  const [ latitude, setLatitude] = useState("");
  const [ longitude, setLongitude] = useState("");
  const [ weather, setWeather] = useState("");
  const [ cityName, setCityName] = useState("");
  const [ isDeviceLocation, setIsDeviceLocation ] = useState(false);
  const [ isResultFound, setIsResultFound ] = useState(false);


  // Function to fetch weather for the entered city
  const getWeatherOfCity = async() => {
    await fetch(`${api.base}weather?q=${cityName}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setIsDeviceLocation(false)
        setWeather(result);
        setShowWeather(true);
      })
      .catch((e) =>{
        setIsResultFound(false);
      })
  };
  const getDeviceLocation  = (() => {
    setIsDeviceLocation(true);
    if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(function (res) {
          setLatitude(res.coords.latitude);
          setLongitude(res.coords.longitude);
          getWeatherOfDeviceLocation(res.coords.latitude, res.coords.longitude);
        })
    } else {
        setIsResultFound(false)
        setShowWeather(true)
        console.log("Geolocation is not available in your browser");
    }
    setShowWeather(true)
  })
  const getWeatherOfDeviceLocation = async(lat, long) => {
    await fetch(`${api.base}weather?lat=${lat}&lon=${long}&appid=${api.key}`)
    .then((res) => res.json())
    .then((result) => {
      setWeather(result);
      setShowWeather(true);
      setIsResultFound(true);
      setIsDeviceLocation(true);
      console.log("Res".result);
    })
    .catch((e) => {
      setIsResultFound(false);
    })

  }

  useEffect( () => {
    setIsResultFound(false);
  },[])

  return (
    <div className="App">
      <header className="App-header">
      {!showWeather? (<div className='container'>
          <div>
            <div className='top-bar'> Weather App
            </div>
            
            <div className='content'>
              <input type="text" className='input' placeholder='Enter city name' value={cityName} 
                onChange={(event) => {setCityName(event.target.value)}}
                onKeyDown={(event) => {event.key === "Enter" && getWeatherOfCity()}}
              />
              <p><span>or</span></p>
              <button className='location-button' onClick={getDeviceLocation}>Get Device Location</button>
            </div>

          </div>

        </div> ) :
        <WeatherPage weather={weather} setShowWeather={setShowWeather} isResultFound={isResultFound}
        isDeviceLocation = {isDeviceLocation}
        /> }

      </header>
    </div>
  );
}

export default App;
