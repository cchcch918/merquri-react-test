import './App.css';
import 'antd/dist/antd.min.css';
import {Space, Input, Button, Divider, Alert} from 'antd';
import * as ApiConstant from "./constants/ApiConstant.js";
import React, {useState} from "react";
import * as Axios from "axios";
import Weather from "./components/weather";
import SearchHistory from "./components/searchHistory";

function App() {

    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [weatherHistoryList, setWeatherHistoryList] = useState([]);
    const [loading, setLoading] = useState(false);

    function getWeather(city, country) {
        let input = [city, country]
            .filter(element => Boolean(element)) //filter empty string element
            .join(','); //join city and country with comma

        setLoading(true);
        return Axios.get(
            `${ApiConstant.OPEN_WEATHER_API_DOMAIN}/weather/?q=${input}&APPID=${ApiConstant.OPEN_WEATHER_API_KEY}&units=metric`
        ).then(res => {
            setWeatherData(null);
            setErrorMessage('');
            if (res.status === 200) {
                if (Object.entries(res.data).length) {
                    setWeatherData(initWeatherData(res.data));
                    setWeatherHistoryList([initWeatherData(res.data), ...weatherHistoryList])
                }
            }
        }).catch(error => { //use axious to read failed http request error message, where normal react http call cant
            setErrorMessage(error.response.data.message);
        }).finally(() => {
            setLoading(false);
        });
    }

    function clearInput() {
        setCity('');
        setCountry('');
    }

    function initWeatherData(data) {
        const weather = {
            location: data.name + ',' + data.sys.country,
            weather: data.weather[0].main,
            weatherDescription: data.weather[0].description,
            minTemperature: data.main.temp_min,
            maxTemperature: data.main.temp_max,
            humidity: data.main.humidity,
            dateTime: data.dt * 1000 //second to millisecond
        };
        return weather;
    }

    function deleteRecord(index) {
        weatherHistoryList.splice(index, 1); //remove history by index
        setWeatherHistoryList([...weatherHistoryList]);
    }

    function searchResult(index) {
        let selectedWeather = weatherHistoryList[index];
        getWeather(selectedWeather.location, '');
    }

    return (
        <div class="container">
            <h1>Today's Weather</h1>
            <Divider/>
            <Space wrap>
                <Space>
                    <span className="text-right">City:</span>
                    <Input placeholder="City"
                           value={city}
                           onChange={e => setCity(e.target.value)}/>
                </Space>
                <Space>
                    <span className="text-right">Country:</span>
                    <Input placeholder="Country"
                           value={country}
                           onChange={e => setCountry(e.target.value)}/>
                </Space>
                <Space>
                    <Button className="text-right" onClick={() => getWeather(city, country)}>Search</Button>
                    <Button onClick={clearInput}>Clear</Button>
                </Space>
            </Space>

            {errorMessage ? <div className="py-1"><Alert message={errorMessage} type="error"/></div> : <div></div>}
            {weatherData ? <Weather weatherData={weatherData} loading={loading}/> : <div></div>}

            <SearchHistory weatherHistoryList={weatherHistoryList} deleteRecord={deleteRecord}
                           searchResult={searchResult}/>
        </div>
    );


}

export default App;
