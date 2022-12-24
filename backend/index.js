import express from "express";
import cors from "cors";
import { lampsOn, lampsOff } from "./apiController.js";

const app = express();
const port = 4000;
app.use(
    cors({
        origin: "*",
    })
);

app.get("/lampsOn", lampsOn);
app.get("/lampsOff", lampsOff);

app.listen(port, () => console.log(`Server started on ${port}!`));
