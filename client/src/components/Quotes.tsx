import { useEffect, useRef, useState } from "react";
import axios from "axios";
export default function Quote() {
    const calledAPI = useRef(false);
    const [quote, setQuote] = useState<string>("");
    const options = {
        method: "POST",
        url: process.env.REACT_APP_QUOTES_API_URL,
        headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key":
                process.env.REACT_APP_QUOTES_API_KEY,
            "X-RapidAPI-Host": process.env.REACT_APP_QUOTES_API_HOST,
        },
        data: '{"key1":"value","key2":"value"}',
    };

    useEffect(() => {
        const getQuote = async () => {
            if (calledAPI.current === true) return;
            const response = await axios.request(options);
            setQuote(response.data);
            calledAPI.current = true;
        };
        getQuote();
    });

    return (
        <>
            <p
                className="WidgetContent"
                style={{ display: "grid", placeContent: "center" }}
            >
                Quotes
            </p>
            <p className="WidgetDescription" style={{marginTop: ".6em"}}>{quote}</p>
        </>
    );
}
