import React, { useEffect, useState } from "react";

export default function EditProfile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [resData, setResData] = useState(null);
  const url = "http://localhost:4000";

  // ✅ Fetch user on page load (Logic untouched)
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${url}/user/profile`, {
          credentials: "include",
        });
        const data = await res.json();
        setUser(data);

        if (data?.user) {
          setFormData({
            name: data.user.name || "",
            email: data.user.email || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ PUT request to update user (Logic untouched)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);

    try {
      const res = await fetch(`${url}/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Response from server:", data);
      setResData(data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!user) {
    return <h1 className="text-center text-xl font-semibold py-10 text-gray-600">Loading...</h1>;
  }

  return (
    // REDESIGN: Smoother background color
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      {/* REDESIGN: Enhanced Card Look */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg border border-gray-100">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-900">
          Edit Profile
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              // REDESIGN: Polished Input Styles
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              // REDESIGN: Polished Input Styles
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
              placeholder="Enter your email"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            // REDESIGN: Primary button style using indigo
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition duration-150 shadow-md hover:shadow-lg"
          >
            Save Changes
          </button>
        </form>

        {/* Optional response message */}
        {resData && (
          <p className="text-center text-green-600 font-medium mt-4">
            ✅ {resData.message || "Profile updated successfully!"}
          </p>
        )}
      </div>
    </div>
  );
}