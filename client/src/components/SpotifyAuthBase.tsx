import { useEffect } from "react";
import Spotify from "./Spotify";
export default function SpotifyAuthBase() {
    useEffect(() => {
        if (localStorage.getItem("startedAuthProcess") === "true") return;
        if (localStorage.getItem("startedAuthProcess") !== "true") {
            startAuthFlow();
        }
    });

    const startAuthFlow = () => {
        const baseURL = "https://accounts.spotify.com/authorize";
        const url = `${baseURL}?client_id=${
            process.env.REACT_APP_CLIENT_ID
        }&response_type=code&redirect_uri=${encodeURIComponent(
            process.env.REACT_APP_REDIRECT_URI
        )}&scope=${encodeURIComponent(process.env.REACT_APP_SCOPES)}`;

        window.open(url, "_blank");
    };

    return (
        <>
            <Spotify isNight={false} />
        </>
    );
}
