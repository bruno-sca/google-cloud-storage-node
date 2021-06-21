import { Request, Response } from "express";
import { uploadImage } from "../../helpers/helpers";
import { ProductModel } from "../models/ProductModel";

class ProductsController {
  async index(request: Request, response: Response) {
    const product = await ProductModel.find().lean();

    response.status(200).send({ data: product });
  }

  async create(request: Request, response: Response) {
    try {
      const product = await ProductModel.create(request.body);

      response.send({ data: product });
    } catch (error) {
      response.status(400).send({ message: error.message });
    }
  }

  async getOne(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const data = await ProductModel.findById(id);
      response.send({ data });
    } catch (e) {
      response.status(400).send({ message: "Product not exists" });
    }
  }

  async addProductPhotos(request: Request, response: Response) {
    const { id } = request.params;

    const myFile = request.file;

    if (!myFile) return response.status(400).send("No file uploaded");
    try {
      const imageUrl = await uploadImage(myFile);

      const product = await ProductModel.findById(id);
      console.log(imageUrl);
      product.images.push({
        url: imageUrl,
        alt: request.body.alt,
        index: product.images.length + 1,
      });

      await product.save();
      console.log(product.images);
      return response.status(200).send();
    } catch (e) {
      response.status(500).json({
        error: e,
        message: "Internal server error!",
      });
    }
  }
}

export { ProductsController };
