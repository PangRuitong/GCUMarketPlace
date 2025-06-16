import { OkPacket } from 'mysql2';
import { execute } from '../services/mysql.connector';
import { Product } from './products.model';
import { productQueries } from './products.queries';

// Create a new product
export const createProduct = async (product: Product) => {
  return execute<OkPacket>(productQueries.createProduct, [
    product.title,
    product.description,
    String(product.price),
    product.imageUrl,
  ]);
};

// Update existing product
export const updateProduct = async (product: Product) => {
  return execute<OkPacket>(productQueries.updateProduct, [
    product.title,
    product.description,
    String(product.price),
    product.imageUrl,
    String(product.Id),
  ]);
};

// Delete a product by ID
export const deleteProduct = async (productId: number) => {
  return execute<OkPacket>(productQueries.deleteProduct, [String(productId)]);
};

// Read all products
export const readAllProducts = async () => {
  return execute<Product[]>(productQueries.getAllProducts, []);
};

// Read by exact title
export const getProductsByTitle = async (title: string) => {
  return execute<Product[]>(productQueries.getProductsByTitle, [title]);
};

// Search by partial title
export const searchProductsByTitle = async (title: string) => {
  return execute<Product[]>(productQueries.searchProductsByTitle, [title]);
};

// Search by partial description
export const searchProductsByDescription = async (description: string) => {
  return execute<Product[]>(productQueries.searchProductsByDescription, [`%${description}%`]);
};
