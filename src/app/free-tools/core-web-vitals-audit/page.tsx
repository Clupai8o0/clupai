import type { Metadata } from "next";
import CWVAudit from "./cwv-audit";

export const metadata: Metadata = {
  title: "Free Core Web Vitals Audit",
  description:
    "Check your Core Web Vitals score for free: LCP, INP, and CLS. Powered by Google PageSpeed Insights. No signup.",
  alternates: { canonical: "/free-tools/core-web-vitals-audit" },
};

export default function CWVAuditPage() {
  return <CWVAudit />;
}
