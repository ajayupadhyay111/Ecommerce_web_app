import { useState } from "react";
import { X, Tag } from "lucide-react";

const CreateNewCoupon = ({ isOpen, onClose }) => {
  const [couponData, setCouponData] = useState({
    code: "",
    type: "Percentage", // or 'Fixed'
    value: "",
    minPurchase: "",
    maxDiscount: "",
    startDate: "",
    endDate: "",
    usageLimit: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(couponData);

    setCouponData({
        code: "",
        type: "Percentage", // or 'Fixed'
        value: "",
        minPurchase: "",
        maxDiscount: "",
        startDate: "",
        endDate: "",
        usageLimit: "",
        description: "",
      })
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 w-screen z-50 bg-neutral-500/50 py-10 overflow-y-auto"
    >
      <div className=" relative  min-h-screen md:flex md:items-center md:justify-center">
        <div
          onClick={(e) => e.stopPropagation()}
          className=" relative bg-white w-full md:max-w-3xl mx-auto rounded-lg shadow-lg"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Create New Coupon</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {/* Coupon Code */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Coupon Code
              </label>
              <input
                type="text"
                value={couponData.code}
                onChange={(e) =>
                  setCouponData({
                    ...couponData,
                    code: e.target.value.toUpperCase(),
                  })
                }
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
                placeholder="e.g. SUMMER2024"
                required
              />
            </div>

            {/* Discount Type & Value */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Discount Type
                </label>
                <select
                  value={couponData.type}
                  onChange={(e) =>
                    setCouponData({ ...couponData, type: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
                  required
                >
                  <option value="Percentage">Percentage (%)</option>
                  <option value="Fixed">Fixed Amount (₹)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Discount Value
                </label>
                <input
                  type="number"
                  value={couponData.value}
                  onChange={(e) =>
                    setCouponData({ ...couponData, value: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
                  placeholder={
                    couponData.type === "Percentage"
                      ? "Enter %"
                      : "Enter amount"
                  }
                  required
                />
              </div>
            </div>

            {/* Min Purchase & Max Discount */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Min. Purchase (₹)
                </label>
                <input
                  type="number"
                  value={couponData.minPurchase}
                  onChange={(e) =>
                    setCouponData({
                      ...couponData,
                      minPurchase: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Max. Discount (₹)
                </label>
                <input
                  type="number"
                  value={couponData.maxDiscount}
                  onChange={(e) =>
                    setCouponData({
                      ...couponData,
                      maxDiscount: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
                  required
                />
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={couponData.startDate}
                  onChange={(e) =>
                    setCouponData({ ...couponData, startDate: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={couponData.endDate}
                  onChange={(e) =>
                    setCouponData({ ...couponData, endDate: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
                  required
                />
              </div>
            </div>

            {/* Usage Limit */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Usage Limit
              </label>
              <input
                type="number"
                value={couponData.usageLimit}
                onChange={(e) =>
                  setCouponData({ ...couponData, usageLimit: e.target.value })
                }
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
                placeholder="Number of times this coupon can be used"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={couponData.description}
                onChange={(e) =>
                  setCouponData({ ...couponData, description: e.target.value })
                }
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
                rows="3"
                placeholder="Enter coupon description"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Create Coupon
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewCoupon;
