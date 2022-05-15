import {Avatar} from "antd";

const ImageUtil = {
    getWeatherAvatar: function (weather) {
        let weatherAvatar = null;

        if (weather === 'Thunderstorm') {
            weatherAvatar = <Avatar src={require('../images/thunderstorm.PNG')}/>;
        } else if (weather === 'Drizzle') {
            weatherAvatar = <Avatar src={require('../images/drizzle.PNG')}/>;
        } else if (weather === 'Rain') {
            weatherAvatar = <Avatar src={require('../images/rain.PNG')}/>;
        } else if (weather === 'Snow') {
            weatherAvatar = <Avatar src={require('../images/snow.PNG')}/>;
        } else if (weather === 'Clear') {
            weatherAvatar = <Avatar src={require('../images/clear.PNG')}/>;
        } else if (weather === 'Clouds') {
            weatherAvatar = <Avatar src={require('../images/cloud.PNG')}/>;
        } else if (weather === 'Dust') {
            weatherAvatar = <Avatar src={require('../images/dust.PNG')}/>;
        } else {
            weatherAvatar = <Avatar src={require('../images/error.PNG')}/>;
        }
        return weatherAvatar;
    }
};

export default ImageUtil;