import { Router } from "express";
import mongoose from "mongoose";

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@shopping.8edhp.mongodb.net/${process.env.DATABASE_NAME_SLIST}?retryWrites=true&w=majority`,
    {}
);

import { createRecipe, getRecipes, deleteRecipe } from "./controllers/recipes";
import { getGroceryNames, saveGroceryNames } from "./controllers/groceries";
import { createShoppingList, deleteShoppingList, getShoppingLists, updateShoppingList } from "./controllers/shoppingList";
import { signIn } from "./controllers/user";

const router = Router();

// RECIPE
router.get("/recipe", getRecipes);
router.post("/recipe", createRecipe);
router.post("/recipe/delete", deleteRecipe);

// GROCERIES
router.get("/groceries", getGroceryNames);
router.post("/groceries", saveGroceryNames);

// SHOPPING LIST
router.get("/shoppingList", getShoppingLists);
router.post("/shoppingList", createShoppingList);
router.post("/shoppingList/update", updateShoppingList);
router.post("/shoppingList/delete", deleteShoppingList);

// USER
router.post("/user", signIn);

export default router;
