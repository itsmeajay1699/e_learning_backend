import { Router } from "express";
import { getAllCategory, createCategory } from "../../controller/category/index.js";
const categoryRouter = Router();

categoryRouter.get("/", async (req, res) => {
  try {
    const allCategory = await getAllCategory();
    res.status(200).json({
      success: true,
      data: allCategory,
      message: "All category fetched successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

categoryRouter.post("/", async (req, res) => {
  try {
    const { category } = req.body;
    const newCategory = await createCategory(category);
    res.status(201).json({
      success: true,
      data: newCategory,
      message: "Category created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

export default categoryRouter;