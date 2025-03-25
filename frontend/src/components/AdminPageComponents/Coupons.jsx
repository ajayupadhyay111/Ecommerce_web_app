import { useState } from "react";
import { Plus, Search, Edit2, Trash2, Copy, Tag } from "lucide-react";
import CreateNewCoupon from "./CreateNewCoupon";
import toast from "react-hot-toast";

const Coupons = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Static coupon data - replace with API call
  const coupons = [
    {
      id: 1,
      code: "SUMMER2024",
      type: "Percentage",
      value: 20,
      minPurchase: 999,
      maxDiscount: 500,
      startDate: "2024-03-01",
      endDate: "2024-03-31",
      usageLimit: 100,
      usageCount: 45,
      status: "Active",
    },
    {
      id: 2,
      code: "WELCOME50",
      type: "Percentage",
      value: 50,
      minPurchase: 1999,
      maxDiscount: 1000,
      startDate: "2024-03-15",
      endDate: "2024-04-15",
      usageLimit: 200,
      usageCount: 76,
      status: "Active",
    },
    {
      id: 3,
      code: "FLAT500",
      type: "Fixed",
      value: 500,
      minPurchase: 2499,
      maxDiscount: 500,
      startDate: "2024-03-10",
      endDate: "2024-03-20",
      usageLimit: 50,
      usageCount: 50,
      status: "Expired",
    },
  ];

  const filteredCoupons = coupons.filter((coupon) =>
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    toast.success("Coupon copied")
    // Add toast notification here
  };

  return (
    <div className="md:p-6 p-3 space-y-6">
          <h2 className="text-2xl font-semibold">Coupons</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            label: "Active Coupons",
            value: coupons.filter((c) => c.status === "Active").length,
          },
          {
            label: "Total Redemptions",
            value: coupons.reduce((acc, c) => acc + c.usageCount, 0),
          },
          {
            label: "Expired Coupons",
            value: coupons.filter((c) => c.status === "Expired").length,
          },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-500">{stat.label}</p>
            <p className="text-2xl font-semibold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search and Add */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search coupons..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:border-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          <Plus className="h-5 w-5" />
          Create Coupon
        </button>
        <CreateNewCoupon
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="py-4 px-6 text-left">Code</th>
              <th className="py-4 px-6 text-left">Discount</th>
              <th className="py-4 px-6 text-left">Min Purchase</th>
              <th className="py-4 px-6 text-left">Usage</th>
              <th className="py-4 px-6 text-left">Valid Till</th>
              <th className="py-4 px-6 text-left">Status</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredCoupons.map((coupon) => (
              <tr key={coupon.id} className="hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-gray-400" />
                    <span className="font-medium">{coupon.code}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  {coupon.type === "Percentage"
                    ? `${coupon.value}%`
                    : `₹${coupon.value}`}
                  {coupon.maxDiscount && (
                    <div className="text-sm text-gray-500">
                      Max: ₹{coupon.maxDiscount}
                    </div>
                  )}
                </td>
                <td className="py-4 px-6">₹{coupon.minPurchase}</td>
                <td className="py-4 px-6">
                  <span className="text-sm">
                    {coupon.usageCount}/{coupon.usageLimit}
                  </span>
                </td>
                <td className="py-4 px-6">{coupon.endDate}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      coupon.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {coupon.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => copyToClipboard(coupon.code)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                      title="Copy code"
                    >
                      <Copy className="h-5 w-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Edit2 className="h-5 w-5 text-blue-600" />
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

export default Coupons;
