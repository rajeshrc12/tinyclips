"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Script from "next/script";
import axios from "axios";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const formSchema = z
  .object({
    amount: z.number().min(1, "Amount must be at least 1"),
    currency: z.enum(["INR", "USD"]),
  })
  .refine(
    (data) => {
      if (data.currency === "INR") {
        return data.amount >= 10;
      }
      return true;
    },
    {
      message: "Amount must be at least 10 for INR",
      path: ["amount"],
    }
  );

type PaymentFormValues = z.infer<typeof formSchema>;

const Payment = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      currency: undefined,
    },
  });

  //   Watch currency changes to update validation
  const selectedCurrency = form.watch("currency");
  const selectedAmount = form.watch("amount");

  useEffect(() => {
    // Trigger validation when currency changes
    if (selectedCurrency && selectedAmount) {
      form.trigger("amount");
      form.trigger("currency");
    }
  }, [selectedCurrency, form, selectedAmount]);

  const onSubmit = async (userData: PaymentFormValues) => {
    setLoading(true);
    try {
      const {
        data: { user, order },
      } = await axios.post("/api/dashboard/order", {
        amount: userData.amount,
        currency: userData.currency,
      });
      console.log("Order Created:", order);
      openRazorpay(order.id, userData.amount, user.email, user.name);
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
      currency: form.getValues("currency"),
      name: "Tinyclips Topup",
      description: "Tinyclips Topup",
      order_id: orderId,
      handler: () => {
        toast("Payment Successful");
      },
      prefill: { name, email },
      theme: { color: "#3399cc" },
      modal: {
        escape: false,
        ondismiss: () => toast("Payment cancelled"),
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="flex flex-col">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      <div className="p-8 w-full max-w-xs">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Currency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="INR">INR</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Add balance"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Payment;
