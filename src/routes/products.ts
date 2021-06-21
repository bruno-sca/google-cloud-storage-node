import { Router } from "express";
import { ProductsController } from "../controllers/ProductsController";

const productRouter = Router();

const productsController = new ProductsController();

productRouter.get("/", productsController.index);
productRouter.get("/:id", productsController.index);
productRouter.post("/", productsController.create);
productRouter.post("/image/:id", productsController.addProductPhotos);

export { productRouter };
