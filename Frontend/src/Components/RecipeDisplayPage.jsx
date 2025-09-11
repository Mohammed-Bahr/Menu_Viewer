// import React, { use, useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Clock, Users, ChefHat, ArrowLeft, Eye, Code, Heart, Share2 } from 'lucide-react';

// const RecipeDisplayPage = () => {
//   // const { id } = useParams();
//   const navigate = useNavigate();
//   const [recipe, setRecipe] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showDebugView, setShowDebugView] = useState(false);
//   const [isFavorited, setIsFavorited] = useState(false);
//   const[id , setId] = useState(null);

//   setId(params.id)
//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`http://localhost:3000/recipes/${id}`, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setRecipe(data.data || data); // Handle both data.data and direct data responses
//         setError(null);
//       } catch (err) {
//         console.error('Error fetching recipe:', err);
//         setError(err.message);
//         // Fallback to mock data for demo purposes
//         const fallbackRecipes = {
//           '1': {
//             _id: '1',
//             title: "Classic Spaghetti Carbonara",
//             description: "Traditional Italian pasta dish with eggs, cheese, pancetta, and black pepper. Creamy and delicious comfort food.",
//             ingredients: [
//               "400g spaghetti",
//               "200g pancetta or guanciale",
//               "4 large eggs",
//               "100g Pecorino Romano cheese",
//               "Black pepper",
//               "Salt"
//             ],
//             instructions: [
//               { step: 1, text: "Cook pasta in salted boiling water until al dente" },
//               { step: 2, text: "Fry pancetta until crispy" },
//               { step: 3, text: "Whisk eggs with cheese and pepper" },
//               { step: 4, text: "Combine hot pasta with pancetta and egg mixture" },
//               { step: 5, text: "Serve immediately with extra cheese" }
//             ],
//             cookingTime: 25,
//             imageUrl: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=600&h=400&fit=crop",
//             category: "Dinner",
//             createdAt: "2024-01-15T10:30:00Z"
//           },
//           '2': {
//             _id: '2',
//             title: "Grilled Atlantic Salmon",
//             description: "Fresh salmon fillet grilled to perfection with herbs and lemon. Healthy and flavorful main course.",
//             ingredients: [
//               "4 salmon fillets",
//               "2 lemons",
//               "Fresh dill",
//               "Olive oil",
//               "Garlic cloves",
//               "Salt and pepper"
//             ],
//             instructions: [
//               { step: 1, text: "Marinate salmon with herbs and lemon" },
//               { step: 2, text: "Preheat grill to medium-high heat" },
//               { step: 3, text: "Grill salmon for 6-8 minutes per side" },
//               { step: 4, text: "Check internal temperature reaches 145°F" },
//               { step: 5, text: "Serve with lemon wedges" }
//             ],
//             cookingTime: 20,
//             imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop",
//             category: "Lunch",
//             createdAt: "2024-01-14T14:20:00Z"
//           },
//           '3': {
//             _id: '3',
//             title: "Fresh Caesar Salad",
//             description: "Crisp romaine lettuce with homemade Caesar dressing, croutons, and parmesan cheese.",
//             ingredients: [
//               "2 romaine lettuce heads",
//               "1 cup croutons",
//               "1/2 cup Parmesan cheese",
//               "Caesar dressing",
//               "Anchovies (optional)",
//               "Lemon juice"
//             ],
//             instructions: [
//               { step: 1, text: "Wash and chop romaine lettuce" },
//               { step: 2, text: "Prepare homemade Caesar dressing" },
//               { step: 3, text: "Toast bread for croutons" },
//               { step: 4, text: "Toss lettuce with dressing" },
//               { step: 5, text: "Top with croutons and cheese" }
//             ],
//             cookingTime: 15,
//             imageUrl: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&h=400&fit=crop",
//             category: "Lunch",
//             createdAt: "2024-01-13T12:15:00Z"
//           },
//           '4': {
//             _id: '4',
//             title: "Premium Ribeye Steak",
//             description: "Perfectly grilled ribeye steak seasoned with herbs and spices. A meat lover's dream.",
//             ingredients: [
//               "2 ribeye steaks",
//               "Salt",
//               "Black pepper",
//               "Garlic powder",
//               "Fresh thyme",
//               "Butter"
//             ],
//             instructions: [
//               { step: 1, text: "Let steaks come to room temperature" },
//               { step: 2, text: "Season generously with salt and pepper" },
//               { step: 3, text: "Preheat grill or cast iron pan" },
//               { step: 4, text: "Cook 4-5 minutes per side for medium-rare" },
//               { step: 5, text: "Let rest for 5 minutes before serving" }
//             ],
//             cookingTime: 30,
//             imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop",
//             category: "Dinner",
//             createdAt: "2024-01-12T18:45:00Z"
//           },
//           '5': {
//             _id: '5',
//             title: "Fluffy Pancakes",
//             description: "Light and fluffy pancakes perfect for breakfast. Serve with syrup and fresh berries.",
//             ingredients: [
//               "2 cups all-purpose flour",
//               "2 eggs",
//               "1 1/2 cups milk",
//               "2 tbsp sugar",
//               "2 tsp baking powder",
//               "1/2 tsp salt",
//               "Butter for cooking"
//             ],
//             instructions: [
//               { step: 1, text: "Mix dry ingredients in a bowl" },
//               { step: 2, text: "Whisk together wet ingredients" },
//               { step: 3, text: "Combine wet and dry ingredients" },
//               { step: 4, text: "Cook on griddle until bubbles form" },
//               { step: 5, text: "Flip and cook until golden brown" }
//             ],
//             cookingTime: 20,
//             imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop",
//             category: "Breakfast",
//             createdAt: "2024-01-11T08:30:00Z"
//           }
//         };
        
//         setRecipe(fallbackRecipes[id] || {
//           _id: id,
//           title: "Sample Recipe",
//           description: "This is a demo recipe shown because the server is not available.",
//           ingredients: [
//             "Sample ingredient 1",
//             "Sample ingredient 2",
//             "Sample ingredient 3"
//           ],
//           instructions: [
//             { step: 1, text: "This is step 1 of the recipe" },
//             { step: 2, text: "This is step 2 of the recipe" },
//             { step: 3, text: "This is step 3 of the recipe" }
//           ],
//           cookingTime: 30,
//           imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop",
//           category: "Demo",
//           createdAt: new Date().toISOString()
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchRecipe();
//     }
//   }, [id]);

//   const handleBack = () => {
//     navigate(-1); // Go back to previous page
//   };

//   const handleShare = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: recipe.title,
//           text: recipe.description,
//           url: window.location.href,
//         });
//       } catch (err) {
//         console.log('Error sharing:', err);
//       }
//     } else {
//       // Fallback: copy to clipboard
//       navigator.clipboard.writeText(window.location.href);
//       alert('Recipe link copied to clipboard!');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600 text-lg">Loading recipe...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error && !recipe) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center max-w-md mx-auto p-6">
//           <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Recipe Not Found</h2>
//           <p className="text-gray-600 mb-6">Sorry, we couldn't find the recipe you're looking for.</p>
//           <button
//             onClick={handleBack}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!recipe) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-xl font-semibold text-gray-600">Recipe not found</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm sticky top-0 z-10">
//         <div className="max-w-6xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <button
//               onClick={handleBack}
//               className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
//             >
//               <ArrowLeft className="w-5 h-5" />
//               <span>Back to Recipes</span>
//             </button>

//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => setIsFavorited(!isFavorited)}
//                 className={`p-2 rounded-full transition-colors ${isFavorited ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
//                   } hover:bg-opacity-80`}
//               >
//                 <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
//               </button>

//               <button
//                 onClick={handleShare}
//                 className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
//               >
//                 <Share2 className="w-5 h-5" />
//               </button>

//               <button
//                 onClick={() => setShowDebugView(!showDebugView)}
//                 className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
//               >
//                 {showDebugView ? <Eye className="w-4 h-4" /> : <Code className="w-4 h-4" />}
//                 {showDebugView ? 'Recipe View' : 'Debug View'}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 py-8">
//         {/* Error Banner */}
//         {error && (
//           <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
//             <p className="text-sm">
//               <strong>Note:</strong> Could not connect to server ({error}).
//               Showing demo recipe instead.
//             </p>
//           </div>
//         )}

//         {showDebugView ? (
//           /* Enhanced Debug View */
//           <div className="bg-white rounded-xl shadow-lg p-8">
//             <div className="flex items-center gap-3 mb-6">
//               <Code className="w-6 h-6 text-blue-600" />
//               <h2 className="text-2xl font-bold text-gray-800">Recipe Data Structure</h2>
//             </div>

//             <div className="bg-gray-900 rounded-lg p-6 font-mono text-sm overflow-auto">
//               <div className="space-y-3">
//                 <div>
//                   <span className="text-blue-400 font-bold">_id:</span>
//                   <span className="text-green-400 ml-2">"{recipe._id}"</span>
//                 </div>

//                 <div>
//                   <span className="text-blue-400 font-bold">title:</span>
//                   <span className="text-green-400 ml-2">"{recipe.title}"</span>
//                 </div>

//                 <div>
//                   <span className="text-blue-400 font-bold">description:</span>
//                   <span className="text-green-400 ml-2">"{recipe.description}"</span>
//                 </div>

//                 <div>
//                   <span className="text-blue-400 font-bold">ingredients:</span>
//                   <span className="text-purple-400 ml-2">Array[{recipe.ingredients?.length || 0}]</span>
//                   <div className="ml-4 mt-1">
//                     {recipe.ingredients?.map((ingredient, index) => (
//                       <div key={index} className="text-gray-300">
//                         <span className="text-yellow-400">[{index}]</span>
//                         <span className="text-green-400 ml-2">"{ingredient}"</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <span className="text-blue-400 font-bold">instructions:</span>
//                   <span className="text-purple-400 ml-2">Array[{recipe.instructions?.length || 0}]</span>
//                   <div className="ml-4 mt-1">
//                     {recipe.instructions?.map((instruction, index) => (
//                       <div key={index} className="text-gray-300 mb-2">
//                         <span className="text-yellow-400">[{index}]</span>
//                         <span className="text-orange-400 ml-2">Object</span>
//                         <div className="ml-6">
//                           <div>
//                             <span className="text-blue-400">step:</span>
//                             <span className="text-red-400 ml-2">{instruction.step || index + 1}</span>
//                           </div>
//                           <div>
//                             <span className="text-blue-400">text:</span>
//                             <span className="text-green-400 ml-2">"{instruction.text || instruction.step}"</span>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <span className="text-blue-400 font-bold">cookingTime:</span>
//                   <span className="text-red-400 ml-2">{recipe.cookingTime}</span>
//                 </div>

//                 <div>
//                   <span className="text-blue-400 font-bold">category:</span>
//                   <span className="text-green-400 ml-2">"{recipe.category}"</span>
//                 </div>

//                 <div>
//                   <span className="text-blue-400 font-bold">imageUrl:</span>
//                   <span className="text-green-400 ml-2 break-all">"{recipe.imageUrl}"</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           /* Enhanced Recipe Display View */
//           <div className="space-y-8">
//             {/* Hero Section */}
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//               <div className="relative h-64 md:h-96">
//                 <img
//                   src={recipe.imageUrl || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop'}
//                   alt={recipe.title}
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     e.target.src = 'https://via.placeholder.com/800x400/f3f4f6/9ca3af?text=Recipe+Image';
//                   }}
//                 />
//                 <div className="absolute inset-0 bg-black bg-opacity-30"></div>
//                 <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//                   <div className="flex items-center gap-2 mb-2">
//                     <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-medium">
//                       {recipe.category}
//                     </span>
//                   </div>
//                   <h1 className="text-3xl md:text-4xl font-bold mb-2">{recipe.title}</h1>
//                   <p className="text-lg text-gray-200 max-w-3xl">{recipe.description}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Quick Stats */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="bg-white rounded-xl shadow-md p-6 text-center">
//                 <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
//                 <div className="text-2xl font-bold text-gray-800">{recipe.cookingTime}</div>
//                 <div className="text-gray-600">Minutes</div>
//               </div>
//               <div className="bg-white rounded-xl shadow-md p-6 text-center">
//                 <ChefHat className="w-8 h-8 text-green-600 mx-auto mb-3" />
//                 <div className="text-2xl font-bold text-gray-800">{recipe.ingredients?.length || 0}</div>
//                 <div className="text-gray-600">Ingredients</div>
//               </div>
//               <div className="bg-white rounded-xl shadow-md p-6 text-center">
//                 <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
//                 <div className="text-2xl font-bold text-gray-800">{recipe.instructions?.length || 0}</div>
//                 <div className="text-gray-600">Steps</div>
//               </div>
//             </div>

//             {/* Main Content */}
//             <div className="grid lg:grid-cols-2 gap-8">
//               {/* Ingredients */}
//               <div className="bg-white rounded-xl shadow-md p-8">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
//                   <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                   Ingredients ({recipe.ingredients?.length || 0})
//                 </h2>
//                 <div className="space-y-3">
//                   {recipe.ingredients?.map((ingredient, index) => (
//                     <div key={index} className="flex items-center group hover:bg-gray-50 p-3 rounded-lg transition-colors">
//                       <div className="w-6 h-6 border-2 border-green-400 rounded-full mr-4 flex-shrink-0 flex items-center justify-center">
//                         <div className="w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                       </div>
//                       <span className="text-gray-700 text-lg">{ingredient}</span>
//                     </div>
//                   )) || <p className="text-gray-500">No ingredients listed</p>}
//                 </div>
//               </div>

//               {/* Instructions */}
//               <div className="bg-white rounded-xl shadow-md p-8">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
//                   <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                   Instructions ({recipe.instructions?.length || 0})
//                 </h2>
//                 <div className="space-y-4">
//                   {recipe.instructions?.map((instruction, index) => (
//                     <div key={index} className="flex gap-4 group">
//                       <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold group-hover:bg-blue-700 transition-colors">
//                         {instruction.step || index + 1}
//                       </div>
//                       <p className="text-gray-700 pt-1 leading-relaxed">
//                         {instruction.text || instruction.step || `Step ${index + 1}`}
//                       </p>
//                     </div>
//                   )) || <p className="text-gray-500">No instructions available</p>}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Raw JSON Data (Collapsible) */}
//         <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
//           <details className="group">
//             <summary className="cursor-pointer p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
//               <span className="font-semibold text-gray-700 flex items-center gap-2">
//                 <Code className="w-5 h-5" />
//                 Raw JSON Data
//               </span>
//               <div className="transform group-open:rotate-180 transition-transform">
//                 <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                 </svg>
//               </div>
//             </summary>
//             <div className="border-t">
//               <pre className="p-6 text-xs bg-gray-900 text-green-400 overflow-auto">
//                 {JSON.stringify(recipe, null, 2)}
//               </pre>
//             </div>
//           </details>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecipeDisplayPage;
















import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Users, ChefHat, ArrowLeft, Eye, Code, Heart, Share2 } from 'lucide-react';

const RecipeDisplayPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDebugView, setShowDebugView] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/recipes/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setRecipe(data.data || data); // Handle both data.data and direct data responses
        setError(null);
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError(err.message);
        // Fallback to mock data for demo purposes
        setRecipe({
          _id: id,
          title: "Sample Recipe",
          description: "This is a demo recipe shown because the server is not available.",
          ingredients: [
            "Sample ingredient 1",
            "Sample ingredient 2",
            "Sample ingredient 3"
          ],
          instructions: [
            { step: 1, text: "This is step 1 of the recipe" },
            { step: 2, text: "This is step 2 of the recipe" },
            { step: 3, text: "This is step 3 of the recipe" }
          ],
          cookingTime: 30,
          imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop",
          category: "Demo",
          createdAt: new Date().toISOString()
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: recipe.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Recipe link copied to clipboard!');
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
      <div className=" min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="mt-4 text-center max-w-md mx-auto p-6">
          <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Recipe Not Found</h2>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the recipe you're looking for.</p>
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
        <div className="text-xl font-semibold text-gray-600">Recipe not found</div>
      </div>
    );
  }

  return (
    <div className="mt-12 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
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
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className={`p-2 rounded-full transition-colors ${
                  isFavorited ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                } hover:bg-opacity-80`}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
              
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setShowDebugView(!showDebugView)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                {showDebugView ? <Eye className="w-4 h-4" /> : <Code className="w-4 h-4" />}
                {showDebugView ? 'Recipe View' : 'Debug View'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Error Banner */}
        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
            <p className="text-sm">
              <strong>Note:</strong> Could not connect to server ({error}). 
              Showing demo recipe instead.
            </p>
          </div>
        )}

        {showDebugView ? (
          /* Enhanced Debug View */
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">Recipe Data Structure</h2>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6 font-mono text-sm overflow-auto">
              <div className="space-y-3">
                <div>
                  <span className="text-blue-400 font-bold">_id:</span>
                  <span className="text-green-400 ml-2">"{recipe._id}"</span>
                </div>

                <div>
                  <span className="text-blue-400 font-bold">title:</span>
                  <span className="text-green-400 ml-2">"{recipe.title}"</span>
                </div>

                <div>
                  <span className="text-blue-400 font-bold">description:</span>
                  <span className="text-green-400 ml-2">"{recipe.description}"</span>
                </div>

                <div>
                  <span className="text-blue-400 font-bold">ingredients:</span>
                  <span className="text-purple-400 ml-2">Array[{recipe.ingredients?.length || 0}]</span>
                  <div className="ml-4 mt-1">
                    {recipe.ingredients?.map((ingredient, index) => (
                      <div key={index} className="text-gray-300">
                        <span className="text-yellow-400">[{index}]</span>
                        <span className="text-green-400 ml-2">"{ingredient}"</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-blue-400 font-bold">instructions:</span>
                  <span className="text-purple-400 ml-2">Array[{recipe.instructions?.length || 0}]</span>
                  <div className="ml-4 mt-1">
                    {recipe.instructions?.map((instruction, index) => (
                      <div key={index} className="text-gray-300 mb-2">
                        <span className="text-yellow-400">[{index}]</span>
                        <span className="text-orange-400 ml-2">Object</span>
                        <div className="ml-6">
                          <div>
                            <span className="text-blue-400">step:</span>
                            <span className="text-red-400 ml-2">{instruction.step || index + 1}</span>
                          </div>
                          <div>
                            <span className="text-blue-400">text:</span>
                            <span className="text-green-400 ml-2">"{instruction.text || instruction.step}"</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-blue-400 font-bold">cookingTime:</span>
                  <span className="text-red-400 ml-2">{recipe.cookingTime}</span>
                </div>

                <div>
                  <span className="text-blue-400 font-bold">category:</span>
                  <span className="text-green-400 ml-2">"{recipe.category}"</span>
                </div>

                <div>
                  <span className="text-blue-400 font-bold">imageUrl:</span>
                  <span className="text-green-400 ml-2 break-all">"{recipe.imageUrl}"</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Enhanced Recipe Display View */
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64 md:h-96">
                <img 
                  src={recipe.imageUrl || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop'} 
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x400/f3f4f6/9ca3af?text=Recipe+Image';
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                      {recipe.category}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{recipe.title}</h1>
                  <p className="text-lg text-gray-200 max-w-3xl">{recipe.description}</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-800">{recipe.cookingTime}</div>
                <div className="text-gray-600">Minutes</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <ChefHat className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-800">{recipe.ingredients?.length || 0}</div>
                <div className="text-gray-600">Ingredients</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-800">{recipe.instructions?.length || 0}</div>
                <div className="text-gray-600">Steps</div>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Ingredients */}
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Ingredients ({recipe.ingredients?.length || 0})
                </h2>
                <div className="space-y-3">
                  {recipe.ingredients?.map((ingredient, index) => (
                    <div key={index} className="flex items-center group hover:bg-gray-50 p-3 rounded-lg transition-colors">
                      <div className="w-6 h-6 border-2 border-green-400 rounded-full mr-4 flex-shrink-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <span className="text-gray-700 text-lg">{ingredient}</span>
                    </div>
                  )) || <p className="text-gray-500">No ingredients listed</p>}
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Instructions ({recipe.instructions?.length || 0})
                </h2>
                <div className="space-y-4">
                  {recipe.instructions?.map((instruction, index) => (
                    <div key={index} className="flex gap-4 group">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold group-hover:bg-blue-700 transition-colors">
                        {instruction.step || index + 1}
                      </div>
                      <p className="text-gray-700 pt-1 leading-relaxed">
                        {instruction.text || instruction.step || `Step ${index + 1}`}
                      </p>
                    </div>
                  )) || <p className="text-gray-500">No instructions available</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Raw JSON Data (Collapsible) */}
        <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
          <details className="group">
            <summary className="cursor-pointer p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
              <span className="font-semibold text-gray-700 flex items-center gap-2">
                <Code className="w-5 h-5" />
                Raw JSON Data
              </span>
              <div className="transform group-open:rotate-180 transition-transform">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </summary>
            <div className="border-t">
              <pre className="p-6 text-xs bg-gray-900 text-green-400 overflow-auto">
                {JSON.stringify(recipe, null, 2)}
              </pre>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default RecipeDisplayPage;