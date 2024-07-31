import React, { useState, useEffect, useRef } from 'react';
import './Weather.css';
import search_ic from '../assets/search.png';
import clear from '../assets/clear.png';
import humid from '../assets/humidity.png';
import cloud from '../assets/cloud.png';
import drizzle from '../assets/drizzle.png';
import rain from '../assets/rain.png';
import snow from '../assets/snow.png';
import wind from '../assets/wind.png';
import updateclock from './clock.js';
import updatedate from './date.js';

function Weather() {
    
    const inputref = useRef();
    const [weatherData, setWeatherData] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    const allicons = {
        "01d": clear,
        "01n": clear,
        "02d": cloud,
        "02n": cloud,
        "03d": cloud,
        "03n": cloud,
        "04d": drizzle,
        "04n": drizzle,
        "09d": rain,
        "09n": rain,
        "10d": rain,
        "10n": rain,
        "13d": snow,
        "13n": snow,
    };

    const weatherBackgrounds = {
        "01d": "sunny",
        "01n": "sunny",
        "02d": "cloudy",
        "02n": "cloudy",
        "03d": "cloudy",
        "03n": "cloudy",
        "04d": "cloudy",
        "04n": "cloudy",
        "09d": "rainy",
        "09n": "rainy",
        "10d": "rainy",
        "10n": "rainy",
        "13d": "rainy",
        "13n": "rainy",
    };

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=faccb6a21c0081e9800322e43d8482de`;
            const response = await fetch(url);
            const data = await response.json();
            const icon = allicons[data.weather[0].icon] || clear;
            const backgroundClass = weatherBackgrounds[data.weather[0].icon] || 'sunny';
            setWeatherData({
                humidity: data.main.humidity,
                windspeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
                backgroundClass: backgroundClass,
                feelslike: Math.floor(data.main.feels_like),
                mintemperature: Math.floor(data.main.temp_min),
                maxtemperature: Math.floor(data.main.temp_max),
                sunset: new Date(data.sys.sunset*1000) // Convert to milliseconds
            });
        } catch (error) {
            setWeatherData(null);
            console.error('Error fetching weather data');
        }
    };
    useEffect(() => {
        search('Dubai');
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                search(inputref.current.value);
            }
        };

        const inputElement = inputref.current;
        inputElement.addEventListener('keydown', handleKeyDown);

        return () => {
            inputElement.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const checkSunset = () => {
            const currentTime = new Date().getTime();
            if (weatherData && currentTime > weatherData.sunset) {
                document.querySelector('.weather').classList.add('grey-background');
            } else {
                document.querySelector('.weather').classList.remove('grey-background');
            }
        };

        const intervalId = setInterval(checkSunset, 60000); // Check every minute
        return () => clearInterval(intervalId);
    }, [weatherData]);

    const toFahrenheit = (celsius) => Math.floor(celsius * 9/5 + 32);
    let d = new Date()

// Convert to string
    let dateString = d.toLocaleString(undefined, 
        { timeZone: 'Asia/Kolkata' });

// Print output

    return (
        <div className={`weather ${weatherData?.backgroundClass}`}>
            <h1 id="clock">00:00:00</h1>
            <h3 id = "date">00/00/0000</h3>
            <div className='search'>
                <input ref={inputref} type='text' placeholder='Search for a city' />
                <img src={search_ic} alt="search" onClick={() => search(inputref.current.value)} />
            </div>
            {weatherData && (
                <div className='weather-info'>
                    <img src={weatherData.icon} alt="weather icon" className='weathericon' />
                    <div className='temp-location'>
                        <p 
                            className='temp' 
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {isHovered ? `${toFahrenheit(weatherData.temperature)}°F` : `${weatherData.temperature}°C`}
                        </p>
                        <div className='additional-temps'>
                            <p>Feels Like: {weatherData.feelslike}°C</p>
                            <p>↓{weatherData.mintemperature}°C &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↑{weatherData.maxtemperature}°C</p>
                        </div>
                        <p className='place'>{weatherData.location}</p>
                    </div>
                    <div className='extra-data'>
                        <div className='extra-item'>
                            <img src={humid} alt="humidity" className='small-icon' />
                            <p>{weatherData.humidity}%<br />Humidity</p>
                        </div>
                        <div className='extra-item'>
                            <img src={wind} alt="wind speed" className='small-icon' />
                            <p>{weatherData.windspeed} Km/h<br />Wind Speed</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Weather;

