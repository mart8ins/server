import { Schema, model } from "mongoose";

interface Recipe {
    // id: string;
    authorId: string;
    recipeTitle: string;
    preperation: string;
    cals: string;
    recipeGroceriesList: [];
}

const recipeSchema = new Schema<Recipe>({
    // id: { type: String, required: true },
    authorId: { type: String, required: true },
    recipeTitle: { type: String, required: true },
    preperation: { type: String, required: true },
    cals: { type: String, required: true },
    recipeGroceriesList: [
        {
            _id: false,
            id: { type: String, required: true },
            grocery: { type: String, required: true },
            quantity: { type: String, required: true },
            unit: { type: String, required: true },
            checked: { type: Boolean, required: true },
            recipeTitle: { type: String },
            portions: { type: Number, required: true },
        },
    ],
});

export default model("Recipe", recipeSchema);
