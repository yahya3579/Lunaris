import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/styles/index.css';

// Components
import WhatsAppFAB from './components/WhatsAppFAB';
import ScrollToTop from './components/ScrollToTop';

import { useDispatch } from 'react-redux';
import { checkAuth } from './store/slices/authSlice';
import Home from './pages/Home';
import About from './pages/About';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import ContactUs from './pages/ContactUs';
import NotFound from './pages/NotFound';
import AdminSignup from './pages/AdminSignup';

import PrivateRoute from './components/PrivateRoute';

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/admindashboard" element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          } />
          <Route path="/adminlogin" element={<Login />} />
          <Route path="/adminsignup" element={<AdminSignup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {/* WhatsApp Floating Action Button */}
      <WhatsAppFAB
        phoneNumber="+923199911931"
        message="Hi! I'm interested in your real estate services."
        position="bottom-right"
      />
    </div>
  );
}


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(checkAuth());
    }
  }, [dispatch]);
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="colored" />
    </Router>
  );
}

export default App;
