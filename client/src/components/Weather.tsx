import axios from "axios";
import { useEffect, useState, useRef } from "react";
import IMAGES from "../imgs/AerisIcons/WeatherIcons";
export default function Weather() {
    const [weatherIcon, setWeatherIcon] = useState<string>("");
    let todaysWeather = useRef({ icon: null, weatherPrimary: "", avgTempF: 0 });
    const WEATHER_OPTIONS = {
        method: "GET",
        url: process.env.REACT_APP_WEATHER_API_URL,
        headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_WEATHER_API_KEY,
            "X-RapidAPI-Host": process.env.REACT_APP_WEATHER_API_HOST,
        },
    };

    useEffect(() => {
        const getWeather = async () => {
            if (todaysWeather.current.icon !== null) return;

            let response = await axios.request(WEATHER_OPTIONS);
            if (
                response.data.success === true &&
                todaysWeather.current.icon === null
            ) {
                todaysWeather.current = response.data.response[0].periods[0];

                for (let i = 0; i < Object.keys(IMAGES).length; i++) {
                    if (
                        Object.keys(IMAGES)[i] + ".png" ===
                        todaysWeather.current.icon
                    ) {
                        console.log(Object.keys(IMAGES)[i] + ".png");
                        setWeatherIcon(Object.values(IMAGES)[i]);
                        break;
                    }
                }
            }
        };

        getWeather();
    });

    return (
        <>
            <div
                style={{
                    display: "grid",
                    placeItems: "center",
                    marginTop: "-.3em",
                }}
            >
                <p className="WidgetContent">Weather</p>
                <img
                    src={weatherIcon}
                    alt="Weather Icon"
                    style={{ height: "8em", marginTop: ".4em" }}
                ></img>
                <p
                    className="WidgetDescription"
                    style={{ marginTop: "1em", marginLeft: "2em" }}
                >
                    {todaysWeather.current.weatherPrimary} with an average
                    temperature of {todaysWeather.current.avgTempF}°F
                </p>
            </div>
        </>
    );
}
