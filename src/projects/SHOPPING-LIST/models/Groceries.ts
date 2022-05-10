import { Schema, model } from "mongoose";

interface Groceries {
    grocery: string;
}

const groceriesSchema = new Schema<Groceries>({
    grocery: { type: String, required: true },
});

export default model("Groceries", groceriesSchema);
