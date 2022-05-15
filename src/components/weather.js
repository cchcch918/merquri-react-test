import React from 'react';
import {Card, Col, Row, Skeleton} from "antd";
import DateUtil from "../utils/DateUtil";
import ImageUtil from "../utils/ImageUtil";


function Weather({weatherData, loading}) {

    let weatherAvatar = ImageUtil.getWeatherAvatar(weatherData.weather);

    return (
        <div className="p-1">
            <Card style={{width: 300}}>

                <Skeleton loading={loading} avatar active>
                    <span className="text-md text-semibold">{weatherData.location}</span>
                    <Row align="middle">
                        <span className="text-xxl text-bold">{weatherAvatar}{weatherData.weather}</span>
                    </Row>
                    <Row>
                        <Col span={10}>Description: </Col>
                        <Col span={14}><span className="text-semibold">{weatherData.weatherDescription}</span></Col>
                    </Row>
                    <Row>
                        <Col span={10}>Temperature: </Col>
                        <Col span={14}><span
                            className="text-semibold">{weatherData.minTemperature}°C - {weatherData.maxTemperature}°C</span></Col>
                    </Row>
                    <Row>
                        <Col span={10}>Humidity: </Col>
                        <Col span={14}><span className="text-semibold">{weatherData.humidity}%</span></Col>
                    </Row>
                    <Row>
                        <Col span={10}>Time: </Col>
                        <Col span={14}><span
                            className="text-semibold">{DateUtil.formatDate(weatherData.dateTime, "DD/MMM/yyyy hh:MM:ss")}</span></Col>
                    </Row>
                </Skeleton>
            </Card>
        </div>

    )
}

export default Weather;
