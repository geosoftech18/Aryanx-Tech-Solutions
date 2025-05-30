import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers/sessionProvider";
import Navbar from "@/components/candidate/navbar";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AryanXTech Solutions",
  description: "AryanXTech Solutions",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  // console.log(session);
  return (
    <html lang="en">
      <body className={``}>
        <Providers>
          <Navbar session={session} />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
