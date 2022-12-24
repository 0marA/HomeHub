import { useEffect, useState } from "react";
import axios from "axios";

export default function Jokes() {
    const [setup, setSetup] = useState<string>("");
    const [punchline, setPunchline] = useState<string>("");

    const options = {
        method: "GET",
        url: process.env.REACT_APP_JOKES_API_URL,
        headers: {
            "X-RapidAPI-Key":
                process.env.REACT_APP_JOKES_API_KEY,
            "X-RapidAPI-Host": process.env.REACT_APP_JOKES_API_HOST,
        },
    };

    useEffect(() => {
        if (setup !== "") return;
        const getJoke = async () => {
            const response = await axios.request(options);

            setSetup(response.data.body.setup);
            setPunchline(response.data.body.punchline);
        };
        getJoke();
    });
    return (
        <>
            <p
                className="WidgetContent"
                style={{
                    display: "grid",
                    placeContent: "center",
                    marginTop: "-.2em",
                }}
            >
                Jokes :)
            </p>
            <p className="WidgetDescription" style={{ marginTop: "10%" }}>
                {setup}
            </p>
            <p className="WidgetDescription" style={{ marginTop: ".6em" }}>
                {punchline}
            </p>
        </>
    );
}
