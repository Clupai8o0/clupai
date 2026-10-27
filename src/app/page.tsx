import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";
import HomeHero from "@/components/home-hero";
import WorkTile from "@/components/work-tile";
import { PRICING_STRIP } from "@/data/pricing";
import { featuredKits } from "@/lib/kits";
import { visibleCases, type CaseStudy } from "@/data/cases";

const services = [
  {
    h: "Websites",
    k: ["Next.js · Tailwind", "Copy, design, build", "Launch in 3–5 weeks"],
    href: "/services/web",
    art: "/illustrations/services/web.webp",
  },
  {
    h: "SEO",
    k: [
      "Technical + local",
      "Google Business Profile, schema, Core Web Vitals",
      "Content that earns links",
    ],
    href: "/services/seo",
    art: "/illustrations/services/seo.webp",
  },
  {
    h: "Automation",
    k: [
      "Zapier · n8n · Make",
      "Internal tools, dashboards",
      "Integrations that hold",
    ],
    href: "/services/automation",
    art: "/illustrations/services/automation.webp",
  },
];

function ServicesSection() {
  return (
    <section className="hm-section">
      <h2 className="hm-h2">
        Three things. Done properly.
        <br />
        <span className="hm-h2-quiet">Web, SEO, automation.</span>
      </h2>
      <div className="hm-services">
        {services.map((s) => (
          <Link key={s.h} href={s.href} className="hm-service">
            <span className="hm-service-art">
              <Image
                src={s.art}
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 30vw"
              />
            </span>
            <span className="hm-service-name">
              {s.h}
              <ArrowRight size={24} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className="hm-service-points">
              {s.k.map((k) => (
                <span key={k}>{k}</span>
              ))}
            </span>
            <span className="hm-service-quote">Custom quote</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

// Data comes from the case studies, so the numbers here always match /work
const FEATURED = ["king-double-glazing", "hoddle-melbourne", "kairos", "krishnaveni-school"];
const featured = FEATURED.map((slug) => visibleCases.find((c) => c.slug === slug)).filter(
  (c): c is CaseStudy => Boolean(c)
);

function WorkSection() {
  const [lead, ...rest] = featured;

  return (
    <section className="hm-work">
      <div className="hm-head">
        <h2 className="hm-h2">
          Recent builds.
          <br />
          <span className="hm-h2-quiet">Real screens, real results.</span>
        </h2>
        <Link href="/work" className="hm-more">
          All case studies
          <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
        </Link>
      </div>
      {lead && (
        <div className="hm-work-lead">
          <WorkTile c={lead} lead />
        </div>
      )}
      <div className="hm-work-row">
        {rest.map((c) => (
          <WorkTile key={c.slug} c={c} sizes="(max-width: 900px) 100vw, 30vw" />
        ))}
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="hm-section">
      <div className="hm-head">
        <h2 className="hm-h2">
          Priced to the project.
          <br />
          <span className="hm-h2-quiet">Not the template.</span>
        </h2>
        <p className="hm-head-note">
          Every engagement is scoped and quoted up front: fixed, in writing, no
          surprise invoices. Tell us what you&apos;re building and we&apos;ll
          come back with a real number.
        </p>
      </div>
      <div className="hm-tiers">
        {PRICING_STRIP.map(([h, , s, d]) => (
          <div key={h} className="hm-tier">
            <h3>{h}</h3>
            <p className="hm-tier-cadence">{s}</p>
            <p className="hm-tier-desc">{d}</p>
            <Link href="/contact" className="hm-tier-link">
              Book a call
              <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>
        ))}
      </div>
      <div className="hm-tiers-foot">
        <p>Fixed quotes · GST exclusive · no hidden retainers</p>
        <Link href="/pricing" className="cp-btn cp-btn-ghost">
          How we scope &amp; price →
        </Link>
      </div>
    </section>
  );
}

function StudioSection() {
  return (
    <section className="hm-studio">
      <div className="hm-studio-art">
        <Image
          src="/illustrations/studio.webp"
          alt="Illustration: a small Melbourne studio at night, two desks lit by their screens."
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
        />
      </div>
      <div>
        <h2 className="hm-h2">
          The people who scope it build it.
          <br />
          <span className="hm-h2-quiet">No account managers in between.</span>
        </h2>
        <p className="hm-studio-text">
          We started clupai in Melbourne in 2024. Since then we&apos;ve shipped
          platforms for startups, rebuilt a trades business online, and built
          our own scheduling product.
        </p>
        <p className="hm-studio-text">
          We take on a small number of projects so each one ships properly, and
          we reply within one Australian business day.
        </p>
        <p className="hm-studio-meta">ABN registered · Brunswick, Melbourne VIC</p>
        <div className="hm-studio-actions">
          <Link href="/about" className="cp-btn cp-btn-primary">
            How we work →
          </Link>
        </div>
      </div>
    </section>
  );
}

function KitsSection() {
  return (
    <section className="hm-section hm-last">
      <div className="hm-head">
        <h2 className="hm-h2">
          Small tools.
          <br />
          <span className="hm-h2-quiet">Buy once, ship today.</span>
        </h2>
        <p className="hm-head-note">
          Self-serve tools from the studio. More are in progress.
        </p>
      </div>
      <div className="hm-kits">
        {featuredKits.map((kit) => (
          <article key={kit.slug} className="hm-kit">
            <div className="hm-kit-top">
              <h3>{kit.name}</h3>
              <span className="hm-kit-live">Live</span>
            </div>
            <p className="hm-kit-tag">
              {kit.tag} · {kit.tech}
            </p>
            <p className="hm-kit-desc">{kit.desc}</p>
            <div className="hm-kit-foot">
              <span className="hm-kit-price">{kit.price}</span>
              <Link
                href={`/apps#${kit.slug}`}
                className="cp-btn cp-btn-ghost"
                style={{ padding: "8px 14px", fontSize: 13, minHeight: 0 }}
              >
                {kit.price.startsWith("Free") ? "Get it →" : "Buy →"}
              </Link>
            </div>
          </article>
        ))}
      </div>
      <div className="hm-kits-foot">
        <span>Free local-schema tool · No signup</span>
        <Link href="/apps" className="cp-btn cp-btn-primary cp-kits-cta">
          See all kits →
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Nav page="home" />
      <HomeHero />
      <ServicesSection />
      <WorkSection />
      <PricingSection />
      <StudioSection />
      <KitsSection />
      <FinalCTA />
      <Footer />
    </>
  );
}
