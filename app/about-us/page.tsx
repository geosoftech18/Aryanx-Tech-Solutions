"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Target,
  Briefcase,
  CheckCircle,
  Heart,
  DiffIcon as Diversity,
  Award,
  UserCheck,
  Scale,
  Handshake,
  Users,
} from "lucide-react"
import { AnimatedStat } from "@/components/animated-stat"

export default function AboutUs() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            <span className="text-xl font-bold">Aryanx Tech Solutions</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
              Home
            </Link>
            <Link href="/about-us" className="text-sm font-medium text-primary hover:underline underline-offset-4">
              About Us
            </Link>
            <Link href="/ats-capabilities" className="text-sm font-medium hover:underline underline-offset-4">
              ATS Capabilities
            </Link>
            <Link href="/why-choose-us" className="text-sm font-medium hover:underline underline-offset-4">
              Why Choose Us
            </Link>
            <Link href="/contact-us" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
          <Button size="sm" className="hidden md:inline-flex">
            Get in Touch
          </Button>
          <Button variant="outline" size="icon" className="md:hidden">
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header> */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    About Aryanx Tech Solutions
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    A dynamic and forward-thinking recruitment and staffing firm committed to connecting exceptional
                    talent with leading organizations.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button>Our Services</Button>
                  <Button variant="outline">Contact Us</Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/images/about-image.png"
                  alt="Aryanx Tech Solutions Team"
                  width={500}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Company Overview */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-br from-white to-blue-50/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-10">
              <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
                Our Story
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
                Who We Are
              </h2>
              <div className="w-20 h-1 bg-primary/60 rounded-full mt-6 mb-2"></div>
            </div>

            <div className="grid gap-10 items-center lg:grid-cols-12">
              {/* Left Column - Content */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <Briefcase className="h-5 w-5 text-primary mr-2" />
                    Our Mission
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Aryanx Tech Solutions Private Limited is a dynamic and forward-thinking recruitment and staffing
                    firm committed to connecting exceptional talent with leading organizations.
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <Target className="h-5 w-5 text-primary mr-2" />
                    Our Approach
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    With a deep understanding of diverse industries and an unwavering focus on quality, we deliver
                    customized staffing solutions designed to help businesses thrive in a competitive market.
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <Users className="h-5 w-5 text-primary mr-2" />
                    Our Promise
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Founded with a vision to simplify the hiring process, Aryanx Tech Solutions serves as a trusted
                    partner for companies seeking to build strong, reliable, and agile teams.
                  </p>
                </div>
              </div>

              {/* Middle Column - Stats */}
              <div className="lg:col-span-2 flex flex-col items-center justify-center gap-8 my-8 lg:my-0">
                <div className="h-full w-px bg-gradient-to-b from-transparent via-blue-200 to-transparent hidden lg:block"></div>

                <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 lg:gap-8">
                  <AnimatedStat value={500} label="Successful Placements" delay={0} />
                  <AnimatedStat value={50} label="Partner Companies" delay={300} />
                  <AnimatedStat
                    value={95}
                    label="Client Satisfaction"
                    delay={600}
                    formatter={(value: number) => `${Math.floor(value)}%`}
                  />
                  <AnimatedStat value={10} label="Years Experience" delay={900} />
                </div>

                <div className="h-full w-px bg-gradient-to-b from-transparent via-blue-200 to-transparent hidden lg:block"></div>
              </div>

              {/* Right Column - Image and Services */}
              <div className="lg:col-span-5">
                <div className="relative rounded-xl overflow-hidden shadow-xl mb-6 group">
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-primary/30 to-blue-600/20 z-10 
                                 group-hover:from-primary/40 group-hover:to-blue-600/30 transition-all duration-300"
                  ></div>
                  <Image
                    src="/images/team-collaboration.png"
                    alt="Team Collaboration"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-20">
                    <p className="text-lg font-medium text-white">
                      &quot;Great people build great companies — and our mission is to bridge the gap between
                      opportunity and talent.&quot;
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100">
                  <h3 className="text-xl font-semibold mb-4">Our Specializations</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                      <div className="rounded-full bg-green-100 p-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-600"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-sm font-medium">IT Recruitment</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                      <div className="rounded-full bg-green-100 p-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-600"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-sm font-medium">Executive Search</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                      <div className="rounded-full bg-green-100 p-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-600"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-sm font-medium">Contract Staffing</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                      <div className="rounded-full bg-green-100 p-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-600"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-sm font-medium">Project-based Hiring</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-none shadow-md">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To be a trusted, innovative, and inclusive recruitment partner that transforms businesses and
                    careers by connecting exceptional talent with meaningful opportunities, fostering workplaces that
                    embrace diversity, equity, inclusion, and belonging.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Briefcase className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                  <p className="text-muted-foreground">
                    At Aryanx Tech Solutions Private Limited, our mission is to deliver customized, high-quality
                    staffing and recruitment solutions that empower organizations to build agile, diverse, and
                    future-ready teams. We are committed to fair, transparent, and people-centric hiring practices that
                    create equal opportunities for all and contribute to the growth and success of individuals,
                    businesses, and communities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Choose Us?</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Partner with Aryanx Tech Solutions Private Limited —Where potential connects with possibilities.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium">Industry Expertise</h3>
                  <p className="text-muted-foreground">
                    Industry-specific recruitment expertise across IT, non-IT, and specialized sectors.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <UserCheck className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium">Dedicated Teams</h3>
                  <p className="text-muted-foreground">
                    Dedicated account management and talent acquisition teams focused on your success.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium">Tailored Solutions</h3>
                  <p className="text-muted-foreground">
                    Agile and scalable hiring solutions tailored to your specific business needs.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium">Extensive Network</h3>
                  <p className="text-muted-foreground">
                    Extensive talent database and proactive sourcing strategies to find the perfect match.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Handshake className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium">Long-term Partnerships</h3>
                  <p className="text-muted-foreground">
                    Commitment to quality, transparency, and building long-term partnerships.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Scale className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium">Fair Practices</h3>
                  <p className="text-muted-foreground">
                    Commitment to fair, transparent, and people-centric hiring practices.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* DEIB Commitment */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-[1fr_600px]">
              <div>
                <Image
                  src="/diverse-team-collaboration.png"
                  alt="Diversity and Inclusion"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">
                  Commitment to Diversity, Equity, Inclusion & Belonging
                </h2>
                <p className="text-muted-foreground">
                  At Aryanx Tech Solutions Private Limited, we believe that people are the heart of every successful
                  business — and that true innovation and progress happen when diverse voices come together.
                </p>
                <p className="text-muted-foreground">
                  As an equal opportunity recruitment and staffing firm, we are dedicated to advancing Diversity,
                  Equity, Inclusion, and Belonging (DEIB) in every hiring solution we deliver.
                </p>

                <Tabs defaultValue="diversity" className="w-full mt-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="diversity">Diversity</TabsTrigger>
                    <TabsTrigger value="equity">Equity</TabsTrigger>
                    <TabsTrigger value="inclusion">Inclusion</TabsTrigger>
                    <TabsTrigger value="belonging">Belonging</TabsTrigger>
                  </TabsList>
                  <TabsContent value="diversity" className="p-4 border rounded-md mt-2">
                    <div className="flex items-start gap-4">
                      <Diversity className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h4 className="font-medium">Diversity Hiring Initiatives</h4>
                        <p className="text-muted-foreground">
                          We actively partner with organizations to build diverse, dynamic teams that reflect the
                          richness of the communities they serve.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="equity" className="p-4 border rounded-md mt-2">
                    <div className="flex items-start gap-4">
                      <Scale className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h4 className="font-medium">Equity-Focused Processes</h4>
                        <p className="text-muted-foreground">
                          Every candidate is assessed fairly based on skills, experience, and potential, ensuring
                          unbiased opportunities for career growth.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="inclusion" className="p-4 border rounded-md mt-2">
                    <div className="flex items-start gap-4">
                      <Users className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h4 className="font-medium">Inclusive Recruitment Practices</h4>
                        <p className="text-muted-foreground">
                          We implement sourcing and hiring methods that foster an inclusive, accessible, and welcoming
                          experience for all candidates.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="belonging" className="p-4 border rounded-md mt-2">
                    <div className="flex items-start gap-4">
                      <Heart className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h4 className="font-medium">Belonging-Centered Culture</h4>
                        <p className="text-muted-foreground">
                          Beyond recruitment, we help our clients nurture workplaces where every employee feels
                          accepted, supported, and empowered to contribute meaningfully.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Build Your Dream Team?</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Partner with Aryanx Tech Solutions and connect with the talent your organization needs to thrive.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg">Contact Us Today</Button>
                <Button variant="outline" size="lg">
                  Learn About Our Services
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
