import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import bcrypt from "bcrypt"
import dotenv from "dotenv";
import session from "express-session"
import MongoStore from "connect-mongo";

// const UserModel = require("./model/User").default;

import userRoutes from "./routes/userRoutes.js"

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

// Routes
app.use("/users", userRoutes)

/* 
// Route for signing up new users
app.post("/signup", async (req, res) => {
    try {
        const { name, email, password, userRole } = req.body;

        // Validate required fields
        if (!name || !email || !password || !userRole) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Validate email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ error: "Invalid email format." });
        }

        // Ensure password is at least 8 characters
        if (password.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters long." });
        }

        // Check if the email is already in use
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists." });
        }

        // Hash the password and create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword, userRole });
        await newUser.save();

        res.status(201).json({ message: "User created successfully." });
    } catch (error) {
        console.error("Signup Error:", error); // Added for debugging
        res.status(500).json({ error: "Internal server error." });
    }
});

// Route for logging in users
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Email not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // Set the session data
        req.session.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            userRole: user.userRole
        };

        res.json({ status: "Success", role: user.userRole });
    } catch (error) {
        console.error("Login Error:", error); // Added for debugging
        res.status(500).json({ error: "Internal server error." });
    }
});

// Route for logging out users
app.post("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ error: "Failed to log out" });
            }
            res.status(200).json("Logout successful");
        });
    } else {
        res.status(400).json({ error: "No session found" });
    }
});

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ error: "Unauthorized. Please log in." });
    }
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.userRole === 'Admin') {
        next();
    } else {
        res.status(403).json({ error: "Access denied. Admins only." });
    }
};

// Route to get the current user info
app.get('/user', isAuthenticated, (req, res) => {
    res.json({ user: req.session.user });
});

// Route to get all users (admin only)
app.get('/users', isAdmin, async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.json(users);
    } catch (error) {
        console.error("Fetch Users Error:", error); // Added for debugging
        res.status(500).json({ error: "Internal server error." });
    }
});

// Route to activate a user (admin only)
app.patch('/user/:id/activate', isAdmin, async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = await UserModel.findByIdAndUpdate(userId, { isActive: true }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User activated successfully", user: updatedUser });
    } catch (error) {
        console.error("Activate User Error:", error); // Added for debugging
        res.status(500).json({ error: "Internal server error." });
    }
});

// Route to deactivate a user (admin only)
app.patch('/user/:id/deactivate', isAdmin, async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = await UserModel.findByIdAndUpdate(userId, { isActive: false }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User deactivated successfully", user: updatedUser });
    } catch (error) {
        console.error("Deactivate User Error:", error); // Added for debugging
        res.status(500).json({ error: "Internal server error." });
    }
});

// Route to get a single user by ID (admin only)
app.get('/user/:id', isAdmin, async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user || !user.isActive) {
            return res.status(404).json({ error: "User not found or inactive" });
        }
        res.json(user);
    } catch (error) {
        console.error("Fetch User Error:", error); // Added for debugging
        res.status(500).json({ error: "Internal server error." });
    }
});
**/

