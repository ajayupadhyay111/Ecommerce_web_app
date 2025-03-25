import { useState } from "react";
import { X } from "lucide-react";

const Address = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressData, setAddressData] = useState({
    type: "Home",
    street: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(addressData);
    setIsModalOpen(false);
    // Reset form
    setAddressData({
      type: "Home",
      street: "",
      apartment: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
    });
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Saved Addresses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">Home</p>
              <p className="text-sm text-gray-600 mt-1">
                123 Main Street, Apartment 4B
                <br />
                New Delhi, Delhi 110001
                <br />
                Phone: +91 9876543210
              </p>
            </div>
            <div className="space-x-2">
              <button className="text-blue-500 text-sm">Edit</button>
              <button className="text-red-500 text-sm">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 border border-dashed w-full p-4 rounded-lg text-gray-500 hover:border-gray-400"
      >
        + Add New Address
      </button>

      {/* Add Address Modal */}
      {isModalOpen && (
        <div onClick={() => setIsModalOpen(false)} className="fixed inset-0 z-50 bg-gray-600/50 flex items-center justify-center p-4">
          <div onClick={(e)=>e.stopPropagation()} className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">Add New Address</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              {/* Address Type */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Address Type
                </label>
                <select
                  value={addressData.type}
                  onChange={(e) =>
                    setAddressData({ ...addressData, type: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
                  required
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={addressData.street}
                  onChange={(e) =>
                    setAddressData({ ...addressData, street: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
                  placeholder="Enter street address"
                  required
                />
              </div>

              {/* Apartment/Suite */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Apartment/Suite (Optional)
                </label>
                <input
                  type="text"
                  value={addressData.apartment}
                  onChange={(e) =>
                    setAddressData({
                      ...addressData,
                      apartment: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
                  placeholder="Apartment, suite, unit, etc."
                />
              </div>

              {/* City, State, Pincode Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    value={addressData.city}
                    onChange={(e) =>
                      setAddressData({ ...addressData, city: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={addressData.state}
                    onChange={(e) =>
                      setAddressData({ ...addressData, state: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
                    required
                  />
                </div>
              </div>

              {/* Pincode & Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    value={addressData.pincode}
                    onChange={(e) =>
                      setAddressData({
                        ...addressData,
                        pincode: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
                    pattern="[0-9]{6}"
                    maxLength="6"
                    placeholder="6-digit pincode"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={addressData.phone}
                    onChange={(e) =>
                      setAddressData({ ...addressData, phone: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    placeholder="10-digit number"
                    required
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Address;
