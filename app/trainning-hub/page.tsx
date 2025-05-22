import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Accessibility,
  GraduationCap,
  Building,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  MessageSquare,
  BookOpen,
  Lightbulb,
  Target,
  Sparkles,
  Link2,
  Send,
  Mail,
  Phone,
} from "lucide-react"
import { TestimonialCarousel } from "./carousel-component"
import { testimonials } from "./testimonial-data"

export default function TrainingHub() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-teal-50 via-blue-50 to-teal-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center space-x-2">
                  <Badge className="px-3 py-1 text-sm bg-teal-100 text-teal-800 hover:bg-teal-100 border-none">
                    Training & Development
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    ATS Training Hub
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Empowering organizations with sensitization training and workshops for creating truly inclusive
                    workplaces.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="gap-1 bg-teal-600 hover:bg-teal-700">
                    <GraduationCap className="h-4 w-4" />
                    Explore Our Programs
                  </Button>
                  <Button variant="outline" size="lg" className="gap-1">
                    <Calendar className="h-4 w-4" />
                    Schedule a Training
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[300px] md:h-[400px]">
                  <Image
                    src="/images/training-hero.png"
                    alt="Diversity Training Workshop"
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
                Fostering Inclusive Workplaces Through Education
              </h2>
              <p className="text-muted-foreground md:text-lg leading-relaxed">
                At Aryanx Tech Solutions, we believe that true inclusion begins with understanding. Our comprehensive
                training programs are designed to help organizations create environments where every individual feels
                valued, respected, and empowered to contribute their unique perspectives and talents.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-teal-100 text-teal-700">
                    <Heart className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">Sensitization Training</h3>
                  <p className="text-muted-foreground">
                    Specialized workshops to foster understanding, empathy, and respect for diverse perspectives and
                    experiences.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-700">
                    <Building className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">Infrastructure Inclusivity</h3>
                  <p className="text-muted-foreground">
                    Guidance on creating accessible physical spaces that accommodate the needs of all employees and
                    visitors.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-700">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">Customized Approach</h3>
                  <p className="text-muted-foreground">
                    Tailored training solutions that address the specific needs, challenges, and goals of your
                    organization.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Training Programs */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-teal-50/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <Badge className="mb-4 px-3 py-1 text-sm bg-teal-100 text-teal-800 hover:bg-teal-100 border-none">
                Our Programs
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Comprehensive Training Solutions</h2>
              <p className="mt-4 text-muted-foreground md:text-lg max-w-[800px] mx-auto">
                Our specialized training programs are designed to create awareness, foster understanding, and promote
                inclusive practices.
              </p>
            </div>

            <Tabs defaultValue="pwd" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 h-auto">
                <TabsTrigger value="pwd" className="py-3 data-[state=active]:bg-teal-50">
                  <div className="flex flex-col items-center gap-1">
                    <Accessibility className="h-4 w-4" />
                    <span className="text-xs">Disability Inclusion</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="lgbtq" className="py-3 data-[state=active]:bg-blue-50">
                  <div className="flex flex-col items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span className="text-xs">LGBTQ+ Awareness</span>
                  </div>
                </TabsTrigger>
              </TabsList>

              <div className="mt-6 p-6 bg-white rounded-lg shadow-sm border">
                <TabsContent value="pwd" className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-teal-100">
                      <Accessibility className="h-5 w-5 text-teal-700" />
                    </div>
                    <h3 className="text-xl font-semibold">Disability Inclusion Training</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-muted-foreground mb-4">
                        Our disability inclusion training programs are designed to help organizations create
                        environments where persons with disabilities can thrive. These workshops focus on understanding
                        different types of disabilities, appropriate communication, and practical accommodations.
                      </p>
                      <p className="text-muted-foreground">
                        Through interactive sessions, case studies, and experiential learning, participants gain
                        valuable insights and practical skills to foster a truly inclusive workplace.
                      </p>
                    </div>
                    <div className="bg-teal-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 text-teal-700">Program Highlights:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="mt-1 min-w-[20px]">
                            <div className="h-4 w-4 rounded-full bg-teal-200 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-teal-600"></div>
                            </div>
                          </div>
                          <span className="text-sm">
                            Understanding different types of disabilities and their impact
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 min-w-[20px]">
                            <div className="h-4 w-4 rounded-full bg-teal-200 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-teal-600"></div>
                            </div>
                          </div>
                          <span className="text-sm">Appropriate language and communication techniques</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 min-w-[20px]">
                            <div className="h-4 w-4 rounded-full bg-teal-200 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-teal-600"></div>
                            </div>
                          </div>
                          <span className="text-sm">Workplace accommodations and accessibility solutions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 min-w-[20px]">
                            <div className="h-4 w-4 rounded-full bg-teal-200 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-teal-600"></div>
                            </div>
                          </div>
                          <span className="text-sm">Legal compliance and best practices for inclusive hiring</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 min-w-[20px]">
                            <div className="h-4 w-4 rounded-full bg-teal-200 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-teal-600"></div>
                            </div>
                          </div>
                          <span className="text-sm">Addressing unconscious bias and promoting inclusive behaviors</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-teal-50/50 rounded-lg border border-teal-100">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="h-5 w-5 text-teal-700" />
                      <h4 className="font-medium">Program Details</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-teal-800">Duration</p>
                        <p className="text-slate-600">Half-day or full-day sessions</p>
                      </div>
                      <div>
                        <p className="font-medium text-teal-800">Format</p>
                        <p className="text-slate-600">In-person or virtual workshops</p>
                      </div>
                      <div>
                        <p className="font-medium text-teal-800">Participants</p>
                        <p className="text-slate-600">Up to 25 participants per session</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="lgbtq" className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-100">
                      <Heart className="h-5 w-5 text-blue-700" />
                    </div>
                    <h3 className="text-xl font-semibold">LGBTQ+ Awareness Training</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-muted-foreground mb-4">
                        Our LGBTQ+ awareness training helps organizations create safe, welcoming environments where all
                        employees can bring their authentic selves to work. These workshops focus on understanding
                        LGBTQ+ identities, appropriate terminology, and creating inclusive policies and practices.
                      </p>
                      <p className="text-muted-foreground">
                        Through facilitated discussions, scenario-based learning, and expert guidance, participants
                        develop the knowledge and skills to foster a culture of respect and belonging.
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 text-blue-700">Program Highlights:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="mt-1 min-w-[20px]">
                            <div className="h-4 w-4 rounded-full bg-blue-200 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                            </div>
                          </div>
                          <span className="text-sm">Understanding LGBTQ+ terminology and identities</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 min-w-[20px]">
                            <div className="h-4 w-4 rounded-full bg-blue-200 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                            </div>
                          </div>
                          <span className="text-sm">Creating inclusive policies and practices</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 min-w-[20px]">
                            <div className="h-4 w-4 rounded-full bg-blue-200 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                            </div>
                          </div>
                          <span className="text-sm">Addressing microaggressions and unconscious bias</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 min-w-[20px]">
                            <div className="h-4 w-4 rounded-full bg-blue-200 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                            </div>
                          </div>
                          <span className="text-sm">Supporting transgender and non-binary employees</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 min-w-[20px]">
                            <div className="h-4 w-4 rounded-full bg-blue-200 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                            </div>
                          </div>
                          <span className="text-sm">Building allyship and creating a culture of belonging</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="h-5 w-5 text-blue-700" />
                      <h4 className="font-medium">Program Details</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-blue-800">Duration</p>
                        <p className="text-slate-600">Half-day or full-day sessions</p>
                      </div>
                      <div>
                        <p className="font-medium text-blue-800">Format</p>
                        <p className="text-slate-600">In-person or virtual workshops</p>
                      </div>
                      <div>
                        <p className="font-medium text-blue-800">Participants</p>
                        <p className="text-slate-600">Up to 25 participants per session</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </section>

        {/* Infrastructure Inclusivity */}
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <Badge className="w-fit px-3 py-1 text-sm bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                  Accessible Spaces
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter">Infrastructure Inclusivity Training</h2>
                <p className="text-muted-foreground">
                  Creating physical environments that are accessible and welcoming to all is a crucial aspect of
                  workplace inclusion. Our infrastructure inclusivity training helps organizations understand and
                  implement best practices for creating spaces that accommodate diverse needs.
                </p>
                <p className="text-muted-foreground">
                  From workplace layout and design to signage and technology, we provide practical guidance on making
                  your physical infrastructure truly inclusive.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <div className="p-2 rounded-full bg-blue-100">
                      <CheckCircle2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Accessibility Audits</h4>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive assessment of your current infrastructure
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <div className="p-2 rounded-full bg-blue-100">
                      <CheckCircle2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Design Recommendations</h4>
                      <p className="text-sm text-muted-foreground">
                        Practical solutions for creating accessible spaces
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <div className="p-2 rounded-full bg-blue-100">
                      <CheckCircle2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Compliance Guidance</h4>
                      <p className="text-sm text-muted-foreground">
                        Ensuring adherence to accessibility standards and regulations
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <div className="p-2 rounded-full bg-blue-100">
                      <CheckCircle2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Implementation Support</h4>
                      <p className="text-sm text-muted-foreground">
                        Assistance with implementing accessibility improvements
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="relative rounded-lg overflow-hidden shadow-xl h-[400px] md:h-[500px]">
                  <Image
                    src="/images/inclusive-infrastructure.png"
                    alt="Accessible Workplace Design"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">Spaces That Welcome Everyone</h3>
                      <p className="text-white/90">
                        Creating physical environments that are accessible, comfortable, and dignified for all employees
                        and visitors.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-teal-50/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <Badge className="mb-4 px-3 py-1 text-sm bg-teal-100 text-teal-800 hover:bg-teal-100 border-none">
                Our Approach
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Why Choose Aryanx Tech Solutions for DEI Training
              </h2>
              <p className="mt-4 text-muted-foreground md:text-lg max-w-[800px] mx-auto">
                Our unique approach combines expertise, experience, and empathy to deliver training programs that create
                lasting impact.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-teal-100">
                    <Sparkles className="h-6 w-6 text-teal-700" />
                  </div>
                  <h3 className="text-xl font-medium">Expertise & Experience</h3>
                  <p className="text-muted-foreground">
                    Our trainers bring deep expertise in diversity, equity, and inclusion, with years of experience
                    working with organizations across industries.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-teal-100">
                    <Target className="h-6 w-6 text-teal-700" />
                  </div>
                  <h3 className="text-xl font-medium">Customized Approach</h3>
                  <p className="text-muted-foreground">
                    We tailor our training programs to address the specific needs, challenges, and goals of your
                    organization, ensuring relevance and impact.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-teal-100">
                    <BookOpen className="h-6 w-6 text-teal-700" />
                  </div>
                  <h3 className="text-xl font-medium">Interactive Learning</h3>
                  <p className="text-muted-foreground">
                    Our engaging, interactive approach combines theory with practical exercises, case studies, and
                    real-world scenarios for effective learning.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-teal-100">
                    <Lightbulb className="h-6 w-6 text-teal-700" />
                  </div>
                  <h3 className="text-xl font-medium">Practical Solutions</h3>
                  <p className="text-muted-foreground">
                    We focus on providing actionable strategies and tools that participants can immediately apply in
                    their workplace.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-teal-100">
                    <Link2 className="h-6 w-6 text-teal-700" />
                  </div>
                  <h3 className="text-xl font-medium">Ongoing Support</h3>
                  <p className="text-muted-foreground">
                    Our commitment extends beyond the training session, with follow-up resources, consultation, and
                    support to ensure lasting impact.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-teal-100">
                    <MessageSquare className="h-6 w-6 text-teal-700" />
                  </div>
                  <h3 className="text-xl font-medium">Empathetic Approach</h3>
                  <p className="text-muted-foreground">
                    We create safe, respectful learning environments where participants feel comfortable exploring
                    sensitive topics and asking questions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-r from-teal-900 to-blue-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Our Clients Say</h2>
              <p className="mt-4 text-teal-100 md:text-lg max-w-[800px] mx-auto">
                Organizations that have partnered with us for their DEI training needs share their experiences.
              </p>
            </div>

            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Transform Your Workplace?</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Partner with Aryanx Tech Solutions to create a more inclusive, equitable, and empowering environment
                  for all.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="gap-1 bg-teal-600 hover:bg-teal-700">
                  <Calendar className="h-4 w-4" />
                  Schedule a Consultation
                </Button>
                <Button variant="outline" size="lg" className="gap-1">
                  <Send className="h-4 w-4" />
                  Request More Information
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-teal-50/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2">
              <Card className="border-none shadow-xl overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-teal-400 to-blue-600"></div>
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-full bg-teal-100">
                      <MessageSquare className="h-5 w-5 text-teal-700" />
                    </div>
                    <h3 className="text-xl font-semibold">Contact Us</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-teal-100 mt-1">
                        <Mail className="h-4 w-4 text-teal-700" />
                      </div>
                      <div>
                        <p className="font-medium">Email</p>
                        <a href="mailto:training@aryanxtechsolutions.com" className="text-teal-600 hover:underline">
                          training@aryanxtechsolutions.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-teal-100 mt-1">
                        <Phone className="h-4 w-4 text-teal-700" />
                      </div>
                      <div>
                        <p className="font-medium">Phone</p>
                        <a href="tel:+91XXXXXXXXXX" className="text-teal-600 hover:underline">
                          +91-XXXXXXXXXX
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-teal-100 mt-1">
                        <MapPin className="h-4 w-4 text-teal-700" />
                      </div>
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-muted-foreground">
                          Aryanx Tech Solutions Private Limited
                          <br />
                          [Your Office Address]
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-blue-400 to-teal-600"></div>
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-full bg-blue-100">
                      <Calendar className="h-5 w-5 text-blue-700" />
                    </div>
                    <h3 className="text-xl font-semibold">Training Schedule</h3>
                  </div>

                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      We offer both scheduled public workshops and customized in-house training programs. Contact us to
                      learn more about upcoming sessions or to schedule a training for your organization.
                    </p>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 text-blue-700">Upcoming Public Workshops</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="p-1.5 rounded-full bg-blue-100 mt-0.5">
                            <Calendar className="h-3.5 w-3.5 text-blue-700" />
                          </div>
                          <div>
                            <p className="font-medium">Disability Inclusion Workshop</p>
                            <p className="text-sm text-muted-foreground">June 15, 2023 | 10:00 AM - 4:00 PM</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="p-1.5 rounded-full bg-blue-100 mt-0.5">
                            <Calendar className="h-3.5 w-3.5 text-blue-700" />
                          </div>
                          <div>
                            <p className="font-medium">LGBTQ+ Awareness Training</p>
                            <p className="text-sm text-muted-foreground">July 10, 2023 | 10:00 AM - 4:00 PM</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="p-1.5 rounded-full bg-blue-100 mt-0.5">
                            <Calendar className="h-3.5 w-3.5 text-blue-700" />
                          </div>
                          <div>
                            <p className="font-medium">Infrastructure Inclusivity Workshop</p>
                            <p className="text-sm text-muted-foreground">August 5, 2023 | 10:00 AM - 4:00 PM</p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <Button className="w-full gap-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 transition-all duration-300">
                      <Calendar className="h-4 w-4" />
                      Register for a Workshop
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
