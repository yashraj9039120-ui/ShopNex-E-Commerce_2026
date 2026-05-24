import React, { useState } from "react";
import PageTitle from "../../service/page/PageTitle";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import CheckoutPath from "../cart/CheckoutPath";
import { useDispatch, useSelector } from "react-redux";
import { Country, State, City } from "country-state-city";
import { toast } from "react-toastify";
import { saveShippingInfo } from "../../redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";

function Shipping() {
  const { shippingInfo } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const [address, setAddress] = useState(shippingInfo.address || "");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");
  const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const navigate = useNavigate();

  const shippingInfoSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      toast.error("Invalid Phone number! It should be 10 digits", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    if (!country || !state || !city) {
      toast.error("Please select country, state, and city", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    dispatch(saveShippingInfo({ address, pinCode, phoneNumber, country, state, city }));
    navigate("/order/confirm");
  };

  return (
    <>
      <PageTitle title="Shipping Info" />
      <Navbar />
      <CheckoutPath activePath={0} />

      <div className="max-w-4xl mx-auto my-12 px-6 sm:px-10 bg-white rounded-3xl shadow-lg">
        <h1 className="text-3xl font-extrabold text-blue-600 text-center py-8">Shipping Details</h1>

        <form onSubmit={shippingInfoSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
          {/* Left Side Inputs */}
          <div className="flex flex-col gap-6">
            <label className="flex flex-col">
              <span className="text-gray-700 font-semibold mb-2">Address</span>
              <input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="rounded-lg border border-gray-300 p-4 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-shadow"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-gray-700 font-semibold mb-2">Pin Code</span>
              <input
                type="number"
                placeholder="Enter your pin code"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                required
                className="rounded-lg border border-gray-300 p-4 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-shadow"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-gray-700 font-semibold mb-2">Phone Number</span>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="rounded-lg border border-gray-300 p-4 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-shadow"
              />
            </label>
          </div>

          {/* Right Side Inputs */}
          <div className="flex flex-col gap-6">
            <label className="flex flex-col">
              <span className="text-gray-700 font-semibold mb-2">Country</span>
              <select
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setState("");
                  setCity("");
                }}
                required
                className="cursor-pointer rounded-lg border border-gray-300 p-4 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-shadow bg-white"
              >
                <option value="">Select a Country</option>
                {Country.getAllCountries().map((item) => (
                  <option value={item.isoCode} key={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>

            {country && (
              <label className="flex flex-col">
                <span className="text-gray-700 font-semibold mb-2">State</span>
                <select
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    setCity("");
                  }}
                  required
                  className="cursor-pointer rounded-lg border border-gray-300 p-4 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-shadow bg-white"
                >
                  <option value="">Select a State</option>
                  {State.getStatesOfCountry(country).map((item) => (
                    <option value={item.isoCode} key={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
            )}

            {state && (
              <label className="flex flex-col">
                <span className="text-gray-700 font-semibold mb-2">City</span>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="cursor-pointer rounded-lg border border-gray-300 p-4 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-shadow bg-white"
                >
                  <option value="">Select a City</option>
                  {City.getCitiesOfState(country, state).map((item) => (
                    <option value={item.name} key={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>

          {/* Full width submit button */}
          <button
            type="submit"
            className="md:col-span-2 py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-800 transition-transform duration-300 hover:-translate-y-1"
          >
            Continue
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Shipping;
