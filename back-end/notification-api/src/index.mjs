import express from "express";
import opentelemetry from "@opentelemetry/api";

const app = express();

const tracer = opentelemetry.trace.getTracer("notification-api-temp");

app.get("/api/data", (req, res) => {
    res.status(200).json([
        "apple",
        "banana",
        "orange"
    ])
})

app.listen(3000, () => {
    console.log("Notification API is listening on PORT 3000")
})