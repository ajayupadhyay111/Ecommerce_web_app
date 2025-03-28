import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const About = lazy(() => import("./pages/About"));
const MainLayout = lazy(() => import("./components/MainLayout"));
const Home = lazy(() => import("./pages/Home"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const ProductFilterPage = lazy(() => import("./pages/ProductFilterPage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

const App = () => {
  const GoogleAuthWrapper = ({ children }) => {
    return (
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        {children}
      </GoogleOAuthProvider>
    );
  };
  return (
    <React.Fragment>
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center text-lg">
            <div className="animate-spin"></div>
          </div>
        }
      >
        
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
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
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />
              <Route path="/verify-email/:token" element={<VerifyEmail />} />
              <Route path="/about" element={<About />} />
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
            </Route>
          </Routes>
        
      </Suspense>
      <Toaster />
    </React.Fragment>
  );
};

export default App;
