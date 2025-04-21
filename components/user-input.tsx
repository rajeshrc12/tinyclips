"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
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
import Loader from "./loader";
import AudioPlayer from "./audio-player";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { VoiceName } from "@/types/user-input";
import Image from "next/image";

interface UserInputProps {
  handleImageStyle: (style: string) => void;
}

const IMAGE_PRICE = parseFloat(process.env.NEXT_PUBLIC_IMAGE_PRICE!);

const UserInput: React.FC<UserInputProps> = ({ handleImageStyle }) => {
  const [imageLoading, setImageLoading] = useState(true);

  const [globalAudio, setGlobalAudio] = useState<HTMLAudioElement | null>(null);
  const router = useRouter();
  const { data } = useSWR("/api/dashboard/user", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0, // No polling
  });
  const balance = Number(data?.balance);
  const formSchema = z.object({
    prompt: z
      .string()
      .min(40, "Script must be at least 40 characters") // ✅ Step 1: Min 40 chars
      .max(500, "Script must be at most 500 characters") // ✅ Step 3: Max 500 chars
      .superRefine((prompt, ctx) => {
        const cost = (prompt.length / 40) * IMAGE_PRICE; // ✅ Step 2: Cost calculation
        if (balance - cost < 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Insufficient balance for this script. Please add funds or make script short",
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
    voiceSpeed: 0.9,
  };
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    form.reset(defaultValues);
    setIsSubmitting(true); // Set loading state
    try {
      // Make the API call using Axios
      const response = await axios.post("/api/dashboard/video", data);

      if (response.status === 201) {
        toast.success("Your video has been added to the queue and will be ready in about 1-2 minutes.");
        router.push("/dashboard/video");
      } else {
        toast.error("Unexpected response from server");
      }
    } catch (error) {
      // Ensure it's an Axios error
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || "Something went wrong!";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred.");
      }
      setIsSubmitting(false); // Reset loading state
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setGlobalAudio(new Audio());
    }
  }, []);
  if (typeof balance !== "number") return <Loader />;
  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Script</FormLabel>
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
                    setImageLoading(true);
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
          <div className="md:hidden w-full flex justify-center items-center relative p-4">
            {imageLoading && <Loader />}
            <div className={`relative w-auto h-[200px] flex-1 ${imageLoading ? "opacity-0" : "opacity-100 transition-opacity"}`}>
              <Image unoptimized priority src={`/images/styles/${form.getValues("imageStyle")}.png`} alt="Thumbnail" fill className="object-contain" onLoad={() => setImageLoading(false)} />
            </div>
          </div>
          <FormField
            control={form.control}
            name="voiceName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Voice Name</FormLabel>
                <Popover>
                  <PopoverTrigger className="w-full flex justify-start" asChild>
                    <Button disabled={isBalanceEmpty || isSubmitting} className="font-normal" variant="outline">
                      {VOICE_NAMES[field.value as VoiceName] || "Select a voice"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent side="bottom" align="start" className="p-0 m-0 h-[30vh] overflow-y-scroll" alignOffset={0}>
                    {Object.entries(VOICE_NAMES).map(([key, label]) => (
                      <div
                        key={key}
                        className="flex hover:bg-gray-100 cursor-pointer items-center py-1"
                        onClick={() => field.onChange(key)} // Directly update the form value
                      >
                        <AudioPlayer
                          voiceKey={key}
                          globalAudio={globalAudio}
                          currentPlayingVoice={field.value} // Use field.value instead of separate state
                          setCurrentPlayingVoice={field.onChange} // Ensure consistency
                        />
                        <div className="ml-2">{label}</div>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
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
              className="md:sticky bottom-0 left-0 w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Add balance
            </Button>
          ) : (
            <Button
              type="submit"
              className="md:sticky bottom-0 left-0 w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? <div className="flex justify-center items-center">Submitting...</div> : "Submit"}
            </Button>
          )}
        </form>
      </Form>
      {isBalanceEmpty && <p className="text-red-500 font-bold text-sm mt-2">You have Insufficient balance. Please add funds to proceed or make script short</p>}
    </div>
  );
};

export default UserInput;
