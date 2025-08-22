import {Request, Response } from "express";
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll({
    order: [
      ['id', 'DESC']
    ],
    limit: 10,
    //attributes: { exclude: ['id']}
    });
    res.json({data: products})
}

export const getProductsById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if(!product) {
    return res.status(404).json({error: "Producto no encontrado"});
  }
  res.json({data: product})
}

export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res.status(201).json({data: product});
}

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if(!product) {
    return res.status(404).json({error: "Producto no encontrado"});
  }

  //Actualizar 
  await product.update(req.body);
  await product.save();

  res.json({data: product})
}

export const updateAvailibity = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if(!product) {
    return res.status(404).json({error: "Producto no encontrado"});
  }

  //Actualizar 
  product.availability = !product.dataValues.availability;
  await product.save();

  res.json({data: product})
}

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if(!product) {
    return res.status(404).json({error: "Producto no encontrado"});
  }

  // Elimininar de la BD
  await product.destroy(); 
  res.json({data: 'Producto Eliminado'});
}