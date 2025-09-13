import React, { useState, useEffect } from 'react';
import { Heart, Clock, Users, ChefHat, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const FavouritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const navigate = useNavigate();
  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/recipes/filter/favourites', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch favorites');
      }
      const data = await response.json();
      console.log('API Response:', data); // Log the response for debugging

      // Handle different response formats
      let favoritesData = [];

      if (data && data.success === true && Array.isArray(data.data)) {
        // Standard API response format with success flag and data array
        favoritesData = data.data;
      } else if (data && Array.isArray(data.data)) {
        // API response with data property containing array
        favoritesData = data.data;
      } else if (Array.isArray(data)) {
        // Direct array response
        favoritesData = data;
      } else {
        // Unexpected format - log and use empty array
        console.error('Unexpected API response format:', data);
      }

      // Ensure each recipe has required properties
      const validatedFavorites = favoritesData.map(recipe => ({
        ...recipe,
        title: recipe.title || 'Untitled Recipe',
        category: recipe.category || 'Uncategorized',
        ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
        cookingTime: recipe.cookingTime || 0,
        imageUrl: recipe.imageUrl || ''
      }));

      setFavorites(validatedFavorites);
    } catch (err) {
      console.error('Error fetching favorites:', err);
      setError(err.message);
      setFavorites([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (recipeId) => {
    // Optimistic update
    setFavorites(prevFavorites =>
      prevFavorites.map(recipe =>
        recipe._id === recipeId
          ? { ...recipe, isLoved: !recipe.isLoved }
          : recipe
      )
    );

    try {
      // You might want to implement an API call to update the favorite status
      // await fetch(`http://localhost:3000/recipes/${recipeId}/favorite`, { method: 'PATCH' });
    } catch (err) {
      console.error('Failed to update favorite status:', err);
      // Revert optimistic update on error
      setFavorites(prevFavorites =>
        prevFavorites.map(recipe =>
          recipe._id === recipeId
            ? { ...recipe, isLoved: !recipe.isLoved }
            : recipe
        )
      );
    }
  };

  const filteredAndSortedFavorites = (() => {
    // First check if favorites is an array
    if (!Array.isArray(favorites)) {
      console.warn('favorites is not an array:', favorites);
      return [];
    }

    // Filter recipes
    const filtered = favorites.filter(recipe => {
      // Check if recipe is a valid object
      if (!recipe || typeof recipe !== 'object') {
        return false;
      }

      // Check title match
      const titleMatches = recipe.title &&
        typeof recipe.title === 'string' &&
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase());

      // Check category match
      const categoryMatches = selectedCategory === 'all' ||
        (recipe.category && recipe.category === selectedCategory);

      return titleMatches && categoryMatches;
    });

    // Sort recipes
    return filtered.sort((a, b) => {
      try {
        switch (sortBy) {
          case 'title':
            return typeof a.title === 'string' && typeof b.title === 'string'
              ? a.title.localeCompare(b.title || '')
              : 0;
          case 'cookingTime':
            return (Number(a.cookingTime) || 0) - (Number(b.cookingTime) || 0);
          case 'category':
            return typeof a.category === 'string' && typeof b.category === 'string'
              ? (a.category || '').localeCompare(b.category || '')
              : 0;
          default:
            return 0;
        }
      } catch (err) {
        console.error('Error sorting recipes:', err);
        return 0;
      }
    });
  })();

  const categories = (() => {
    if (!Array.isArray(favorites)) {
      return [];
    }

    // Filter out recipes without a valid category
    const validRecipes = favorites.filter(recipe =>
      recipe && typeof recipe === 'object' && recipe.category && typeof recipe.category === 'string'
    );

    // Extract unique categories
    return [...new Set(validRecipes.map(recipe => recipe.category))];
  })();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchFavorites}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Heart className="h-8 w-8 text-red-500 fill-current" />
              <h1 className="text-3xl font-bold text-gray-800">My Favorite Recipes</h1>
            </div>
            <div className="text-sm text-gray-600">
              {favorites.length} recipe{favorites.length !== 1 ? 's' : ''} saved
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <ChefHat className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="title">Sort by Name</option>
                <option value="cookingTime">Sort by Cooking Time</option>
                <option value="category">Sort by Category</option>
              </select>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredAndSortedFavorites.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              {searchTerm || selectedCategory !== 'all' ? 'No matching recipes found' : 'No favorites yet'}
            </h3>
            <p className="text-gray-500">
              {searchTerm || selectedCategory !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Start exploring recipes and add them to your favorites!'
              }
            </p>
          </div>
        ) : (
          /* Recipe Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedFavorites.map((recipe) => (
              <div
                onClick={() => navigate(`/recipe/${recipe._id}`)}
                role="button"
                key={recipe._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
                    }}
                  />
                  {/* Heart Button */}
                  <button
                    onClick={() => toggleFavorite(recipe._id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 transition-all duration-200 group"
                  >
                    <Heart
                      className={`h-5 w-5 transition-all duration-200 ${recipe.isLoved
                        ? 'text-red-500 fill-current'
                        : 'text-gray-400 group-hover:text-red-500'
                        }`}
                    />
                  </button>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {recipe.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                    {recipe.title}
                  </h3>

                  {recipe.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {recipe.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{recipe.cookingTime} mins</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{recipe.ingredients.length} ingredients</span>
                    </div>
                  </div>

                  {/* Ingredients Preview */}
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Key ingredients:</p>
                    <div className="flex flex-wrap gap-1">
                      {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                        >
                          {ingredient.length > 12 ? ingredient.substring(0, 12) + '...' : ingredient}
                        </span>
                      ))}
                      {recipe.ingredients.length > 3 && (
                        <span className="text-gray-400 text-xs py-1">
                          +{recipe.ingredients.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* View Recipe Button */}
                  <button

                    className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-medium">
                    View Recipe
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavouritesPage;