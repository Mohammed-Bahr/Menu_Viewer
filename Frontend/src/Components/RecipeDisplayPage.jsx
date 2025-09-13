import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Clock,
  Users,
  ChefHat,
  ArrowLeft,
  Eye,
  Code,
  Heart,
  Share2,
  Printer,
} from "lucide-react";

const RecipeDisplayPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDebugView, setShowDebugView] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isUpdatingFavorite, setIsUpdatingFavorite] = useState(false); // Loading state for favorite toggle
  // const [data , setData] = useState();
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:3000/recipes/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 404) {
          throw new Error("Recipe not found");
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRecipe(data.data || data);
        // Fix: Properly set the favorite state from database
        setIsFavorited(Boolean(data.data?.isLoved || data?.isLoved));
        setError(null);
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError(err.message);

        if (err.message !== "Recipe not found") {
          const fallbackRecipe = {
            _id: id,
            title: "Sample Recipe (Connection Error)",
            description:
              "This is a demo recipe shown because the server could not be reached.",
            ingredients: ["Sample ingredient 1", "Sample ingredient 2"],
            instructions: [
              { step: 1, text: "This is step 1 of the demo recipe." },
              { step: 2, text: "This is step 2 of the demo recipe." },
            ],
            cookingTime: 30,
            imageUrl:
              "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop",
            category: "Demo",
            createdAt: new Date().toISOString(),
            isLoved: false,
          };
          setRecipe(fallbackRecipe);
          setIsFavorited(false);
        } else {
          setRecipe(null);
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  // NEW: Function to toggle favorite status in database
  const toggleFavorite = async () => {
    if (!recipe || isUpdatingFavorite) return;

    setIsUpdatingFavorite(true);
    const newFavoriteState = !isFavorited;

    try {
      const response = await fetch(`http://localhost:3000/recipes/${id}`, {
        method: "PUT", // or 'PUT' depending on your backend
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isLoved: newFavoriteState,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedData = await response.json();

      // Update local state
      setIsFavorited(newFavoriteState);

      // Update recipe object to keep data in sync
      setRecipe((prev) => ({
        ...prev,
        isLoved: newFavoriteState,
      }));

      console.log("Favorite status updated successfully:", updatedData);
      //------------------------------------------------------------------------------------
      // this part for adding the loved item to the Favourtie collection at data base and the oppisite

      if (updatedData.data.isLoved) {
        const res = await fetch(`http://localhost:3000/favourites`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"), // Get userId from localStorage
            recipeId: id,
          }),
        });
        const data = await res.json();
        console.log(data);
        if (data.success) {
          console.log("Recipe added to favorites!");
        } else {
          console.log("Failed to add to favorites. Please try again.");
        }
      }
      else{
        const res = await fetch(`http://localhost:3000/favourites/${localStorage.getItem('userId')}/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        console.log(data);
        if (data.success) {
          console.log("Recipe removed from favorites!");
        } else {
          console.log("Failed to remove from favorites. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
      // Show user-friendly error message
      alert("Failed to update favorite status. Please try again.");
      // Don't update the UI state if the request failed
    } finally {
      setIsUpdatingFavorite(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleShare = async () => {
    if (!recipe) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: recipe.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Recipe link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (error && !recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Recipe Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            Sorry, we couldn't find the recipe you're looking for. It might have
            been moved or deleted.
          </p>
          <button
            onClick={handleBack}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">
          Could not load recipe data.
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 min-h-screen bg-gray-50 recipe-content">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10 print-hide">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Recipes</span>
            </button>

            <div className="flex items-center gap-3">
              {/* UPDATED: Favorite button with database integration */}
              <button
                onClick={toggleFavorite}
                disabled={isUpdatingFavorite}
                className={`p-2 rounded-full transition-colors favorite-button relative ${
                  isFavorited
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-600"
                } hover:bg-opacity-80 ${
                  isUpdatingFavorite ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label={
                  isFavorited ? "Remove from favorites" : "Add to favorites"
                }
              >
                {isUpdatingFavorite ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                ) : (
                  <Heart
                    className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`}
                  />
                )}
              </button>

              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors share-button"
                aria-label="Share recipe"
              >
                <Share2 className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowDebugView(!showDebugView)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                aria-label="Toggle debug view"
              >
                {showDebugView ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <Code className="w-4 h-4" />
                )}
                {showDebugView ? "Recipe View" : "Debug View"}
              </button>

              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                aria-label="Print recipe"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Error Banner for non-404 errors */}
        {error && recipe.title.includes("Sample Recipe") && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
            <p className="text-sm">
              <strong>Note:</strong> Could not connect to the server ({error}).
              Showing a demo recipe instead.
            </p>
          </div>
        )}

        {showDebugView ? (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                Recipe Data Structure
              </h2>
            </div>
            <pre className="p-6 text-sm bg-gray-900 text-green-400 overflow-auto rounded-lg">
              {JSON.stringify(recipe, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64 md:h-96">
                <img
                  src={
                    recipe.imageUrl ||
                    "https://via.placeholder.com/800x400/f3f4f6/9ca3af?text=No+Image"
                  }
                  alt={recipe.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/800x400/f3f4f6/9ca3af?text=Image+Error";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  {recipe.category && (
                    <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-2 inline-block">
                      {recipe.category}
                    </span>
                  )}
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {recipe.title}
                  </h1>
                  <p className="text-lg text-gray-200 max-w-3xl">
                    {recipe.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 recipe-stats">
              {recipe.cookingTime && (
                <div className="bg-white rounded-lg p-6 flex items-center gap-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Cook Time</p>
                    <p className="text-xl font-bold text-gray-800">
                      {recipe.cookingTime} mins
                    </p>
                  </div>
                </div>
              )}

              {recipe.servings && (
                <div className="bg-white rounded-lg p-6 flex items-center gap-4">
                  <Users className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Servings</p>
                    <p className="text-xl font-bold text-gray-800">
                      {recipe.servings}
                    </p>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-lg p-6 flex items-center gap-4">
                <ChefHat className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Difficulty</p>
                  <p className="text-xl font-bold text-gray-800">
                    {recipe.difficulty || "Medium"}
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-8 recipe-main">
              {/* Ingredients */}
              <div className="bg-white rounded-xl shadow-md p-8 ingredients-section">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Ingredients
                </h2>
                <div className="space-y-3">
                  {recipe.ingredients?.length > 0 ? (
                    recipe.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center group">
                        <span className="text-gray-700 text-lg">
                          {ingredient}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No ingredients listed.</p>
                  )}
                </div>
              </div>

              {/* Instructions - FIXED VERSION */}
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Step-by-Step Instructions
                  </h2>
                </div>

                <div className="space-y-6">
                  {recipe.instructions?.length > 0 ? (
                    recipe.instructions.map((instruction, index) => (
                      <div
                        key={index}
                        className="group relative flex gap-6 p-6 bg-white rounded-xl hover:bg-blue-50 transition-all duration-300 border border-gray-200 hover:border-blue-300 hover:shadow-lg mb-6"
                      >
                        {/* Step Number - Enhanced design */}
                        <div className="flex-shrink-0 relative">
                          {/* Connecting line for all steps except the last one */}
                          {index < recipe.instructions.length - 1 && (
                            <div className="absolute top-14 left-1/2 w-1 h-10 bg-gradient-to-b from-blue-400 to-blue-100 transform -translate-x-1/2"></div>
                          )}
                        </div>

                        {/* Instruction Text - Enhanced design with better spacing and typography */}
                        <div className="flex-1 pt-1">
                          <p className="text-gray-800 leading-relaxed text-lg group-hover:text-gray-900 transition-colors duration-300 break-words flex-row">
                            {typeof instruction === "object"
                              ? instruction.step
                              : instruction}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                        <svg
                          className="w-10 h-10 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-700 text-xl font-medium mb-2">
                        No instructions available
                      </p>
                      <p className="text-gray-500 text-base max-w-md mx-auto">
                        This recipe doesn't include step-by-step instructions
                        yet. Check back later for updates.
                      </p>
                    </div>
                  )}
                </div>

                {/* Completion indicator */}
                {recipe.instructions?.length > 0 && (
                  <div className="mt-10 pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-4 text-green-600">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shadow-sm">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="font-medium">
                        You're all done! Enjoy your delicious meal! 🍽️
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDisplayPage;
