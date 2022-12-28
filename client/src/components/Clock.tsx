import { useState, useEffect } from "react";
export default function Clock() {
    const [date, setDate] = useState("");

    const refreshClock = () => {
        const d = new Date();
        let h = addZero(d.getHours());
        let amPM = "AM";
        if (h > 12) {
            h = h - 12;
            amPM = "PM";
        } else amPM = "AM";
        const m = addZero(d.getMinutes());
        setDate(h + ":" + m + " " + amPM);
    };

    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        return function cleanup() {
            clearInterval(timerId);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addZero = (i: any) => {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    };

    return (
        <p className="WidgetContent" style={{ marginTop: "-.5em" }}>
            {date}
        </p>
    );
}
