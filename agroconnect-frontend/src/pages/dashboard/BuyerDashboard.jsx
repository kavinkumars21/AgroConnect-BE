import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Heart, 
  Clock, 
  MessageCircle, 
  Settings, 
  ChevronDown,
  Package, 
  TrendingUp,
  Search
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { mockOrders } from '../../data/mockData';

// Internal components for buyer dashboard
const Overview = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Welcome, {user?.name || 'Buyer'}</h2>
        <Link to="/marketplace">
          <Button className="flex items-center">
            <ShoppingBag size={18} className="mr-2" />
            Browse Marketplace
          </Button>
        </Link>
      </div>
      
      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 text-primary-600">
              <ShoppingBag size={24} />
            </div>
            <div className="ml-5">
              <p className="text-gray-500 text-sm">Total Orders</p>
              <h3 className="text-2xl font-bold text-gray-900">12</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-secondary-100 text-secondary-600">
              <Package size={24} />
            </div>
            <div className="ml-5">
              <p className="text-gray-500 text-sm">Pending Delivery</p>
              <h3 className="text-2xl font-bold text-gray-900">2</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-accent-100 text-accent-600">
              <Heart size={24} />
            </div>
            <div className="ml-5">
              <p className="text-gray-500 text-sm">Favorite Farms</p>
              <h3 className="text-2xl font-bold text-gray-900">5</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <TrendingUp size={24} />
            </div>
            <div className="ml-5">
              <p className="text-gray-500 text-sm">Total Spent</p>
              <h3 className="text-2xl font-bold text-gray-900">$320.75</h3>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Recent orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
              <Link to="/buyer-dashboard/orders" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {mockOrders.slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium text-gray-900">Order #{order.id}</h4>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        order.status === 'delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'shipped' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {order.items.map(item => item.cropName).join(', ')}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm font-medium text-primary-600">
                        ${order.totalPrice.toFixed(2)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Favorite Farms</h3>
            <div className="space-y-4">
              <div className="flex items-center pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-800 font-bold">
                  GA
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Green Acres Farm</h4>
                  <p className="text-xs text-gray-500">Portland, OR • Organic</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-auto"
                >
                  Visit
                </Button>
              </div>
              
              <div className="flex items-center pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center text-secondary-800 font-bold">
                  VV
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Valley View Farm</h4>
                  <p className="text-xs text-gray-500">Seattle, WA</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-auto"
                >
                  Visit
                </Button>
              </div>
              
              <div className="flex items-center pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center text-accent-800 font-bold">
                  SO
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Sunshine Orchards</h4>
                  <p className="text-xs text-gray-500">San Francisco, CA</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-auto"
                >
                  Visit
                </Button>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-800 font-bold">
                  BG
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Berry Good Farm</h4>
                  <p className="text-xs text-gray-500">Portland, OR • Organic</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-auto"
                >
                  Visit
                </Button>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="mt-6 w-full"
            >
              Discover New Farms
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filteredOrders = statusFilter === 'all' 
    ? mockOrders 
    : mockOrders.filter(order => order.status === statusFilter);
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
      <Card className="p-6">
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                statusFilter === 'all' 
                  ? 'bg-primary-100 text-primary-800' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setStatusFilter('all')}
            >
              All Orders
            </button>
            <button
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                statusFilter === 'pending' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setStatusFilter('pending')}
            >
              Pending
            </button>
            <button
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                statusFilter === 'shipped' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setStatusFilter('shipped')}
            >
              Shipped
            </button>
            <button
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                statusFilter === 'delivered' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setStatusFilter('delivered')}
            >
              Delivered
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {order.items.map(item => item.cropName).join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${order.totalPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'delivered'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="outline" size="sm">View Details</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const Favorites = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Favorite Farms</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="overflow-hidden">
          <div className="h-40 bg-gray-200">
            <img 
              src="https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
              alt="Green Acres Farm" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">Green Acres Farm</h3>
              <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full flex items-center">
                <Leaf className="w-3 h-3 mr-1" />
                Organic
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">Specializing in organic vegetables and fruits. Family-owned farm with sustainable practices.</p>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              Portland, OR
            </div>
            <Button className="w-full">Visit Farm</Button>
          </div>
        </Card>
        
        <Card className="overflow-hidden">
          <div className="h-40 bg-gray-200">
            <img 
              src="https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
              alt="Valley View Farm" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">Valley View Farm</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Known for fresh root vegetables and seasonal berries. Traditional farming methods with modern equipment.</p>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              Seattle, WA
            </div>
            <Button className="w-full">Visit Farm</Button>
          </div>
        </Card>
        
        <Card className="overflow-hidden">
          <div className="h-40 bg-gray-200">
            <img 
              src="https://images.pexels.com/photos/2817856/pexels-photo-2817856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
              alt="Sunshine Orchards" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">Sunshine Orchards</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Premium apple and stone fruit producers. Using integrated pest management for lower chemical usage.</p>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              San Francisco, CA
            </div>
            <Button className="w-full">Visit Farm</Button>
          </div>
        </Card>
        
        <Card className="overflow-hidden">
          <div className="h-40 bg-gray-200">
            <img 
              src="https://images.pexels.com/photos/106148/pexels-photo-106148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
              alt="Berry Good Farm" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">Berry Good Farm</h3>
              <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full flex items-center">
                <Leaf className="w-3 h-3 mr-1" />
                Organic
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">Specializing in all kinds of berries. Organic certified with a focus on biodiversity.</p>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              Portland, OR
            </div>
            <Button className="w-full">Visit Farm</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Main Buyer Dashboard component
const BuyerDashboard = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const menuItems = [
    { 
      path: '/buyer-dashboard', 
      label: 'Overview', 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      path: '/buyer-dashboard/orders', 
      label: 'My Orders', 
      icon: <ShoppingBag className="h-5 w-5" /> 
    },
    { 
      path: '/buyer-dashboard/favorites', 
      label: 'Favorite Farms', 
      icon: <Heart className="h-5 w-5" /> 
    },
    { 
      path: '/buyer-dashboard/messages', 
      label: 'Messages', 
      icon: <MessageCircle className="h-5 w-5" /> 
    },
    { 
      path: '/buyer-dashboard/settings', 
      label: 'Settings', 
      icon: <Settings className="h-5 w-5" /> 
    },
  ];
  
  // Determine if the current path matches a menu item
  const isActive = (path) => {
    if (path === '/buyer-dashboard' && location.pathname === '/buyer-dashboard') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/buyer-dashboard';
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <button
        className="md:hidden fixed top-20 left-4 z-30 bg-white rounded-full p-2 shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <ChevronDown className="h-6 w-6 text-gray-700" />
        ) : (
          <LayoutDashboard className="h-6 w-6 text-gray-700" />
        )}
      </button>
      
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed z-20 top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out md:sticky`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-700 font-semibold">
                {user?.name?.charAt(0) || 'B'}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{user?.name || 'Buyer'}</h3>
                <p className="text-sm text-gray-500">{user?.location || 'Location not set'}</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-secondary-50 text-secondary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
      
      {/* Main content */}
      <div className={`md:ml-64 p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out`}>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/messages" element={<p>Messages feature coming soon</p>} />
          <Route path="/settings" element={<p>Settings page (Coming soon)</p>} />
        </Routes>
      </div>
    </div>
  );
};

export default BuyerDashboard;