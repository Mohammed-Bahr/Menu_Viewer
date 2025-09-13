import mongoose from "mongoose";


// 1. Recipe Schema
const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    ingredients: [
      {
        type: String,
        required: true,
      },
    ],
    instructions: [
      {
        step: {
          type: String,
          required: true,
        },
      },
    ],
    cookingTime: {
      type: Number, // in minutes
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    isLoved: {
      type: Boolean,
      default: false
    }
  },
);


export default mongoose.model("Recipe", recipeSchema);
