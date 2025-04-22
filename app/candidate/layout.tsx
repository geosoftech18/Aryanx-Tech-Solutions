import Navbar from "@/components/candidate/navbar"

export default function CandidateLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section>
        <Navbar/>
        {children}
        </section>
  }