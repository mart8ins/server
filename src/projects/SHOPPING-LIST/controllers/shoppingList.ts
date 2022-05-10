import { RequestHandler } from "express";
import ShoppingList from "../models/ShoppingList";

export const createShoppingList: RequestHandler = async (req, res, next) => {
    const { list } = req.body;
    if (list) {
        const newList = new ShoppingList(list);
        const listSaved = await newList.save();
        const allLists = await ShoppingList.find({ authorId: list.authorId }); // all lists to update client list context

        res.json({
            message: "List saved",
            list: listSaved,
            allLists,
            status: true,
        });
    } else {
        res.json({
            message: "Failed to save list",
            status: false,
        });
    }
};

export const getShoppingLists: RequestHandler = async (req, res, next) => {
    const { authorId } = req.query;

    const userLists = await ShoppingList.find({ authorId: authorId });
    if (userLists) {
        res.json({
            message: "Success on getting user shopping lists.",
            lists: userLists,
            status: true,
        });
    } else {
        res.json({
            message: "Failed to get user shopping lists.",
            status: false,
        });
    }
};

export const deleteShoppingList: RequestHandler = async (req, res, next) => {
    const { listId, authorId } = req.body;
    const deletedList = await ShoppingList.deleteOne({ _id: listId });
    const allLists = await ShoppingList.find({ authorId });

    if (deletedList) {
        res.json({
            message: "Shopping list deleted",
            update: allLists,
            status: true,
        });
    } else {
        res.json({
            message: "Failed to delete shopping list",
            status: false,
        });
    }
};

export const updateShoppingList: RequestHandler = async (req, res, next) => {
    const { listToChange } = req.body;
    const updated = await ShoppingList.findOneAndReplace({ _id: listToChange._id }, listToChange);
    const allLists = await ShoppingList.find({ authorId: listToChange.authorId });

    if (updated) {
        res.json({
            message: "Shopping list changed",
            update: allLists,
            status: true,
        });
    } else {
        res.json({
            message: "Failed to change shopping list",
            status: false,
        });
    }
};
