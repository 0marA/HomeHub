import axios from "axios";
import { useEffect, useState, useRef } from "react";
import IMAGES from "../imgs/WeatherIcons/WeatherIcons";

export default function Weather() {
    const [weatherIcon, setWeatherIcon] = useState<string>("");
    let todaysWeather = useRef({
        icon: null,
        weatherPrimary: "",
        avgFeelslikeF: 0,
        sunriseISO: "",
        sunsetISO: "",
    });
    const [weatherMessage, setWeatherMessage] = useState<string>("");

    const WEATHER_OPTIONS = {
        method: "GET",
        url: "https://aerisweather1.p.rapidapi.com/forecasts/spring,tx",
        headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            "X-RapidAPI-Host": "aerisweather1.p.rapidapi.com",
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

                console.log(todaysWeather.current.icon)

                const currentTime = new Date().getTime();
                const sunriseTime = new Date(
                    todaysWeather.current.sunriseISO
                ).getTime();
                const sunsetTime = new Date(
                    todaysWeather.current.sunsetISO
                ).getTime();

                if (
                    Math.abs(
                        parseInt(
                            new Date(currentTime - sunriseTime)
                                .toISOString()
                                .slice(11, 19)
                                .split(":")
                                .join("")
                        )
                    ) <= 3000
                ) {
                    setWeatherIcon(IMAGES["sunrise"]);

                    setWeatherMessage(`${todaysWeather.current.weatherPrimary} with an average
                            temperature of ${todaysWeather.current.avgFeelslikeF}°F`);
                    return;
                } else if (
                    Math.abs(
                        parseInt(
                            new Date(currentTime - sunsetTime)
                                .toISOString()
                                .slice(11, 19)
                                .split(":")
                                .join("")
                        )
                    ) <= 3000
                ) {
                    setWeatherIcon(IMAGES["sunset"]);
                    setWeatherMessage(`${todaysWeather.current.weatherPrimary} with an average
                            temperature of ${todaysWeather.current.avgFeelslikeF}°F`);
                    return;
                } else if (
                    currentTime > sunsetTime ||
                    new Date().getHours() < 5
                ) {
                    const random = Math.random();
                    if (0.3 > random) setWeatherIcon(IMAGES["happynight"]);
                    else if (random > 0.3 && 0.6 > random)
                        setWeatherIcon(IMAGES["halfmoon"]);
                    else setWeatherIcon(IMAGES["snorlax"]);

                    if (Math.random() > 0.5)
                        setWeatherMessage("Stay safe and enjoy the night ❤️");
                    else setWeatherMessage("Relax and enjoy the night :)");

                    return;
                }

                for (let i = 0; i < Object.keys(IMAGES).length; i++) {
                    if (
                        Object.keys(IMAGES)[i] + ".png" ===
                        todaysWeather.current.icon
                    ) {
                        setWeatherMessage(`${todaysWeather.current.weatherPrimary} with an average
                            temperature of ${todaysWeather.current.avgFeelslikeF}°F`);
                        setWeatherIcon(Object.values(IMAGES)[i]);
                        break;
                    }
                }
            }
        };

        getWeather();
    });

    useEffect(() => {
        setTimeout(() => {
            todaysWeather.current.icon = null;
            setWeatherIcon(Math.random() + "");
        }, 600000);
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
                <p
                    className="WidgetContent"
                    style={{
                        display: "grid",
                        placeContent: "center",
                        borderRadius: ".2em",
                        backgroundColor: "rgb(115, 171, 245)",
                        width: "100%",
                    }}
                >
                    Weather ☁️
                </p>
                <img
                    src={weatherIcon}
                    alt="Weather Icon"
                    style={{ height: "8em", marginTop: ".4em" }}
                ></img>
                <p
                    className="WidgetDescription"
                    style={{ marginTop: ".3em", textAlign: "center" }}
                >
                    {weatherMessage}
                </p>
            </div>
        </>
    );
}
