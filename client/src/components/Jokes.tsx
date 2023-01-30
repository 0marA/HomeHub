import { useEffect, useState } from "react";
import axios from "axios";

export default function Jokes() {
    const [setup, setSetup] = useState<string>("");
    const [punchline, setPunchline] = useState<string>("");

    const options = {
        method: "GET",
        url: "https://dad-jokes.p.rapidapi.com/random/joke/png",
        headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            "X-RapidAPI-Host": "dad-jokes.p.rapidapi.com",
        },
    };

    useEffect(() => {
        if (setup !== "") return;
        const getJoke = async () => {
            const response = await axios.request(options);

            if (
                (response.data.body.setup + response.data.punchline).length >
                150
            ) {
                getJoke();
            }

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
                    borderRadius: ".2em",
                    backgroundColor: "rgb(143, 115, 245)",
                }}
            >
                Jokes 💀
            </p>
            <p
                className="WidgetDescription"
                style={{
                    marginTop: "10%",
                    textAlign: "center",
                }}
            >
                {setup}
            </p>
            <p
                className="WidgetDescription"
                style={{ marginTop: ".6em", textAlign: "center" }}
            >
                {punchline}
            </p>
        </>
    );
}
