import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import express from "express";
import recipesRoutes from './Recipes/RecipesRoutes.js';
import cors from 'cors';
import UserRoutes from './User/UserRoutes.js';
import FavouritesRoutes from './Favourites/FavouritesRoutes.js';

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/Food_App')
.then(()=>{console.log(`Mongo connected! -> ${process.env.MONGODB_URL}`)})
.catch((err)=>{
  console.error('MongoDB connection error:', err);
  console.log('Make sure MongoDB is installed and running on localhost:27017');
});



app.get('/', (req, res) => {
  res.send('Hello mohammed i hope you are fine!');
});

app.use('/recipes', recipesRoutes);
app.use('/users',UserRoutes);
app.use('/favourites' , FavouritesRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
