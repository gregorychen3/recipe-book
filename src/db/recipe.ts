import { Document, Model, model, Schema } from "mongoose";
import { CourseValues, CuisineValues, IRecipe } from "../types";

export interface IRecipeModel extends IRecipe, Document {}

export const RecipeSchema = new Schema({
  name: { type: String, required: true },
  course: { type: String, enum: CourseValues, required: true },
  cuisine: { type: String, enum: CuisineValues, required: true },
  servings: { type: Number, required: true },
  ingredients: {
    type: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: false },
        unit: { type: String, required: false },
      },
    ],
    required: true,
  },
  instructions: { type: [String], required: true },
  sources: { type: [String], required: true },
});

export const Recipe: Model<IRecipeModel> = model<IRecipeModel>(
  "Recipe",
  RecipeSchema
);
