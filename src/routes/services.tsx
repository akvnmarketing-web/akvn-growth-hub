import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader, Services, Why, Industries, CTABanner } from "@/components/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Google Ads, Meta Ads, SEO, Web Development | AKVN Digital" },
      { name: "description", content: "Explore AKVN Digital's services: Google Ads, Meta Ads, SEO, Social Media Marketing, Website & App Development, Media Buying and AI marketing solutions in UAE." },
      { property: "og:title", content: "AKVN Digital Services — Dubai UAE" },
      { property: "og:description", content: "Everything you need to win online — from strategy to execution." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Our Services"
        title="Everything you need to win online"
        subtitle="Performance marketing, high-converting websites and AI-powered growth systems."
      />
      <Services />
      <Why />
      <Industries />
      <CTABanner />
    </SiteShell>
  );
}
