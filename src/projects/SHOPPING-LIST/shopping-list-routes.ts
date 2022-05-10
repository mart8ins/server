import { Router } from "express";

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

export const sListRoute = () => {
    return router;
};
