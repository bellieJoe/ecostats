import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv";
import session from "express-session"
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js"
import roleRoutes from "./routes/roleRoutes.js"
import programRoutes from "./routes/programRoutes.js"
import unitRoutes from "./routes/unitRoutes.js"
import landRoutes from "./routes/landRoutes.js"


dotenv.config(); // Load environment variables from .env file
const app = express();

// Middleware for parsing JSON data
app.use(express.json());

// CORS configuration to allow frontend requests
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // Allow credentials such as cookies to be sent
}));


// Connect to MongoDB using environment variables for URI
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Session configuration for storing sessions in MongoDB
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        ttl: 14 * 24 * 60 * 60 // = 14 days. Default session expiration
    }),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true, // Prevents JavaScript from accessing the cookie
        secure: false // Set to true if using HTTPS
    }
}));

// Start the server on the specified port
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

app.use(cookieParser());

// Routes
app.use("/users", userRoutes);
app.use("/roles", roleRoutes);
app.use("/programs", programRoutes);
app.use("/units", unitRoutes);
app.use("/land", landRoutes);

