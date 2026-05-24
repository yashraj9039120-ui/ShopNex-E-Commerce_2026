import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addItemsToCart,
  removeErrors,
  removeItemFromCart,
  removeMessage,
} from "../../redux/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const CartItem = ({ item }) => {
  const { success, loading, error, message } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);

  // --- Quantity Handlers ---
  const decreaseQuantity = () => {
    if (quantity <= 1) {
      toast.error("Quantity cannot be less than 1", { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
      return;
    }
    setQuantity((qty) => qty - 1);
  };

  const increaseQuantity = () => {
    if (item.stock <= quantity) {
      toast.error("Cannot exceed available stock!", { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
      return;
    }
    setQuantity((qty) => qty + 1);
  };

  const handleUpdate = () => {
    if (loading) return;
    if (quantity !== item.quantity) {
      dispatch(addItemsToCart({ id: item.product, quantity }));
    }
  };

  const handleRemove = () => {
    if (loading) return;
    dispatch(removeItemFromCart(item.product));
    toast.success("Item removed from cart successfully", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  // --- Side Effects ---
  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success(message, {
        position: "top-center",
        autoClose: 3000,
        toastId: "cart-update",
      });
      dispatch(removeMessage());
    }
  }, [dispatch, success, message]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_0.8fr] items-center gap-4 p-4 border-b border-gray-200">
      {/* Product Info */}
      <div className="flex items-center gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-md border"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{item.name}</h3>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Price:</span> ₹{item.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Quantity:</span> {item.quantity}
          </p>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={decreaseQuantity}
          disabled={loading}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded-md font-semibold"
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          readOnly
          min="1"
          className="w-14 text-center border rounded-md py-1"
        />
        <button
          onClick={increaseQuantity}
          disabled={loading}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded-md font-semibold"
        >
          +
        </button>
      </div>

      {/* Item Total */}
      <div className="text-center font-semibold text-gray-800">
        ₹{(item.price * item.quantity).toFixed(2)}
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-2 justify-center">
        <button
          onClick={handleUpdate}
          disabled={loading || quantity === item.quantity}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update"}
        </button>
        <button
          onClick={handleRemove}
          disabled={loading}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition disabled:opacity-50"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
