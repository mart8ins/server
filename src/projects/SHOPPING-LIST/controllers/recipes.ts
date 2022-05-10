import { RequestHandler } from "express";
import Recipe from "../models/Recipes";

export const createRecipe: RequestHandler = async (req, res, next) => {
    const { recipeToSave, authorId } = req.body;
    const newRecipe = new Recipe(recipeToSave);
    await newRecipe.save();
    const allRecipes = await Recipe.find({ authorId });

    if (newRecipe) {
        res.json({
            message: "Recipe created.",
            update: allRecipes,
            status: true,
        });
    } else {
        res.json({
            message: "Failed to create recipe.",
            status: false,
        });
    }
};

export const getRecipes: RequestHandler = async (req, res, next) => {
    const { authorId } = req.query;
    const recipes = await Recipe.find({ authorId });

    if (recipes) {
        res.json({
            message: "Recipes fetched.",
            update: recipes,
            status: true,
        });
    } else {
        res.json({
            message: "Failed to fetch recipes.",
            status: false,
        });
    }
};

export const deleteRecipe: RequestHandler = async (req, res, next) => {
    const { recipeId } = req.body;

    const deletedRecipe = await Recipe.deleteOne({ _id: recipeId });

    if (deletedRecipe) {
        res.json({
            message: "Recipes updated.",
            status: true,
        });
    } else {
        res.json({
            message: "Failed to update recipes.",
            status: false,
        });
    }
};
