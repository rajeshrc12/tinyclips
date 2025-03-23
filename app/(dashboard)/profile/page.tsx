"use client";

import { useState } from "react";
import Script from "next/script";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data.user);

const ProfilePage = () => {
  const [amount, setAmount] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch user data (email & balance)
  const { data, mutate } = useSWR("/api/user", fetcher);
  const { balance } = data || {};

  const createOrder = async () => {
    setLoading(true);
    try {
      if (!data) {
        console.log("User not found");
        return;
      }

      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }), // ✅ Removed email & name
      });

      if (!response.ok) throw new Error("Failed to create order");

      const order = await response.json();
      console.log("Order Created:", order);

      openRazorpay(order.id, amount, data.email, data.name);
    } catch (error) {
      console.error("Error creating order:", error);
    }
    setLoading(false);
  };

  const openRazorpay = (orderId: string, amount: number, email: string, name: string) => {
    if (typeof window === "undefined" || !window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: amount * 100,
      currency: "INR",
      name: "Tinyclips Topup",
      description: "Tinyclips Topup",
      order_id: orderId,
      handler: (response: RazorpayPaymentResponse) => {
        console.log("Payment Successful", response);
        mutate(); // Refresh balance after successful payment
      },
      prefill: { name, email },
      theme: { color: "#3399cc" },
      modal: { escape: false, ondismiss: () => console.warn("❌ Payment Cancelled by User") },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Wallet Balance</h2>
        <div className="text-2xl font-bold text-blue-600 text-center bg-blue-100 rounded-lg p-3 mb-6">{balance !== undefined ? `₹${balance}` : "Loading..."}</div>

        <label className="block text-gray-700 font-medium mb-2">Enter Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
        />

        <button
          onClick={createOrder}
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg transition-all duration-200 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Order..." : "Pay with Razorpay"}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
