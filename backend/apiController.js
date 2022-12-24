import asyncHandler from "express-async-handler";
import { TuyaContext } from "@tuya/tuya-connector-nodejs";
import dotenv from "dotenv";
dotenv.config();

const context = new TuyaContext({
    baseUrl: "https://openapi.tuyaus.com",
    accessKey: process.env.ACCESS_ID,
    secretKey: process.env.ACCESS_KEY,
});

const CELLO_LAMP = process.env.CELLO_LAMP_ID;
const BEDSIDE_LAMP = process.env.BEDSIDE_LAMP_ID;
const CS_LAMP = process.env.CS_LAMP_ID;

export const lampsOn = asyncHandler(async (req, res) => {
    await sendCommand(CELLO_LAMP, true);
    await sendCommand(BEDSIDE_LAMP, true);
    await sendCommand(CS_LAMP, true);

    res.send("success");
});

export const lampsOff = asyncHandler(async (req, res) => {
    await sendCommand(CELLO_LAMP, false);
    await sendCommand(BEDSIDE_LAMP, false);
    await sendCommand(CS_LAMP, false);

    res.send("success");
});

const sendCommand = async (deviceID, switchValue) => {
    await context.request({
        path: `/v1.0/iot-03/devices/${deviceID}/commands`,
        method: "POST",
        body: {
            commands: [{ code: "switch_1", value: switchValue }],
        },
    });
};
