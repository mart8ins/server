import { Schema, model } from "mongoose";

interface User {
    // id: string;
    email: string;
    password: string;
}

const userSchema = new Schema<User>({
    // id: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export default model("User", userSchema);
