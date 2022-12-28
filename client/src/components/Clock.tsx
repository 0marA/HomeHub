import { useState, useEffect } from "react";
export default function Clock() {
    const [date, setDate] = useState(new Date());

    const refreshClock = () => {
        setDate(new Date());
    }
    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        return function cleanup() {
            clearInterval(timerId);
        };
    }, []);

    return <p className="WidgetContent" style={{marginTop: "-.5em"}}> {date.toLocaleTimeString().slice(0, 5)}{" "}{date.toLocaleTimeString().slice(8, 12)}</p>;
}
