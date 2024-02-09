import { pool } from "../db.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

export const createProduct = async (req, res) => {
  try {
    const {
      category_id,
      vName_producto,
      vDescription,
      price,
      iAmount,
    } = req.body;

    let image;
    if (req.files?.image) {
      try {
        const result = await uploadImage(req.files.image.tempFilePath);
        image = {
          url: result.secure_url,
          public_id: result.public_id,
        };
        await fs.remove(req.files.image.tempFilePath);
        console.log(result);
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        res.status(500).json({ message: "Error al subir la imagen" });
        return;
      }
    }

    const [result] = await pool.query(
      "INSERT INTO tblProduct (category_id, vName_producto, vDescription, url, public_id, price, iAmount) VALUES(?,?,?,?,?,?,?)",
      [
        category_id,
        vName_producto,
        vDescription,
        image?.url || null,
        image?.public_id || null,
        price,
        iAmount,
      ]
    );
    res.json({
      product_id: result.insertId,
      category_id,
      vName_producto,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: "Error when inserting data" });
  }
};

//GET tblProduct
export const getProducts = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM tblProduct");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: "Error when inserting data" });
  }
};

//GET tblProduct {id}
export const getProduct = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM tblProduct WHERE product_id = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "product not found" });
    }
    res.json(result[0]);
  } catch (error) {}
};

//UPDATE tblProduct {id}

export const updateProduct = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE tblProduct SET ? WHERE product_id = ?",
      [req.body, req.params.id]
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: "Error when updating a data" });
  }
};

//DELETE tblProduct {id}
export const deleteProduct = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM tblProduct WHERE product_id = ?",
      [req.params.id]
    );
    //SI no lo encuentra botara 404 not found
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Product not found" });
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: "Error when i delete data" });
  }
};
