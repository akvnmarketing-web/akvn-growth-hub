import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader, About, CTABanner } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AKVN Digital — Dubai Digital Marketing Agency" },
      { name: "description", content: "AKVN Digital is a Dubai, UAE-based digital marketing agency under AKVN Trading FZ LLC (akvntrading.com). We help businesses grow with Google Ads, Meta Ads, SEO, Social Media & Web Development." },
      { property: "og:title", content: "About AKVN Digital — Dubai Digital Marketing Agency" },
      { property: "og:description", content: "A Dubai-based digital growth partner under AKVN Trading FZ LLC." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="About Us"
        title="Your Digital Growth Partner in Dubai, UAE"
        subtitle="A division of AKVN Trading FZ LLC — helping UAE businesses generate leads and grow online."
      />
      <About />
      <CTABanner />
    </SiteShell>
  );
}
