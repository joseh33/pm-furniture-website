import React, { useEffect } from "react";
import { useCart } from "../components/context_API/cart_context.jsx";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../config/firebase.js";
import { getAuth } from "firebase/auth";

const CartPage = () => {
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();
  const authInstance = getAuth();

  // === CONSTANTS ===
  const RECEIPT_HEADER = "🧾 RECEIPT\n\n";
  const BANK_INFO = `Payment Details:
• Mpesa Number: 0741371095.
• Paybill: 522522
• Account No: 1336193239
• Bank Name: Cooperative Bank
• Total Payable:`;

  const WHATSAPP_NUMBER = "+254768453840";
  const EMAIL_ADDRESS = "petermuema555@gmail.com";

  useEffect(() => {
    const user = authInstance.currentUser;
    if (user) {
      const userCartRef = doc(db, "carts", user.uid);
      setDoc(userCartRef, { items: cartItems }, { merge: true });
    }
  }, [cartItems]);

  const saveOrderToHistory = async () => {
    const user = authInstance.currentUser;
    if (!user) {
      alert("You need to be logged in to place an order.");
      return false;
    }
    try {
      await addDoc(collection(db, "order_history"), {
        userId: user.uid,
        items: cartItems,
        timestamp: serverTimestamp(),
        total: calculateTotal(),
      });
      return true;
    } catch (error) {
      console.error("Failed to save order history:", error);
      alert("Failed to save order. Please try again.");
      return false;
    }
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleDecrement = (id, quantity) => {
    if (quantity === 1) {
      handleRemoveItem(id);
    } else {
      handleQuantityChange(id, quantity - 1);
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold mb-4">Your Shopping Cart</h2>

        <div className="space-y-6">
          {cartItems.length === 0 ? (
            <p>Your cart is empty!</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap justify-between items-center p-4 border-b space-y-4 sm:space-y-0 sm:flex-row"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover mx-auto sm:mx-0"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Price: ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDecrement(item.id, item.quantity)}
                      className="bg-gray-300 text-gray-600 px-2 py-1 rounded-md"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.id,
                          parseInt(e.target.value, 10)
                        )
                      }
                      className="w-12 text-center mx-2 border rounded-md"
                      min="1"
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="bg-gray-300 text-gray-600 px-2 py-1 rounded-md"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-semibold text-lg mt-2 sm:mt-0">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-800 mt-2 sm:mt-0"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <p>Total Price:</p>
              <p>${calculateTotal()}</p>
            </div>
            <div className="mt-4 space-y-4">
              <button
                onClick={() => navigate(-1)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-600 py-3 rounded-md"
              >
                Continue Shopping
              </button>

              <button
                onClick={async () => {
                  const success = await saveOrderToHistory();
                  if (!success) return;

                  const orderDetails = cartItems
                    .map(
                      (item) =>
                        `• ${item.name}\n  Qty: ${item.quantity}\n  Price: $${(
                          item.price * item.quantity
                        ).toFixed(2)}\n  Image: ${item.image}`
                    )
                    .join("\n\n");

                  const total = calculateTotal();
                  const fullMessage = encodeURIComponent(
                    `${RECEIPT_HEADER}${orderDetails}\n\n${BANK_INFO} $${total}`
                  );

                  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${fullMessage}`, "_blank");
                }}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md"
              >
                Order via WhatsApp
              </button>

              <button
                onClick={async () => {
                  const success = await saveOrderToHistory();
                  if (!success) return;

                  const orderDetails = cartItems
                    .map(
                      (item) =>
                        `• ${item.name}\n  Qty: ${item.quantity}\n  Price: $${(
                          item.price * item.quantity
                        ).toFixed(2)}\n  Image: ${item.image}`
                    )
                    .join("\n\n");

                  const total = calculateTotal();
                  const subject = encodeURIComponent("Furniture Order Receipt");
                  const body = encodeURIComponent(
                    `${RECEIPT_HEADER}${orderDetails}\n\n${BANK_INFO} $${total}`
                  );

                  window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`;
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md"
              >
                Order with Email
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
