import express from 'express';
const router = express.Router();

import mongoose from 'mongoose';
import Recipe from './RecipesModel.js';




// GET ALL FAVOURITE RECIPES - MOVED BEFORE /:id route
router.get("/favourites", async (req, res) => {
    try {
        const recipes = await Recipe.find({ isLoved: true });

        res.status(200).json({
            success: true,
            count: recipes.length,
            data: recipes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error fetching favorite recipes: ${error.message}`
        });
    }
});