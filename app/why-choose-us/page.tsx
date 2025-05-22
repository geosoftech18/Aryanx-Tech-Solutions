"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Heart,
  Globe,
  Award,
  UserCheck,
  Briefcase,
  Handshake,
  Sparkles,
  Accessibility,
  GraduationCap,
  Building,
  ArrowRight,
} from "lucide-react"

export default function WhyChooseUs() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center space-x-2">
                  <Badge className="px-3 py-1 text-sm bg-purple-100 text-purple-800 hover:bg-purple-100 border-none">
                    Inclusive Hiring
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Why Choose Us for Inclusive & Diversity Hiring
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Where every career journey matters, and every voice belongs.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="gap-1">
                    <Heart className="h-4 w-4" />
                    Our Diversity Approach
                  </Button>
                  <Button variant="outline" size="lg" className="gap-1">
                    <UserCheck className="h-4 w-4" />
                    Partner With Us
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[300px] md:h-[400px]">
                  <Image
                    src="/images/diversity-hero.png"
                    alt="Diverse Team"
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
                Building Stronger Organizations Through Diversity
              </h2>
              <p className="text-muted-foreground md:text-lg leading-relaxed">
                At Aryanx Tech Solutions Private Limited, we understand that the strength of any organization lies in
                its people — and that true innovation and resilience are built on the foundation of diversity and
                inclusion. As a forward-thinking recruitment and staffing firm, we are proud to champion hiring
                practices that uplift and empower individuals from all walks of life, ensuring equal access to
                meaningful career opportunities.
              </p>
            </div>

            <div className="flex justify-center mt-10">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg blur-xl opacity-20"></div>
                <div className="relative bg-white p-6 md:p-8 rounded-lg shadow-lg border border-purple-100">
                  <h3 className="text-xl font-semibold text-center mb-4 flex items-center justify-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    <span>Here&apos;s why companies and candidates trust us for inclusive hiring</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-purple-600">
                        <Globe className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Specialized Expertise</h4>
                        <p className="text-sm text-muted-foreground">
                          Customized hiring solutions for diverse talent pools and inclusive workplaces
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-purple-600">
                        <Heart className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Bias-Free Processes</h4>
                        <p className="text-sm text-muted-foreground">
                          Recruitment practices designed to eliminate unconscious bias
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-purple-600">
                        <Handshake className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Long-term Support</h4>
                        <p className="text-sm text-muted-foreground">
                          Ongoing guidance for both employers and candidates to ensure successful placements
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-purple-600">
                        <Building className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Industry Partnerships</h4>
                        <p className="text-sm text-muted-foreground">
                          Collaborations with progressive organizations committed to diversity
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Diversity Hiring Programs */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-purple-50/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <Badge className="mb-4 px-3 py-1 text-sm bg-purple-100 text-purple-800 hover:bg-purple-100 border-none">
                Our Programs
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Specialized Diversity Hiring Expertise
              </h2>
              <p className="mt-4 text-muted-foreground md:text-lg max-w-[800px] mx-auto">
                We design customized hiring solutions to support the recruitment of diverse talent, ensuring
                organizations create workplaces where every individual feels valued and supported.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300">
                <div className="h-3 bg-gradient-to-r from-purple-400 to-purple-600"></div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="p-2 w-fit rounded-full bg-purple-100 mb-4">
                      <Accessibility className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold">PwD Hiring</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Accessible & bias-free recruitment for persons with disabilities, ensuring equitable career
                    opportunities and long-term support.
                  </p>
                  <div className="flex items-center text-sm text-purple-600 font-medium hover:text-purple-700 transition-colors">
                    <span>Learn more</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300">
                <div className="h-3 bg-gradient-to-r from-indigo-400 to-indigo-600"></div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="p-2 w-fit rounded-full bg-indigo-100 mb-4">
                      <Heart className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-semibold">LGBTQ+ Inclusive</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Creating safe, welcoming, and bias-free recruitment processes for LGBTQ+ candidates, connecting them
                    with progressive employers.
                  </p>
                  <div className="flex items-center text-sm text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
                    <span>Learn more</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300">
                <div className="h-3 bg-gradient-to-r from-pink-400 to-pink-600"></div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="p-2 w-fit rounded-full bg-pink-100 mb-4">
                      <Users className="h-6 w-6 text-pink-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Women & Returnees</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Supporting women&apos;s careers at every stage, including leadership roles and helping women return to
                    the workforce after career breaks.
                  </p>
                  <div className="flex items-center text-sm text-pink-600 font-medium hover:text-pink-700 transition-colors">
                    <span>Learn more</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300">
                <div className="h-3 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="p-2 w-fit rounded-full bg-blue-100 mb-4">
                      <Award className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Veteran Hiring</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Honoring the skills, discipline, and leadership veterans bring to the corporate world with
                    specialized transition programs.
                  </p>
                  <div className="flex items-center text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors">
                    <span>Learn more</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Detailed Programs */}
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="lgbtq" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
                <TabsTrigger value="lgbtq" className="py-3 data-[state=active]:bg-indigo-50">
                  <div className="flex flex-col items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span className="text-xs">LGBTQ+</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="women" className="py-3 data-[state=active]:bg-pink-50">
                  <div className="flex flex-col items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span className="text-xs">Women</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="veterans" className="py-3 data-[state=active]:bg-blue-50">
                  <div className="flex flex-col items-center gap-1">
                    <Award className="h-4 w-4" />
                    <span className="text-xs">Veterans</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="pwd" className="py-3 data-[state=active]:bg-purple-50">
                  <div className="flex flex-col items-center gap-1">
                    <Accessibility className="h-4 w-4" />
                    <span className="text-xs">PwD</span>
                  </div>
                </TabsTrigger>
              </TabsList>

              <div className="mt-6 p-6 bg-white rounded-lg shadow-sm border">
                <TabsContent value="lgbtq" className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-indigo-100">
                      <Heart className="h-5 w-5 text-indigo-700" />
                    </div>
                    <h3 className="text-xl font-semibold">LGBTQ+ Inclusive Hiring</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-muted-foreground mb-4">
                        Aryanx Tech Solutions is committed to creating safe, welcoming, and bias-free recruitment
                        processes for LGBTQ+ candidates, actively connecting them with progressive employers who
                        celebrate authenticity and individuality.
                      </p>
                      <p className="text-muted-foreground">
                        Our LGBTQ+ inclusive hiring practices ensure that candidates are evaluated solely on their
                        skills, experience, and potential, without bias or discrimination.
                      </p>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 text-indigo-700">Our Approach Includes:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="mt-1 min-w-[20px]">
                            <div className="h-4 w-4 rounded-full bg-indigo-200 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
                            </div>
                          </div>
                          <span className="text-sm">Partnerships with LGBTQ+ friendly employers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 min-w-[20px]">
                            <div className="h-4 w-4 rounded-full bg-indigo-200 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
                            </div>
                          </div>
                          <span className="text-sm">Inclusive language in job descriptions and communications</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 min-w-[20px]">
                            <div className="h-4 w-4 rounded-full bg-indigo-200 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
                            </div>
                          </div>
                          <span className="text-sm">
                            Training for recruiters on LGBTQ+ sensitivity and inclusive practices
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 min-w-[20px]">
                            <div className="h-4 w-4 rounded-full bg-indigo-200 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
                            </div>
                          </div>
                          <span className="text-sm">
                            Support for employers in creating inclusive workplace policies
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="women" className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-pink-100">
                      <Users className="h-5 w-5 text-pink-700" />
                    </div>
                    <h3 className="text-xl font-semibold">Empowering Women & Career Returnees</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-muted-foreground mb-4">
                        We believe in supporting women&apos;s careers at every stage. Whether it&apos;s hiring for
                        leadership roles, entry-level positions, or helping women return to the workforce after a
                        career break, we provide opportunities that match ambition with growth.
                      </p>
                      <p className="text-muted-foreground">
                        Our programs are designed to address the unique challenges women face in the workplace and
                        create pathways for advancement and success.
                      </p>
                    </div>
                    <div className="bg-pink-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 text-pink-700">Our Women-Focused Initiatives:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="mt-1 min-w-[20px]">
                            <div className="h-4 w-4 rounded-full bg-pink-200 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-pink-600"></div>
                            </div>
                          </div>
                          <span className="text-sm">Career comeback programs for women after breaks</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 min-w-[20px]">
                            <div className="h-4 w-4 rounded-full bg-pink-200 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-pink-600"></div>
                            </div>
                          </div>
                          <span className="text-sm">
                            Leadership development and mentoring for women in the workplace
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 min-w-[20px]">
                            <div className="h-4 w-4 rounded-full bg-pink-200 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-pink-600"></div>
                            </div>
                          </div>
                          <span className="text-sm">Partnerships with organizations committed to gender diversity</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 min-w-[20px]">
                            <div className="h-4 w-4 rounded-full bg-pink-200 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-pink-600"></div>
                            </div>
                          </div>
                          <span className="text-sm">
                            Advocacy for flexible work arrangements and family-friendly policies
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="veterans" className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-100">
                      <Award className="h-5 w-5 text-blue-700" />
                    </div>
                    <h3 className="text-xl font-semibold">Veteran Hiring Programs</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-muted-foreground mb-4">
                        We honor the skills, discipline, and leadership veterans bring to the corporate world. Our
                        veteran hiring initiatives ensure a seamless transition from military service to meaningful
                        civilian careers.
                      </p>
                      <p className="text-muted-foreground">
                        Veterans possess unique skills and perspectives that can greatly benefit organizations, and we
                        work to translate military experience into valuable corporate assets.
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 text-blue-700">Our Veteran Support Services:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="mt-1 min-w-[20px]">
                            <div className="h-4 w-4 rounded-full bg-blue-200 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                            </div>
                          </div>
                          <span className="text-sm">Military skills translation to civilian job requirements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 min-w-[20px]">
                            <div className="h-4 w-4 rounded-full bg-blue-200 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                            </div>
                          </div>
                          <span className="text-sm">
                            Partnerships with veteran organizations and military transition programs
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 min-w-[20px]">
                            <div className="h-4 w-4 rounded-full bg-blue-200 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                            </div>
                          </div>
                          <span className="text-sm">
                            Mentoring and support during the transition to civilian workforce
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 min-w-[20px]">
                            <div className="h-4 w-4 rounded-full bg-blue-200 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                            </div>
                          </div>
                          <span className="text-sm">Education for employers on the value of military experience</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="pwd" className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-purple-100">
                      <Accessibility className="h-5 w-5 text-purple-700" />
                    </div>
                    <h3 className="text-xl font-semibold">Accessible & Bias-Free Recruitment for PwD</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-muted-foreground mb-4">
                        Aryanx Tech Solutions promotes accessible hiring processes and partnerships with companies that
                        prioritize inclusive workplace practices for persons with disabilities, ensuring equitable
                        career opportunities and long-term support.
                      </p>
                      <p className="text-muted-foreground">
                        We believe that everyone deserves the opportunity to contribute their talents and skills in the
                        workplace, regardless of disability status.
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 text-purple-700">Our Accessibility Initiatives:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="mt-1 min-w-[20px]">
                            <div className="h-4 w-4 rounded-full bg-purple-200 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-purple-600"></div>
                            </div>
                          </div>
                          <span className="text-sm">Accessible recruitment processes and interview accommodations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 min-w-[20px]">
                            <div className="h-4 w-4 rounded-full bg-purple-200 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-purple-600"></div>
                            </div>
                          </div>
                          <span className="text-sm">
                            Partnerships with disability advocacy organizations and support networks
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 min-w-[20px]">
                            <div className="h-4 w-4 rounded-full bg-purple-200 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-purple-600"></div>
                            </div>
                          </div>
                          <span className="text-sm">Workplace accommodation consulting for employer partners</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 min-w-[20px]">
                            <div className="h-4 w-4 rounded-full bg-purple-200 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-purple-600"></div>
                            </div>
                          </div>
                          <span className="text-sm">
                            Training for employers on creating accessible work environments
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </section>

        {/* Purpose-Driven Growth */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-purple-50/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <Badge className="w-fit px-3 py-1 text-sm bg-purple-100 text-purple-800 hover:bg-purple-100 border-none">
                  Our Commitment
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter">Partnering for Purpose-Driven Growth</h2>
                <p className="text-muted-foreground">
                  We don&apos;t just fill positions — we build diverse, inclusive, and agile teams that drive business
                  innovation, reflect community values, and inspire long-term success.
                </p>
                <p className="text-muted-foreground">
                  Our approach to diversity and inclusion goes beyond recruitment. We work with organizations to create
                  environments where diverse talent can thrive, contribute, and grow.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <div className="p-2 rounded-full bg-purple-100">
                      <GraduationCap className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Training & Development</h4>
                      <p className="text-sm text-muted-foreground">Supporting ongoing learning for diverse talent</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <div className="p-2 rounded-full bg-purple-100">
                      <Handshake className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Mentorship Programs</h4>
                      <p className="text-sm text-muted-foreground">
                        Connecting diverse talent with experienced mentors
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <div className="p-2 rounded-full bg-purple-100">
                      <Briefcase className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Career Advancement</h4>
                      <p className="text-sm text-muted-foreground">Creating pathways for growth and leadership</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <div className="p-2 rounded-full bg-purple-100">
                      <Globe className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Community Impact</h4>
                      <p className="text-sm text-muted-foreground">Supporting initiatives that promote diversity</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="relative rounded-lg overflow-hidden shadow-xl h-[400px] md:h-[500px]">
                  <Image src="/images/diverse-workplace.png" alt="Diverse Workplace" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">Where Every Voice Belongs</h3>
                      <p className="text-white/90">
                        Creating workplaces where diversity is celebrated and every individual can contribute their
                        unique perspective.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Choose Aryanx Tech Solutions for Inclusive Hiring
                </h2>
                <p className="max-w-[600px] text-purple-100 md:text-xl">
                  Where every career journey matters, and every voice belongs.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" variant="secondary" className="gap-1">
                  <Handshake className="h-4 w-4" />
                  Partner With Us
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-1 bg-transparent text-white border-white hover:bg-white/10"
                >
                  <UserCheck className="h-4 w-4" />
                  Learn More About Our Approach
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
     
    </div>
  )
}


