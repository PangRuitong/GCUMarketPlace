export const productQueries = {
  createProduct: `
    INSERT INTO products (title, description, price, imageUrl)
    VALUES (?, ?, ?, ?)
  `,

  updateProduct: `
    UPDATE products
    SET title = ?, description = ?, price = ?, imageUrl = ?
    WHERE id = ?
  `,

  deleteProduct: `
    DELETE FROM products
    WHERE id = ?
  `,

  getAllProducts: `
    SELECT
      id AS productId, title, description, price, imageUrl
    FROM products
  `,

  getProductsByTitle: `
    SELECT
      id AS productId, title, description, price, imageUrl
    FROM products
    WHERE title = ?
  `,

  searchProductsByTitle: `
    SELECT
      id AS productId, title, description, price, imageUrl
    FROM products
    WHERE title LIKE ?
  `,

  searchProductsByDescription: `
    SELECT
      id AS productId, title, description, price, imageUrl
    FROM products
    WHERE description LIKE ?
  `
};
