import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: { absolute: "Terms of Service · Clupai" },
  description:
    "The terms that govern your use of clupai.com, our free tools, enquiries and bookings. Clupai is a Melbourne web, SEO and automation studio.",
  alternates: { canonical: "/terms" },
};

const UPDATED = "2 June 2026";

const sections: LegalSection[] = [
  {
    id: "about-these-terms",
    heading: "About these terms",
    body: (
      <>
        <p>
          These terms govern your use of <strong>clupai.com</strong> and the
          tools, content and forms on it. By using the site, you agree to these
          terms. If you do not agree, please do not use the site.
        </p>
        <p>
          These are website terms, not a services contract. Any paid work we do
          for you is governed by a separate written agreement and quote for that
          project. Where that agreement and these terms differ, the agreement
          takes precedence for that engagement.
        </p>
      </>
    ),
  },
  {
    id: "who-we-are",
    heading: "Who we are",
    body: (
      <>
        <p>
          The site is operated by Sam Limbu trading as Clupai (
          <strong>&ldquo;Clupai&rdquo;</strong>,{" "}
          <strong>&ldquo;we&rdquo;</strong>, <strong>&ldquo;us&rdquo;</strong>{" "}
          or <strong>&ldquo;our&rdquo;</strong>), a web, SEO and automation
          studio based in Melbourne, Australia.
        </p>
        <ul>
          <li>
            <strong>ABN:</strong> 56 228 849 452
          </li>
          <li>
            <strong>Location:</strong> Brunswick, Victoria, Australia
          </li>
          <li>
            <strong>Contact:</strong>{" "}
            <a href="mailto:hello@clupai.com">hello@clupai.com</a>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "using-the-site",
    heading: "Using the site",
    body: (
      <>
        <p>You agree to use the site lawfully and reasonably. You will not:</p>
        <ul>
          <li>
            use the site in any way that breaches a law or infringes the rights
            of others;
          </li>
          <li>
            attempt to gain unauthorised access to the site, its systems or its
            data;
          </li>
          <li>
            interfere with, disrupt or place an unreasonable load on the site;
          </li>
          <li>
            scrape, harvest or copy content at scale, or use it to train models,
            without our permission;
          </li>
          <li>
            submit false, misleading or harmful information through our forms.
          </li>
        </ul>
        <p>
          We may suspend or restrict access to the site, or remove content, if
          we reasonably believe these terms have been breached.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    heading: "Intellectual property",
    body: (
      <p>
        Unless stated otherwise, the design, text, code, graphics and brand
        marks on the site are owned by us or licensed to us, and are protected
        by intellectual property laws. You may view and use the site for your
        own information and to consider engaging us. You may not copy,
        reproduce, republish or exploit any part of it for commercial purposes
        without our written permission.
      </p>
    ),
  },
  {
    id: "free-tools",
    heading: "Free tools and resources",
    body: (
      <p>
        We offer free tools, audits, guides and other resources on the site.
        These are provided for general information only, on an as-is basis, and
        without warranty of any kind. They are not professional, legal,
        financial or technical advice for your specific situation. Any results,
        scores or recommendations they produce are indicative, and you should
        use your own judgement before acting on them.
      </p>
    ),
  },
  {
    id: "enquiries-quotes-bookings",
    heading: "Enquiries, quotes and bookings",
    body: (
      <p>
        Submitting a form, requesting a quote or booking a call does not create
        a binding contract for work. Any pricing shown or discussed before a
        signed agreement is indicative only. When we take on a project, we
        provide a firm, fixed quote in a written agreement. If the scope of a
        project changes, we will tell you and agree it with you before we bill
        for the change.
      </p>
    ),
  },
  {
    id: "communications",
    heading: "Communications and SMS",
    body: (
      <p>
        If you tick the SMS consent box on a form, you agree that we may text
        you, including via an automated assistant, about your enquiry. Our first
        message identifies us as Clupai and explains how to opt out. You can
        stop messages at any time by replying STOP. For more on how we handle
        your information, see our <Link href="/privacy">Privacy Policy</Link>.
      </p>
    ),
  },
  {
    id: "third-party",
    heading: "Third-party links and services",
    body: (
      <p>
        The site may link to, or rely on, third-party websites, tools and
        services that we do not control, such as our scheduling and analytics
        providers. We are not responsible for the content, availability or
        practices of those third parties, and your use of them may be subject to
        their own terms.
      </p>
    ),
  },
  {
    id: "disclaimers",
    heading: "Disclaimers",
    body: (
      <p>
        The site is provided on an as-is and as-available basis. While we work
        to keep it accurate, fast and online, we do not warrant that it will be
        uninterrupted, error-free or free of harmful components, or that the
        information on it is complete or current at all times. Content on the
        site is general in nature and is not advice for your specific
        circumstances.
      </p>
    ),
  },
  {
    id: "consumer-law",
    heading: "Australian Consumer Law",
    body: (
      <p>
        Nothing in these terms excludes, restricts or modifies any consumer
        guarantee, right or remedy you have under the Australian Consumer Law or
        other laws that cannot lawfully be excluded. Where those laws apply, our
        liability for failing to meet a guarantee is limited, to the extent
        permitted, to resupplying the relevant service or paying the cost of
        having it resupplied.
      </p>
    ),
  },
  {
    id: "liability",
    heading: "Limitation of liability",
    body: (
      <p>
        To the maximum extent permitted by law, and subject to the section above
        on the Australian Consumer Law, we are not liable for any indirect,
        incidental or consequential loss, or any loss of profits, revenue, data
        or goodwill, arising from your use of the site or these terms. You use
        the site at your own risk.
      </p>
    ),
  },
  {
    id: "indemnity",
    heading: "Indemnity",
    body: (
      <p>
        You agree to indemnify us against any claim, loss or cost we reasonably
        incur arising from your misuse of the site, your breach of these terms,
        or your breach of the rights of another person.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to the site and these terms",
    body: (
      <p>
        We may update, suspend or withdraw any part of the site at any time, and
        we may revise these terms from time to time. When we change these terms,
        we will update the date at the top of this page. Your continued use of
        the site after a change means you accept the updated terms.
      </p>
    ),
  },
  {
    id: "governing-law",
    heading: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of Victoria, Australia. You and we
        submit to the non-exclusive jurisdiction of the courts of Victoria and
        the courts that hear appeals from them.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact us",
    body: (
      <p>
        Questions about these terms? Email us at{" "}
        <a href="mailto:hello@clupai.com">hello@clupai.com</a> and we will reply
        within one Australian business day. You can also read our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal · Terms of Service"
      title="Terms of Service"
      updated={UPDATED}
      intro="These terms cover how you can use clupai.com, our free tools, and our enquiry and booking forms. Paid work is always governed by a separate written agreement for that project."
      sections={sections}
    />
  );
}
