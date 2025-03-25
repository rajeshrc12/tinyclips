"use client";

import { useState } from "react";
import Script from "next/script";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data.user);

const ProfilePage = () => {
  const [amount, setAmount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("INR");
  // Fetch user data (email & balance)
  const { data, mutate } = useSWR("/api/user", fetcher);
  const { balance, name, email } = data || {};

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
        body: JSON.stringify({ amount, currency }), // ✅ Removed email & name
      });

      if (!response.ok) throw new Error("Failed to create order");

      const order = await response.json();
      console.log("Order Created:", order);

      openRazorpay(order.id, amount, data.email, data.name);
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setLoading(false);
    }
  };

  const openRazorpay = (orderId: string, amount: number, email: string, name: string) => {
    if (typeof window === "undefined" || !window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: amount * 100,
      currency,
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
    <div className="flex flex-col items-center justify-center">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Wallet Details</h2>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-gray-700">
            <span className="font-medium">👤 Name:</span>
            <span className="text-gray-900 font-semibold">{name || "Loading..."}</span>
          </div>

          <div className="flex items-center justify-between text-gray-700">
            <span className="font-medium">📧 Email:</span>
            <span className="text-gray-900 font-semibold">{email || "Loading..."}</span>
          </div>

          <div className="flex flex-col items-center bg-blue-100 text-blue-700 font-bold text-xl rounded-lg p-4">
            <span>Wallet Balance</span>
            <span className="text-2xl">{balance !== undefined ? `$${balance}` : "Loading..."}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Currency</label>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <div className="mb-4 grow-1">
            <label className="block text-gray-700 font-medium mb-2">Enter Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
        <button
          onClick={createOrder}
          disabled={loading}
          className="w-full px-4 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg transition duration-200 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Pay with Razorpay"}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
