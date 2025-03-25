import { useState } from 'react';
import { Search, Filter, Mail, Phone, MapPin, ShoppingBag, Eye, Trash, Trash2, Edit } from 'lucide-react';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Static customer data - replace with API call
  const customers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 9876543210",
      location: "New Delhi",
      joinDate: "2024-01-15",
      totalOrders: 12,
      totalSpent: "₹15,999",
      status: "Active"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+91 9876543211",
      location: "Mumbai",
      joinDate: "2024-02-20",
      totalOrders: 8,
      totalSpent: "₹12,499",
      status: "Active"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+91 9876543212",
      location: "Bangalore",
      joinDate: "2024-03-10",
      totalOrders: 3,
      totalSpent: "₹4,999",
      status: "Inactive"
    }
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="md:p-6 p-3 space-y-6">
          <h2 className="text-2xl font-semibold">Customers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Customers", value: customers.length },
          { label: "Active Customers", value: customers.filter(c => c.status === "Active").length },
          { label: "New This Month", value: "24" }
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-500">{stat.label}</p>
            <p className="text-2xl font-semibold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search customers..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:border-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="border rounded-lg px-4 py-2 focus:outline-none focus:border-black"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="py-4 px-6 text-left">Customer</th>
              <th className="py-4 px-6 text-left">Contact</th>
              <th className="py-4 px-6 text-left">Location</th>
              <th className="py-4 px-6 text-left">Join Date</th>
              <th className="py-4 px-6 text-left">Orders</th>
              <th className="py-4 px-6 text-left">Total Spent</th>
              <th className="py-4 px-6 text-left">Status</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredCustomers.map(customer => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-lg font-medium">
                        {customer.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-gray-500">{customer.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{customer.phone}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{customer.location}</span>
                  </div>
                </td>
                <td className="py-4 px-6">{customer.joinDate}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-gray-400" />
                    <span>{customer.totalOrders}</span>
                  </div>
                </td>
                <td className="py-4 px-6">{customer.totalSpent}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    customer.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {customer.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-center">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Edit className="h-5 w-5 text-green-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Trash2 className="h-5 w-5 text-red-600" />
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

export default Customers;