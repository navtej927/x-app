import express from "express";

const app = express();

// Middleware to log headers for all incoming requests
app.use((req, res, next) => {
    console.log('Incoming Request Headers:', req.headers);
    next(); // Proceed to the next middleware or route handler
});

app.get("/api/data", (req, res) => {
    res.status(200).json([
        "sunny",
        "rainy",
    ])
})

app.listen(3000, () => {
    console.log("Notification API is listening on PORT 3000")
})