import { useEffect, useState } from "react";
import axios from "axios";
export default function News() {
    const options = {
        method: "GET",
        url: "https://bing-news-search1.p.rapidapi.com/news",
        params: { textFormat: "Raw", safeSearch: "Off" },
        headers: {
            "X-BingApis-SDK": "true",
            "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
        },
    };

    const [news, setNews] = useState({ name: "", description: "" });
    const [newsList, setNewsList] = useState([]);

    useEffect(() => {
        if (news.name !== "") return;
        const getNews = async () => {
            const response = await axios.request(options);
            setNewsList(response.data.value);
            setNews(response.data.value[parseInt(Math.random() * 10 + "")]);
        };
        getNews();
    });

    useEffect(() => {
        setTimeout(() => {
            const random = Math.floor(Math.random() * newsList.length);
            setNews({
                name: newsList[random].name,
                description: newsList[random].description,
            });
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
                    backgroundColor: "rgb(236, 74, 74)"
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
                {news.name}
            </p>
            <p
                className="WidgetDescription"
                style={{ marginTop: ".6em", position: "relative", left: "2%" }}
            >
                {news.description}
            </p>
        </>
    );
}
