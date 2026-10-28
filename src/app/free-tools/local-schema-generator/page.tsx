import type { Metadata } from "next";
import LocalSchemaGenerator from "./schema-generator";

export const metadata: Metadata = {
  title: "Free LocalBusiness Schema Generator",
  description:
    "Generate a LocalBusiness JSON-LD schema block for your business: free, no signup. Covers address, hours, phone, social links, price range, and geo coordinates.",
  alternates: { canonical: "/free-tools/local-schema-generator" },
};

export default function LocalSchemaGeneratorPage() {
  return <LocalSchemaGenerator />;
}
