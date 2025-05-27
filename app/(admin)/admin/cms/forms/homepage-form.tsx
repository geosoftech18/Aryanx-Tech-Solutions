"use client"
import { HomepageMainForm } from "./homepage-main-form";
import { HomepageFeatureSlides } from "./homepage-feature-slides";
import { HomepagePartners } from "./homepage-partners";
import { HomepageStats } from "./homepage-stats";
import { HomepageSteps } from "./homepage-steps";
import { HomepageCta } from "./homepage-cta";
import { fetchHomepage } from "@/actions/static/homepage";
import { useEffect, useState } from "react";

export default function HomepageFormWrapper() {
  // State for homepage data and loading
  const [homepage, setHomepage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchHomepage();
        if (isMounted) {
          setHomepage(data.homepage);
        }
      } catch {
        setError("Failed to fetch homepage data.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div>Loading homepage data...</div>;
  if (error) return <div>{error}</div>;
  if (!homepage) return <div>No homepage data found.</div>;
  return (
    <div className="space-y-8">
      <HomepageMainForm initialData={homepage} />
      <HomepageFeatureSlides initialSlides={homepage.featureSlides} />
      <HomepagePartners initialPartners={homepage.partner} />
      <HomepageStats initialStats={homepage.stats} />
      <HomepageSteps initialSteps={homepage.steps} />
      <HomepageCta initialCta={homepage.cta} />
    </div>
  );
} 