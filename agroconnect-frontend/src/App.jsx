// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
// import { CartProvider } from './contexts/CartContext';
// import Navbar from './components/common/Navbar';
// import Footer from './components/common/Footer';
// import HomePage from './pages/HomePage';
// import Marketplace from './pages/MarketPlace';
// import AuthPage from './pages/AuthPage';
// import ProfilePage from './pages/ProfilePage';
// import CartPage from './pages/CartPage';
// import CheckoutPage from './pages/CheckoutPage';
// import FarmerDashboard from './pages/dashboard/FarmerDashboard';
// import BuyerDashboard from './pages/dashboard/BuyerDashboard';
// import AdminDashboard from './pages/dashboard/AdminDashboard';
// import DeliveryDashboard from './pages/dashboard/DeliveryDashboard';
// import ProtectedRoute from './components/auth/ProtectedRoute';
// import NotFoundPage from './pages/NotFoundPage';

// function App() {
//   return (
//     <AuthProvider>
//       <CartProvider>
//         <Router>
//           <div className="flex flex-col min-h-screen">
//             <Navbar />
//             <main className="flex-grow">
//               <Routes>
//                 <Route path="/" element={<HomePage />} />
//                 <Route path="/marketplace" element={<Marketplace />} />
//                 <Route path="/auth" element={<AuthPage />} />
                
//                 {/* Protected routes */}
//                 <Route path="/profile" element={
//                   <ProtectedRoute>
//                     <ProfilePage />
//                   </ProtectedRoute>
//                 } />
//                 <Route path="/cart" element={
//                   <ProtectedRoute allowedRoles={['consumer', 'business']}>
//                     <CartPage />
//                   </ProtectedRoute>
//                 } />
//                 <Route path="/checkout" element={
//                   <ProtectedRoute allowedRoles={['consumer', 'business']}>
//                     <CheckoutPage />
//                   </ProtectedRoute>
//                 } />
                
//                 {/* Role-specific dashboards */}
//                 <Route path="/farmer-dashboard/*" element={
//                   <ProtectedRoute allowedRoles={['farmer']}>
//                     <FarmerDashboard />
//                   </ProtectedRoute>
//                 } />
//                 <Route path="/buyer-dashboard/*" element={
//                   <ProtectedRoute allowedRoles={['consumer', 'business']}>
//                     <BuyerDashboard />
//                   </ProtectedRoute>
//                 } />
//                 <Route path="/admin-dashboard/*" element={
//                   <ProtectedRoute allowedRoles={['admin']}>
//                     <AdminDashboard />
//                   </ProtectedRoute>
//                 } />
//                 <Route path="/delivery-dashboard/*" element={
//                   <ProtectedRoute allowedRoles={['delivery']}>
//                     <DeliveryDashboard />
//                   </ProtectedRoute>
//                 } />

//                 <Route path="/404" element={<NotFoundPage />} />
//                 <Route path="*" element={<Navigate to="/404" replace />} />
//               </Routes>
//             </main>
//             <Footer />
//           </div>
//         </Router>
//       </CartProvider>
//     </AuthProvider>
//   );
// }
// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import Marketplace from './pages/MarketPlace';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import FarmerDashboard from './pages/dashboard/FarmerDashboard';
import BuyerDashboard from './pages/dashboard/BuyerDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import DeliveryDashboard from './pages/dashboard/DeliveryDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';

function AppContent() {
  const location = useLocation();

  const hideFooterRoutes = [
    '/farmer-dashboard',
    '/buyer-dashboard',
    '/admin-dashboard',
    '/delivery-dashboard',
  ];

  const shouldHideFooter = hideFooterRoutes.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected routes */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={
            <ProtectedRoute allowedRoles={['consumer', 'business']}>
              <CartPage />
            </ProtectedRoute>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute allowedRoles={['consumer', 'business']}>
              <CheckoutPage />
            </ProtectedRoute>
          } />

          {/* Role-specific dashboards */}
          <Route path="/farmer-dashboard/*" element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <FarmerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/buyer-dashboard/*" element={
            <ProtectedRoute allowedRoles={['consumer', 'business']}>
              <BuyerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin-dashboard/*" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/delivery-dashboard/*" element={
            <ProtectedRoute allowedRoles={['delivery']}>
              <DeliveryDashboard />
            </ProtectedRoute>
          } />

          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      {!shouldHideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
