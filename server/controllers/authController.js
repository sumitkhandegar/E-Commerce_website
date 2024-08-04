import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModel.js';
import orderModel from '../models/orderModel.js';
import JWT from 'jsonwebtoken';
 
// POST register
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;

        // Validation
        if (!name || !email || !password || !phone || !address || !answer) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).json({
                success: false,
                message: "User already exists. Please login.",
            });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create new user
        const newUser = new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            answer,            
        });

        // Save user to database
        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                address: newUser.address,
                answer: newUser.answer,
            },
        });
    } catch (error) {
        console.error("Error in registration:", error);
        return res.status(500).json({
            success: false,
            message: "Error in registration",
            error: error.message,
        });
    }
};

// POST login
export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body
        // validation
        if (!email || !password) {
            return res.status(404).send({
                success:false,
                message: "Invalid email or password",
            });
        }
        // check user
        const user = await userModel.findOne({email})
        if (!user) {
            return res.status(404).send({
                success:false,
                message: "Email is not registered",
            });
        }
        // password validattion
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success:false,
                message: "Invalid Password",
            })
        }
        // auth token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).send({
            success:true,
            message: "Login Successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message: "Error in login",
            error,
        });
    }
};

// POST forgot-password
export const forgotPasswordController = async (req, res) => {
    try {
        const{email, answer, newPassword} = req.body;

        // form validation
        if (!email || !answer || !newPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // check user
        const user = await userModel.findOne({email, answer})
        if (!user) {
            return res.status(404).send({
                success:false,
                message: "Wrong email or answer",
            });
        }

        // Hash the newPassword
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, {password: hashed});
        res.status(200).send({
            success:true,
            message: "Password Updates Successfully",
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: "Failed to Update Password",
            error,
        })
    }
}

// updateProfileController
export const updateProfileController = async (req, res) => {
    try {
        const { name, email, phone, password, address } = req.body;
        const user = await userModel.findById(req.user._id);
        if (password && password.length < 6) {
            return res.json({ error: "Password must be at least 6 characters" });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updateUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                address: address || user.address,
            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Profile updated successfully",
            user: updateUser
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while updating profile",
            error
        });
    }
};

// getOrdersController
export const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({buyer: req.user._id}).populate("products","-photo").populate("buyer","name");
        res.json(orders);

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting products",
            error
        });
    }
}

// GET test
export const testController = async (req, res) => {
    try {
        res.send('Protected Route');
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}
