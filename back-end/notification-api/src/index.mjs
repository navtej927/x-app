import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.status(200).json({
        name: "notification-api v2"
    })
})

app.listen(3000, () => {
    console.log("Notification API is listening on PORT 3000")
})