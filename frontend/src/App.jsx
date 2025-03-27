import React, { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { logout, setCredentials } from "./store/features/auth/authSlice";
import "./App.css";
import ProductDetailPage from "./pages/ProductDetailPage";
import UserDashboard from "./pages/UserDashboard";
import AdminPanel from "./pages/AdminPanel";
import About from "./pages/About";
import { getProfile } from "./api/UserRelatedAPI";

const Home = lazy(() => import("./pages/Home"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));
const ProductFilterPage = lazy(()=>import("./pages/ProductFilterPage"))
const PageNotFound = lazy(()=>import("./pages/PageNotFound"))

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchUserData();
  }, []);
  async function fetchUserData() {
    try {
      setIsLoading(true);
      const response = await getProfile();
      dispatch(setCredentials(response.data.user))
    } catch (error) {
      dispatch(logout(null));
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="w-screen h-screen absolute top-0 flex justify-center items-center bg-gray-800/70">
        <div className="animate-spin w-10 h-10 bg-transparent rounded-full border-4 border-t-transparent "></div>
      </div>
    );
  }
  const GoogleAuthWrapper = ({ children }) => {
    return (
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        {children}
      </GoogleOAuthProvider>
    );
  };
  return (
    <>
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center text-lg">
            <div className="animate-spin"></div>
          </div>
        }
      >
        <Navbar />
        <div className="mt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login"
              element={
                <GoogleAuthWrapper>
                    <Login />
                </GoogleAuthWrapper>
              }
            />
            <Route
              path="/register"
              element={
                <GoogleAuthWrapper>
                    <Register />
                </GoogleAuthWrapper>
              }
            />

            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route path="/about" element={<About />} /  > 
            <Route path="/filter" element={<ProductFilterPage />} />
            
              {/* user routes */}
            <Route path="/dashboard" element={<UserDashboard />} />

            {/* product routes */}
            <Route path="/product/:id" element={<ProductDetailPage />} />
            {/* <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/shipping" element={<Shipping />} /> */}
          
          {/* admin routes */}
            <Route path="/admin" element={<AdminPanel />} />
          
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>{" "}
        <Footer />
      </Suspense>
      <Toaster />
    </>
  );
};

export default App;
