import { useState } from 'react';
import { Search, Calendar, Filter, Eye, Truck, AlertCircle, Package, Check } from 'lucide-react';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState('today');

  // Static order data - replace with API call
  const orders = [
    {
      id: "ORD001",
      customer: "John Doe",
      date: "2024-03-25",
      amount: "₹2,499",
      items: 3,
      status: "Delivered",
      payment: "Paid",
      shipping: "Express"
    },
    {
      id: "ORD002",
      customer: "Jane Smith",
      date: "2024-03-24",
      amount: "₹1,999",
      items: 2,
      status: "Processing",
      payment: "Paid",
      shipping: "Standard"
    },
    {
      id: "ORD003",
      customer: "Mike Johnson",
      date: "2024-03-24",
      amount: "₹3,499",
      items: 4,
      status: "Pending",
      payment: "COD",
      shipping: "Express"
    }
  ];

  const statusColors = {
    Delivered: "bg-green-100 text-green-800",
    Processing: "bg-blue-100 text-blue-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Cancelled: "bg-red-100 text-red-800"
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="md:p-6 p-3 space-y-6">
          <h2 className="text-2xl font-semibold">Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Orders", value: "156", icon: Package },
          { label: "Pending", value: "23", icon: AlertCircle },
          { label: "Processing", value: "45", icon: Truck },
          { label: "Delivered", value: "88", icon: Check     }
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">{stat.label}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-full">
                <stat.icon className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search orders..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:border-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <select
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-black"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <select
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-black"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="py-4 px-6 text-left">Order ID</th>
              <th className="py-4 px-6 text-left">Customer</th>
              <th className="py-4 px-6 text-left">Date</th>
              <th className="py-4 px-6 text-left">Amount</th>
              <th className="py-4 px-6 text-left">Items</th>
              <th className="py-4 px-6 text-left">Status</th>
              <th className="py-4 px-6 text-left">Payment</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredOrders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="py-4 px-6 font-medium">{order.id}</td>
                <td className="py-4 px-6">{order.customer}</td>
                <td className="py-4 px-6">{order.date}</td>
                <td className="py-4 px-6">{order.amount}</td>
                <td className="py-4 px-6">{order.items}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-sm ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-6">{order.payment}</td>
                <td className="py-4 px-6">
                  <div className="flex justify-center">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Eye className="h-5 w-5 text-blue-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;