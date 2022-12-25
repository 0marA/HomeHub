import { useEffect, useState, useRef } from "react";
import axios from "axios";
export default function SmileyStocks() {
    const [smiles, setSmiles] = useState("");
    const [happy, setHappy] = useState(true);
    const [multiplier, setMultiplier] = useState("");
    const calledAPI = useRef(false);
    useEffect(() => {
        if (calledAPI.current) return;
        const getSmiles = async () => {
            const request = await axios.get(
                `${process.env.REACT_APP_CLIENT_URL}/.netlify/functions/getSmiles`
            );
            calledAPI.current = true;

            if (request.data.message[3] === ")") setHappy(true);
            else setHappy(false);

            if (request.data.message.length > 100) {
                setSmiles(String(request.data.message).substring(1, 98));
                setMultiplier(" X" + (request.data.message.length - 99));
            }
        };

        getSmiles();
    });

    return (
        <>
            <p
                className="WidgetContent"
                style={{
                    display: "grid",
                    placeContent: "center",
                    marginTop: "-.4em",
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
                    right: "2em",
                }}
            >
                {multiplier}
            </p>

        </>
    );
}
