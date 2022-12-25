import { useEffect, useRef, useState } from "react";
import axios from "axios";
export default function Quote() {
    const calledAPI = useRef(false);
    const [quote, setQuote] = useState<string>("");
    const options = {
        method: "POST",
        url: "https://motivational-quotes1.p.rapidapi.com/motivation",
        headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            "X-RapidAPI-Host": "motivational-quotes1.p.rapidapi.com",
        },
        data: '{"key1":"value","key2":"value"}',
    };

    useEffect(() => {
        const getQuote = async () => {
            if (calledAPI.current) return;
            const response = await axios.request(options);
            if (response.data.length > 200) {
                getQuote();
            }
            setQuote(response.data);
            calledAPI.current = true;
        };
        getQuote();
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
                Quotes 👤
            </p>
            <p className="WidgetDescription" style={{ marginTop: "10%" }}>
                {quote}
            </p>
        </>
    );
}
