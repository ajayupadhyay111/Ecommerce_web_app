import { useState, useEffect } from "react";
import { Package, User, MapPin, Heart, LogOut, ChevronDown } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "@/store/features/auth/authSlice";
import Products from "@/components/UserDashboardComponent/Products";
import Profile from "@/components/UserDashboardComponent/Profile";
import Address from "@/components/UserDashboardComponent/Address";
import WishList from "@/components/UserDashboardComponent/WishList";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("orders");
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { id: "orders", label: "Orders", icon: Package },
    { id: "profile", label: "Profile", icon: User },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "wishlist", label: "Wishlist", icon: Heart }
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return <Products />;
      case "profile":
        return <Profile />;
      case "addresses":
        return <Address />;
      case "wishlist":
        return <WishList />;
      default:
        return <Products />;
    }
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      setCollapsed(true);
    }
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`sticky left-0 md:relative mt-11 md:mt-0 bg-white h-full shadow-sm ${
          collapsed ? "w-16 md:w-20" : "w-64"
        } transition-all duration-300`}
      >
        <div className="p-4 border-b">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <img
                src="https://github.com/shadcn.png"
                alt="User"
                className="h-12 w-12 rounded-full"
              />
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-500">john@example.com</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="flex justify-center">
              <img
                src="https://github.com/shadcn.png"
                alt="User"
                className="h-10 w-10 rounded-full"
              />
            </div>
          )}
        </div>

        <nav className={`${collapsed ? "p-2 md:p-4" : "md:p-4"}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-3 rounded-lg mb-2 ${
                activeTab === item.id
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }
              ${collapsed ? "p-2 md:p-3" : "p-3"}`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="h-5 w-5 md:mx-0 mx-auto" />
              {!collapsed && (
                <span className="md:block hidden">{item.label}</span>
              )}
            </button>
          ))}

          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 rounded-lg text-red-500 hover:bg-red-50 ${
              collapsed ? "p-2 md:p-3" : "p-3"
            }`}
          >
            <LogOut className="h-5 w-5 md:mx-0 mx-auto" />
            {!collapsed && <span className="md:block hidden">Logout</span>}
          </button>
        </nav>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:block absolute top-16 md:top-3 -right-4 p-2 bg-gray-200 hover:bg-gray-100 rounded-full"
        >
          <ChevronDown
            className={`transform transition-transform ${
              collapsed ? "-rotate-90" : "rotate-90"
            }`}
          />
        </button>
      </div>

      {/* Main Content */}
      <div className="overflow-auto flex-1 md:mt-0 mt-10">
        <div className="p-2 md:p-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default UserDashboard;