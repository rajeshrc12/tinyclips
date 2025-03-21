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

const formSchema = z.object({
  prompt: z.string().min(5, "Prompt must be at least 5 characters"),
  imageStyle: z.string().min(3, "Image style must be at least 3 characters"),
  voiceName: z.enum(["Alice", "Bob", "Charlie"]),
  voiceSpeed: z.number().min(0.7, "Speed must be at least 0.7").max(5, "Speed must be at most 5"),
});

export default function UserInput() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { voiceSpeed: 1, imageStyle: "" }, // Ensure a default value
  });
  const [submittedData, setSubmittedData] = useState(null);

  const onSubmit = (data) => {
    setSubmittedData(data);
    console.log("Form Submitted", data);
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
                <FormControl>
                  <Input {...field} className="w-full" />
                </FormControl>
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
                    <SelectItem value="Alice">Alice</SelectItem>
                    <SelectItem value="Bob">Bob</SelectItem>
                    <SelectItem value="Charlie">Charlie</SelectItem>
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

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>

      {submittedData && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="font-semibold">Submitted Data:</h3>
          <pre className="text-sm">{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
