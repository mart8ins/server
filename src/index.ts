require("dotenv").config();

import express, { Request, Response, NextFunction } from "express";
import { sListRoute } from "./projects/SHOPPING-LIST/shopping-list-routes";
import cors from "cors";
import mongoose from "mongoose";

const port = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }), express.json());
app.use(cors());

// PROJECTS
app.use("/shopping-list", sListRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@shopping.8edhp.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
        {}
    )
    .then(() => {
        app.listen(port, () => {
            console.log("App startet on port " + port);
        });
    })
    .catch((err) => {
        console.log(err);
    });
