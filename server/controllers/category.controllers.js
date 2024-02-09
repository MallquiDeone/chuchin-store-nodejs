import { pool } from "../db.js";

//create category
export const createCategory = async (req, res) => {
  try {
    const { vName } = req.body;
    const [result] = await pool.query("INSERT INTO tblCategory(vName) VALUES(?)",
      [vName]
    )
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error when inserting data" });
  }
};

//GET tblCategories
export const getCategories = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM tblCategory");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: "Error when view all category" });
  }
};

//GET tblCategory {id}
export const getCategory = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM tblCategory WHERE category_id = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "category not found" });
    }
    res.json(result[0]);
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: "Error when viewing a category" });
  }
};

//DELETE tblCategory {id}
export const deleteCategory = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM tblCategory WHERE category_id = ?",
      [req.params.id]
    );
    //SI no lo encuentra botara 404 not found
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Tarea no encontrada" });
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: "Error when viewing a category" });
  }
};

//UPDATE tblCategory
export const updateCategory = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE tblCategory SET ? WHERE category_id = ?",
      [req.body, req.params.id]
    );
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: "Error when updating a category" });
  }
};
