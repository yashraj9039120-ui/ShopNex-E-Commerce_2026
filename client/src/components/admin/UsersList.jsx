import React, { useEffect } from "react";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import { Link, useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessage,
  deleteUser,
  fetchUsers,
  removeErrors,
} from "../../redux/admin/adminSlice";
import Loader from "../../shared/Loader";
import { toast } from "react-toastify";

function UsersList() {
  const { users, loading, error, message } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (userId) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (confirm) {
      dispatch(deleteUser(userId));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
    if (message) {
      toast.success(message, { position: "top-center", autoClose: 3000 });
      dispatch(clearMessage());
      navigate("/admin/dashboard");
    }
  }, [dispatch, error, message, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />

          <main className="min-h-screen bg-gray-100 px-6 sm:px-10 py-12">
            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left border border-gray-200">
                  {/* Title Row inside Table Head */}
                  <thead>
                    <tr className="bg-indigo-600">
                      <th
                        colSpan="6"
                        className="px-6 py-4 text-xl font-bold text-white text-center"
                      >
                        👥 All Users
                      </th>
                    </tr>
                    <tr className="bg-indigo-500 text-white">
                      <th className="px-6 py-3 font-semibold uppercase tracking-wider">
                        Sl No
                      </th>
                      <th className="px-6 py-3 font-semibold uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 font-semibold uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 font-semibold uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 font-semibold uppercase tracking-wider">
                        Created At
                      </th>
                      <th className="px-6 py-3 font-semibold text-center uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  {/* Body */}
                  <tbody>
                    {users.map((user, index) => (
                      <tr
                        key={user._id}
                        className={`transition-colors duration-200 ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-indigo-50`}
                      >
                        {/* Sl No */}
                        <td className="px-6 py-4 text-gray-700 font-medium">
                          {index + 1}
                        </td>

                        {/* Name */}
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          {user.name}
                        </td>

                        {/* Email */}
                        <td className="px-6 py-4 text-gray-600">{user.email}</td>

                        {/* Role with Badge */}
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 text-xs font-bold rounded-full ${
                              user.role === "admin"
                                ? "bg-red-100 text-red-700 border border-red-300"
                                : "bg-green-100 text-green-700 border border-green-300"
                            }`}
                          >
                            {user.role.charAt(0).toUpperCase() +
                              user.role.slice(1)}
                          </span>
                        </td>

                        {/* Created At */}
                        <td className="px-6 py-4 text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-center">
                          <div className="inline-flex gap-3 items-center">
                            {/* Edit */}
                            <Link
                              to={`/admin/user/${user._id}`}
                              className="p-2 rounded-md bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                              aria-label="Edit user"
                            >
                              <Edit fontSize="small" />
                            </Link>

                            {/* Delete */}
                            <button
                              onClick={() => handleDelete(user._id)}
                              className="p-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                              aria-label="Delete user"
                            >
                              <Delete fontSize="small" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {/* No Users Found */}
                    {users.length === 0 && (
                      <tr>
                        <td
                          colSpan="6"
                          className="px-6 py-8 text-center text-gray-500"
                        >
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </main>

          <Footer />
        </>
      )}
    </>
  );
}

export default UsersList;
