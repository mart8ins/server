import { RequestHandler } from "express";
// import { v4 as uuidv4 } from "uuid";
import User from "../models/User";

export const signIn: RequestHandler = async (req, res, next) => {
    const { email, password, action } = req.body.user; // action if true - login, else signup
    let success;
    let message;
    let userId;

    // LOGIN
    if (action) {
        const findUser = await User.findOne({ email: email });
        if (findUser) {
            if (findUser.password === password) {
                success = true;
                message = "Success on signing in.";
                userId = String(findUser._id);
            } else {
                success = false;
                message = "Failed to login! Check you credentials.";
            }
        } else {
            success = false;
            message = "Failed to login! Check you credentials.";
        }

        if (success) {
            return res.json({
                message,
                userId: userId,
                status: success,
            });
        } else {
            return res.json({
                message,
                status: success,
            });
        }
    }

    // REGISTER
    if (!action) {
        const userEmailExists = await User.findOne({ email: email });

        if (userEmailExists) {
            success = false;
            message = "Email already exists!";
        } else {
            const userToSave = new User({
                email,
                password,
            });
            await userToSave.save();
            success = true;
            userId = String(userToSave._id);
            message = "Success on signup!";
        }

        if (success) {
            return res.json({
                message,
                userId,
                status: success,
            });
        } else {
            return res.json({
                message,
                status: success,
            });
        }
    }
};
