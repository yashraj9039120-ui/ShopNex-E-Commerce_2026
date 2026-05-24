import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiOutlineUser, HiOutlineShoppingCart } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/products");
    }
    setSearchQuery("");
    setMobileMenu(false); // close mobile menu after search
  };

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-blue-600 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold hover:text-gray-100">
                ShopNex
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex flex-1 ml-8 items-center justify-between">
              {/* Search Bar */}
              <form
                onSubmit={handleSearch}
                className="flex flex-1 max-w-xl items-center rounded overflow-hidden bg-white shadow-sm"
              >
                <input
                  type="text"
                  placeholder="Search for products, brands..."
                  className="flex-1 px-4 py-2 text-gray-800 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-3 bg-yellow-400 text-black hover:bg-yellow-500 transition"
                >
                  <FaSearch />
                </button>
              </form>

              {/* Links & Icons */}
              <div className="flex items-center gap-6 ml-6">
                <Link to="/" className="hover:text-gray-200 font-medium">
                  Home
                </Link>
                <Link to="/products" className="hover:text-gray-200 font-medium">
                  Products
                </Link>
                <Link to="/about-us" className="hover:text-gray-200 font-medium">
                  About Us
                </Link>
                <Link to="/contact-us" className="hover:text-gray-200 font-medium">
                  Contact
                </Link>

                {/* Cart */}
                <Link
                  to="/cart"
                  className="relative flex items-center hover:text-gray-200"
                >
                  <HiOutlineShoppingCart className="text-2xl" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 h-5 w-5 text-xs bg-yellow-400 text-black font-bold rounded-full flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Link>

                {/* Profile/Login */}
                {isAuthenticated ? (
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 hover:text-gray-200"
                  >
                    <img
                      src={user.avatar?.url || "/images/profile.png"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    <span className="hidden sm:block font-semibold">{user.name}</span>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-2 font-semibold hover:text-gray-200"
                  >
                    <HiOutlineUser className="text-2xl" />
                    Login
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="text-white focus:outline-none text-3xl  mr-10"
                aria-label="Toggle menu"
              >
                {mobileMenu ? "✖" : "☰"}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden bg-blue-600 px-4 pt-4 pb-6 space-y-3">
            <form onSubmit={handleSearch} className="flex items-center w-full mb-2">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 px-3 py-2 text-gray-800 rounded-l focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="px-3 bg-yellow-400 text-black rounded-r hover:bg-yellow-500"
              >
                <FaSearch />
              </button>
            </form>

            <Link to="/" onClick={() => setMobileMenu(false)} className="block hover:text-gray-200 font-medium">
              Home
            </Link>
            <Link to="/products" onClick={() => setMobileMenu(false)} className="block hover:text-gray-200 font-medium">
              Products
            </Link>
            <Link to="/about-us" onClick={() => setMobileMenu(false)} className="block hover:text-gray-200 font-medium">
              About Us
            </Link>
            <Link to="/contact-us" onClick={() => setMobileMenu(false)} className="block hover:text-gray-200 font-medium">
              Contact
            </Link>
            <Link to="/cart" onClick={() => setMobileMenu(false)} className="block hover:text-gray-200 font-medium">
              Cart ({cartItems.length})
            </Link>
            {isAuthenticated ? (
              <Link to="/profile" onClick={() => setMobileMenu(false)} className="flex items-center gap-2 hover:text-gray-200">
                <img
                  src={user.avatar?.url || "/images/profile.png"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <span>{user.name}</span>
              </Link>
            ) : (
              <Link to="/login" onClick={() => setMobileMenu(false)} className="flex items-center gap-2 font-semibold hover:text-gray-200">
                <HiOutlineUser className="text-2xl" />
                Login
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* Spacer div so fixed navbar doesn’t overlap content */}
      <div className="h-16 md:h-16"></div>
    </>
  );
}

export default Navbar;
