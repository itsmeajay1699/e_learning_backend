import moongoose from "mongoose";

const categorySchema = new moongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
  },
  categoryNameLowerCase: {
    type: String,
    required: true,
    unique: true,
  },
});

export default moongoose.model("Category", categorySchema);
