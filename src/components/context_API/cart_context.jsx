import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../config/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const db = getFirestore();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [loadingCart, setLoadingCart] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser);
      setLoadingCart(true);

      if (currentUser) {
        try {
          const docRef = doc(db, "carts", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const items = docSnap.data().items || [];
            console.log("Fetched cart from Firestore:", items);
            setCartItems(items);
          } else {
            console.log("No cart found for user, setting empty cart");
            setCartItems([]);
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
          setCartItems([]);
        }
      } else {
        console.log("User logged out, clearing cart");
        setCartItems([]);
      }

      setLoadingCart(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("cartItems changed:", cartItems, "loadingCart:", loadingCart);
    if (user && !loadingCart) {
      const saveCart = async () => {
        try {
          const cartRef = doc(db, "carts", user.uid);
          await setDoc(cartRef, { items: cartItems });
          console.log("Cart saved to Firestore:", cartItems);
        } catch (error) {
          console.error("Error saving cart:", error);
        }
      };
      saveCart();
    }
  }, [cartItems, user, loadingCart]);

  const addToCart = (product) => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      alert("This product is already in your cart!");
      return;
    }

    setCartItems((prevItems) => [
      ...prevItems,
      { ...product, quantity: 1 },
    ]);
  };

  const cartCount = cartItems.length;

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, cartCount, setCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
