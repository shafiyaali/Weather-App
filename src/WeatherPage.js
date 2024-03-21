import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cloud_icon from "./Assets/cloud.png";
import humidity_icon from "./Assets/humidity_logo.png";
import wind_icon from "./Assets/wind_logo.png";
import clear_icon  from "./Assets/clear.png";
import drizzle_icon from "./Assets/drizzle.png";
import rain_icon from "./Assets/rain.png";
import snow_icon from "./Assets/snow.png";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

function WeatherPage({weather, setShowWeather, isResultFound, isDeviceLocation}) {
    const [ wicon, setWicon ] = useState("");
    // console.log("weather weather",weather);
    const BackToHome = () => {
        // console.log("Back Clicked");
        setShowWeather(false)
    }
    useEffect(() => {
        if(weather.cod == 200) {
            if(weather.weather[0].icon === "01d" || weather.weather[0].icon === "01n") {
                setWicon(clear_icon);
            } else if(weather.weather[0].icon === "02d" || weather.weather[0].icon === "02n") {
                setWicon(cloud_icon);
            } else if(weather.weather[0].icon === "03d" || weather.weather[0].icon === "03n") {
                setWicon(drizzle_icon);
            } else if(weather.weather[0].icon === "04d" || weather.weather[0].icon === "04n") {
                setWicon(drizzle_icon);
            } else if(weather.weather[0].icon === "09d" || weather.weather[0].icon === "09n") {
                setWicon(rain_icon);
            } else if(weather.weather[0].icon === "10d" || weather.weather[0].icon === "10n") {
                setWicon(rain_icon);
            } else if(weather.weather[0].icon === "11d" || weather.weather[0].icon === "11n") {
                setWicon(rain_icon);
            } else if(weather.weather[0].icon === "13d" || weather.weather[0].icon === "13n") {
                setWicon(snow_icon);
            } else if(weather.weather[0].icon === "50d" || weather.weather[0].icon === "50n") {
                setWicon(cloud_icon);
            } else {
                setWicon(clear_icon);
            }
        }
    },[weather]);         
    

  return (
    <div className='container'>
        <div className='top-bar'>
            <button onClick={BackToHome} className='back-button' style={{background : "white"}}
            >
                <FontAwesomeIcon className='font-awesome-icon' 
                    icon={faArrowLeft} style={{color: "#74C0FC", marginTop: "4px"}} 
                />
            </button> Weather App
        </div>
        {(weather.cod == 200 || ( isResultFound && isDeviceLocation)) ? (
        <div>
            <div className='weather-image'>
                <img src={wicon} alt="" />
            </div>
            <div className='weather-temp'>{weather.main.temp}°C</div>
            <div className='weather-condition'>{weather.weather[0].description}</div>
            <div className='weather-location'><FontAwesomeIcon icon={faLocationDot}  style={{padding:"2px"}}/>{weather.name}, {weather.sys.country}</div>  
            <div className='data-container'>
                <div className='element wind-element' >
                    <img src={wind_icon} alt ="" className='icon'/>
                    <div className='data'>
                        <div className='wind-speed'>{weather.wind.speed} Km/hr</div>
                        <div className='text'>Wind Speed</div>
                    </div>
                </div>
                <div className='element'>
                    <img src={humidity_icon} alt ="" className='icon'/>
                    <div className='data'>
                        <div className='humidity-percent'>{weather.main.humidity}%</div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>
            </div>
        </div>) :
        <div className='error-message'> Enter the correct city or Check your browser for location Access</div> }
    </div>
  )
}

export default WeatherPage