import { Request, RequestHandler, Response } from 'express';
import * as ProductDao from './product.dao';
import { Product } from './products.model';
import { OkPacket } from 'mysql2';

export const readAllProducts: RequestHandler = async (req: Request, res: Response) => {
  try {
    const products = await ProductDao.readAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('[products.controller][readProducts][Error] ', error);
    res.status(500).json({
      message: 'There was an error when fetching products'
    });
  }
};

export const createProduct: RequestHandler = async (req: Request, res: Response) => {
  try {
    const okPacket: OkPacket = await ProductDao.createProduct(req.body);
    console.log('req.body', req.body);
    console.log('product', okPacket);
    res.status(200).json(okPacket);
  } catch (error) {
    console.error('[products.controller][createProduct][Error] ', error);
    res.status(500).json({
      message: 'There was an error when writing products'
    });
  }
};

export const updateProduct: RequestHandler = async (req: Request, res: Response) => {
  try {
    const response = await ProductDao.updateProduct(req.body);
    res.status(200).json(response);
  } catch (error) {
    console.error('[products.controller][updateProduct][Error] ', error);
    res.status(500).json({
      message: 'There was an error when updating the product'
    });
  }
};

export const deleteProduct: RequestHandler = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.productId as string);
    console.log('productId', productId);

    if (!Number.isNaN(productId)) {
      const response = await ProductDao.deleteProduct(productId);
      res.status(200).json(response);
    } else {
      throw new Error("Integer expected for productId");
    }
  } catch (error) {
    console.error('[products.controller][deleteProduct][Error] ', error);
    res.status(500).json({
      message: 'There was an error when deleting products'
    });
  }
};

export const readProductsByTitle: RequestHandler = async (req: Request, res: Response) => {
  try {
    const products = await ProductDao.getProductsByTitle(req.params.title);
    res.status(200).json(products);
  } catch (error) {
    console.error('[products.controller][readProductsByTitle][Error] ', error);
    res.status(500).json({
      message: 'There was an error when fetching products by title'
    });
  }
};

export const readProductsByTitleSearch: RequestHandler = async (req: Request, res: Response) => {
  try {
    const products = await ProductDao.searchProductsByTitle(`%${req.params.search}%`);
    res.status(200).json(products);
  } catch (error) {
    console.error('[products.controller][readProductsByTitleSearch][Error] ', error);
    res.status(500).json({
      message: 'There was an error when searching products by title'
    });
  }
};

export const readProductsByDescriptionSearch: RequestHandler = async (req: Request, res: Response) => {
  try {
    const products = await ProductDao.searchProductsByDescription(`%${req.params.search}%`);
    res.status(200).json(products);
  } catch (error) {
    console.error('[products.controller][readProductsByDescriptionSearch][Error] ', error);
    res.status(500).json({
      message: 'There was an error when searching products by description'
    });
  }
};
