import { useEffect, useState } from "react";
import axios from "axios";
export default function Quote() {
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
        if (quote !== "") return;
        const getQuote = async () => {
            const response = await axios.request(options);
            if (response.data.length > 200) {
                getQuote();
            }
            setQuote(response.data);
        };
        getQuote();
    });

    useEffect(() => {
        setTimeout(() => {
            setQuote("");
        }, 300000);
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
                    backgroundColor: "rgb(115, 171, 245)",
                }}
            >
                Quotes 👤
            </p>
            <p
                className="WidgetDescription"
                style={{ marginTop: "10%", textAlign: "center" }}
            >
                {quote}
            </p>
        </>
    );
}
