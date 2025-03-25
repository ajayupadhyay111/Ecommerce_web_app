import {
  IndianRupee,
  ShoppingBag,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const Dashboard = () => {
  // Static data for metrics
  const metrics = [
    {
      title: "Total Revenue",
      value: "₹1,23,456",
      change: "+12.5%",
      trend: "up",
      icon: IndianRupee,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Total Orders",
      value: "856",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingBag,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Total Customers",
      value: "1,459",
      change: "+5.3%",
      trend: "up",
      icon: Users,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Total Products",
      value: "245",
      change: "-2.1%",
      trend: "down",
      icon: Package,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  // Static data for recent orders
  const recentOrders = [
    {
      id: "ORD001",
      image:
        "https://duders.in/cdn/shop/files/MenShirts_2_600x.png?v=1702724615",
      customer: "John Doe",
      name: "Men's Blue Shirt",
      category: "Men",
      price: "₹999",
      status: "Delivered",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: "ORD002",
      image:
        "https://duders.in/cdn/shop/files/MenShirts_3_600x.png?v=1702724615",
      customer: "Jane Smith",
      name: "Women's Red Dress",
      category: "Women",
      price: "₹1,499",
      status: "Processing",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      id: "ORD003",
      image:
        "https://duders.in/cdn/shop/files/MenShirts_2_600x.png?v=1702724615",
      customer: "Mike Johnson",
      category: "Men",
      name: "Sports Shoes",
      price: "₹2,999",
      status: "Pending",
      statusColor: "bg-orange-100 text-orange-800",
    },
  ];

  return (
    <div className="md:p-6 p-3 space-y-8">
      <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
          
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
            <div key={metric.title} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg ${metric.color}`}>
                <metric.icon className="h-6 w-6" />
              </div>
              <div className="flex items-center gap-1">
                {metric.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={
                    metric.trend === "up" ? "text-green-500" : "text-red-500"
                  }
                >
                  {metric.change}
                </span>
              </div>
            </div>
            <h3 className="text-gray-500 mt-4">{metric.title}</h3>
            <p className="text-2xl font-semibold mt-2">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <h2 className="text-2xl font-semibold">Recent Orders</h2>
      <div className="bg-white rounded-lg shadow-sm">
        {/* Desktop Table View */}
        <div className="hidden md:block bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="pb-4">Order ID</th>
                <th className="pb-4">Customer</th>
                <th className="pb-4">Product Name</th>
                <th className="pb-4">Category</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentOrders.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 rounded object-cover"
                    />
                  </td>
                  <td className="py-4 px-6">₹{product.customer}</td>
                  <td className="py-4 px-6">{product.name}</td>
                  <td className="py-4 px-6">{product.category}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        product.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile Card View */}
        <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
          {recentOrders.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg border p-4 space-y-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-16 w-16 rounded object-cover"
                />
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Price:</span>
                  <span className="ml-2 font-medium">{product.price}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    product.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : product.status === "Processing"
                      ? "bg-yellow-100 text-yellow-600"
                      : product.status === "Returned"
                      ? "bg-red-100 text-red-800"
                      : product.status === 'Canceled'
                      ?"bg-red-100 text-red-800":
                      "bg-blue-100 text-blue-800"
                  }`}
                >
                  {product.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
