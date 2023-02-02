import { useEffect, useState } from "react";
import axios from "axios";
export default function News() {
    const options = {
        method: "GET",
        url: "https://ny-times-news-titles-and-urls.p.rapidapi.com/news",
        headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            "X-RapidAPI-Host": "ny-times-news-titles-and-urls.p.rapidapi.com",
        },
    };

    const [news, setNews] = useState("");

    useEffect(() => {
        if (news !== "") return;
        const getNews = async () => {
            const response = await axios.request(options);
            console.log(response.data.world);

            setNews(response.data.world[0].title);
        };
        getNews();
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
                    backgroundColor: "rgb(236, 74, 74)",
                }}
            >
                News 📰
            </p>
            <p
                className="WidgetDescription"
                style={{
                    marginTop: "1%",
                    position: "relative",
                    left: "2%",
                }}
            >
                {news}
            </p>
        </>
    );
}
