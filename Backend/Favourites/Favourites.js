import mongoose from "mongoose";
const favourtiesSchema = new mongoose.Schema({
    userId: { type: String, required: true , ref: 'User'},
    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' , required: true }] 
});


export default mongoose.model('Favourites', favourtiesSchema);
