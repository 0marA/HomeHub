import { useState, useRef } from "react";
import axios from "axios";
export default function SmileyStocks() {
    const [smiles, setSmiles] = useState("");
    const [happy, setHappy] = useState(true);
    const [multiplier, setMultiplier] = useState("");

    const calledAPI = useRef(false);

    if (!calledAPI.current) {
        calledAPI.current = true;

        axios
            .get(
                `${process.env.REACT_APP_CLIENT_URL}/.netlify/functions/getSmiles`
            )
            .then((request) => {
                if (request.data.message[3] === ")") setHappy(true);
                else setHappy(false);

                if (request.data.message.length > 115) {
                    setSmiles(String(request.data.message).substring(1, 115));
                    setMultiplier(" X" + (request.data.message.length - 115));
                } else {
                    setSmiles(String(request.data.message).substring(1));
                    setMultiplier("");}
            });
    }

    return (
        <>
            <p
                className="WidgetContent"
                style={{
                    display: "grid",
                    placeContent: "center",
                    marginTop: "-.4em",
                    color: "rgb(14, 117, 14)",
                }}
            >
                Smiley Stocks :)
            </p>
            <p
                className="WidgetDescription"
                style={{
                    position: "absolute",
                    bottom: "1.4em",
                    left: "1.6em",
                    fontWeight: "bold"
                }}
            >
                :
            </p>
            <p
                className="WidgetDescription"
                style={{
                    position: "absolute",
                    bottom: "1.4em",
                    left: "2em",
                    color: happy ? "green" : "red",
                }}
            >
                {smiles}
            </p>
            <p
                className="WidgetDescription"
                style={{
                    position: "absolute",
                    bottom: "1.4em",
                    right: "2.1em",
                    fontWeight: "bold"
                }}
            >
                {multiplier}
            </p>
        </>
    );
}
