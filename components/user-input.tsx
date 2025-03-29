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
import useSWR from "swr";
import { IMAGE_STYLES } from "@/constants/imageStyles";
import { VOICE_NAMES } from "@/constants/voiceNames";
import { toast } from "sonner";
import { fetcher } from "@/utils/api";

interface UserInputProps {
  handleImageStyle: (style: string) => void;
}

const IMAGE_PRICE = parseFloat(process.env.NEXT_PUBLIC_IMAGE_PRICE!);

const UserInput: React.FC<UserInputProps> = ({ handleImageStyle }) => {
  const router = useRouter();
  const { data } = useSWR("/api/dashboard/user", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0, // No polling
  });
  const { balance } = data || {};
  const formSchema = z.object({
    prompt: z
      .string()
      .min(40, "Prompt must be at least 40 characters") // ✅ Step 1: Min 40 chars
      .max(500, "Prompt must be at most 500 characters") // ✅ Step 3: Max 500 chars
      .superRefine((prompt, ctx) => {
        const cost = (prompt.length / 40) * IMAGE_PRICE; // ✅ Step 2: Cost calculation
        if (balance - cost < 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Insufficient balance for this prompt. Please add funds.",
          });
        }
      }),
    imageStyle: z.enum(Object.keys(IMAGE_STYLES) as [keyof typeof IMAGE_STYLES]),
    voiceName: z.enum(Object.keys(VOICE_NAMES) as [keyof typeof VOICE_NAMES]),
    voiceSpeed: z.number().min(0.7, "Speed must be at least 0.7").max(2, "Speed must be at most 2"),
  });
  const isBalanceEmpty = balance < IMAGE_PRICE;
  const defaultValues = {
    prompt: "",
    imageStyle: "hyper" as keyof typeof IMAGE_STYLES, // or set a default style
    voiceName: "am_adam" as keyof typeof VOICE_NAMES, // or set a default voice
    voiceSpeed: 1,
  };
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true); // Set loading state
    try {
      // Make the API call using Axios
      const response = await axios.post("/api/dashboard/video", data);

      if (response.status === 201) {
        toast("Video creation added in queue");
        router.push("/dashboard/video");
      } else {
        console.log("Unexpected response from server");
      }
    } catch (err) {
      // Handle error, show error toast
      console.error("Error during submission", err);
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  return (
    <div className="max-w-[30vw] mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Prompt</FormLabel>
                <FormControl>
                  <Textarea {...field} disabled={isBalanceEmpty || isSubmitting} className="h-32 resize-none border-gray-300 focus:ring-2 focus:ring-orange-500 rounded-lg" />
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
                <Select
                  defaultValue={"hyper"}
                  disabled={isBalanceEmpty || isSubmitting}
                  onValueChange={(e) => {
                    handleImageStyle(e);
                    field.onChange(e);
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-orange-500 rounded-lg">
                      <SelectValue placeholder="Select an image style" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white shadow-lg border-gray-200 rounded-md">
                    {Object.entries(IMAGE_STYLES).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
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
                <Select disabled={isBalanceEmpty || isSubmitting} onValueChange={field.onChange} defaultValue={"am_adam"}>
                  <FormControl>
                    <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-orange-500 rounded-lg">
                      <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white shadow-lg border-gray-200 rounded-md">
                    {Object.entries(VOICE_NAMES).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
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
                    disabled={isBalanceEmpty || isSubmitting}
                    type="number"
                    step="0.1"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 1)}
                    className="w-full border-gray-300 focus:ring-2 focus:ring-orange-500 rounded-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isBalanceEmpty ? (
            <Button
              onClick={(e) => {
                e.preventDefault();
                router.push("/dashboard/overview");
              }}
              className="sticky bottom-0 left-0 w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Add balance
            </Button>
          ) : (
            <Button
              type="submit"
              className="sticky bottom-0 left-0 w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? <div className="flex justify-center items-center">Submitting...</div> : "Submit"}
            </Button>
          )}
        </form>
      </Form>
      {isBalanceEmpty && <p className="text-red-500 font-bold text-sm mt-2">You have Insufficient balance. Please add funds to proceed.</p>}
    </div>
  );
};

export default UserInput;
