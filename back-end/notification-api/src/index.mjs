import express from "express";
import opentelemetry from "@opentelemetry/api";

const app = express();

app.get("/", (req, res) => {
    res.status(200).json({
        name: "notification-api v2"
    })
})

const tracer = opentelemetry.trace.getTracer("notification-api-temp");

app.get("/api", (req, res) => {
    res.status(200).json({
        name: "notification-api"
    })
})

app.listen(3000, () => {
    console.log("Notification API is listening on PORT 3000")
})