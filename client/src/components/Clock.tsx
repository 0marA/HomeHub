import { useState, useEffect } from "react";
export default function Clock() {
    const [date, setDate] = useState(new Date());

    const refreshClock = () => {
        setDate(new Date());
    };
    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        return function cleanup() {
            clearInterval(timerId);
        };
    }, []);

    const addZero = (i: any) => {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    };

    const d = new Date();
    let h = addZero(d.getHours());
    let amPM = "AM";
    if (h > 12) {
        h = h - 12;
        amPM = "PM";
    } else amPM = "AM";
    const m = addZero(d.getMinutes());
    const time = h + ":" + m + " " + amPM;

    return (
        <p className="WidgetContent" style={{ marginTop: "-.5em" }}>
            {time}
        </p>
    );
}
