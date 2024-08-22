import express from "express";
import AWSXRay from 'aws-xray-sdk';


const app = express();

AWSXRay.setDaemonAddress(process.env.AWS_XRAY_DAEMON_ADDRESS);
app.use(AWSXRay.express.openSegment('weather-api'));

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

app.use(AWSXRay.express.closeSegment());

app.listen(3000, () => {
    console.log("Notification API is listening on PORT 3000")
})