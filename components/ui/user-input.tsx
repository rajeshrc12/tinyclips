"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import axios from "axios";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  prompt: z.string().min(5, "Prompt must be at least 5 characters"),
  imageStyle: z.enum(["Hyper-realistic", "Anime", "Cartoon"]),
  voiceName: z.enum(["af_alloy", "am_adam", "am_fenrir"]),
  voiceSpeed: z.number().min(0.7, "Speed must be at least 0.7").max(5, "Speed must be at most 5"),
});

const UserInput = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { voiceSpeed: 1 }, // Ensure a default
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true); // Set loading state

    try {
      // Make the API call using Axios
      const response = await axios.post("/api/video", data);

      if (response.status === 201) {
        console.log(response.data);
        router.push("/video"); // Redirect to videos page
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (err) {
      // Handle error, show error toast
      console.error("Error during submission", err);
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white border border-gray-200 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Generate Voice & Image</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Prompt</FormLabel>
                <FormControl>
                  <Textarea {...field} className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Image Style</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg">
                      <SelectValue placeholder="Select an image style" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white shadow-lg border-gray-200 rounded-md">
                    <SelectItem value="Hyper-realistic">Hyper-realistic</SelectItem>
                    <SelectItem value="Anime">Anime</SelectItem>
                    <SelectItem value="Cartoon">Cartoon</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="voiceName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Voice Name</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg">
                      <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white shadow-lg border-gray-200 rounded-md">
                    <SelectItem value="af_alloy">af_alloy</SelectItem>
                    <SelectItem value="am_adam">am_adam</SelectItem>
                    <SelectItem value="am_fenrir">am_fenrir</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="voiceSpeed"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Voice Speed</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 1)}
                    className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex justify-center items-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Submitting...
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserInput;
