import React, { useEffect, useState } from 'react';
import { auth, db } from '../config/firebase.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        try {
          const ordersQuery = query(
            collection(db, 'order_history'),
            where('userId', '==', user.uid)
          );
          const querySnapshot = await getDocs(ordersQuery);
          const ordersData = [];
          querySnapshot.forEach((doc) => {
            ordersData.push({ id: doc.id, ...doc.data() });
          });
          setOrders(ordersData);
        } catch (error) {
          console.error("Error fetching order history:", error);
        }
      } else {
        setUserId(null);
        setOrders([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        {/* Loading spinner */}
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        {/* Add the following CSS to your global stylesheet or a module: */}
        {/* 
          .loader {
            border-top-color: #3498db;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        */}
      </div>
    );
  }

  if (!userId) {
    return <p className="p-4 text-center">Please log in to see your order history.</p>;
  }

  if (orders.length === 0) {
    return <p className="p-4 text-center">You have no previous orders.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-lg shadow p-4 mb-4">
          <h2 className="font-semibold mb-2">Order ID: {order.id}</h2>
          <p className="mb-2">Ordered on: {new Date(order.timestamp?.seconds * 1000).toLocaleString()}</p>
          <div>
            <h3 className="font-semibold">Products:</h3>
            <ul className="list-disc list-inside">
              {order.items?.map((item, index) => (
                <li key={index}>
                  {item.name} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistoryPage;