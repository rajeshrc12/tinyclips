"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import { data } from "@/public/data";

const CLOUDFARE_R2_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_CLOUDFARE_R2_PUBLIC_BASE_URL!;

export default function ImageCarousel() {
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={2} // Default: 2 images visible on small screens
      breakpoints={{
        640: { slidesPerView: 2 }, // Tablets
        768: { slidesPerView: 3 }, // Small Laptops
        1024: { slidesPerView: 4 }, // Desktops
      }}
      spaceBetween={10} // Smaller gap for mobile
      loop={true}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      speed={2000}
      className="w-[90vw]"
    >
      {data.map((id, index) => (
        <SwiperSlide key={index} className="relative h-32 md:h-40 lg:h-48 rounded">
          <Link href={`/video/${id}`} className="relative block h-full">
            <div className="relative h-full">
              <Image src={`${CLOUDFARE_R2_PUBLIC_BASE_URL}/image/${id}.png`} alt={`Slide ${index}`} height={600} width={300} priority={index < 3} />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center transition">
                <FaPlay className="text-white text-3xl md:text-4xl lg:text-5xl opacity-100 transition" />
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
