import { Schema, model } from "mongoose";

interface ShoppingList {
    authorId: string;
    title: string;
    completed: boolean;
    groceries: [
        {
            id: string;
            grocery: string;
            quantity: string;
            unit: string;
            checked: boolean;
            recipeTitle?: string;
            portions: number;
        }
    ];
}

const shoppingListSchema = new Schema<ShoppingList>({
    authorId: { type: String, required: true },
    title: { type: String, required: true },
    completed: { type: Boolean, required: true },
    groceries: [
        {
            _id: false,
            id: { type: String },
            grocery: { type: String, required: true },
            quantity: { type: String, required: true },
            unit: { type: String, required: true },
            checked: { type: Boolean, required: true },
            recipeTitle: { type: String },
            portions: { type: Number, required: true },
        },
    ],
});

export default model("ShoppingList", shoppingListSchema);
