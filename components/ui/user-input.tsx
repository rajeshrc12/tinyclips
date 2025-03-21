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
import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
const formSchema = z.object({
  prompt: z.string().min(5, "Prompt must be at least 5 characters"),
  imageStyle: z.enum(["Hyper-realistic", "Anime", "Cartoon"]),
  voiceName: z.enum(["af_alloy", "am_adam", "am_fenrir"]),
  voiceSpeed: z.number().min(0.7, "Speed must be at least 0.7").max(5, "Speed must be at most 5"),
});

export default function UserInput() {
  // const router = useRouter();
  const { data: session } = useSession();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { voiceSpeed: 1 }, // Ensure a default value
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true); // Set loading state

    try {
      // Make the API call using Axios
      const response = await axios.post("/api/video", { ...data, email: session?.user?.email });

      if (response.status === 201) {
        console.clear();
        console.log(response.data);
        // router.push("/videos"); // Redirect to videos page
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
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Generate Voice & Image</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prompt</FormLabel>
                <FormControl>
                  <Textarea {...field} className="w-full" />
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
                <FormLabel>Image Style</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a image style" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
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
                <FormLabel>Voice Name</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
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
                <FormLabel>Voice Speed</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value) || 1)} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex justify-center items-center">
                <div className="spinner-border animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-blue-600 rounded-full"></div>
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
}
