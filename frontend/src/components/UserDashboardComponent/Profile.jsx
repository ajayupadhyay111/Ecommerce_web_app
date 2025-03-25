import React from "react";

const Profile = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
      <form className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            defaultValue="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded-md"
            defaultValue="john@example.com"
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="tel"
            className="w-full p-2 border rounded-md"
            defaultValue="+91 9876543210"
          />
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-md">
          Save Changes
        </button>
      </form>
    </>
  );
};

export default Profile;
