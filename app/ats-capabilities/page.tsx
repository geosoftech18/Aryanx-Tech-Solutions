"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AnimatedStat } from "@/components/animated-stat"
import {
  Users,
  Building2,
  Briefcase,
  Heart,
  Globe,
  BarChart3,
  Layers,
  UserCheck,
  BriefcaseBusiness,
  Clock,
  Search,
  Users2,
  Building,
  Banknote,
  Stethoscope,
  ShoppingCart,
  Factory,
  Truck,
  Coffee,
  LineChart,
  Map,
  Award,
  BarChart4,
  Brain,
  Workflow,
  CheckCircle2,
  Sparkles,
} from "lucide-react"

export default function ATSCapabilities() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center space-x-2">
                  <Badge className="px-3 py-1 text-sm bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                    Our Capabilities
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    ATS Capabilities
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    With Aryanx Tech Solutions, technology meets human expertise — delivering smarter, faster, and more
                    inclusive recruitment solutions.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="gap-1">
                    <Briefcase className="h-4 w-4" />
                    Explore Services
                  </Button>
                  <Button variant="outline" size="lg" className="gap-1">
                    <UserCheck className="h-4 w-4" />
                    Contact Us
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[300px] md:h-[400px]">
                  <Image
                    src="/images/ats-hero.png"
                    alt="ATS Capabilities"
                    fill
                    className="object-cover rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-[800px] text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Full-Service Recruitment & Staffing Partner
              </h2>
              <p className="text-muted-foreground md:text-lg leading-relaxed">
                At Aryanx Tech Solutions Private Limited, we are a full-service recruitment and staffing partner,
                delivering scalable, agile, and people-centric workforce solutions to businesses of all sizes. Our
                strength lies in connecting the right talent with the right opportunities through a combination of
                industry expertise, technology-driven processes, and a commitment to diversity, equity, inclusion, and
                belonging (DEIB).
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="flex flex-col items-center text-center space-y-2 group">
                <div className="p-3 rounded-full bg-blue-100 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:bg-blue-200 group-active:bg-blue-300 group-active:shadow-[0_0_20px_rgba(59,130,246,0.7)]">
                  <Building2 className="h-6 w-6 text-blue-700 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="font-medium">Full-Service</h3>
                <p className="text-sm text-muted-foreground">End-to-end recruitment solutions</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 group">
                <div className="p-3 rounded-full bg-green-100 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] group-hover:bg-green-200 group-active:bg-green-300 group-active:shadow-[0_0_20px_rgba(34,197,94,0.7)]">
                  <Workflow className="h-6 w-6 text-green-700 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="font-medium">Scalable</h3>
                <p className="text-sm text-muted-foreground">Solutions for businesses of all sizes</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 group">
                <div className="p-3 rounded-full bg-purple-100 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] group-hover:bg-purple-200 group-active:bg-purple-300 group-active:shadow-[0_0_20px_rgba(168,85,247,0.7)]">
                  <Brain className="h-6 w-6 text-purple-700 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="font-medium">Technology-Driven</h3>
                <p className="text-sm text-muted-foreground">AI-powered recruitment processes</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 group">
                <div className="p-3 rounded-full bg-orange-100 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.5)] group-hover:bg-orange-200 group-active:bg-orange-300 group-active:shadow-[0_0_20px_rgba(249,115,22,0.7)]">
                  <Globe className="h-6 w-6 text-orange-700 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="font-medium">Inclusive</h3>
                <p className="text-sm text-muted-foreground">Commitment to diversity & inclusion</p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-blue-50/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <Badge className="mb-4 px-3 py-1 text-sm bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                Our Core Capabilities
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Comprehensive Recruitment Solutions</h2>
              <p className="mt-4 text-muted-foreground md:text-lg max-w-[800px] mx-auto">
                Our comprehensive suite of recruitment services is designed to meet the diverse needs of businesses
                across industries and scales.
              </p>
            </div>

            <Tabs defaultValue="recruitment" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
                <TabsTrigger value="recruitment" className="py-3 data-[state=active]:bg-blue-50">
                  <div className="flex flex-col items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    <span className="text-xs">Recruitment</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="diversity" className="py-3 data-[state=active]:bg-blue-50">
                  <div className="flex flex-col items-center gap-1">
                    <Globe className="h-4 w-4" />
                    <span className="text-xs">Diversity</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="technology" className="py-3 data-[state=active]:bg-blue-50">
                  <div className="flex flex-col items-center gap-1">
                    <BarChart3 className="h-4 w-4" />
                    <span className="text-xs">Technology</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="industry" className="py-3 data-[state=active]:bg-blue-50">
                  <div className="flex flex-col items-center gap-1">
                    <Building className="h-4 w-4" />
                    <span className="text-xs">Industries</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="value" className="py-3 data-[state=active]:bg-blue-50">
                  <div className="flex flex-col items-center gap-1">
                    <Layers className="h-4 w-4" />
                    <span className="text-xs">Value-Added</span>
                  </div>
                </TabsTrigger>
              </TabsList>

              <div className="mt-6 p-6 bg-white rounded-lg shadow-sm border">
                <TabsContent value="recruitment" className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-100">
                      <Briefcase className="h-5 w-5 text-blue-700" />
                    </div>
                    <h3 className="text-xl font-semibold">Recruitment Services</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex gap-3 p-4 rounded-lg border hover:bg-blue-50 transition-colors">
                      <div className="mt-1">
                        <BriefcaseBusiness className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Permanent Hiring</h4>
                        <p className="text-sm text-muted-foreground">
                          End-to-end recruitment for full-time roles across IT, Non-IT, BFSI, healthcare, manufacturing,
                          retail, and more.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 p-4 rounded-lg border hover:bg-blue-50 transition-colors">
                      <div className="mt-1">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Contract & Temporary Staffing</h4>
                        <p className="text-sm text-muted-foreground">
                          Agile, project-based, and short-term workforce solutions tailored to business needs.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 p-4 rounded-lg border hover:bg-blue-50 transition-colors">
                      <div className="mt-1">
                        <Search className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Executive Search</h4>
                        <p className="text-sm text-muted-foreground">
                          Specialized recruitment for leadership and niche senior management positions.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 p-4 rounded-lg border hover:bg-blue-50 transition-colors">
                      <div className="mt-1">
                        <Users2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Bulk & Volume Hiring</h4>
                        <p className="text-sm text-muted-foreground">
                          Scalable solutions for mass recruitment drives, fresher hiring, and campus placements.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="diversity" className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-green-100">
                      <Globe className="h-5 w-5 text-green-700" />
                    </div>
                    <h3 className="text-xl font-semibold">Diversity & Inclusive Hiring Solutions</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex gap-3 p-4 rounded-lg border hover:bg-green-50 transition-colors">
                      <div className="mt-1">
                        <UserCheck className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Persons with Disabilities (PwD) Hiring</h4>
                        <p className="text-sm text-muted-foreground">
                          Specialized recruitment processes to create accessible opportunities for persons with
                          disabilities.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 p-4 rounded-lg border hover:bg-green-50 transition-colors">
                      <div className="mt-1">
                        <Heart className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">LGBTQ+ Inclusive Recruitment</h4>
                        <p className="text-sm text-muted-foreground">
                          Creating inclusive hiring practices that welcome and support LGBTQ+ talent.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 p-4 rounded-lg border hover:bg-green-50 transition-colors">
                      <div className="mt-1">
                        <Award className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Veteran Hiring Programs</h4>
                        <p className="text-sm text-muted-foreground">
                          Dedicated recruitment initiatives to help veterans transition to civilian careers.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 p-4 rounded-lg border hover:bg-green-50 transition-colors">
                      <div className="mt-1">
                        <Users className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Women Hiring & Career Comeback</h4>
                        <p className="text-sm text-muted-foreground">
                          Programs designed to support women in the workforce and those returning after career breaks.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="technology" className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-purple-100">
                      <BarChart3 className="h-5 w-5 text-purple-700" />
                    </div>
                    <h3 className="text-xl font-semibold">Technology-Driven Talent Acquisition</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex gap-3 p-4 rounded-lg border hover:bg-purple-50 transition-colors">
                      <div className="mt-1">
                        <Layers className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Advanced Applicant Tracking System</h4>
                        <p className="text-sm text-muted-foreground">
                          Seamless, bias-free, and efficient hiring management through our cutting-edge ATS.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 p-4 rounded-lg border hover:bg-purple-50 transition-colors">
                      <div className="mt-1">
                        <Brain className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">AI-Powered Screening</h4>
                        <p className="text-sm text-muted-foreground">
                          AI-powered candidate screening and talent-matching algorithms for precise matches.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 p-4 rounded-lg border hover:bg-purple-50 transition-colors">
                      <div className="mt-1">
                        <BarChart4 className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Real-time Analytics</h4>
                        <p className="text-sm text-muted-foreground">
                          Real-time recruitment analytics and reporting dashboards for clients to track progress.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="industry" className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-orange-100">
                      <Building className="h-5 w-5 text-orange-700" />
                    </div>
                    <h3 className="text-xl font-semibold">Industry-Specific Recruitment Expertise</h3>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center p-4 rounded-lg border hover:bg-orange-50 transition-colors text-center">
                      <div className="p-2 rounded-full bg-orange-100 mb-2">
                        <Briefcase className="h-5 w-5 text-orange-600" />
                      </div>
                      <h4 className="font-medium">Information Technology</h4>
                    </div>

                    <div className="flex flex-col items-center p-4 rounded-lg border hover:bg-orange-50 transition-colors text-center">
                      <div className="p-2 rounded-full bg-orange-100 mb-2">
                        <Users className="h-5 w-5 text-orange-600" />
                      </div>
                      <h4 className="font-medium">Non-IT & General</h4>
                    </div>

                    <div className="flex flex-col items-center p-4 rounded-lg border hover:bg-orange-50 transition-colors text-center">
                      <div className="p-2 rounded-full bg-orange-100 mb-2">
                        <Banknote className="h-5 w-5 text-orange-600" />
                      </div>
                      <h4 className="font-medium">BFSI</h4>
                    </div>

                    <div className="flex flex-col items-center p-4 rounded-lg border hover:bg-orange-50 transition-colors text-center">
                      <div className="p-2 rounded-full bg-orange-100 mb-2">
                        <Stethoscope className="h-5 w-5 text-orange-600" />
                      </div>
                      <h4 className="font-medium">Healthcare</h4>
                    </div>

                    <div className="flex flex-col items-center p-4 rounded-lg border hover:bg-orange-50 transition-colors text-center">
                      <div className="p-2 rounded-full bg-orange-100 mb-2">
                        <ShoppingCart className="h-5 w-5 text-orange-600" />
                      </div>
                      <h4 className="font-medium">E-commerce & Retail</h4>
                    </div>

                    <div className="flex flex-col items-center p-4 rounded-lg border hover:bg-orange-50 transition-colors text-center">
                      <div className="p-2 rounded-full bg-orange-100 mb-2">
                        <Factory className="h-5 w-5 text-orange-600" />
                      </div>
                      <h4 className="font-medium">Manufacturing</h4>
                    </div>

                    <div className="flex flex-col items-center p-4 rounded-lg border hover:bg-orange-50 transition-colors text-center">
                      <div className="p-2 rounded-full bg-orange-100 mb-2">
                        <Truck className="h-5 w-5 text-orange-600" />
                      </div>
                      <h4 className="font-medium">Logistics</h4>
                    </div>

                    <div className="flex flex-col items-center p-4 rounded-lg border hover:bg-orange-50 transition-colors text-center">
                      <div className="p-2 rounded-full bg-orange-100 mb-2">
                        <Coffee className="h-5 w-5 text-orange-600" />
                      </div>
                      <h4 className="font-medium">FMCG</h4>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="value" className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-100">
                      <Layers className="h-5 w-5 text-blue-700" />
                    </div>
                    <h3 className="text-xl font-semibold">Value-Added Services</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex gap-3 p-4 rounded-lg border hover:bg-blue-50 transition-colors">
                      <div className="mt-1">
                        <Map className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Talent Mapping & Market Intelligence</h4>
                        <p className="text-sm text-muted-foreground">
                          Comprehensive talent landscape analysis and market insights for strategic hiring.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 p-4 rounded-lg border hover:bg-blue-50 transition-colors">
                      <div className="mt-1">
                        <Award className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Employer Branding Support</h4>
                        <p className="text-sm text-muted-foreground">
                          Strategies to enhance your employer brand and attract top talent.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 p-4 rounded-lg border hover:bg-blue-50 transition-colors">
                      <div className="mt-1">
                        <Workflow className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Recruitment Process Outsourcing</h4>
                        <p className="text-sm text-muted-foreground">
                          End-to-end RPO solutions to optimize your recruitment function.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 p-4 rounded-lg border hover:bg-blue-50 transition-colors">
                      <div className="mt-1">
                        <LineChart className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Workforce Planning & Consulting</h4>
                        <p className="text-sm text-muted-foreground">
                          Strategic workforce planning and consulting services for future-ready teams.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </section>

        {/* Why Partner With Us */}
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <Badge className="mb-4 px-3 py-1 text-sm bg-green-100 text-green-800 hover:bg-green-100 border-none">
                Why Choose Us
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Why Partner with Aryanx Tech Solutions?
              </h2>
              <p className="mt-4 text-muted-foreground md:text-lg max-w-[800px] mx-auto">
                Your trusted partner in building future-ready, diverse, and high-performance teams.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="p-2 w-fit rounded-full bg-green-100 mb-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <CardTitle>Proven Track Record</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Proven track record of successful placements across industries with high retention rates.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="p-2 w-fit rounded-full bg-green-100 mb-2">
                    <Globe className="h-5 w-5 text-green-600" />
                  </div>
                  <CardTitle>Focus on Diversity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Strong focus on diversity, equity, inclusion, and belonging in all our hiring practices.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="p-2 w-fit rounded-full bg-green-100 mb-2">
                    <Workflow className="h-5 w-5 text-green-600" />
                  </div>
                  <CardTitle>Agile & Scalable</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Agile, scalable, and client-centric recruitment models that adapt to your business needs.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="p-2 w-fit rounded-full bg-green-100 mb-2">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <CardTitle>Experienced Recruiters</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Experienced recruiters with domain-specific hiring expertise across multiple industries.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="p-2 w-fit rounded-full bg-green-100 mb-2">
                    <Brain className="h-5 w-5 text-green-600" />
                  </div>
                  <CardTitle>Technology-Enabled</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Technology-enabled recruitment processes for faster, quality hiring with better outcomes.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="p-2 w-fit rounded-full bg-green-100 mb-2">
                    <Sparkles className="h-5 w-5 text-green-600" />
                  </div>
                  <CardTitle>Client Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Consistently high client satisfaction rates and long-term partnerships built on trust.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Impact in Numbers</h2>
              <p className="mt-4 text-blue-100 md:text-lg max-w-[800px] mx-auto">
                We&apos;ve helped hundreds of companies build stronger teams and achieve their hiring goals.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <AnimatedStat
                  value={5000}
                  label="Successful Placements"
                  delay={0}
                  duration={2500}
                />
              </div>
              <div className="text-center">
                <AnimatedStat
                  value={200}
                  label="Partner Companies"
                  delay={300}
                  duration={2500}
                />
              </div>
              <div className="text-center">
                <AnimatedStat
                  value={98}
                  label="Client Satisfaction"
                  delay={600}
                  isPercent
                  duration={2500}
                />
              </div>
              <div className="text-center">
                <AnimatedStat
                  value={15}
                  label="Industries Served"
                  delay={900}
                  duration={2500}
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Transform Your Hiring?</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Partner with Aryanx Tech Solutions and connect with the talent your organization needs to thrive.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="gap-1">
                  <Briefcase className="h-4 w-4" />
                  Schedule a Consultation
                </Button>
                <Button variant="outline" size="lg" className="gap-1">
                  <UserCheck className="h-4 w-4" />
                  Learn More About Our Services
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
