import { useEffect, useState } from "react";
import axios from "axios";

export default function Facts() {
    const [fact, setFact] = useState<string>("");

    const options = {
        method: "GET",
        url: process.env.REACT_APP_FACTS_API_URL,
        headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_FACTS_API_KEY,
            "X-RapidAPI-Host": process.env.REACT_APP_FACTS_API_HOST,
        },
    };

    useEffect(() => {
        if (fact !== "") return;
        const getFact = async () => {
            const response = await axios.request(options);

            if (response.data[0].fact.length > 200) {
                getFact();
            }

            setFact(response.data[0].fact);
        };
        getFact();
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
                Fun Facts 📚
            </p>
            <p
                className="WidgetDescription"
                style={{
                    marginTop: "15%",
                    placeContent: "center",
                }}
            >
                {fact}
            </p>
        </>
    );
}
