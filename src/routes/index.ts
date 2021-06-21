import express from "express";
import { productRouter } from "./products";

const Routes = express.Router();

Routes.use("/product", productRouter);

export { Routes };
