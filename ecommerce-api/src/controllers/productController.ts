import { Request, Response } from "express";
import { db } from "../config/db";
import { IProduct } from "../models/IProduct";
import { logError } from "../utilities/logger";
import { ResultSetHeader } from "mysql2";

export const getProducts = async (_: any, res: Response) => { 
  try {
    const sql = "SELECT * FROM products"
    const [rows] = await db.query<IProduct[]>(sql)
    res.json(rows);
  } catch (error) {
    res.status(500).json({error: logError(error)})
  }
}

/* export const fetchProductById = async (id: number) => {
  try {
    const sql = "SELECT * FROM products WHERE id = ?";
    const [rows] = await db.query<IProduct[]>(sql, [id])

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10); 
  
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid order ID" });
  }

  try {
    const order = await fetchProductById(id);
    order
      ? res.json(order)
      : res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
}; */

 export const getProductById = async (req: Request, res: Response) => { 
  const id: string = req.params.id;
  
  try {
    const sql = "SELECT * FROM products WHERE id = ?";
    const [rows] = await db.query<IProduct[]>(sql, [id])

    rows && rows.length > 0
      ? res.json(rows[0])
      : res.status(404).json({message: 'Product not found'})
  } catch (error) {
    res.status(500).json({error: logError(error)})
  }
} 

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, stock, category, image }: IProduct = req.body;
  
  try {
    const sql = `
      INSERT INTO products (name, description, price, stock, category, image) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [name, description, price, stock, category, image]
    const [result] = await db.query<ResultSetHeader>(sql, params)
    res.status(201).json({message: 'Product created', id: result.insertId});
  } catch(error: unknown) {
    res.status(500).json({error: logError(error)})
  }
}

/* export const updateProductById = async (id: number, data: Partial<IProductUpdate>) => {
  try {
    const sql = `
      UPDATE products 
      SET name = ?, description = ?, price = ?, stock = ?, category = ?, image = ? 
      WHERE id = ?
    `;

    const params = [
      data.name,
      data.description,
      data.price,
      data.stock,
      data.category,
      data.image,
      id
    ];

    const [result] = await db.query<ResultSetHeader>(sql, params);

    return result.affectedRows > 0; 
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
};

export const updateProduct = async (req: Request, res: Response) => { 
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  const { name, description, price, stock, category, image }: IProductUpdate = req.body;

  try {
    const updated = await updateProductById(id, { name, description, price, stock, category, image });

    updated
      ? res.json({ message: "Product updated" })
      : res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
}; */


  export const updateProduct = async (req: Request, res: Response) => { 
  const id = req.params.id;
  const { name, description, price, stock, category, image }: IProduct = req.body;

  try {
    const sql = `
      UPDATE products 
      SET name = ?, description = ?, price = ?, stock = ?, category = ?, image = ? 
      WHERE id = ?
    `;
    const params = [name, description, price, stock, category, image, id]
    const [result] = await db.query<ResultSetHeader>(sql, params)
    
    result.affectedRows === 0
      ? res.status(404).json({message: 'Product not found'})
      : res.json({message: 'Product updated'});
  } catch(error) {
    res.status(500).json({error: logError(error)})
  }
}  

export const deleteProduct = async (req: Request, res: Response) => { 
  const id = req.params.id;
  
  try {
    const sql = "DELETE FROM products WHERE id = ?";
    const [result] = await db.query<ResultSetHeader>(sql, [id]);
    
    result.affectedRows === 0
      ? res.status(404).json({message: 'Product not found'})
      : res.json({message: 'Product deleted'});
  } catch (error) {
    res.status(500).json({error: logError(error)})
  }
}
