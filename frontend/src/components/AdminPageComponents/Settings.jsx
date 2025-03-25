import { useState } from 'react';
import { Save, Store, Truck, Mail, Bell, Shield, CreditCard } from 'lucide-react';

const Settings = () => {
  // Form states
  const [generalSettings, setGeneralSettings] = useState({
    storeName: 'My E-Commerce Store',
    storeEmail: 'contact@mystore.com',
    phoneNumber: '+91 9876543210',
    address: '123 Main Street, City, State, 110001'
  });

  const [deliverySettings, setDeliverySettings] = useState({
    freeShippingThreshold: '999',
    standardShippingRate: '49',
    expressShippingRate: '99'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Settings updated');
  };

  return (
    <div className="md:p-6 p-3 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>

      

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-medium">Store Configuration</h3>
          <p className="text-gray-500 text-sm mt-1">
            Manage your store's basic information and settings
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* General Settings */}
          <div className="space-y-4">
            <h4 className="font-medium">General Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Store Name
                </label>
                <input
                  type="text"
                  value={generalSettings.storeName}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      storeName: e.target.value
                    })
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Store Email
                </label>
                <input
                  type="email"
                  value={generalSettings.storeEmail}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      storeEmail: e.target.value
                    })
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
                />
              </div>
            </div>
          </div>

          {/* Shipping Settings */}
          <div className="space-y-4">
            <h4 className="font-medium">Shipping Configuration</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Free Shipping Threshold (₹)
                </label>
                <input
                  type="number"
                  value={deliverySettings.freeShippingThreshold}
                  onChange={(e) =>
                    setDeliverySettings({
                      ...deliverySettings,
                      freeShippingThreshold: e.target.value
                    })
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Standard Shipping Rate (₹)
                </label>
                <input
                  type="number"
                  value={deliverySettings.standardShippingRate}
                  onChange={(e) =>
                    setDeliverySettings({
                      ...deliverySettings,
                      standardShippingRate: e.target.value
                    })
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Express Shipping Rate (₹)
                </label>
                <input
                  type="number"
                  value={deliverySettings.expressShippingRate}
                  onChange={(e) =>
                    setDeliverySettings({
                      ...deliverySettings,
                      expressShippingRate: e.target.value
                    })
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            >
              <Save className="h-5 w-5" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;