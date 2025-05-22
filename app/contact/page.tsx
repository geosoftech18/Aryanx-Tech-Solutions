import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Building,
  GraduationCap,
  Globe,
  Linkedin,
  Facebook,
  Instagram,
  Send,
  CheckCircle,
  MessageSquare,
  Clock,
  ChevronRight,
} from "lucide-react"

export default function ContactUs() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.5),rgba(255,255,255,0.8))] dark:bg-grid-slate-700/25"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 animate-pulse [animation-duration:5s]"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center space-x-2">
                  <Badge className="px-3 py-1 text-sm bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                    Get In Touch
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    Contact Us
                  </h1>
                  <p className="max-w-[600px] text-slate-700 md:text-xl">
                    At Aryanx Tech Solutions Private Limited, we&apos;re always ready to connect — whether you&apos;re a company
                    searching for the right talent or a professional exploring your next big opportunity.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="gap-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <Phone className="h-4 w-4" />
                    Call Us
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-1 border-blue-300 hover:bg-blue-50 transition-all duration-300"
                  >
                    <Mail className="h-4 w-4" />
                    Email Us
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl transform transition-transform hover:scale-[1.02] duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 z-10"></div>
                  <Image src="/images/contact-hero.png" alt="Contact Us" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Contact Info */}
        <section className="w-full py-8 bg-white relative z-10">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 -mt-16 md:-mt-24">
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-700">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Call Us</h3>
                    <p className="text-slate-600 text-sm">Mon-Fri, 9am-6pm</p>
                  </div>
                </div>
                <a href="tel:+91XXXXXXXXXX" className="text-blue-600 font-medium text-lg hover:underline">
                  +91-XXXXXXXXXX
                </a>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-indigo-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-indigo-100 text-indigo-700">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email Us</h3>
                    <p className="text-slate-600 text-sm">We&apos;ll respond within 24h</p>
                  </div>
                </div>
                <a
                  href="mailto:info@aryanxtechsolutions.com"
                  className="text-indigo-600 font-medium text-lg hover:underline"
                >
                  info@aryanxtechsolutions.com
                </a>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-700">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Visit Us</h3>
                    <p className="text-slate-600 text-sm">Corporate Headquarters</p>
                  </div>
                </div>
                <p className="text-purple-600 font-medium">Aryanx Tech Solutions, [Your Office Address]</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="w-full py-16 md:py-20 bg-gradient-to-b from-white to-slate-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 inline-block">
                How Can We Help You?
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-4 rounded-full"></div>
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                Whether you&apos;re looking for your next career opportunity or searching for exceptional talent, we&apos;re here
                to connect the dots.
              </p>
            </div>

            <div className="grid gap-10 md:grid-cols-2">
              {/* For Job Seekers */}
              <Card className="overflow-hidden border-none shadow-xl group hover:shadow-2xl transition-all duration-500 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-600/10 group-hover:from-blue-600/10 group-hover:to-blue-600/20 transition-all duration-500"></div>
                <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                <CardContent className="p-8 md:p-10 relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-700 group-hover:scale-110 transition-transform duration-300">
                      <GraduationCap className="h-7 w-7" />
                    </div>
                    <h2 className="text-2xl font-bold">For Job Seekers</h2>
                  </div>

                  <p className="text-slate-600 mb-8 leading-relaxed">
                    Looking to take the next step in your career? We work with leading organizations across industries
                    to bring you exciting job opportunities. Share your profile with us today and let us help you find
                    the right role.
                  </p>

                  <div className="space-y-6 mb-8">
                    <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg group-hover:bg-blue-100/70 transition-colors duration-300">
                      <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-800">Email your resume to:</p>
                        <a
                          href="mailto:careers@aryanxtechsolutions.com"
                          className="text-blue-600 hover:underline font-medium"
                        >
                          careers@aryanxtechsolutions.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg group-hover:bg-blue-100/70 transition-colors duration-300">
                      <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-800">Call us at:</p>
                        <a href="tel:+91XXXXXXXXXX" className="text-blue-600 hover:underline font-medium">
                          +91-XXXXXXXXXX
                        </a>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 py-6 text-base font-medium shadow-md hover:shadow-lg group-hover:translate-y-[-2px]">
                    <Send className="h-5 w-5" />
                    Submit Your Resume
                  </Button>
                </CardContent>
              </Card>

              {/* For Employers */}
              <Card className="overflow-hidden border-none shadow-xl group hover:shadow-2xl transition-all duration-500 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-purple-600/10 group-hover:from-purple-600/10 group-hover:to-purple-600/20 transition-all duration-500"></div>
                <div className="h-2 bg-gradient-to-r from-purple-400 to-purple-600"></div>
                <CardContent className="p-8 md:p-10 relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-full bg-purple-100 text-purple-700 group-hover:scale-110 transition-transform duration-300">
                      <Building className="h-7 w-7" />
                    </div>
                    <h2 className="text-2xl font-bold">For Employers</h2>
                  </div>

                  <p className="text-slate-600 mb-8 leading-relaxed">
                    Need skilled, diverse, and reliable talent for your organization? Our team of recruitment experts is
                    here to provide customized staffing solutions tailored to your business needs.
                  </p>

                  <div className="space-y-6 mb-8">
                    <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg group-hover:bg-purple-100/70 transition-colors duration-300">
                      <Mail className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-800">Get in touch at:</p>
                        <a
                          href="mailto:business@aryanxtechsolutions.com"
                          className="text-purple-600 hover:underline font-medium"
                        >
                          business@aryanxtechsolutions.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg group-hover:bg-purple-100/70 transition-colors duration-300">
                      <Phone className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-800">Call us at:</p>
                        <a href="tel:+91XXXXXXXXXX" className="text-purple-600 hover:underline font-medium">
                          +91-XXXXXXXXXX
                        </a>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-all duration-300 py-6 text-base font-medium shadow-md hover:shadow-lg group-hover:translate-y-[-2px]">
                    <Briefcase className="h-5 w-5" />
                    Discuss Your Hiring Needs
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="w-full py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent)] pointer-events-none"></div>

          <div className="container px-4 md:px-6 relative">
            <div className="mx-auto max-w-[800px] text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 inline-block">
                Send Us a Message
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-2 rounded-full"></div>
              <p className="text-slate-600 md:text-lg max-w-2xl mx-auto">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
            </div>

            <div className="grid gap-10 md:grid-cols-[1fr_400px]">
              <Card className="border-none shadow-xl overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-blue-400 to-indigo-600"></div>
                <CardContent className="p-8 md:p-10 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="first-name"
                        className="text-sm font-medium text-slate-700 flex items-center gap-1"
                      >
                        <span>First Name</span>
                        <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="first-name"
                        placeholder="Enter your first name"
                        className="border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 py-6"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="last-name" className="text-sm font-medium text-slate-700 flex items-center gap-1">
                        <span>Last Name</span>
                        <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="last-name"
                        placeholder="Enter your last name"
                        className="border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 py-6"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700 flex items-center gap-1">
                      <span>Email</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 py-6"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-slate-700">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      placeholder="Enter your phone number"
                      className="border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 py-6"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="inquiry-type"
                      className="text-sm font-medium text-slate-700 flex items-center gap-1"
                    >
                      <span>Inquiry Type</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="inquiry-type"
                      className="flex h-12 w-full rounded-md border border-slate-300 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
                    >
                      <option value="">Select an option</option>
                      <option value="job-seeker">I&apos;m a job seeker</option>
                      <option value="employer">I&apos;m an employer</option>
                      <option value="partnership">Partnership opportunity</option>
                      <option value="other">Other inquiry</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-slate-700 flex items-center gap-1">
                      <span>Message</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Enter your message"
                      rows={5}
                      className="border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                    />
                  </div>

                  <Button className="w-full gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 py-6 text-base font-medium shadow-md hover:shadow-lg">
                    <Send className="h-5 w-5" />
                    Send Message
                  </Button>

                  <p className="text-xs text-slate-500 text-center">
                    By submitting this form, you agree to our{" "}
                    <Link href="#" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-blue-600 hover:underline">
                      Terms of Service
                    </Link>
                    .
                  </p>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-blue-100">
                      <Clock className="h-5 w-5 text-blue-700" />
                    </div>
                    <h3 className="text-xl font-semibold">Response Time</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-slate-600">
                      We aim to respond to all inquiries within 24 hours during business days.
                    </p>
                    <div className="flex items-center gap-2 text-blue-600 font-medium">
                      <span>Business hours: Mon-Fri, 9am-6pm</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-blue-100">
                      <MapPin className="h-5 w-5 text-blue-700" />
                    </div>
                    <h3 className="text-xl font-semibold">Corporate Office</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-slate-600">
                      Aryanx Tech Solutions Private Limited
                      <br />
                      [Your Office Address Here]
                    </p>
                    <div className="flex items-center gap-2 text-blue-600">
                      <Globe className="h-4 w-4" />
                      <a href="https://www.aryanxtechsolutions.com" className="hover:underline font-medium">
                        www.aryanxtechsolutions.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    Follow Us
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="p-3 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors hover:scale-110 transform duration-300"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                    <a
                      href="#"
                      className="p-3 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors hover:scale-110 transform duration-300"
                    >
                      <Facebook className="h-5 w-5" />
                      <span className="sr-only">Facebook</span>
                    </a>
                    <a
                      href="#"
                      className="p-3 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors hover:scale-110 transform duration-300"
                    >
                      <Instagram className="h-5 w-5" />
                      <span className="sr-only">Instagram</span>
                    </a>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-xl shadow-lg text-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="h-6 w-6" />
                    <h3 className="text-xl font-semibold">Why Choose Us</h3>
                  </div>
                  <p className="mb-4 text-blue-100">
                    Aryanx Tech Solutions — Connecting Talent. Empowering Businesses.
                  </p>
                  <Link
                    href="/why-choose-us"
                    className="inline-flex items-center text-white hover:underline font-medium group"
                  >
                    Learn more about our approach
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 inline-block">
                Visit Our Office
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-4 rounded-full"></div>
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                We&apos;d love to meet you in person. Our office is open Monday to Friday, 9:00 AM to 6:00 PM.
              </p>
            </div>

            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/images/office-map.png" alt="Office Location Map" fill className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-2xl max-w-md transform transition-transform hover:scale-[1.02] duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-blue-100">
                      <MapPin className="h-6 w-6 text-blue-700" />
                    </div>
                    <h3 className="text-xl font-bold">Our Location</h3>
                  </div>
                  <p className="text-slate-600 mb-6">
                    Aryanx Tech Solutions Private Limited
                    <br />
                    [Your Office Address Here]
                    <br />
                    <span className="text-blue-600 font-medium">Open Monday to Friday, 9:00 AM to 6:00 PM</span>
                  </p>
                  <Button className="w-full gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 py-6 text-base font-medium shadow-md hover:shadow-lg">
                    Get Directions
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
