import express from 'express';
import mongoose from 'mongoose';
import Favourites from './Favourites.js';

const router = express.Router();

// GET ALL FAVOURITE RECIPES FOR A USER
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID format"
            });
        }

        // Find favourites for the user and populate recipe details
        const favourites = await Favourites.findOne({ 
            userId: new mongoose.Types.ObjectId(id) 
        }).populate('recipes');
        
        if (!favourites) {
            return res.status(200).json({
                success: true,
                count: 0,
                data: {
                    userId: id,
                    recipes: []
                }
            });
        }

        res.status(200).json({
            success: true,
            count: favourites.recipes.length,
            data: favourites
        });
    } catch (error) {
        console.error('Error fetching favourite recipes:', error);
        res.status(500).json({
            success: false,
            message: `Error fetching favourite recipes: ${error.message}`
        });
    }
});

// ADD RECIPE TO FAVOURITES
router.post("/", async (req, res) => {
    try {
        const { userId, recipeId } = req.body;
        
        // Validate required fields
        if (!userId || !recipeId) {
            return res.status(400).json({
                success: false,
                message: "userId and recipeId are required"
            });
        }

        // Validate ObjectId formats
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(recipeId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid userId or recipeId format"
            });
        }

        // Check if user already has a favourites document
        let favourites = await Favourites.findOne({ userId: new mongoose.Types.ObjectId(userId) });
        
        if (favourites) {
            // Check if recipe is already in favourites
            if (favourites.recipes.includes(recipeId)) {
                return res.status(400).json({
                    success: false,
                    message: "Recipe is already in favourites"
                });
            }
            
            // Add recipe to existing favourites
            favourites.recipes.push(recipeId);
            await favourites.save();
        } else {
            // Create new favourites document
            favourites = new Favourites({ 
                userId: new mongoose.Types.ObjectId(userId), 
                recipes: [new mongoose.Types.ObjectId(recipeId)]
            });
            await favourites.save();
        }

        // Populate the recipe details before sending response
        await favourites.populate('recipes');
        
        res.status(201).json({
            success: true,
            message: "Recipe added to favourites successfully",
            data: favourites
        });
    } catch (error) {
        console.error('Error adding recipe to favourites:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// REMOVE RECIPE FROM FAVOURITES
router.delete("/:userId/:recipeId", async (req, res) => {
    try {
        const { userId, recipeId } = req.params;
        
        // Validate ObjectId formats
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(recipeId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid userId or recipeId format"
            });
        }

        const favourites = await Favourites.findOne({ 
            userId: new mongoose.Types.ObjectId(userId) 
        });
        
        if (!favourites) {
            return res.status(404).json({
                success: false,
                message: "No favourites found for this user"
            });
        }

        // Remove recipe from favourites
        favourites.recipes = favourites.recipes.filter(
            recipe => recipe.toString() !== recipeId
        );
        
        await favourites.save();
        await favourites.populate('recipes');
        
        res.status(200).json({
            success: true,
            message: "Recipe removed from favourites successfully",
            data: favourites
        });
    } catch (error) {
        console.error('Error removing recipe from favourites:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// TOGGLE RECIPE IN FAVOURITES (ADD OR REMOVE)
router.put("/toggle", async (req, res) => {
    try {
        const { userId, recipeId } = req.body;
        
        // Validate required fields
        if (!userId || !recipeId) {
            return res.status(400).json({
                success: false,
                message: "userId and recipeId are required"
            });
        }

        // Validate ObjectId formats
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(recipeId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid userId or recipeId format"
            });
        }

        let favourites = await Favourites.findOne({ 
            userId: new mongoose.Types.ObjectId(userId) 
        });
        
        let action = '';
        
        if (favourites) {
            const recipeIndex = favourites.recipes.findIndex(
                recipe => recipe.toString() === recipeId
            );
            
            if (recipeIndex > -1) {
                // Remove recipe from favourites
                favourites.recipes.splice(recipeIndex, 1);
                action = 'removed';
            } else {
                // Add recipe to favourites
                favourites.recipes.push(new mongoose.Types.ObjectId(recipeId));
                action = 'added';
            }
            
            await favourites.save();
        } else {
            // Create new favourites document with the recipe
            favourites = new Favourites({ 
                userId: new mongoose.Types.ObjectId(userId), 
                recipes: [new mongoose.Types.ObjectId(recipeId)]
            });
            await favourites.save();
            action = 'added';
        }

        await favourites.populate('recipes');
        
        res.status(200).json({
            success: true,
            message: `Recipe ${action} ${action === 'added' ? 'to' : 'from'} favourites successfully`,
            action: action,
            data: favourites
        });
    } catch (error) {
        console.error('Error toggling recipe in favourites:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;