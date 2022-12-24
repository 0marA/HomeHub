import Spotify from "../components/SpotifyAuthBase";
import Weather from "../components/Weather";
import Quotes from "../components/Quotes";
import Jokes from "../components/Jokes";
import Facts from "../components/Facts";
import Tuya from "../components/Tuya";
import SmileyStocks from "../components/SmileyStocks";
export default function Dashboard() {
    let jokeQuoteOrFact;

    let randomNum = Math.random();
    if (.3 > randomNum) jokeQuoteOrFact = <Jokes />;
    else if (randomNum > 0.6 && .9 > randomNum) jokeQuoteOrFact = <Quotes />;
    else jokeQuoteOrFact = <Facts />;

    return (
        <>
            <div className="WidgetArea">
                <div
                    className="Widget"
                    style={{ width: "40em", height: "9em" }}
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
                    <Spotify />
                </div>
            </div>
            <div
                className="Widget"
                style={{
                    width: "17em",
                    right: "2em",
                    marginTop: "5.5em",
                    position: "absolute",
                }}
            >
                <Weather />
            </div>
            <div
                className="Widget"
                style={{
                    width: "17em",
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
                    height: "15em",
                }}
            >
                <Tuya />
            </div>
            <div
                className="Widget"
                style={{
                    width: "40em",
                    position: "absolute",
                    left: "2em",
                    top: "12em",
                    height: "6em",
                }}
            >
                <SmileyStocks />
            </div>
        </>
    );
}
