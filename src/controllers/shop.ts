import { Request, Response } from "express";
import Product from "../models/products";

export const welcome = (req: Request, res: Response) => {
  res.json({
    message: "Hola dese express",
  });
};

export const getProducts = async (req: Request, res: Response) => {
  let products = [];
  try {
    products = await Product.find().sort({ price: 1 });
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

export const postProduct = async (req: Request, res: Response) => {
  let newProduct = new Product({ ...req.body });

  try {
    newProduct = await newProduct.save();
    res.json({
      message: "Se ha agregado el producto correctamente",
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
  }
};

export const putProduct = async (req: Request, res: Response) => {
  let id = req.params.id;
  try {
    let product = await Product.findByIdAndUpdate(id, { ...req.body });
    res.json({
      message: "Se ha actualizado el producto correctamente",
      product: product,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  let id = req.params.id;

  try {
    let deletedProduc = Product.findByIdAndRemove(id);
    res.json({
      message: "El producto se ha eliminado correctamente",
      product: deletedProduc,
    });
  } catch (error) {
    console.log(error);
  }
};
