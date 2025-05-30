import { getAboutUsPageData } from "@/actions/static/aboutus"
import { AboutUsPageData } from "@/actions/static/aboutus"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedStat } from "@/components/animated-stat"
import {
  Users,
  Target,
  Briefcase,
  CheckCircle,
  Heart,
  DiffIcon as Diversity,
  Award,
  UserCheck,
  Scale,
  Link2,
  Mail,
  Linkedin,
  Twitter,
  Instagram,
  Globe,
} from "lucide-react"

// Map icon string to Lucide icon component
const lucideIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Award,
  UserCheck,
  CheckCircle,
  Users,
  Link2,
  Scale,
  Heart,
  Target,
  Briefcase,
  Diversity,
  Linkedin,
  Twitter,
  Instagram,
  Globe,
}

// Server Component: Fetches AboutUs data and passes to ClientPage
export default async function AboutUs() {
  // Fetch all About Us page data from DB
  const aboutUs: AboutUsPageData | null = await getAboutUsPageData()
  if (!aboutUs) {
    return <div className="p-10 text-center text-red-500">About Us data not found.</div>
  }
  return <AboutUsClient aboutUs={aboutUs} />
}

// Client Component: Renders the page using fetched data
function AboutUsClient({ aboutUs }: { aboutUs: AboutUsPageData }) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  {/* Hero Title and Subtitle from DB */}
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    {aboutUs.heroTitle}
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    {aboutUs.heroSubtitle}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button>{aboutUs.ctaButton2Text}</Button>
                  <Button variant="outline">{aboutUs.ctaButton1Text}</Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src={aboutUs.heroImage}
                  alt={aboutUs.companyName + " Team"}
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
                {aboutUs.storyTitle}
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
                {aboutUs.storyText}
              </h2>
              <div className="w-20 h-1 bg-primary/60 rounded-full mt-6 mb-2"></div>
            </div>
            <div className="grid gap-10 items-center lg:grid-cols-12">
              {/* Left Column - Content */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <Briefcase className="h-5 w-5 text-primary mr-2" />
                    {aboutUs.missionTitle}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{aboutUs.missionText}</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <Target className="h-5 w-5 text-primary mr-2" />
                    {aboutUs.approachTitle}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{aboutUs.approachText}</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <Users className="h-5 w-5 text-primary mr-2" />
                    {aboutUs.promiseTitle}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{aboutUs.promiseText}</p>
                </div>
              </div>
              {/* Middle Column - Stats */}
              <div className="lg:col-span-2 flex flex-col items-center justify-center gap-8 my-8 lg:my-0">
                <div className="h-full w-px bg-gradient-to-b from-transparent via-blue-200 to-transparent hidden lg:block"></div>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 lg:gap-8">
                  {aboutUs.stats.map((stat, i) => (
                    <AnimatedStat
                      key={stat.id}
                      value={stat.value}
                      label={stat.label}
                      delay={i * 300}
                      isPercent={stat.label.toLowerCase().includes("satisfaction")}
                    />
                  ))}
                </div>
                <div className="h-full w-px bg-gradient-to-b from-transparent via-blue-200 to-transparent hidden lg:block"></div>
              </div>
              {/* Right Column - Image and Services */}
              <div className="lg:col-span-5">
                <div className="relative rounded-xl overflow-hidden shadow-xl mb-6 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-blue-600/20 z-10 group-hover:from-primary/40 group-hover:to-blue-600/30 transition-all duration-300"></div>
                  <Image
                    src="/images/team-collaboration.png"
                    alt="Team Collaboration"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-20">
                    <p className="text-lg font-medium text-white">
                      &quot;Great people build great companies — and our mission is to bridge the gap between opportunity and talent.&quot;
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100">
                  <h3 className="text-xl font-semibold mb-4">Our Specializations</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {aboutUs.specializations.map((spec) => (
                      <div key={spec.id} className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 transition-colors">
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
                        <span className="text-sm font-medium">{spec.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-10">
              <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
                {aboutUs.teamTitle}
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet Our Team</h2>
              <p className="mt-4 text-muted-foreground md:text-lg max-w-[800px]">
                {aboutUs.teamSubtitle}
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              {aboutUs.teamMembers.map((member) => (
                <Card key={member.id} className="border-none shadow-lg overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-primary to-blue-600"></div>
                  <div className="relative h-64 w-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-4">{member.role}</p>
                    <p className="text-muted-foreground mb-4">{member.bio}</p>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a href={`mailto:${member.email}`} className="text-primary hover:underline text-sm">
                          {member.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-4 mt-3">
                        {member.linkedin && (
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors" aria-label="LinkedIn profile">
                            <Linkedin className="h-5 w-5" />
                          </a>
                        )}
                        {member.twitter && (
                          <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-700 transition-colors" aria-label="Twitter profile">
                            <Twitter className="h-5 w-5" />
                          </a>
                        )}
                        {member.instagram && (
                          <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 transition-colors" aria-label="Instagram profile">
                            <Instagram className="h-5 w-5" />
                          </a>
                        )}
                        {member.website && (
                          <a href={member.website} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 transition-colors" aria-label="Personal website">
                            <Globe className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">
                Our directors oversee the company&apos;s operations, which focus on inclusive recruitment practices, including diversity, equity, inclusion, and belonging (DEIB) initiatives.
              </p>
              <p className="text-muted-foreground">
                For more detailed information about the company&apos;s team or to inquire about career opportunities, you can contact us directly.
              </p>
              <Button className="mt-6">
                <Mail className="mr-2 h-4 w-4" /> Contact Our Team
              </Button>
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
                  <h3 className="text-2xl font-bold">{aboutUs.visionTitle}</h3>
                  <p className="text-muted-foreground">{aboutUs.visionText}</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Briefcase className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{aboutUs.missionSectionTitle}</h3>
                  <p className="text-muted-foreground">{aboutUs.missionSectionText}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{aboutUs.whyChooseUsTitle}</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                {aboutUs.whyChooseUsSubtitle}
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {aboutUs.whyChooseUsCards.map((card) => {
                const Icon = lucideIconMap[card.icon] || Award
                return (
                  <Card key={card.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-medium">{card.title}</h3>
                      <p className="text-muted-foreground">{card.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
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
                  {aboutUs.deibTitle}
                </h2>
                <p className="text-muted-foreground">
                  {aboutUs.deibSubtitle}
                </p>
                {/* Additional static text can be added here if needed */}
                <Tabs defaultValue={aboutUs.tabs[0]?.value || "diversity"} className="w-full mt-4">
                  <TabsList className="grid w-full grid-cols-4">
                    {aboutUs.tabs.map((tab) => (
                      <TabsTrigger key={tab.id} value={tab.value}>
                        {tab.title.split(" ")[0]}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {aboutUs.tabs.map((tab) => (
                    <TabsContent key={tab.id} value={tab.value} className="p-4 border rounded-md mt-2">
                      <div className="flex items-start gap-4">
                        {/* Icon mapping based on tab.icon */}
                        {tab.icon === "diversity" && <Diversity className="h-6 w-6 text-primary mt-1" />}
                        {tab.icon === "scale" && <Scale className="h-6 w-6 text-primary mt-1" />}
                        {tab.icon === "users" && <Users className="h-6 w-6 text-primary mt-1" />}
                        {tab.icon === "heart" && <Heart className="h-6 w-6 text-primary mt-1" />}
                        <div>
                          <h4 className="font-medium">{tab.title}</h4>
                          <p className="text-muted-foreground">{tab.description}</p>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{aboutUs.ctaTitle}</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  {aboutUs.ctaSubtitle}
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg">{aboutUs.ctaButton1Text}</Button>
                <Button variant="outline" size="lg">
                  {aboutUs.ctaButton2Text}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
