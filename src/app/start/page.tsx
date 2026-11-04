import type { Metadata } from "next";
import RiskCheck from "@/components/risk-check";

export const metadata: Metadata = {
  title: "Build Risk Check",
  description:
    "Eight questions, two minutes. You get a score, your top three risks, and one thing to do about each this week.",
  alternates: { canonical: "/start" },
};

export default function StartPage()
{
  return <RiskCheck />;
}
