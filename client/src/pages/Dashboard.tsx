import { useEffect, useState } from "react";
import SpotifyAuthBase from "../components/SpotifyAuthBase";

export default function Dashboard() {
    return (
        <>
            {/*<SpotifyAuth spotifyCredentials={spotifyCredentials} />
            <NowPlaying spotifyCredentials={spotifyCredentials} />*/}
            <SpotifyAuthBase />
            <div className="WidgetArea">
                <div className="Widget h-96">
                    <p className="WidgetContent"></p>
                    <p className="WidgetDescription">
                        Books Gifted (This Year)
                    </p>
                </div>

                <div className="Widget h-24">
                    <p className="WidgetContent"></p>
                    <p className="WidgetDescription">Books Gifted (All Time)</p>
                </div>
            </div>
        </>
    );
}
