import { RequestHandler } from "express";
import Groceries from "../models/Groceries";

export const getGroceryNames: RequestHandler = async (req, res) => {
    const allGroceryNames = await Groceries.find({});
    if (allGroceryNames) {
        res.json({
            message: "Success on saveing grocery name.",
            allNames: allGroceryNames,
            status: true,
        });
    }
};

export const saveGroceryNames: RequestHandler = async (req, res) => {
    const { groceryNames } = req.body;

    const existingGroceries = await Groceries.find({});

    if (existingGroceries.length) {
        for (let name = 0; name < groceryNames.length; name++) {
            const exi = existingGroceries.filter((item) => {
                return item.grocery === groceryNames[name];
            });
            if (exi.length === 0) {
                const newDbName = new Groceries({
                    grocery: groceryNames[name],
                });
                await newDbName.save();
            }
        }
    } else {
        for (let newNames = 0; newNames < groceryNames.length; newNames++) {
            const newDbName = new Groceries({
                grocery: groceryNames[newNames],
            });
            await newDbName.save();
        }
    }

    const updatedGroceriesNames = await Groceries.find({});

    if (updatedGroceriesNames) {
        res.json({
            message: "Success on saveing grocery name.",
            allNames: updatedGroceriesNames,
            status: true,
        });
    } else {
        res.json({
            message: "Grocery name already exists",
            status: false,
        });
    }
};
