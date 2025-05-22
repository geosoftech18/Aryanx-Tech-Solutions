"use client"
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Star, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const testimonials = [
  {
    name: "Sarah Williams",
    role: "Product Manager, Techify",
    text:
      "JobSphere completely changed the way we hire. The process is smooth, efficient, and helped us connect with top talent globally!",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Sr. Software Engineer",
    text:
      "Found my dream job in just a few clicks! The UI is fantastic and opportunities are curated to my skills.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    name: "Alina Popova",
    role: "HR Lead, Innoworks",
    text:
      "The transparency and global reach of JobSphere sets it apart. Our hiring pipeline is more diverse and productive.",
    avatar: "https://randomuser.me/api/portraits/women/14.jpg",
    rating: 4,
  },
  {
    name: "Lucas Fernández",
    role: "Data Scientist",
    text:
      "A truly modern job platform! Easy to use, lots of support, and better results than anywhere else.",
    avatar: "https://randomuser.me/api/portraits/men/23.jpg",
    rating: 5,
  },
  {
    name: "Emma Thompson",
    role: "UX Designer",
    text: "The platform's intuitive design made job searching a breeze. Found my perfect role in just two weeks!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    text: "JobSphere's matching algorithm is spot-on. It understands exactly what I'm looking for in my next role.",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 5,
  },
  {
    name: "Sophia Rodriguez",
    role: "Software Engineer",
    text: "The application process is streamlined and efficient. No more filling out the same information repeatedly!",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "HR Director",
    text: "As a recruiter, JobSphere has transformed our hiring process. The quality of candidates is outstanding.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 5,
  },
];

const stars = (rating: number) =>
  Array(5)
    .fill(0)
    .map((_, idx) => (
      <Star
        key={idx}
        className={cn(
          "h-4 w-4",
          idx < rating ? "text-yellow-400 fill-yellow-300" : "text-gray-300"
        )}
      />
    ));

function CarouselDots({ api, className }: { api: CarouselApi; className?: string }) {
  const [current, setCurrent] = useState(0);
  const totalSlides = Math.ceil(testimonials.length / 4);

  api?.on("select", () => {
    setCurrent(api.selectedScrollSnap());
  });

  return (
    <div className={cn("flex justify-center gap-2", className)}>
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => api?.scrollTo(index)}
          className={cn(
            "w-2.5 h-2.5 rounded-full transition-all duration-200",
            current === index
              ? "bg-blue-500 dark:bg-blue-400"
              : "bg-blue-200 dark:bg-blue-900/20"
          )}
        />
      ))}
    </div>
  );
}

export default function TestimonialCarousel() {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <section className="w-full max-w-[1400px] mx-auto mt-24 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-slate-900 dark:text-white">
        What People Are Saying
      </h2>
      <div className="relative">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 4,
          }}
          className="w-full"
        >
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <CarouselPrevious className="static translate-y-0 hover:bg-blue-100 dark:hover:bg-blue-900/20" />
          </div>
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem

                key={testimonial.name + index}
                className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 h-full"
              >
                <div className="p-1 h-full">
                  <Card className="bg-white/70 dark:bg-background/70 rounded-2xl shadow-xl border-0 glass-morphism animate-fade-in h-full">
                    <CardContent className="p-8 flex flex-col items-center text-center h-full">
                      <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-5 overflow-hidden shadow-md">
                        {testimonial.avatar ? (
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="object-cover w-16 h-16 rounded-full"
                            width={64}
                            height={64}
                          />
                        ) : (
                          <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                      <div className="flex justify-center mb-3">
                        {stars(testimonial.rating)}
                      </div>
                      <blockquote className="text-lg text-slate-700 dark:text-slate-300 italic mb-4">
                        &quot;{testimonial.text}&quot;
                      </blockquote>
                      <div className="mt-auto">
                        <span className="font-semibold text-blue-900 dark:text-blue-400">
                          {testimonial.name}
                        </span>
                        <span className="block text-slate-500 dark:text-slate-400 text-sm">
                          {testimonial.role}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <CarouselNext className="static translate-y-0 hover:bg-blue-100 dark:hover:bg-blue-900/20" />
          </div>
          <div className="flex justify-center mt-8">
            <CarouselDots api={api} className="gap-2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
