import mongoose from "mongoose";
import Recipe from "../recipes/RecipesModel.js";
const favourtiesSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }] 
});


const Favourites = mongoose.model('Favourites', favourtiesSchema);
export default Favourites;