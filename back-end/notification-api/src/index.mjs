import express from "express";
import opentelemetry from "@opentelemetry/api";
import axios from 'axios';

const app = express();

const tracer = opentelemetry.trace.getTracer("notification-api-temp");

app.get("/api/data", (req, res) => {
    res.status(200).json([
        "apple",
        "banana",
        "orange"
    ])
})

app.get("/api/combine", async (req, res) => {
    const response = await axios("http://weather-api:3000/api/data");
    res.status(200).json({
        data: response.data
    })
})

app.listen(3000, () => {
    console.log("Notification API is listening on PORT 3000")
})