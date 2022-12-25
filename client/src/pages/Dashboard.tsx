import Spotify from "../components/SpotifyAuthBase";
import Weather from "../components/Weather";
import Quotes from "../components/Quotes";
import Jokes from "../components/Jokes";
import Facts from "../components/Facts";
import Tuya from "../components/Tuya";
import News from "../components/News";
import SmileyStocks from "../components/SmileyStocks";
import { useEffect, useState } from "react";

export default function Dashboard() {
    let [refresh, callRefresh] = useState<boolean>(false);
    let jokeQuoteOrFact;

    let randomNum = Math.random();
    if (.3 > randomNum) jokeQuoteOrFact = <Jokes />;
    else if (randomNum > 0.6 && .9 > randomNum) jokeQuoteOrFact = <Quotes />;
    else jokeQuoteOrFact = <Facts />;


    useEffect(() => {
        setTimeout(() => {
            callRefresh(!refresh);
        }, 300000);
    });

    return (
        <>
            <div className="WidgetArea">
                <div
                    className="Widget"
                    style={{ width: "41em", height: "9em" }}
                >
                    <p
                        className="WidgetContent"
                        style={{
                            paddingBottom: ".4em",
                            display: "grid",
                            placeContent: "center",
                        }}
                    >
                        Now Playing on Spotify 🎵
                    </p>
                    {/*<Spotify />*/}
                </div>
            </div>
            <div
                className="Widget"
                style={{
                    width: "17em",
                    right: "2em",
                    marginTop: "4.5em",
                    position: "absolute",
                    height: "17em",
                }}
            >
                <Weather />
            </div>
            <div
                className="Widget"
                style={{
                    width: "19em",
                    position: "absolute",
                    left: "2em",
                    marginTop: "6.5em",
                    height: "15em",
                }}
            >
                {jokeQuoteOrFact}
            </div>
            <div
                className="Widget"
                style={{
                    width: "17em",
                    position: "absolute",
                    right: "2em",
                    top: "2em",
                    height: "14em",
                }}
            >
                <Tuya />
            </div>
            <div
                className="Widget"
                style={{
                    width: "41em",
                    position: "absolute",
                    left: "2em",
                    top: "12.3em",
                    height: "6em",
                }}
            >
                <SmileyStocks />
            </div>
            <div
                className="Widget"
                style={{
                    width: "21em",
                    position: "absolute",
                    left: "22em",
                    marginTop: "6.5em",
                    height: "15em",
                }}
            >
                <News />
            </div>
        </>
    );
}
