
import { Card, CardContent } from "@/components/ui/card";
import { Users, Globe, HelpCircle } from "lucide-react";
import TestimonialCarousel from "@/components/about/aboutTestimonial";
import AboutShowcase from "@/components/about/aboutShowcase";

const About = () => {
  return (
    <div className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10" />

        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight lg:text-5xl">
              About JobSphere
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Connecting talented professionals with leading employers worldwide, making job search and recruitment simpler and more effective.
            </p>
          </div>

          {/* New Showcase Section */}
          <AboutShowcase />

          {/* Mission and Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <Card className="transform transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-slate-900">Our Mission</h3>
                  <p className="text-slate-600 leading-relaxed">
                    To revolutionize the way people find their dream jobs and help companies discover exceptional talent.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="transform transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                    <Globe className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-slate-900">Global Reach</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Operating worldwide to connect talent with opportunities across borders and cultures.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="transform transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                    <HelpCircle className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-slate-900">Our Values</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Built on transparency, innovation, and a commitment to excellence in everything we do.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <div className="grid md:grid-cols-4 gap-12 text-center">
              <div className="transform transition-all duration-300 hover:scale-110">
                <div className="text-4xl font-bold mb-3">500K+</div>
                <div className="text-blue-100 font-medium">Active Users</div>
              </div>
              <div className="transform transition-all duration-300 hover:scale-110">
                <div className="text-4xl font-bold mb-3">10K+</div>
                <div className="text-blue-100 font-medium">Companies</div>
              </div>
              <div className="transform transition-all duration-300 hover:scale-110">
                <div className="text-4xl font-bold mb-3">1M+</div>
                <div className="text-blue-100 font-medium">Jobs Posted</div>
              </div>
              <div className="transform transition-all duration-300 hover:scale-110">
                <div className="text-4xl font-bold mb-3">50+</div>
                <div className="text-blue-100 font-medium">Countries</div>
              </div>
            </div>
          </div>
          <TestimonialCarousel />
        </div>
      </div>
  );
};

export default About;
