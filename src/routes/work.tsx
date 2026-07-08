import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader, Projects, Testimonials, CTABanner } from "@/components/site";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Our Work — Featured Projects | AKVN Digital Dubai" },
      { name: "description", content: "Featured digital marketing and web development projects delivered by AKVN Digital across UAE — Google Ads, Meta Ads, SEO, real estate, healthcare, F&B and e-commerce." },
      { property: "og:title", content: "AKVN Digital — Featured Projects" },
      { property: "og:description", content: "Work that moved the needle for UAE businesses." },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Featured Projects"
        title="Work that moved the needle"
        subtitle="A snapshot of campaigns and builds we've shipped for UAE brands."
      />
      <Projects />
      <Testimonials />
      <CTABanner />
    </SiteShell>
  );
}
