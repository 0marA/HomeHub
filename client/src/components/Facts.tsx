import { useEffect, useState } from "react";
import axios from "axios";

export default function Facts() {
    const [fact, setFact] = useState<string>("");

    const options = {
        method: "GET",
        url: "https://facts-by-api-ninjas.p.rapidapi.com/v1/facts",
        headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            "X-RapidAPI-Host": "facts-by-api-ninjas.p.rapidapi.com",
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

    useEffect(() => {
        setTimeout(() => {
            setFact("");
        }, 600000);
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
                    backgroundColor: "rgb(143, 115, 245)"
                }}
            >
                Fun Facts 📚
            </p>
            <p
                className="WidgetDescription"
                style={{
                    marginTop: "8%",
                    textAlign: "center"
                }}
            >
                {fact}
            </p>
        </>
    );
}
