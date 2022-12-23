import { useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function SpotifyOAuth() {
    useEffect(() => {
        let queryParameters = new URLSearchParams(window.location.search);

        if (queryParameters.get("code")) {
            getOAuthTokens(queryParameters);
        }
    }, []);

    const getOAuthTokens = async (queryParameters: URLSearchParams) => {
        if (queryParameters.get("code")) {
            let tokenParameters = new URLSearchParams({
                grant_type: "authorization_code",
                code: queryParameters.get("code") || "",
                redirect_uri: process.env.REACT_APP_REDIRECT_URI,
            });

            fetch(`https://accounts.spotify.com/api/token`, {
                method: "POST",
                headers: {
                    Authorization: `Basic ${btoa(
                        process.env.REACT_APP_CLIENT_ID +
                            ":" +
                            process.env.REACT_APP_CLIENT_SECRET
                    )}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: tokenParameters,
            })
                .then((response) => response.json())
                .then((json) => {
                    if (
                        json !== undefined &&
                        typeof json.access_token === "string"
                    ) {
                        localStorage.setItem(
                            "spotifyCredentials",
                            json.access_token
                        );

                        window.close();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <>
            <SpotifyPlayer
                token={localStorage.getItem("spotifyCredentials") || ""}
                uris={["spotify:artist:6HQYnRM4OzToCYPpVBInuU"]}
            />
        </>
    );
}
