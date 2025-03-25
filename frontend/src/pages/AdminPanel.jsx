import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Ticket,
  Settings,
  ChevronDown,
  Plus,
} from "lucide-react";
import Dashboard from "@/components/AdminPageComponents/Dashboard";
import Products from "@/components/AdminPageComponents/Products";
import Orders from "@/components/AdminPageComponents/Orders";
import Customers from "@/components/AdminPageComponents/Customers";
import Coupons from "@/components/AdminPageComponents/Coupons";
import Setting from "@/components/AdminPageComponents/Settings";
const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "customers", label: "Customers", icon: Users },
    { id: "coupons", label: "Coupons", icon: Ticket },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "products":
        return <Products />;
      case "orders":
        return <Orders />;
      case "customers":
        return <Customers />;
      case "coupons":
        return <Coupons />;
      case "settings":
        return <Setting />;
      default:
        return <Dashboard />;
    }
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      setCollapsed(true);
    }
  }, []);

  return (
    <div className=" flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`sticky left-0 md:relative mt-11 md:mt-0 bg-white h-full shadow-sm ${
          collapsed ? "w-16 md:w-20" : "w-64"
        } transition-all duration-300`}
      >
        <div className="p-4 border-b">
          <h1 className={`font-bold ${collapsed ? "text-center" : "text-xl"}`}>
            {collapsed ? "AP" : "Admin Panel"}
          </h1>
        </div>
        <nav className={` ${collapsed ? "p-2 md:p-4" : "md:p-4"}`}>
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
        </nav>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className=" hidden md:block absolute top-16 md:top-3 -right-4 p-2 bg-gray-200 hover:bg-gray-100 rounded-full "
        >
          <ChevronDown
            className={`transform transition-transform ${
              collapsed ? "-rotate-90" : "rotate-90"
            }`}
          />
        </button>
      </div>

      {/* Main Content */}
      <div className=" overflow-auto flex-1 md:mt-0 mt-10">
        <div className=" p-2 md:p-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminPanel;
