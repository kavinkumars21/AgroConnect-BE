import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Leaf, ChevronRight, ChevronLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const CartPage = () => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  
  const handleQuantityChange = (cropId, newQuantity) => {
    updateQuantity(cropId, newQuantity);
  };
  
  const handleRemoveItem = (cropId) => {
    removeItem(cropId);
  };
  
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }
    
    // Simulate coupon validation
    if (couponCode.toUpperCase() === 'FRESH20') {
      setCouponApplied(true);
      setDiscountAmount(totalPrice * 0.2);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setCouponApplied(false);
      setDiscountAmount(0);
    }
  };
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <span className="ml-4 bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1 rounded-full">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </span>
        </div>
        
        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="overflow-hidden mb-6">
                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <div key={item.crop.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center">
                      <div className="flex-shrink-0 w-full sm:w-24 h-24 bg-gray-200 rounded-md overflow-hidden mb-4 sm:mb-0">
                        <img
                          src={item.crop.image}
                          alt={item.crop.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow sm:ml-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {item.crop.name}
                              {item.crop.isOrganic && (
                                <span className="ml-2 bg-primary-100 text-primary-800 text-xs px-2 py-0.5 rounded-full inline-flex items-center">
                                  <Leaf className="w-3 h-3 mr-1" />
                                  Organic
                                </span>
                              )}
                            </h3>
                            <p className="text-sm text-gray-500">
                              from {item.crop.farmerName} • {item.crop.location}
                            </p>
                          </div>
                          <span className="text-lg font-semibold text-gray-900">
                            ${(item.crop.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4">
                          <div className="flex items-center">
                            <button
                              onClick={() => handleQuantityChange(item.crop.id, Math.max(1, item.quantity - 1))}
                              className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-1 rounded-full transition-colors"
                            >
                              <ChevronLeft size={18} />
                            </button>
                            <span className="w-12 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.crop.id, item.quantity + 1)}
                              className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-1 rounded-full transition-colors"
                            >
                              <ChevronRight size={18} />
                            </button>
                            <span className="ml-2 text-sm text-gray-500">
                              ${item.crop.price.toFixed(2)}/lb
                            </span>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.crop.id)}
                            className="text-red-600 hover:text-red-800 flex items-center mt-2 sm:mt-0 transition-colors"
                          >
                            <Trash2 size={18} className="mr-1" />
                            <span className="text-sm">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              
              <div className="flex justify-between items-center">
                <Link to="/marketplace">
                  <Button variant="outline" className="flex items-center">
                    <ChevronLeft size={18} className="mr-1" />
                    Continue Shopping
                  </Button>
                </Link>
                <Button variant="outline" onClick={clearCart} className="text-red-600 border-red-600 hover:bg-red-50">
                  <Trash2 size={18} className="mr-1" />
                  Clear Cart
                </Button>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-4 border-b border-gray-200 pb-4 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  
                  {couponApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (20%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${(totalPrice * 0.075).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-lg font-semibold mb-6">
                  <span>Total</span>
                  <span className="text-primary-600">
                    ${(totalPrice - discountAmount + (totalPrice * 0.075)).toFixed(2)}
                  </span>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1">
                    Coupon Code
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                    <Button
                      onClick={handleApplyCoupon}
                      className="rounded-l-none"
                    >
                      Apply
                    </Button>
                  </div>
                  {couponError && (
                    <p className="mt-1 text-sm text-red-600">{couponError}</p>
                  )}
                  {couponApplied && (
                    <p className="mt-1 text-sm text-green-600">Coupon applied successfully!</p>
                  )}
                  <p className="mt-2 text-xs text-gray-500">Try "FRESH20" for 20% off</p>
                </div>
                
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full flex items-center justify-center"
                  onClick={handleCheckout}
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Proceed to Checkout
                </Button>
                
                <div className="mt-4 text-xs text-gray-500 flex items-center justify-center">
                  <span>Secure payment processing</span>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-lg shadow">
            <ShoppingCart size={64} className="text-gray-400 mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md">
              Looks like you haven't added any items to your cart yet.
              Explore our marketplace to find fresh, local produce.
            </p>
            <Link to="/marketplace">
              <Button size="lg">
                Browse Marketplace
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;