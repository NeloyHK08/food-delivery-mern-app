const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ================= USER ================= */

async function registerUser(req, res) {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await userModel.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            fullName,
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        console.log("✅ User created successfully:", user);

        const token = jwt.sign({ id: user._id, role: "user" }, process.env.JWT_SECRET);
        res.cookie("token", token, { httpOnly: true });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName,
            },
        });
    } catch (error) {
        console.error("REGISTER USER ERROR:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await userModel.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id, role: "user" }, process.env.JWT_SECRET);
        res.cookie("token", token, { httpOnly: true });

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName,
            },
        });
    } catch (error) {
        console.error("LOGIN USER ERROR:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

/* ================= FOOD PARTNER ================= */

async function registerFoodPartner(req, res) {
    try {
        const {
            restaurantName,
            ownerName,
            email,
            phone,
            password,
            confirmPassword,
        } = req.body;

        // Validation (based on UI)
        if (
            !restaurantName ||
            !ownerName ||
            !email ||
            !phone ||
            !password ||
            !confirmPassword
        ) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match",
            });
        }

        const existingPartner = await foodPartnerModel.findOne({
            email: email.toLowerCase(),
        });

        if (existingPartner) {
            return res.status(400).json({
                message: "Food partner account already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const foodPartner = await foodPartnerModel.create({
            restaurantName,
            ownerName,
            email: email.toLowerCase(),
            phone,
            password: hashedPassword,
        });

        const token = jwt.sign(
            { id: foodPartner._id, role: "foodPartner" },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, { httpOnly: true });

        res.status(201).json({
            message: "Food partner registered successfully",
            foodPartner: {
                _id: foodPartner._id,
                restaurantName: foodPartner.restaurantName,
                ownerName: foodPartner.ownerName,
                email: foodPartner.email,
                phone: foodPartner.phone,
            },
        });
    } catch (error) {
        console.error("REGISTER FOOD PARTNER ERROR:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function loginFoodPartner(req, res) {
    try {
        const { email, password } = req.body;

        console.log("🔍 Login attempt - Email:", email, "Password length:", password?.length);

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const foodPartner = await foodPartnerModel.findOne({
            email: email.toLowerCase(),
        });
        
        console.log("🔍 Food Partner found:", foodPartner ? "Yes" : "No");

        if (!foodPartner) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            foodPartner.password
        );

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            { id: foodPartner._id, role: "foodPartner" },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, { httpOnly: true });

        res.status(200).json({
            message: "Food partner logged in successfully",
            foodPartner: {
                _id: foodPartner._id,
                restaurantName: foodPartner.restaurantName,
                ownerName: foodPartner.ownerName,
                email: foodPartner.email,
                phone: foodPartner.phone,
            },
        });
    } catch (error) {
        console.error("LOGIN FOOD PARTNER ERROR:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

/* ================= LOGOUT ================= */

function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
}

function logoutFoodpartner(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "Food partner logged out successfully" });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodpartner,
};
