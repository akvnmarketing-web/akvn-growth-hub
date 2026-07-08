import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader, Contact } from "@/components/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact AKVN Digital — Dubai, UAE | +971 58 292 6466" },
      { name: "description", content: "Contact AKVN Digital in Dubai, UAE. Call or WhatsApp +971 58 292 6466 or email info@akvndigital.com for a free digital marketing consultation." },
      { property: "og:title", content: "Contact AKVN Digital — Dubai, UAE" },
      { property: "og:description", content: "Book your free marketing consultation. Call, WhatsApp or email us today." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Contact"
        title="Let's build your growth engine"
        subtitle="Call, WhatsApp or email — we respond within 24 hours."
      />
      <Contact />
    </SiteShell>
  );
}
