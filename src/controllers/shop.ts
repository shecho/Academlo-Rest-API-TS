import {Request, Response} from 'express';
import fs from 'fs';
import path from 'path';
import Product from '../models/products';

export const welcome = (req: Request, res: Response) => {
    res.json({
        message: "Hola Mundo"
    });
};

export const getProducts = (req: Request, res: Response) => {
    let products = [];
    //1 -> Ascendente
    //-1 -> Descendente
    Product.find().sort({price: 1}).then( productsDoc => {
        products = productsDoc;
        res.json(products);
    }).catch(error => {
        console.log(error);
    });
};

export const postProduct = (req: Request, res: Response) => {
    const newProduct = new Product({...req.body});
    newProduct.save().then(() => {
        console.log("Se ha agregado el producto correctamente")
        res.json({
            message: "Se ha agregado el producto correctamente",
            product: newProduct 
        });
    }).catch( error => {
        console.log(error);
    });
}

export const putProduct = (req: Request, res: Response) => {
    let id = req.params.id;
    Product.findByIdAndUpdate(id, {...req.body}).then( product => {
        res.json({
            message:"Se ha actualizado el producto correctamente",
            product: product
        })
    }).catch(error => console.log(error));
}

export const deleteProduct = (req: Request, res: Response) => {
    let id = req.params.id;
    Product.findByIdAndRemove(id).then(product => {
        console.log(product);
        res.json({
            message: "El producto se ha eliminado correctamente",
            product: product
        })
    }).catch(error => console.log(error));
}