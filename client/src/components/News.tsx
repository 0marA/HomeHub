import { useEffect, useState } from "react";

export default function News() {
    const [news, setNews] = useState<any>("");

    useEffect(() => {
        const getNews = async () => {
            const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${
                new Date().getMonth() + 1
            }/${new Date().getDate()}`;

            const response = await fetch(url, {
                headers: {
                    Authorization: process.env.REACT_APP_WIKI_KEY,
                    "Api-User-Agent": "Mosaic theengineermachine@gmail.com",
                },
            }).then((response) => response.json());

            let random = getRandomNum();

            while (random > response.events.length) random = getRandomNum();
            setNews(response.events[random]);
        };
        getNews();
    }, []);

    const getRandomNum = () => {
        return Math.trunc(Math.random() * 10);
    };

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
                    fontSize: "1.9em",
                }}
            >
                Today in History 📰
            </p>
            <p
                className="WidgetDescription"
                style={{
                    marginTop: "1%",
                    position: "relative",
                    left: "2%",
                }}
            >
                {news.text} - {news.year}
            </p>
        </>
    );
}
