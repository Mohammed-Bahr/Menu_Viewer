// import express from 'express';
// const router = express.Router();

// import Recipe from '../recipes/RecipesModel.js';




// const findRecipeById = async (recipeId) => {
//     try {
//         const recipe = await Recipe.findById(recipeId);
//         if (!recipe) {
//             return { 
//                 data: null, 
//                 status: 404, 
//                 message: "Recipe not found" 
//             };
//         }
//         return { 
//             data: recipe, 
//             status: 200,
//             message: "Recipe found successfully"
//         };
//     } catch (error) {
//         return { 
//             data: null, 
//             status: 500, 
//             message: `Error finding recipe: ${error.message}` 
//         };
//     }
// }



// router.post("/", async (req, res) => {
//   try {
//     const { title, description, ingredients, instructions, cookingTime, imageUrl, category } = req.body;
//     if (!title || !ingredients || !instructions || !cookingTime || !category) {
//       return res.status(400).json({ message: "Please provide all required fields" });
//     }
//     const recipe = new Recipe({
//       title,
//       description,
//       ingredients,
//       instructions,
//       cookingTime,
//       imageUrl,
//       category,
//     })
//     await recipe.save();
//     res.status(201).json(recipe);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// router.get("/", async (req, res) => {
//   try {
//     const recipes = await Recipe.find();
//     res.json(recipes).status(200);
//   } catch (error) {
//     res.status(500).json({ message:` that is the error cause -> ${error.message}` });
//   }
// });

// router.get("/:id", async (req, res) => {
//   const {id} = req.params;
//   try {
//     const { data, status } = findRecipeById(id);
//     res.json({data}).status({status});
//   } catch (error) {
//     console.error(`Enter your id correctly -> ${error.message}`);
//     res.status(500).json({ message: ` that is the error cause -> ${error.message}` });
//   }
// });

// export default router;


import express from 'express';
const router = express.Router();

import mongoose from 'mongoose';
import Recipe from './RecipesModel.js';


export const findRecipeById = async (recipeId) => {
    try {
        console.log(`findRecipeById called with ID: ${recipeId}`);
        console.log(`ID type: ${typeof recipeId}`);
        console.log(`ID length: ${recipeId.length}`);

        // Check if recipeId is provided
        if (!recipeId) {
            console.log('Recipe ID is missing');
            return {
                data: null,
                status: 400,
                message: "Recipe ID is required"
            };
        }

        // Check if the ID is valid
        if (!mongoose.Types.ObjectId.isValid(recipeId)) {
            console.log(`Invalid ObjectId format: ${recipeId}`);
            return {
                data: null,
                status: 400,
                message: "Invalid recipe ID format"
            };
        }

        // Try direct string search first
        console.log(`Trying direct string search with ID: ${recipeId}`);
        let recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            // If direct search fails, try with ObjectId conversion
            try {
                const objectId = new mongoose.Types.ObjectId(recipeId);
                console.log(`Converted to ObjectId: ${objectId}`);
                recipe = await Recipe.findById(objectId);
                console.log('Recipe search result with ObjectId:', recipe);
            } catch (idError) {
                console.error(`Error converting ID to ObjectId: ${idError.message}`);
            }

            // If still not found, try a more flexible query
            if (!recipe) {
                console.log(`Trying flexible query with _id: ${recipeId}`);
                recipe = await Recipe.findOne({ _id: recipeId });
                console.log('Recipe search result with flexible query:', recipe);
            }
        } else {
            console.log('Recipe found with direct string search:', recipe);
        }

        if (!recipe) {
            console.log(`No recipe found with ID: ${recipeId}`);
            return {
                data: null,
                status: 404,
                message: "Recipe not found"
            };
        }

        console.log(`Recipe found successfully: ${recipe._id}`);
        return {
            data: recipe,
            status: 200,
            message: "Recipe found successfully"
        };
    } catch (error) {
        console.error(`Error in findRecipeById: ${error.message}`);
        return {
            data: null,
            status: 500,
            message: `Error finding recipe: ${error.message}`
        };
    }
}

// CREATE RECIPE
router.post("/", async (req, res) => {
    try {
        const { title, description, ingredients, instructions, cookingTime, imageUrl, category } = req.body;

        if (!title || !ingredients || !instructions || !cookingTime || !category) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }

        const recipe = new Recipe({
            title,
            description,
            ingredients,
            instructions,
            cookingTime,
            imageUrl,
            category,
        });

        await recipe.save();

        res.status(201).json({
            success: true,
            message: "Recipe created successfully",
            data: recipe
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// GET ALL RECIPES
router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find();

        res.status(200).json({
            success: true,
            count: recipes.length,
            data: recipes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error fetching recipes: ${error.message}`
        });
    }
});

// GET ALL FAVOURITE RECIPES - MOVED BEFORE /:id route
router.get("/filter/favourites", async (req, res) => {
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
// GET RECIPE BY ID - MOVED AFTER /favourites route
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        console.log(`Searching for recipe with ID: ${id}`);
        console.log(`Request params:`, req.params);
        console.log(`ID from URL: ${req.originalUrl}`);

        // Make sure to await the function call since it's async
        const result = await findRecipeById(id);

        // Log the result for debugging
        console.log('findRecipeById result:', result);

        // Destructure the result after awaiting
        const { data, status, message } = result;

        return res.status(status).json({
            success: status === 200,
            message: message,
            data: data
        });
    } catch (error) {
        console.error(`Error getting recipe by ID: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: `Server error: ${error.message}`
        });
    }
});





// UPDATE RECIPE
router.put("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const recipe = await Recipe.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: "Recipe not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Recipe updated successfully",
            data: recipe
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// DELETE RECIPE
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const recipe = await Recipe.findByIdAndDelete(id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: "Recipe not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Recipe deleted successfully",
            data: recipe
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;