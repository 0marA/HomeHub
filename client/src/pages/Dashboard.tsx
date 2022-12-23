import Spotify from "../components/SpotifyAuthBase";
import SunMoon from "../components/Weather";
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
                    <Spotify />
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
                <SunMoon />
            </div>
        </>
    );
}
