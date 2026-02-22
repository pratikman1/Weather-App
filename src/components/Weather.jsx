import React, { use, useEffect, useRef, useState } from 'react'
import './Weather.css'
import searchIcon from '../assets/search.png'
import clearIcon from '../assets/clear.png'
import cloudIcon from '../assets/cloud.png'
import drizzleIcon from '../assets/drizzle.png'
import humidityIcon from '../assets/humidity.png'
import rainIcon from '../assets/rain.png'
import snowIcon from '../assets/snow.png'
import windIcon from '../assets/wind.png'

const Weather = () => {

    const inputRef = useRef()
    const[weatherData, setWeatherData] = useState(false)



    const search = async (city)=> {
        if(city === "") {
            alert("Please enter a city name")
            return
        }
        try {
            const url = "https://api.weatherapi.com/v1/current.json?key=c2ee847689134c80a88111313262202"

            const response = await fetch(`${url}&q=${city}&units=metric&aqi=no`)
            const data = await response.json()

            if(!response.ok) {
                alert( "City not found")
                return
            }
            console.log(data)
            setWeatherData({
                humidity: data.current.humidity,
                windSpeed: data.current.wind_kph,
                temperature:Math.floor(data.current.temp_c),
                city: data.location.name,
                icon: data.current.condition.icon
                
            })
        } catch (error) {
            setWeatherData(false)
            console.error("Error fetching weather data")
           
        }
    }
        useEffect(() => {
            search("new Delhi")
        }, [])

  return (
    <div className="weather">
       <div className="search-bar">
        <input  ref={inputRef} type="text" placeholder="Search for a city..." />
        <img src={searchIcon} alt="" onClick={()=>search(inputRef.current.value)} />
       </div>
        {weatherData? <>

        <img src={weatherData.icon } alt="" className='weather-icon'/>
       <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.city }</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidityIcon} alt="" />
                <div>
                    <p> {weatherData.humidity}%</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={windIcon} alt="" />
                <div>
                    <p>{weatherData.windSpeed}km/hr</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
        
        </> : <></>}

      
    </div>
  )
}

export default Weather