import { fetchHomepage, HomepageData } from "@/actions/static/fetch-homepage";
import BusinessImpactSection from "@/components/home/business-impact";
import FeatureSlider from "@/components/home/feature-slider";
import PartnersCarousel from "@/components/home/partner-carousel";
import CategoryCard from "@/components/jobs/CategoryCard";
import JobCard from "@/components/jobs/JobCard";
import SearchBar from "@/components/jobs/SearchBar";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Search,
  Users
} from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  const { homepage, featuredJobs, jobCategories }:HomepageData = await fetchHomepage()


  return (
    <div>
      {/* Hero Section */}
      <FeatureSlider slides={homepage?.featureSlides || []} />
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-600">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl mb-8 text-gray-600">
              Connect with thousands of employers and take the next step in your
              career.
            </p>

            <SearchBar />

            <div className="mt-6 text-sm text-blue-100 flex flex-wrap justify-center gap-4">
              <span>Popular searches:</span>
              <Link href="/jobs?q=developer" className="hover:text-white">
                Developer
              </Link>
              <Link href="/jobs?q=marketing" className="hover:text-white">
                Marketing
              </Link>
              <Link href="/jobs?q=remote" className="hover:text-white">
                Remote
              </Link>
              <Link href="/jobs?q=part-time" className="hover:text-white">
                Part-time
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{homepage?.categoryTitle}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {homepage?.categorySubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:mx-20">
            {jobCategories.map((category) => (
              <CategoryCard 
                key={category.category} 
                category={{
                  id: category.category,
                  title: category.category.replace(/_/g, ' '),
                  count: category.count,
                  icon: getCategoryIcon(category.category)
                }} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10 md:mx-20">
            <h2 className="text-3xl font-bold">Featured Jobs</h2>
            <Link
              href="/jobs"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View all jobs →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:mx-20">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>
      <PartnersCarousel partners={homepage?.partner || []} title={homepage?.partnerTitle || ""} subtitle={homepage?.partnerSubtitle || ""} />
      <BusinessImpactSection stats={homepage?.stats || []} title={homepage?.statsTitle || ""} subtitle={homepage?.statsSubtitle || ""} />

      {/* How It Works Section */}
      <section className="py-16 bg-slate-50 px-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{homepage?.stepsTitle}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {homepage?.stepsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{homepage?.steps[0].title}</h3>
              <p className="text-slate-600">
                {homepage?.steps[0].description}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{homepage?.steps[1].title}</h3>
              <p className="text-slate-600">
                {homepage?.steps[1].description}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{homepage?.steps[2].title}</h3>
              <p className="text-slate-600">
                {homepage?.steps[2].description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white  py-16 px-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              {homepage?.cta[0].title}
            </h2>
            <p className="text-xl mb-8">
              {homepage?.cta[0].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={homepage?.cta[0].button1Link || ""}>
                <Button
                  variant="default"
                  size="lg"
                  className="bg-white text-indigo-600 hover:bg-gray-100"
                >
                  {homepage?.cta[0].button1Text}
                </Button>
              </Link>
              <Link href={homepage?.cta[0].button2Link || ""}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-indigo-600 hover:text-white hover:bg-white/10"
                >
                  {homepage?.cta[0].button2Text}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function getCategoryIcon(category: string): string {
  const iconMap: Record<string, string> = {
    SOFTWARE_DEVELOPMENT: "laptop-code",
    DESIGN: "palette",
    MARKETING: "megaphone",
    SALES: "trending-up",
    FINANCE: "dollar-sign",
    HR: "users",
    OTHER: "briefcase"
  };
  return iconMap[category] || "briefcase";
}
