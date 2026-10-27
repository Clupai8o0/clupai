import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy · Clupai" },
  description:
    "How Clupai, a Melbourne web studio, collects, uses and protects your personal information. Written to follow the Australian Privacy Principles.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "2 June 2026";

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    heading: "Who we are",
    body: (
      <>
        <p>
          This site, <strong>clupai.com</strong>, is operated by Sam Limbu
          trading as Clupai (<strong>&ldquo;Clupai&rdquo;</strong>,{" "}
          <strong>&ldquo;we&rdquo;</strong>, <strong>&ldquo;us&rdquo;</strong>{" "}
          or <strong>&ldquo;our&rdquo;</strong>), a web, SEO and automation
          studio based in Brunswick, Victoria, Australia.
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
        <p>
          We respect your privacy. This policy explains what personal
          information we collect, why we collect it, how we use and protect it,
          and the choices you have. We handle personal information in line with
          the Australian Privacy Principles (APPs) under the Privacy Act 1988
          (Cth).
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    heading: "Information we collect",
    body: (
      <>
        <h3>Information you give us</h3>
        <p>
          When you submit a form, request a quote, book a call or email us, we
          collect the details you choose to provide. Depending on the form, that
          can include your name, email address, phone number, business name,
          budget range, project goals and the content of your message.
        </p>
        <h3>SMS opt-in</h3>
        <p>
          If you tick the SMS consent box on a form, we record that you opted
          in, the phone number you provided and the time and wording of your
          consent. We keep these consent records so we can honour your choices
          and meet our obligations under the Spam Act 2003 (Cth). You can opt
          out at any time by replying STOP to a message from us.
        </p>
        <h3>Bookings</h3>
        <p>
          When you book a call, our scheduling provider collects the details you
          enter, such as your name, email, the time you choose and any notes you
          add.
        </p>
        <h3>Information collected automatically</h3>
        <p>
          When you visit the site, we and our analytics providers collect
          standard technical information, including pages viewed, the pages that
          referred you, your approximate location derived from your IP address,
          your device and browser type, and similar usage data. We use this to
          understand how the site is used and to keep it fast and reliable.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    heading: "How we use your information",
    body: (
      <>
        <p>We use the information we collect to:</p>
        <ul>
          <li>respond to your enquiry and provide a quote;</li>
          <li>deliver and manage the services you engage us for;</li>
          <li>
            send confirmation and transactional emails relating to your enquiry
            or booking;
          </li>
          <li>
            run the short SMS qualifying conversation, where you have opted in;
          </li>
          <li>operate, improve and secure the site;</li>
          <li>
            keep records and meet our legal, tax and regulatory obligations.
          </li>
        </ul>
        <p>
          We do not sell your personal information, and we do not use it for
          purposes unrelated to those above without telling you first.
        </p>
      </>
    ),
  },
  {
    id: "sms-and-marketing",
    heading: "SMS and marketing messages",
    body: (
      <>
        <p>
          We only text people who opt in on one of our forms. Our first message
          identifies us as Clupai and includes a working opt-out (reply STOP).
          After that, an automated assistant may hold a short qualifying
          conversation with you. You can stop messages at any time by replying
          STOP, and resume by replying START.
        </p>
        <p>
          Openers are sent only within reasonable hours (9am to 8pm Melbourne
          time). We never quote prices over SMS. Your opt-in and any opt-out are
          stored as durable records so we can respect your preference.
        </p>
      </>
    ),
  },
  {
    id: "cookies-analytics",
    heading: "Cookies and analytics",
    body: (
      <>
        <p>
          The site uses cookies and similar technologies, together with
          analytics and performance tools, to measure traffic and improve the
          experience. These may set identifiers in your browser.
        </p>
        <p>
          You can control or delete cookies through your browser settings, and
          you can opt out of Google Analytics using the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Analytics Opt-out Browser Add-on
          </a>
          . Blocking cookies may affect how some parts of the site work.
        </p>
      </>
    ),
  },
  {
    id: "who-we-share-with",
    heading: "Who we share it with",
    body: (
      <>
        <p>
          We share personal information only with the service providers that
          help us run the studio and the site, and only so they can perform
          their service for us. These currently include:
        </p>
        <ul>
          <li>
            <strong>Vercel:</strong> website hosting, analytics and performance
            monitoring;
          </li>
          <li>
            <strong>Google Analytics:</strong> site usage measurement;
          </li>
          <li>
            <strong>Resend:</strong> sending transactional and confirmation
            emails;
          </li>
          <li>
            <strong>Twilio:</strong> sending and receiving SMS;
          </li>
          <li>
            <strong>Anthropic:</strong> the AI assistant that powers the SMS
            conversation;
          </li>
          <li>
            <strong>Cal.com:</strong> call scheduling and bookings;
          </li>
          <li>
            <strong>Upstash:</strong> secure storage of consent and related
            records.
          </li>
        </ul>
        <p>
          We may also disclose information where required by law, to protect our
          rights, or as part of a sale or restructure of the business. We do not
          sell your information to third parties.
        </p>
      </>
    ),
  },
  {
    id: "overseas",
    heading: "Overseas disclosure",
    body: (
      <p>
        Some of the providers listed above store or process information on
        servers located outside Australia, including in the United States and
        Europe. Where this happens, we take reasonable steps to ensure your
        information is handled in line with this policy and applicable privacy
        law.
      </p>
    ),
  },
  {
    id: "retention",
    heading: "How long we keep it",
    body: (
      <p>
        We keep personal information only for as long as we need it for the
        purpose it was collected, or for as long as the law requires us to.
        Enquiry and project records are retained for our business and tax
        records. Consent and opt-out records are kept so we can continue to
        honour your choices. When information is no longer needed, we take
        reasonable steps to delete or de-identify it.
      </p>
    ),
  },
  {
    id: "security",
    heading: "How we protect it",
    body: (
      <p>
        We take reasonable steps to protect personal information from misuse,
        loss, and unauthorised access, modification or disclosure, including
        through reputable providers and access controls. No method of
        transmission or storage is completely secure, so we cannot guarantee
        absolute security, but we work to protect your information and to
        respond promptly if an issue arises.
      </p>
    ),
  },
  {
    id: "your-rights",
    heading: "Your rights and choices",
    body: (
      <>
        <p>You can ask us to:</p>
        <ul>
          <li>access the personal information we hold about you;</li>
          <li>correct information that is inaccurate or out of date;</li>
          <li>stop sending you messages, at any time;</li>
          <li>
            delete your information, where we are not required to keep it.
          </li>
        </ul>
        <p>
          To make a request, email{" "}
          <a href="mailto:hello@clupai.com">hello@clupai.com</a>. We will respond
          within a reasonable time. If you are not satisfied with how we handle a
          privacy matter, you can contact the Office of the Australian
          Information Commissioner (OAIC) at{" "}
          <a
            href="https://www.oaic.gov.au"
            target="_blank"
            rel="noopener noreferrer"
          >
            oaic.gov.au
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "children",
    heading: "Children",
    body: (
      <p>
        The site and our services are intended for businesses and adults. We do
        not knowingly collect personal information from children. If you believe
        a child has provided us with information, please contact us and we will
        delete it.
      </p>
    ),
  },
  {
    id: "third-party-links",
    heading: "Links to other sites",
    body: (
      <p>
        Our site may link to other websites and tools that we do not control.
        This policy does not cover those sites. We encourage you to read the
        privacy policy of any site you visit through a link from ours.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time as our practices, providers
        or the law change. When we do, we will update the date at the top of
        this page. Significant changes will be reflected here, so please check
        back occasionally.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact us",
    body: (
      <p>
        Questions about this policy or your personal information? Email us at{" "}
        <a href="mailto:hello@clupai.com">hello@clupai.com</a> and we will reply
        within one Australian business day. You can also read our{" "}
        <Link href="/terms">Terms of Service</Link>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal · Privacy Policy"
      title="Privacy Policy"
      updated={UPDATED}
      intro="This policy explains what information we collect when you use clupai.com or get in touch, how we use it, and the choices you have. We keep it plain and we keep it honest."
      sections={sections}
    />
  );
}
