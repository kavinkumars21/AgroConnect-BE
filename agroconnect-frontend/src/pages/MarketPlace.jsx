import React, { useState, useEffect } from 'react';
import { Search, Filter, Leaf, MapPin, DollarSign, Star } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useCart } from '../hooks/useCart';
import { mockCrops } from '../data/mockData';

const MarketplacePage = () => {
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [location, setLocation] = useState('');
  const [crops, setCrops] = useState([]);
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // For pagination
  const [currentPage, setCurrentPage] = useState(1);
  const cropsPerPage = 9;
  
  const { addItem } = useCart();
  
  // Initialize crops on load
  useEffect(() => {
    // In a real app, this would be an API call
    setCrops(mockCrops);
    setFilteredCrops(mockCrops);
  }, []);
  
  // Apply filters when any filter changes
  useEffect(() => {
    let results = crops;
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(crop => 
        crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crop.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crop.farmerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply price range filter
    results = results.filter(crop => 
      crop.price >= priceRange[0] && crop.price <= priceRange[1]
    );
    
    // Apply organic filter
    if (organicOnly) {
      results = results.filter(crop => crop.isOrganic);
    }
    
    // Apply location filter
    if (location) {
      results = results.filter(crop => 
        crop.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    setFilteredCrops(results);
    setCurrentPage(1);
  }, [searchTerm, priceRange, organicOnly, location, crops]);
  
  // Get current crops for pagination
  const indexOfLastCrop = currentPage * cropsPerPage;
  const indexOfFirstCrop = indexOfLastCrop - cropsPerPage;
  const currentCrops = filteredCrops.slice(indexOfFirstCrop, indexOfLastCrop);
  const totalPages = Math.ceil(filteredCrops.length / cropsPerPage);
  
  const handleAddToCart = (crop) => {
    addItem(crop, 1);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Farm Fresh Marketplace</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Browse fresh produce directly from local farmers. Support sustainable agriculture and enjoy the highest quality fruits and vegetables.
          </p>
        </div>
        
        {/* Search and filter bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search crops, farmers, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="whitespace-nowrap"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters {showFilters ? '▾' : '▸'}
            </Button>
            
            <Button 
              variant="primary"
              className="whitespace-nowrap"
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>
          
          {/* Expanded filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <MapPin className="h-4 w-4 inline mr-1" />
                  Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Locations</option>
                  <option value="Portland">Portland, OR</option>
                  <option value="Seattle">Seattle, WA</option>
                  <option value="San Francisco">San Francisco, CA</option>
                  <option value="New York">New York, NY</option>
                  <option value="Chicago">Chicago, IL</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <DollarSign className="h-4 w-4 inline mr-1" />
                  Price Range
                </label>
                <div className="flex items-center">
                  <span className="mr-2">${priceRange[0]}</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="flex-grow mx-2 accent-primary-600"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="flex-grow mx-2 accent-primary-600"
                  />
                  <span className="ml-2">${priceRange[1]}</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <label className="flex items-center text-sm font-medium text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={organicOnly}
                    onChange={() => setOrganicOnly(!organicOnly)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mr-2"
                  />
                  <Leaf className="h-4 w-4 text-primary-600 mr-1" />
                  Organic Products Only
                </label>
              </div>
            </div>
          )}
        </div>
        
        {/* Results count and sorting */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <p className="text-sm text-gray-600">
            Showing {filteredCrops.length > 0 ? indexOfFirstCrop + 1 : 0}-
            {Math.min(indexOfLastCrop, filteredCrops.length)} of {filteredCrops.length} results
          </p>
          
          <div className="flex items-center">
            <label className="text-sm text-gray-600 mr-2">Sort by:</label>
            <select className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Recently Added</option>
              <option>Popularity</option>
            </select>
          </div>
        </div>
        
        {/* Crops grid */}
        {currentCrops.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {currentCrops.map((crop) => (
              <Card key={crop.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-full object-cover"
                  />
                  {crop.isOrganic && (
                    <div className="absolute top-2 right-2 bg-primary-600 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center">
                      <Leaf className="h-3 w-3 mr-1" />
                      Organic
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{crop.name}</h3>
                    <span className="text-lg font-bold text-primary-600">${crop.price.toFixed(2)}/lb</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {crop.description || `Fresh ${crop.name} harvested by ${crop.farmerName}.`}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {crop.location}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-800 font-bold text-xs">
                        {crop.farmerName.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="ml-2 text-sm font-medium">{crop.farmerName}</span>
                    </div>
                    <div className="flex items-center text-amber-500">
                      <Star className="fill-current h-4 w-4" />
                      <Star className="fill-current h-4 w-4" />
                      <Star className="fill-current h-4 w-4" />
                      <Star className="fill-current h-4 w-4" />
                      <Star className="h-4 w-4" />
                    </div>
                  </div>
                  <Button 
                    variant="primary" 
                    className="mt-4 w-full"
                    onClick={() => handleAddToCart(crop)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No crops found</h3>
            <p className="text-gray-600 mb-6 max-w-md">
              We couldn't find any crops matching your search criteria. Try adjusting your filters or search terms.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setPriceRange([0, 100]);
                setOrganicOnly(false);
                setLocation('');
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center my-8">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === 1 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                &laquo; Previous
              </button>
              
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === idx + 1
                      ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === totalPages 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                Next &raquo;
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplacePage;