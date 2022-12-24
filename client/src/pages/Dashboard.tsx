import Spotify from "../components/SpotifyAuthBase";
import Weather from "../components/Weather";
import Quotes from "../components/Quotes";
export default function Dashboard() {
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
                        Now Playing
                    </p>
                    {/*<Spotify />*/}
                </div>
            </div>
            <div
                className="Widget"
                style={{
                    width: "17em",
                    right: "2em",
                    position: "absolute",
                    top: "2em",
                }}
            >
                {/*<Weather />*/}
            </div>
            <div
                className="Widget"
                style={{
                    width: "17em",
                    position: "absolute",
                    right: "2em",
                    marginTop: "8em",
                    height: "12em",
                }}
            >
                <Quotes />
            </div>
        </>
    );
}
