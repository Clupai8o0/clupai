import type { MetadataRoute } from "next";

const BASE_URL = "https://clupai.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    // Static pages
    { url: `${BASE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/pricing`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/work`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/writing`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/apps`, lastModified, changeFrequency: "monthly", priority: 0.6 },

    // Service pages
    { url: `${BASE_URL}/services/web`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services/seo`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services/automation`, lastModified, changeFrequency: "monthly", priority: 0.8 },

    // Service Melbourne pages (highest local intent)
    { url: `${BASE_URL}/services/web/melbourne`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services/seo/melbourne`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services/automation/melbourne`, lastModified, changeFrequency: "monthly", priority: 0.9 },

    // Work / case study pages
    { url: `${BASE_URL}/work/king-double-glazing`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/work/hoddle-melbourne`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/work/kairos`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/work/krishnaveni-school`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/work/nmmun`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/work/cuts-and-shavez`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/work/thurman`, lastModified, changeFrequency: "monthly", priority: 0.7 },

    // Writing / post pages
    { url: `${BASE_URL}/writing/agency-light-playbook`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/writing/why-i-stopped-wordpress`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/writing/published-pricing`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/writing/melbourne-local-seo-2026`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/writing/n8n-vs-zapier-vs-make`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/writing/one-cta-per-page`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/writing/scope-four-week-website`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/writing/google-ads-leaky-bucket`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/writing/core-web-vitals`, lastModified, changeFrequency: "monthly", priority: 0.6 },

    // Melbourne suburb pages
    { url: `${BASE_URL}/melbourne/brunswick`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/melbourne/carlton`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/melbourne/richmond`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/melbourne/fitzroy`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/melbourne/collingwood`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/melbourne/northcote`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/melbourne/coburg`, lastModified, changeFrequency: "monthly", priority: 0.8 },

    // Industry pages
    { url: `${BASE_URL}/industries/tradies-trades`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/industries/schools`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/industries/professional-services`, lastModified, changeFrequency: "monthly", priority: 0.8 },

    // Comparison pages
    { url: `${BASE_URL}/compare/wordpress-vs-nextjs`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/compare/webflow-vs-nextjs`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/compare/squarespace-vs-custom`, lastModified, changeFrequency: "monthly", priority: 0.7 },

    // Free tools
    { url: `${BASE_URL}/free-tools/local-schema-generator`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/free-tools/core-web-vitals-audit`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];
}
