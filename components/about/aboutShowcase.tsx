"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUp, BadgePercent, Star } from "lucide-react";
import Image from "next/image";

// Placeholder avatars
const avatars = [
  "https://randomuser.me/api/portraits/women/10.jpg",
  "https://randomuser.me/api/portraits/men/11.jpg",
  "https://randomuser.me/api/portraits/women/12.jpg",
  "https://randomuser.me/api/portraits/men/13.jpg",
];

// Reference the provided site upload
// const mainImage = "/lovable-uploads/fd499cf7-de94-4c24-982b-fa1be8048c8b.png";

export default function AboutShowcase() {
  return (
    <section className="w-full my-10 md:my-20">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT: CARD WITH IMAGE + METRICS */}
        <div className="relative w-full col-span-1 flex flex-col items-center md:items-start">
          {/* "JobSphere" styled metrics card */}
          <Card className="w-full bg-white/80 dark:bg-background/80 shadow-xl border-0 glass-morphism">
            <CardContent className="p-7 md:p-8 flex flex-col gap-5">
              {/* Top: Small Badge and arrow */}
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 px-3 py-1 text-xs font-medium flex items-center gap-1">
                  <BadgePercent className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  98% Success
                </span>
                <ArrowUp className="w-4 h-4 text-green-500" />
              </div>
              {/* Metric number */}
              <div className="text-4xl font-extrabold tracking-tight text-foreground mb-2">
                1M+
              </div>
              <div className="text-muted-foreground font-medium text-sm mb-2">
                Career Matches
              </div>
              {/* Avatars row */}
              <div className="flex items-center gap-1 mt-2 mb-4">
                {avatars.map((url, i) => (
                  <Image
                    key={url}
                    src={url}
                    alt={`User avatar ${i + 1}`}
                    className="w-8 h-8 object-cover rounded-full border-2 border-background shadow -ml-2 first:ml-0"
                    style={{
                      zIndex: avatars.length - i,
                      boxShadow: "0 0 0 2px #fff",
                    }}
                    width={32}
                    height={32}
                  />
                ))}
                <span className="ml-2 text-xs text-muted-foreground">
                  +500k joined
                </span>
              </div>
              {/* Rating row */}
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-0.5">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-300" />
                  <span className="text-sm font-bold text-foreground ml-1">
                    4.9/5
                  </span>
                </div>
                <div className="flex -space-x-2">
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i} className="text-lg">
                        🤩
                      </span>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col col-span-1 gap-4 md:gap-6 mt-4 md:mt-0">
          <div className="uppercase tracking-wide text-xs font-bold text-orange-600 dark:text-orange-400 mb-1">
            A bit
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-foreground mb-2">
            About Us
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3 md:text-lg">
            We&apos;re on a mission to empower job seekers and employers around the
            world with tools, transparency, and unmatched support. Every success
            story inspires us to connect more dreamers with their dream jobs.
          </p>
          <Button
            size="lg"
            className={cn(
              "mt-3 bg-orange-500 hover:bg-orange-600 text-white px-7 py-4 text-base font-bold shadow-lg rounded-full max-w-xs",
              "dark:bg-orange-600 dark:hover:bg-orange-700"
            )}
          >
            Explore Opportunities
          </Button>
        </div>
      </div>
    </section>
  );
}
