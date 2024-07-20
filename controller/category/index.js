import Category from "../../schema/mongodb/category.js";

export const getAllCategory = async () => {
  try {
    const allCategory = await Category.find();
    return allCategory;
  } catch (err) {
    throw new Error(err);
  }
};

export const createCategory = async (category) => {
  try {
    if (!category) {
      throw new Error("Category is required");
    }
    const categoryData = category.split(" ").join("").toLowerCase();

    const categoryExist = await Category.findOne({
      categoryName: category.toLowerCase(),
    });

    if (categoryExist) {
      throw new Error("Category already exist");
    }

    const newCategory = await Category.create({
      categoryName: category.toLowerCase(),
      categoryNameLowerCase: categoryData,
    });

    return newCategory;
  } catch (err) {
    throw new Error(err);
  }
};
