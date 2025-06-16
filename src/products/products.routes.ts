import { Router } from 'express';
import * as ProductsController from './products.controller';

const router = Router();

router
  .route('/products')
  .post(ProductsController.createProduct);

router
  .route('/products')
  .put(ProductsController.updateProduct);

router
  .route('/products/:productId')
  .delete(ProductsController.deleteProduct);

router
  .route('/products')
  .get(ProductsController.readAllProducts);

router
  .route('/products/search/title/:search')
  .get(ProductsController.readProductsByTitleSearch);

router
  .route('/products/search/description/:search')
  .get(ProductsController.readProductsByDescriptionSearch);

router
  .route('/products/:title')
  .get(ProductsController.readProductsByTitle);

export default router;
