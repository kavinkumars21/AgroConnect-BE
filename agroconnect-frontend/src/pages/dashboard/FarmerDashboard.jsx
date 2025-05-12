import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBasket, 
  Truck, 
  BarChart2, 
  Settings, 
  PlusCircle, 
  Search,
  Filter,
  Leaf,
  Edit3,
  Trash2,
  ChevronDown,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Bell,
  Package,
  Sun,
  Cloud,
  CloudRain,
  Droplets
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { mockCrops } from '../../data/mockData';

// Analytics Component
const Analytics = () => {
  return (
    <div className="space-y-6">
      {/* Header with Quick Actions */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Farm Dashboard</h2>
          <p className="text-gray-600 mt-1">Welcome back! Here's your farm's overview.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
            <Calendar className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white transform hover:scale-105 transition-transform">
          <div className="flex items-center">
            <div className="p-3 bg-white/20 rounded-lg">
              <DollarSign className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-white/80 text-sm">Monthly Revenue</p>
              <h3 className="text-2xl font-bold">$12,426</h3>
              <p className="text-white/80 text-sm flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +15.3% from last month
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white transform hover:scale-105 transition-transform">
          <div className="flex items-center">
            <div className="p-3 bg-white/20 rounded-lg">
              <Package className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-white/80 text-sm">Active Orders</p>
              <h3 className="text-2xl font-bold">38</h3>
              <p className="text-white/80 text-sm flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +8.4% from last week
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white transform hover:scale-105 transition-transform">
          <div className="flex items-center">
            <div className="p-3 bg-white/20 rounded-lg">
              <Users className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-white/80 text-sm">Total Customers</p>
              <h3 className="text-2xl font-bold">1,249</h3>
              <p className="text-white/80 text-sm flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12.7% from last month
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white transform hover:scale-105 transition-transform">
          <div className="flex items-center">
            <div className="p-3 bg-white/20 rounded-lg">
              <ShoppingBasket className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-white/80 text-sm">Active Products</p>
              <h3 className="text-2xl font-bold">24</h3>
              <p className="text-white/80 text-sm flex items-center mt-1">
                <Leaf className="h-4 w-4 mr-1" />
                18 Organic Products
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <Card className="lg:col-span-2 p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <Button variant="outline" size="sm">View All Orders</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-123</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">John Smith</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Organic Tomatoes (5 lbs)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$24.99</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Delivered
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-124</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sarah Johnson</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mixed Vegetables (10 lbs)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$45.50</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Processing
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Weather and Tasks Card */}
        <div className="space-y-6">
          {/* Weather Forecast */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Weather Forecast</h3>
            <div className="grid grid-cols-5 gap-4">
              {[
                { day: 'Mon', icon: Sun, temp: 75, weather: 'Sunny' },
                { day: 'Tue', icon: Cloud, temp: 72, weather: 'Cloudy' },
                { day: 'Wed', icon: CloudRain, temp: 68, weather: 'Rain' },
                { day: 'Thu', icon: Sun, temp: 71, weather: 'Sunny' },
                { day: 'Fri', icon: Droplets, temp: 69, weather: 'Humid' }
              ].map((day, index) => (
                <div key={day.day} className="text-center">
                  <p className="text-sm font-medium text-gray-600">{day.day}</p>
                  <div className="my-2">
                    <day.icon className={`h-8 w-8 mx-auto ${
                      index === 0 ? 'text-yellow-500' : 'text-gray-400'
                    }`} />
                  </div>
                  <p className="text-sm font-bold text-gray-900">{day.temp}°F</p>
                  <p className="text-xs text-gray-500">{day.weather}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Tasks List */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Today's Tasks</h3>
              <Button variant="outline" size="sm">Add Task</Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input type="checkbox" className="h-4 w-4 text-green-600 rounded border-gray-300" />
                <span className="ml-3 text-sm text-gray-900">Harvest tomatoes (Greenhouse 1)</span>
                <span className="ml-auto text-xs text-gray-500">9:00 AM</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input type="checkbox" className="h-4 w-4 text-green-600 rounded border-gray-300" />
                <span className="ml-3 text-sm text-gray-900">Water new seedlings</span>
                <span className="ml-auto text-xs text-gray-500">11:00 AM</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input type="checkbox" className="h-4 w-4 text-green-600 rounded border-gray-300" />
                <span className="ml-3 text-sm text-gray-900">Prepare soil for new planting</span>
                <span className="ml-auto text-xs text-gray-500">2:00 PM</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Main FarmerDashboard Component
const FarmerDashboard = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const menuItems = [
    { 
      path: '/farmer-dashboard', 
      label: 'Dashboard', 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      path: '/farmer-dashboard/crops', 
      label: 'My Crops', 
      icon: <ShoppingBasket className="h-5 w-5" /> 
    },
    { 
      path: '/farmer-dashboard/orders', 
      label: 'Orders', 
      icon: <Truck className="h-5 w-5" /> 
    },
    { 
      path: '/farmer-dashboard/analytics', 
      label: 'Analytics', 
      icon: <BarChart2 className="h-5 w-5" /> 
    },
    { 
      path: '/farmer-dashboard/settings', 
      label: 'Settings', 
      icon: <Settings className="h-5 w-5" /> 
    },
  ];
  
  const isActive = (path) => {
    if (path === '/farmer-dashboard' && location.pathname === '/farmer-dashboard') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/farmer-dashboard';
  };
  
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside
        className={`
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          fixed md:static
          inset-y-0
          left-0
          w-64
          bg-white
          border-r
          border-gray-200
          transition-transform
          duration-300
          ease-in-out
          z-30
          flex
          flex-col
        `}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold">
              {user?.name?.charAt(0) || 'F'}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{user?.name || 'Farmer'}</h3>
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
                      ? 'bg-green-50 text-green-700'
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

        <div className="p-4 border-t border-gray-200">
          <div className="px-4 py-3 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-800 flex items-center">
              <Leaf className="h-4 w-4 mr-2" />
              Organic Certified
            </h4>
            <p className="text-xs text-green-600 mt-1">
              Valid until June 2024
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-20 left-4 z-40 bg-white rounded-full p-2 shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <ChevronDown className="h-6 w-6 text-gray-700" />
        ) : (
          <LayoutDashboard className="h-6 w-6 text-gray-700" />
        )}
      </button>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <Routes>
          <Route path="/" element={<Analytics />} />
          <Route path="/crops" element={<div>Crops List (Coming soon)</div>} />
          <Route path="/add-crop" element={<div>Add Crop (Coming soon)</div>} />
          <Route path="/edit-crop/:id" element={<div>Edit Crop (Coming soon)</div>} />
          <Route path="/orders" element={<div>Orders (Coming soon)</div>} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<div>Settings (Coming soon)</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default FarmerDashboard;