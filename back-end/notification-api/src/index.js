const express = require("express");
const opentelemetry = require("@opentelemetry/api");
const axios = require("axios");

const app = express();

const tracer = opentelemetry.trace.getTracer("notification-api");

axios.interceptors.request.use(request => {
    console.log("axios", request.headers);
    return request;
});

app.get("/api/data", (req, res) => {
    res.status(200).json([
        "apple",
        "banana",
        "orange"
    ]);
});

app.get("/api/combine", async (req, res) => {
    try {
        const response = await axios("http://weather-api:3000/api/data");
        res.status(200).json({
            data: response.data
        });
    } catch (error) {
        console.error("Error fetching data from weather API:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.listen(3000, () => {
    console.log("Notification API is listening on PORT 3000");
});