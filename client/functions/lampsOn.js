import { TuyaContext } from "@tuya/tuya-connector-nodejs";

export async function handler(event, context) {
    const tuyaContext = new TuyaContext({
        baseUrl: "https://openapi.tuyaus.com",
        accessKey: process.env.ACCESS_ID,
        secretKey: process.env.ACCESS_KEY,
    });

    const CELLO_LAMP = process.env.CELLO_LAMP_ID;
    const BEDSIDE_LAMP = process.env.BEDSIDE_LAMP_ID;
    const CS_LAMP = process.env.CS_LAMP_ID;

    const sendCommand = async (deviceID, switchValue) => {
        await tuyaContext.request({
            path: `/v1.0/iot-03/devices/${deviceID}/commands`,
            method: "POST",
            body: {
                commands: [{ code: "switch_1", value: switchValue }],
            },
        });
    };

    await sendCommand(CELLO_LAMP, true);
    await sendCommand(BEDSIDE_LAMP, true);
    await sendCommand(CS_LAMP, true);

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ message: "success" }),
    };
}
