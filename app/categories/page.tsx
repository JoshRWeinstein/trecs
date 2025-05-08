'use client'

import { useState } from 'react'
import { FaUtensils, FaTshirt, FaPlane, FaHome, FaLaptop, FaCar, FaBook, FaMusic, FaGamepad, FaHeart, FaPlus } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const categories = [
  {
    name: 'Food & Drink',
    icon: FaUtensils,
    subcategories: [
      'Restaurants',
      'Cafes',
      'Bars & Pubs',
      'Food Trucks',
      'Bakeries',
      'Ice Cream Shops',
      'Coffee Shops',
      'Dishes',
      'Drinks',
      'Food Markets'
    ]
  },
  {
    name: 'Fashion & Apparel',
    icon: FaTshirt,
    subcategories: [
      'Clothing Stores',
      'Shoe Stores',
      'Jewelry',
      'Accessories',
      'Luxury Brands',
      'Vintage Shops',
      'Sportswear',
      'Swimwear',
      'Formal Wear',
      'Streetwear'
    ]
  },
  {
    name: 'Travel & Destinations',
    icon: FaPlane,
    subcategories: [
      'Hotels',
      'Airbnbs',
      'Beaches',
      'National Parks',
      'Cities',
      'Resorts',
      'Camping Spots',
      'Road Trips',
      'Hiking Trails',
      'Tourist Attractions'
    ]
  },
  {
    name: 'Home & Living',
    icon: FaHome,
    subcategories: [
      'Furniture Stores',
      'Home Decor',
      'Kitchenware',
      'Garden Centers',
      'Hardware Stores',
      'Interior Designers',
      'Cleaning Services',
      'Moving Companies',
      'Storage Solutions',
      'Home Improvement'
    ]
  },
  {
    name: 'Electronics & Tech',
    icon: FaLaptop,
    subcategories: [
      'Smartphones',
      'Laptops',
      'Headphones',
      'Smart Home',
      'Gaming Consoles',
      'Cameras',
      'Websites',
      'Audio Equipment',
      'Computer Accessories',
      'Tech Gadgets'
    ]
  },
  {
    name: 'Automotive',
    icon: FaCar,
    subcategories: [
      'Car Dealerships',
      'Auto Repair',
      'Car Accessories',
      'Electric Vehicles',
      'Car Washes',
      'Auto Parts',
      'Car Rentals',
      'Motorcycles',
      'Bicycles',
      'Auto Insurance'
    ]
  },
  {
    name: 'Entertainment',
    icon: FaMusic,
    subcategories: [
      'Movie Theaters',
      'Concert Venues',
      'Museums',
      'Art Galleries',
      'Theaters',
      'Comedy Clubs',
      'Music Festivals',
      'Sports Venues',
      'Bowling Alleys',
      'Escape Rooms'
    ]
  },
  {
    name: 'Books & Media',
    icon: FaBook,
    subcategories: [
      'Books',
      'Libraries',
      'Magazines',
      'Comic Books',
      'Audiobooks',
      'Podcasts',
      'Streaming Services',
      'Movies',
      'Shows/Plays',
      'Educational Resources'
    ]
  },
  {
    name: 'Gaming',
    icon: FaGamepad,
    subcategories: [
      'Video Games',
      'Gaming Consoles',
      'Gaming PCs',
      'Gaming Accessories',
      'Gaming Chairs',
      'Gaming Headsets',
      'Gaming Keyboards',
      'Gaming Mice',
      'Gaming Monitors',
      'Gaming Communities'
    ]
  },
  {
    name: 'Health & Wellness',
    icon: FaHeart,
    subcategories: [
      'Gyms',
      'Yoga Studios',
      'Spas',
      'Salons',
      'Doctors',
      'Dentists',
      'Pharmacies',
      'Health Food Stores',
      'Meditation Centers',
      'Physical Therapy'
    ]
  }
]

export default function CategoriesPage() {
  const router = useRouter()
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [showSuggestionModal, setShowSuggestionModal] = useState(false)
  const [suggestionType, setSuggestionType] = useState<'category' | 'subcategory'>('category')
  const [suggestionName, setSuggestionName] = useState('')
  const [suggestionParent, setSuggestionParent] = useState('')

  const handleCategoryClick = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName)
  }

  const handleSubcategoryClick = (subcategoryName: string) => {
    router.push(`/search?category=${encodeURIComponent(subcategoryName)}`)
  }

  const handleSuggestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the suggestion to your backend
    console.log('Suggestion submitted:', {
      type: suggestionType,
      name: suggestionName,
      parent: suggestionParent
    })
    setShowSuggestionModal(false)
    setSuggestionName('')
    setSuggestionParent('')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Categories</h1>
          <p className="text-xl text-gray-600">
            Discover and save recommendations across a wide range of categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 flex items-center justify-center text-white">
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">{category.name}</h2>
                </div>
              </div>
              
              {expandedCategory === category.name && (
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-2 gap-3">
                    {category.subcategories.map((subcategory) => (
                      <button
                        key={subcategory}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSubcategoryClick(subcategory)
                        }}
                        className="text-sm text-gray-600 hover:text-green-600 transition-colors text-left"
                      >
                        {subcategory}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Suggest Category Card */}
          <div
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
            onClick={() => setShowSuggestionModal(true)}
          >
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 flex items-center justify-center text-white">
                  <FaPlus className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Suggest a Category</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggestion Modal */}
      {showSuggestionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Suggest a Category</h2>
            <form onSubmit={handleSuggestionSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="suggestionType"
                      value="category"
                      checked={suggestionType === 'category'}
                      onChange={() => setSuggestionType('category')}
                      className="mr-2"
                    />
                    Main Category
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="suggestionType"
                      value="subcategory"
                      checked={suggestionType === 'subcategory'}
                      onChange={() => setSuggestionType('subcategory')}
                      className="mr-2"
                    />
                    Subcategory
                  </label>
                </div>
              </div>

              {suggestionType === 'subcategory' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent Category
                  </label>
                  <select
                    value={suggestionParent}
                    onChange={(e) => setSuggestionParent(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.name} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {suggestionType === 'category' ? 'Category Name' : 'Subcategory Name'}
                </label>
                <input
                  type="text"
                  value={suggestionName}
                  onChange={(e) => setSuggestionName(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  placeholder={`Enter ${suggestionType} name`}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowSuggestionModal(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 