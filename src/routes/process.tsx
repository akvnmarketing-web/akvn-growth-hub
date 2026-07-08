import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader, Process, CTABanner } from "@/components/site";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Our Process — 7-Step Growth System | AKVN Digital Dubai" },
      { name: "description", content: "Our proven 7-step growth process: discovery, strategy, creative, campaign setup, launch, optimization and scale — used by AKVN Digital across UAE clients." },
      { property: "og:title", content: "AKVN Digital Process — 7-Step Growth System" },
      { property: "og:description", content: "How we take UAE businesses from strategy to scale." },
    ],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="How We Work"
        title="A proven 7-step growth system"
        subtitle="Disciplined, transparent and built to compound results month after month."
      />
      <Process />
      <CTABanner />
    </SiteShell>
  );
}
