import { createFileRoute } from "@tanstack/react-router";
import {
  SiteShell, Hero, Stats, About, Services, Why, Process, Projects,
  Industries, Testimonials, CTABanner, Contact,
} from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: "https://akvndigital.com/og.jpg" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <SiteShell>
      <Hero />
      <Stats />
      <About />
      <Services />
      <Why />
      <Process />
      <Projects />
      <Industries />
      {/* <Testimonials /> */}
      <CTABanner />
      <Contact />
    </SiteShell>
  );
}
