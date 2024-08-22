import express from "express";

const app = express();

app.get("/api/data", (req, res) => {
    res.status(200).json([
        "sunny",
        "rainy",
    ])
})

app.listen(3000, () => {
    console.log("Notification API is listening on PORT 3000")
})