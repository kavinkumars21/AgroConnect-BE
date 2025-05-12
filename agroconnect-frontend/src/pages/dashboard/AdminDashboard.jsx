import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Users, ShoppingBag, TrendingUp, AlertTriangle } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
            <Button variant="outline" size="sm">Settings</Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                <Users size={24} />
              </div>
              <div className="ml-5">
                <p className="text-gray-500 text-sm">Total Users</p>
                <h3 className="text-2xl font-bold text-gray-900">1,234</h3>
                <p className="text-green-600 text-sm">↑ 12% from last month</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-secondary-100 text-secondary-600">
                <ShoppingBag size={24} />
              </div>
              <div className="ml-5">
                <p className="text-gray-500 text-sm">Active Listings</p>
                <h3 className="text-2xl font-bold text-gray-900">856</h3>
                <p className="text-green-600 text-sm">↑ 8% from last month</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-accent-100 text-accent-600">
                <TrendingUp size={24} />
              </div>
              <div className="ml-5">
                <p className="text-gray-500 text-sm">Total Revenue</p>
                <h3 className="text-2xl font-bold text-gray-900">$45,678</h3>
                <p className="text-green-600 text-sm">↑ 15% from last month</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <AlertTriangle size={24} />
              </div>
              <div className="ml-5">
                <p className="text-gray-500 text-sm">Pending Reviews</p>
                <h3 className="text-2xl font-bold text-gray-900">23</h3>
                <p className="text-red-600 text-sm">Requires attention</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity and Management Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-start pb-4 border-b border-gray-100">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                  <Users size={16} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">New User Registration</p>
                  <p className="text-sm text-gray-500">John Doe registered as a farmer</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start pb-4 border-b border-gray-100">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                  <AlertTriangle size={16} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Reported Listing</p>
                  <p className="text-sm text-gray-500">Listing #123 reported for price manipulation</p>
                  <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <ShoppingBag size={16} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Large Order Completed</p>
                  <p className="text-sm text-gray-500">$5,000+ order completed successfully</p>
                  <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="flex items-center justify-center">
                <Users className="mr-2 h-5 w-5" />
                Manage Users
              </Button>
              <Button variant="outline" className="flex items-center justify-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Review Listings
              </Button>
              <Button variant="outline" className="flex items-center justify-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Handle Reports
              </Button>
              <Button variant="outline" className="flex items-center justify-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                View Analytics
              </Button>
            </div>
          </Card>
        </div>

        {/* Pending Reviews Table */}
        <Card className="mt-8 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Reviews</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted By
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#123</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Listing Report</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">user@example.com</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-02-20</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="outline" size="sm">Review</Button>
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;