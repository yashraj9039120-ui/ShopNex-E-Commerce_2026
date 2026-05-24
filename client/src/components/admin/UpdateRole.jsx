import React, { useEffect, useState } from "react";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import PageTitle from "../../service/page/PageTitle";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleUser,
  removeErrors,
  removeSuccess,
  updateUserRole,
} from "../../redux/admin/adminSlice";
import { toast } from "react-toastify";

function UpdateRole() {
  const { userId } = useParams();
  const { user, success, loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    dispatch(getSingleUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
      });
    }
  }, [user]);

  const { name, email, role } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserRole({ userId, role }));
  };

  useEffect(() => {
    if (success) {
      toast.success("✅ User Role Updated Successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      navigate("/admin/users");
    }
    if (error) {
      toast.error(error.message || "❌ An error occurred", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
    }
  }, [dispatch, error, success, navigate]);

  return (
    <>
      <Navbar />
      <PageTitle title="Update User Role" />

      <main className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 px-4 py-12">
        <section className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 md:p-10">
          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center">
            Update User Role
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={name}
                readOnly
                className="w-full rounded-xl border border-gray-300 bg-gray-100 p-4 text-base text-gray-600 cursor-not-allowed"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                readOnly
                className="w-full rounded-xl border border-gray-300 bg-gray-100 p-4 text-base text-gray-600 cursor-not-allowed"
              />
            </div>

            {/* Role Select */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                required
                value={role}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 p-4 text-base cursor-pointer focus:outline-none focus:ring-4 focus:ring-indigo-400 transition bg-white shadow-sm"
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="user" className="text-green-600 font-medium">
                  👤 User
                </option>
                <option value="admin" className="text-red-600 font-medium">
                  🛡️ Admin
                </option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-bold rounded-2xl shadow-lg transition-transform duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-1 flex justify-center items-center"
            >
              {loading ? (
                <svg
                  className="animate-spin h-6 w-6 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : null}
              {loading ? "Updating..." : "Update Role"}
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default UpdateRole;
