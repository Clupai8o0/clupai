import type { Metadata } from "next";
import RiskCheck from "@/components/risk-check";
import "./start.css";

export const metadata: Metadata = {
  title: "Build Risk Check",
  description:
    "Answer eight questions in about two minutes and get a risk score for your build, plus its three biggest risks and what to do about each this week.",
  alternates: { canonical: "/start" },
};

export default function StartPage()
{
  return <RiskCheck />;
}
