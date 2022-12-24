import lampOn from "../imgs/CustomIcons/lampOn.png";
import lampOff from "../imgs/CustomIcons/lampOff.png";

export default function Tuya() {
    const lampsOn = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/lampsOn`);
    };
    const lampsOff = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/lampsOff`);
    };

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
                Control
            </p>
            <div className="WidgetContent" style={{ paddingTop: ".5em" }}>
                <button>
                    <img
                        src={lampOff}
                        alt="lamp"
                        onClick={lampsOff}
                        style={{ width: "90px", height: "90px", position: "relative", left: ".4em" }}
                    />
                </button>
                <button>
                    <img
                        src={lampOn}
                        alt="lamp"
                        onClick={lampsOn}
                        style={{
                            width: "90px",
                            height: "90px",
                            marginLeft: "1em",
                            position: "relative", left: ".4em" 
                        }}
                    />
                </button>
            </div>
        </>
    );
}
