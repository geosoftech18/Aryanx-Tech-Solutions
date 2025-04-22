import HeroCarousal from "@/components/hero";
import HeroBanner from "@/components/jobFilter";
import Partners from "@/components/partners";
import HomePageData from "@/data/homepage.json"
export default function Home() {
  const HeroCarousalItem = HomePageData.HeroCarousalItem
  return (
    <div className="flex flex-col gap-20">
      <HeroCarousal HeroItems={HeroCarousalItem}/>
      <HeroBanner/>
      <Partners/>
    </div>
  );
}
