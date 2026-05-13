"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";

const BUSINESS_TYPES = [
  "LocalBusiness",
  "Restaurant",
  "MedicalBusiness",
  "LegalService",
  "FinancialService",
  "HomeAndConstructionBusiness",
  "FoodEstablishment",
  "SportsActivityLocation",
  "Store",
  "Plumber",
  "Electrician",
  "GeneralContractor",
  "AutoRepair",
  "HairSalon",
  "other",
];

const PRICE_RANGES = ["$", "$$", "$$$", "$$$$"];

const DAYS = [
  { key: "Monday", label: "Mon" },
  { key: "Tuesday", label: "Tue" },
  { key: "Wednesday", label: "Wed" },
  { key: "Thursday", label: "Thu" },
  { key: "Friday", label: "Fri" },
  { key: "Saturday", label: "Sat" },
  { key: "Sunday", label: "Sun" },
];

interface HourEntry {
  enabled: boolean;
  opens: string;
  closes: string;
}

interface FormState {
  name: string;
  type: string;
  customType: string;
  street: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
  phone: string;
  website: string;
  description: string;
  priceRange: string;
  latitude: string;
  longitude: string;
  sameAs: string;
  image: string;
  googleBusiness: string;
  hours: Record<string, HourEntry>;
}

const defaultHours: Record<string, HourEntry> = Object.fromEntries(
  DAYS.map((d) => [
    d.key,
    { enabled: false, opens: "09:00", closes: "17:00" },
  ])
);

const initialState: FormState = {
  name: "",
  type: "LocalBusiness",
  customType: "",
  street: "",
  suburb: "Melbourne",
  state: "VIC",
  postcode: "",
  country: "AU",
  phone: "",
  website: "",
  description: "",
  priceRange: "",
  latitude: "",
  longitude: "",
  sameAs: "",
  image: "",
  googleBusiness: "",
  hours: defaultHours,
};

const inputStyle: React.CSSProperties = {
  border: "1px solid var(--border)",
  background: "var(--surface)",
  color: "var(--text)",
  padding: "10px 12px",
  borderRadius: "var(--radius)",
  fontSize: 14,
  fontFamily: "inherit",
  width: "100%",
  outline: "none",
  transition: "border-color 0.15s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  color: "var(--text-muted)",
  marginBottom: 6,
  fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
};

function buildSchema(form: FormState): Record<string, unknown> {
  const resolvedType =
    form.type === "other" && form.customType.trim()
      ? form.customType.trim()
      : form.type === "other"
        ? "LocalBusiness"
        : form.type;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": resolvedType,
  };

  if (form.name.trim()) schema.name = form.name.trim();
  if (form.description.trim()) schema.description = form.description.trim();
  if (form.website.trim()) schema.url = form.website.trim();
  if (form.phone.trim()) schema.telephone = form.phone.trim();
  if (form.priceRange) schema.priceRange = form.priceRange;
  if (form.image.trim()) schema.image = form.image.trim();

  // Address — only if at least street or suburb is filled
  if (form.street.trim() || form.suburb.trim()) {
    const address: Record<string, string> = {
      "@type": "PostalAddress",
    };
    if (form.street.trim()) address.streetAddress = form.street.trim();
    if (form.suburb.trim()) address.addressLocality = form.suburb.trim();
    if (form.state.trim()) address.addressRegion = form.state.trim();
    if (form.postcode.trim()) address.postalCode = form.postcode.trim();
    if (form.country.trim()) address.addressCountry = form.country.trim();
    schema.address = address;
  }

  // Geo
  if (form.latitude.trim() && form.longitude.trim()) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: parseFloat(form.latitude),
      longitude: parseFloat(form.longitude),
    };
  }

  // Opening hours spec
  const openHours = DAYS.filter((d) => form.hours[d.key]?.enabled);
  if (openHours.length > 0) {
    schema.openingHoursSpecification = openHours.map((d) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${d.key}`,
      opens: form.hours[d.key].opens,
      closes: form.hours[d.key].closes,
    }));
  }

  // sameAs
  const sameAsLines = form.sameAs
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  if (sameAsLines.length === 1) schema.sameAs = sameAsLines[0];
  else if (sameAsLines.length > 1) schema.sameAs = sameAsLines;

  // Google Business Profile — add to sameAs array
  if (form.googleBusiness.trim()) {
    const existing = schema.sameAs;
    if (Array.isArray(existing)) {
      schema.sameAs = [...existing, form.googleBusiness.trim()];
    } else if (typeof existing === "string") {
      schema.sameAs = [existing, form.googleBusiness.trim()];
    } else {
      schema.sameAs = form.googleBusiness.trim();
    }
  }

  return schema;
}

export default function LocalSchemaGenerator() {
  const [form, setForm] = useState<FormState>(initialState);
  const [copied, setCopied] = useState(false);

  const set = useCallback(
    (key: keyof Omit<FormState, "hours">, value: string) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const setHour = useCallback(
    (day: string, field: keyof HourEntry, value: string | boolean) => {
      setForm((prev) => ({
        ...prev,
        hours: {
          ...prev.hours,
          [day]: { ...prev.hours[day], [field]: value },
        },
      }));
    },
    []
  );

  const schema = buildSchema(form);
  const jsonString = JSON.stringify(schema, null, 2);

  const handleCopy = useCallback(() => {
    const scriptTag = `<script type="application/ld+json">\n${jsonString}\n</script>`;
    navigator.clipboard.writeText(scriptTag).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [jsonString]);

  return (
    <>
      <Nav />

      {/* Header */}
      <div
        style={{
          padding: "56px 48px 48px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="cp-eyebrow" style={{ marginBottom: 12 }}>
          Free tool · No signup
        </div>
        <h1
          className="cp-display"
          style={{
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            margin: "0 0 16px",
          }}
        >
          LocalBusiness Schema Generator
        </h1>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: 17,
            lineHeight: 1.6,
            maxWidth: 640,
            margin: 0,
          }}
        >
          Generate your LocalBusiness JSON-LD in under two minutes. Paste it
          into your site&apos;s{" "}
          <code
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 14,
              color: "var(--accent)",
              background: "var(--surface)",
              padding: "1px 6px",
              borderRadius: 2,
            }}
          >
            &lt;head&gt;
          </code>{" "}
          — or ask your developer to. No account needed.
        </p>
      </div>

      {/* Main tool area */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          minHeight: "70vh",
          alignItems: "start",
        }}
      >
        {/* Left: form */}
        <div
          style={{
            padding: "40px 48px",
            borderRight: "1px solid var(--border)",
          }}
        >
          {/* Business details */}
          <section style={{ marginBottom: 32 }}>
            <div
              className="cp-eyebrow"
              style={{ marginBottom: 20, color: "var(--text-dim)" }}
            >
              Business details
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={labelStyle}>
                  Business name <span style={{ color: "var(--accent)" }}>*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Ace Plumbing Melbourne"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Business type <span style={{ color: "var(--accent)" }}>*</span>
                </label>
                <select
                  value={form.type}
                  onChange={(e) => set("type", e.target.value)}
                  style={inputStyle}
                >
                  {BUSINESS_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t === "other" ? "Other (specify below)" : t}
                    </option>
                  ))}
                </select>
              </div>

              {form.type === "other" && (
                <div>
                  <label style={labelStyle}>Custom type</label>
                  <input
                    type="text"
                    value={form.customType}
                    onChange={(e) => set("customType", e.target.value)}
                    placeholder="e.g. Dentist"
                    style={inputStyle}
                  />
                </div>
              )}

              <div>
                <label style={labelStyle}>Phone <span style={{ color: "var(--accent)" }}>*</span></label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="+61 3 9000 0000"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Website URL</label>
                <input
                  type="url"
                  value={form.website}
                  onChange={(e) => set("website", e.target.value)}
                  placeholder="https://aceplumbing.com.au"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  placeholder="A short description of your business and what you do..."
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>
            </div>
          </section>

          {/* Address */}
          <section style={{ marginBottom: 32 }}>
            <div
              className="cp-eyebrow"
              style={{ marginBottom: 20, color: "var(--text-dim)" }}
            >
              Address
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={labelStyle}>
                  Street address <span style={{ color: "var(--accent)" }}>*</span>
                </label>
                <input
                  type="text"
                  value={form.street}
                  onChange={(e) => set("street", e.target.value)}
                  placeholder="42 Smith Street"
                  style={inputStyle}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 80px",
                  gap: 12,
                }}
              >
                <div>
                  <label style={labelStyle}>
                    Suburb/City <span style={{ color: "var(--accent)" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={form.suburb}
                    onChange={(e) => set("suburb", e.target.value)}
                    placeholder="Melbourne"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>
                    State <span style={{ color: "var(--accent)" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={form.state}
                    onChange={(e) => set("state", e.target.value)}
                    placeholder="VIC"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 80px",
                  gap: 12,
                }}
              >
                <div>
                  <label style={labelStyle}>
                    Postcode <span style={{ color: "var(--accent)" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={form.postcode}
                    onChange={(e) => set("postcode", e.target.value)}
                    placeholder="3000"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>
                    Country <span style={{ color: "var(--accent)" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={form.country}
                    onChange={(e) => set("country", e.target.value)}
                    placeholder="AU"
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Opening hours */}
          <section style={{ marginBottom: 32 }}>
            <div
              className="cp-eyebrow"
              style={{ marginBottom: 20, color: "var(--text-dim)" }}
            >
              Opening hours
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {DAYS.map((d) => {
                const h = form.hours[d.key];
                return (
                  <div
                    key={d.key}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "80px 1fr 1fr",
                      gap: 8,
                      alignItems: "center",
                    }}
                  >
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={h.enabled}
                        onChange={(e) =>
                          setHour(d.key, "enabled", e.target.checked)
                        }
                        style={{ accentColor: "var(--accent)", width: 14, height: 14 }}
                      />
                      <span
                        style={{
                          fontFamily:
                            "var(--font-mono), 'JetBrains Mono', monospace",
                          fontSize: 11,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: h.enabled
                            ? "var(--text)"
                            : "var(--text-dim)",
                        }}
                      >
                        {d.label}
                      </span>
                    </label>
                    <input
                      type="time"
                      value={h.opens}
                      disabled={!h.enabled}
                      onChange={(e) => setHour(d.key, "opens", e.target.value)}
                      style={{
                        ...inputStyle,
                        opacity: h.enabled ? 1 : 0.3,
                        cursor: h.enabled ? "text" : "not-allowed",
                      }}
                    />
                    <input
                      type="time"
                      value={h.closes}
                      disabled={!h.enabled}
                      onChange={(e) =>
                        setHour(d.key, "closes", e.target.value)
                      }
                      style={{
                        ...inputStyle,
                        opacity: h.enabled ? 1 : 0.3,
                        cursor: h.enabled ? "text" : "not-allowed",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </section>

          {/* Extra details */}
          <section style={{ marginBottom: 32 }}>
            <div
              className="cp-eyebrow"
              style={{ marginBottom: 20, color: "var(--text-dim)" }}
            >
              Extra details
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={labelStyle}>Price range</label>
                <select
                  value={form.priceRange}
                  onChange={(e) => set("priceRange", e.target.value)}
                  style={inputStyle}
                >
                  <option value="">None selected</option>
                  {PRICE_RANGES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
              >
                <div>
                  <label style={labelStyle}>Latitude</label>
                  <input
                    type="text"
                    value={form.latitude}
                    onChange={(e) => set("latitude", e.target.value)}
                    placeholder="-37.8136"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Longitude</label>
                  <input
                    type="text"
                    value={form.longitude}
                    onChange={(e) => set("longitude", e.target.value)}
                    placeholder="144.9631"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Image URL</label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => set("image", e.target.value)}
                  placeholder="https://aceplumbing.com.au/logo.jpg"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Google Business Profile URL</label>
                <input
                  type="url"
                  value={form.googleBusiness}
                  onChange={(e) => set("googleBusiness", e.target.value)}
                  placeholder="https://maps.google.com/?cid=..."
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Social / other URLs (one per line)
                </label>
                <textarea
                  value={form.sameAs}
                  onChange={(e) => set("sameAs", e.target.value)}
                  placeholder={`https://facebook.com/aceplumbing\nhttps://instagram.com/aceplumbing`}
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right: live output */}
        <div
          style={{
            position: "sticky",
            top: 65,
            padding: "40px 48px",
            height: "calc(100vh - 65px)",
            overflow: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <div
              className="cp-eyebrow"
              style={{ color: "var(--text-dim)" }}
            >
              Generated JSON-LD
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="cp-btn cp-btn-primary"
              style={{
                padding: "8px 16px",
                fontSize: 13,
                minHeight: "unset",
                gap: 6,
              }}
            >
              {copied ? (
                <>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M2 6.5l3 3 6-6" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="4" y="4" width="8" height="8" rx="1" />
                    <path d="M9 4V2a1 1 0 00-1-1H2a1 1 0 00-1 1v6a1 1 0 001 1h2" />
                  </svg>
                  Copy JSON-LD
                </>
              )}
            </button>
          </div>

          <div
            style={{
              background: "#0a0a0a",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "20px 24px",
              overflow: "auto",
            }}
          >
            <pre
              style={{
                margin: 0,
                fontFamily:
                  "var(--font-mono), 'JetBrains Mono', 'Fira Code', ui-monospace, monospace",
                fontSize: 12,
                lineHeight: 1.7,
                color: "#c9d1d9",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
              }}
            >
              <code>{`<script type="application/ld+json">\n${jsonString}\n</script>`}</code>
            </pre>
          </div>

          <p
            style={{
              marginTop: 12,
              fontSize: 12,
              color: "var(--text-dim)",
              fontFamily: "var(--font-mono), monospace",
              letterSpacing: "0.04em",
            }}
          >
            Paste this block inside your site&apos;s{" "}
            <code style={{ color: "var(--accent)" }}>&lt;head&gt;</code>.
          </p>
        </div>
      </div>

      {/* Explainer + callout */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "72px 48px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "start",
        }}
      >
        <div>
          <h2
            className="cp-display"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.25rem)", margin: "0 0 20px" }}
          >
            Why LocalBusiness schema matters
          </h2>
          <div
            style={{
              color: "var(--text-muted)",
              fontSize: 16,
              lineHeight: 1.7,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <p style={{ margin: 0 }}>
              Google&apos;s crawlers read your website&apos;s HTML, but structured
              data gives them a precise, machine-readable summary of who you are
              and where you operate. LocalBusiness JSON-LD tells Google your
              business name, address, phone number (NAP), and opening hours in
              a format it can trust — without guessing from your page copy.
            </p>
            <p style={{ margin: 0 }}>
              When Google is confident in your NAP data, it&apos;s more likely to
              surface your business in the local pack, Maps results, and the
              Knowledge Panel that appears when someone searches your brand
              directly. Schema also reinforces your Google Business Profile
              listing, which is the single biggest lever for local search
              visibility in competitive Australian markets.
            </p>
            <p style={{ margin: 0 }}>
              Implementing schema correctly — consistent with the rest of your
              site&apos;s signals — is a foundational step in any serious local SEO
              strategy. It&apos;s fast to add and has no downside.
            </p>
          </div>
        </div>

        <div
          className="cp-card"
          style={{
            padding: "32px 36px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div>
            <div className="cp-eyebrow" style={{ marginBottom: 10 }}>
              Want it done properly?
            </div>
            <h3
              className="cp-display"
              style={{ fontSize: "1.5rem", margin: "0 0 12px" }}
            >
              Schema across your whole site — not just one block
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.6, margin: 0 }}>
              This tool generates your base LocalBusiness block. But a complete
              schema implementation covers breadcrumbs, service pages, FAQ
              markup, reviews, and more. That&apos;s part of every web build and SEO
              engagement we take on.
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/services/web" className="cp-btn cp-btn-primary">
              Web builds
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </Link>
            <Link href="/contact" className="cp-btn cp-btn-ghost">
              Get in touch
            </Link>
          </div>
        </div>
      </div>

      <FinalCTA />
      <Footer />
    </>
  );
}
