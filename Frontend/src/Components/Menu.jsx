import React, { useEffect, useState } from 'react';
import { Clock, Users, Star, ChefHat, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('title');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3000/recipes', {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! while fetching menu: status -> ${response.status}`);
                }

                const data = await response.json();
                setRecipes(data.data || []);
                setError(null);
            } catch (error) {
                console.error('Error fetching menu:', error);
                setError(error.message);
                // Fallback to mock data that matches your schema
                setRecipes([
                    {
                        _id: '1',
                        title: "Classic Spaghetti Carbonara",
                        description: "Traditional Italian pasta dish with eggs, cheese, pancetta, and black pepper. Creamy and delicious comfort food.",
                        ingredients: [
                            "400g spaghetti",
                            "200g pancetta or guanciale",
                            "4 large eggs",
                            "100g Pecorino Romano cheese",
                            "Black pepper",
                            "Salt"
                        ],
                        instructions: [
                            { step: "Cook pasta in salted boiling water until al dente" },
                            { step: "Fry pancetta until crispy" },
                            { step: "Whisk eggs with cheese and pepper" },
                            { step: "Combine hot pasta with pancetta and egg mixture" },
                            { step: "Serve immediately with extra cheese" }
                        ],
                        cookingTime: 25,
                        imageUrl: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                        category: "Dinner",
                        createdAt: "2024-01-15T10:30:00Z"
                    },
                    {
                        _id: '2',
                        title: "Grilled Atlantic Salmon",
                        description: "Fresh salmon fillet grilled to perfection with herbs and lemon. Healthy and flavorful main course.",
                        ingredients: [
                            "4 salmon fillets",
                            "2 lemons",
                            "Fresh dill",
                            "Olive oil",
                            "Garlic cloves",
                            "Salt and pepper"
                        ],
                        instructions: [
                            { step: "Marinate salmon with herbs and lemon" },
                            { step: "Preheat grill to medium-high heat" },
                            { step: "Grill salmon for 6-8 minutes per side" },
                            { step: "Check internal temperature reaches 145°F" },
                            { step: "Serve with lemon wedges" }
                        ],
                        cookingTime: 20,
                        imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
                        category: "Lunch",
                        createdAt: "2024-01-14T14:20:00Z"
                    },
                    {
                        _id: '3',
                        title: "Fresh Caesar Salad",
                        description: "Crisp romaine lettuce with homemade Caesar dressing, croutons, and parmesan cheese.",
                        ingredients: [
                            "2 romaine lettuce heads",
                            "1 cup croutons",
                            "1/2 cup Parmesan cheese",
                            "Caesar dressing",
                            "Anchovies (optional)",
                            "Lemon juice"
                        ],
                        instructions: [
                            { step: "Wash and chop romaine lettuce" },
                            { step: "Prepare homemade Caesar dressing" },
                            { step: "Toast bread for croutons" },
                            { step: "Toss lettuce with dressing" },
                            { step: "Top with croutons and cheese" }
                        ],
                        cookingTime: 15,
                        imageUrl: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
                        category: "Lunch",
                        createdAt: "2024-01-13T12:15:00Z"
                    },
                    {
                        _id: '4',
                        title: "Premium Ribeye Steak",
                        description: "Perfectly grilled ribeye steak seasoned with herbs and spices. A meat lover's dream.",
                        ingredients: [
                            "2 ribeye steaks",
                            "Salt",
                            "Black pepper",
                            "Garlic powder",
                            "Fresh thyme",
                            "Butter"
                        ],
                        instructions: [
                            { step: "Let steaks come to room temperature" },
                            { step: "Season generously with salt and pepper" },
                            { step: "Preheat grill or cast iron pan" },
                            { step: "Cook 4-5 minutes per side for medium-rare" },
                            { step: "Let rest for 5 minutes before serving" }
                        ],
                        cookingTime: 30,
                        imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                        category: "Dinner",
                        createdAt: "2024-01-12T18:45:00Z"
                    },
                    {
                        _id: '5',
                        title: "Fluffy Pancakes",
                        description: "Light and fluffy pancakes perfect for breakfast. Serve with syrup and fresh berries.",
                        ingredients: [
                            "2 cups all-purpose flour",
                            "2 eggs",
                            "1 1/2 cups milk",
                            "2 tbsp sugar",
                            "2 tsp baking powder",
                            "1/2 tsp salt",
                            "Butter for cooking"
                        ],
                        instructions: [
                            { step: "Mix dry ingredients in a bowl" },
                            { step: "Whisk together wet ingredients" },
                            { step: "Combine wet and dry ingredients" },
                            { step: "Cook on griddle until bubbles form" },
                            { step: "Flip and cook until golden brown" }
                        ],
                        cookingTime: 20,
                        imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
                        category: "Breakfast",
                        createdAt: "2024-01-11T08:30:00Z"
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    // Get unique categories from recipes //all is a default category and first one at the set of categories
    // 
    const categories = ['all', ...new Set(recipes.map(recipe => recipe.category.toLowerCase()))];
    // const categories = [...new Set(recipes.map(recipe => recipe.category?.toLowerCase()))].filter(Boolean);
    // categories.push('all');

    // Filter and sort recipes
    const filteredAndSortedRecipes = recipes
        .filter(recipe => {
            const matchesCategory = selectedCategory === 'all' ||
                recipe.category?.toLowerCase() === selectedCategory.toLowerCase();
            const matchesSearch = recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                recipe.description?.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'title':
                    return a.title?.localeCompare(b.title) || 0;
                case 'cookingTime':
                    return (a.cookingTime || 0) - (b.cookingTime || 0);
                case 'newest':
                    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
                case 'oldest':
                    return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
                default:
                    return 0;
            }
        });

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading our delicious recipes...</p>
                </div>
            </div>
        );
    }

    // const handleViewRecipe = (recipeId) => {
    //     navigate(`/RecipeView/${recipeId}`);
    // };
    return (
        <div className="mt-7 min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
                        <ChefHat className="text-blue-600" />
                        Recipe Collection
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Discover our carefully curated collection of recipes, crafted with love and tested to perfection.
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
                        <p className="text-sm">
                            <strong>Note:</strong> Could not connect to server ({error}).
                            Showing demo recipes instead.
                        </p>
                    </div>
                )}

                {/* Search and Filter Controls */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search recipes..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Sort */}
                        <div className="flex items-center gap-2">
                            <Filter className="text-gray-400 w-4 h-4" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="title">Sort by Name</option>
                                <option value="cookingTime">Sort by Cooking Time</option>
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedCategory === category
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {category === 'all' ? 'All Recipes' : category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Recipe Grid */}
                {filteredAndSortedRecipes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAndSortedRecipes.map(recipe => (
                            <div key={recipe._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <div className="h-48 bg-gray-200 relative">
                                    <img
                                        src={recipe.imageUrl || "https://via.placeholder.com/400x300?text=Recipe"}
                                        alt={recipe.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/400x300?text=Recipe";
                                        }}
                                    />
                                    <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4 text-gray-600" />
                                            <span className="text-sm font-medium">{recipe.cookingTime}m</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">
                                            {recipe.title}
                                        </h3>
                                    </div>

                                    <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                                        {recipe.description}
                                    </p>

                                    {/* Ingredients Preview */}
                                    <div className="mb-4">
                                        <p className="text-sm font-medium text-gray-700 mb-2">
                                            Ingredients ({recipe.ingredients?.length || 0}):
                                        </p>
                                        <div className="flex flex-wrap gap-1">
                                            {recipe.ingredients?.slice(0, 3).map((ingredient, index) => (
                                                <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                                    {ingredient.length > 15 ? ingredient.substring(0, 15) + '...' : ingredient}
                                                </span>
                                            ))}
                                            {recipe.ingredients?.length > 3 && (
                                                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                                                    +{recipe.ingredients.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{recipe.cookingTime} minutes</span>
                                        </div>
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                            {recipe.category}
                                        </span>
                                    </div>

                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        navigate(`/recipe/${recipe._id}`);
                                    }} className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200">
                                        View Full Recipe
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 text-lg">No recipes found matching your criteria.</p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('all');
                            }}
                            className="mt-4 text-blue-600 hover:text-blue-800 underline"
                        >
                            Clear filters
                        </button>
                    </div>
                )}

                {/* Recipe Stats */}
                {recipes.length > 0 && (
                    <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div>
                                <div className="text-2xl font-bold text-blue-600">{recipes.length}</div>
                                <div className="text-sm text-gray-600">Total Recipes</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-green-600">
                                    {Math.round(recipes.reduce((sum, recipe) => sum + (recipe.cookingTime || 0), 0) / recipes.length)}m
                                </div>
                                <div className="text-sm text-gray-600">Avg. Cooking Time</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-purple-600">
                                    {new Set(recipes.map(r => r.category)).size}
                                </div>
                                <div className="text-sm text-gray-600">Categories</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-orange-600">
                                    {filteredAndSortedRecipes.length}
                                </div>
                                <div className="text-sm text-gray-600">Filtered Results</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;





