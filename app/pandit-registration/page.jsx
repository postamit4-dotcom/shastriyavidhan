import Link from "next/link";
import {
  Check,
  ChevronRight,
  ClipboardCheck,
  FileText,
  Languages,
  MapPin,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import PanditJiPicture, { panditJiImage } from "@/components/PanditJiPicture";
import PanditRegistrationActions from "@/components/PanditRegistrationActions";
import PanditRegistrationForm from "@/components/PanditRegistrationForm";
import { contact, site } from "@/lib/site-data";
import { absoluteUrl, basePageMetadata, breadcrumbJsonLd } from "@/lib/seo";

const title = "Pandit Registration | Join Shastriya Vidhan";
const description =
  "Qualified Pandit Ji can apply to join Shastriya Vidhan. Submit your city, experience, languages and puja specializations for manual review.";
const pagePath = "/pandit-registration";

export const metadata = basePageMetadata({
  title,
  description,
  path: pagePath,
  image: panditJiImage.og,
  imageAlt: "Pandit Ji speaking during a Shastriya Vidhan puja gathering",
});

const eligibilityItems = [
  "Pandit Ji, Acharya, Purohit, Katha Vachak, or qualified ritual specialist.",
  "Knowledge of the pujas or paths selected in the application.",
  "Ability to explain vidhi and samagri clearly to families.",
  "Professional and respectful communication.",
  "Willingness to provide accurate profile and verification information.",
  "Ability to serve selected home, temple, or online-puja locations.",
  "Commitment to punctuality and transparent coordination.",
];

const benefits = [
  {
    title: "Relevant Puja Enquiries",
    body:
      "Receive enquiries that match location, specialization, language, and availability when suitable requests are available.",
    icon: MapPin,
  },
  {
    title: "Professional Profile",
    body: "Present verified qualifications, puja experience, languages, and service areas.",
    icon: UserCheck,
  },
  {
    title: "Flexible Availability",
    body: "Share the days, times, service modes, and travel areas you can support.",
    icon: ClipboardCheck,
  },
  {
    title: "Clear Coordination",
    body: "Receive structured information about the requested puja, location, timing, and family requirements.",
    icon: FileText,
  },
  {
    title: "Wider Reach",
    body: "Help families looking for Vedic puja services at home, at temples, or online.",
    icon: Languages,
  },
  {
    title: "Support During Onboarding",
    body: "Get guidance about profile completion and verification requirements.",
    icon: ShieldCheck,
  },
];

const processSteps = [
  {
    title: "Submit Basic Details",
    body: "Provide contact details, location, languages, and experience.",
  },
  {
    title: "Add Puja Specializations",
    body: "Select rituals, paths, ceremonies, service modes, and preferred areas.",
  },
  {
    title: "Manual Application Review",
    body: "The team checks whether the profile matches current network requirements.",
  },
  {
    title: "Secure Verification",
    body:
      "Shortlisted applicants may be asked for identity, qualification, and experience evidence through an approved secure process.",
  },
  {
    title: "Profile and Enquiry Activation",
    body:
      "Approved profiles may become eligible for suitable booking enquiries according to availability and platform policy.",
  },
];

const documentItems = [
  "Recent professional profile photograph.",
  "Qualification or training certificate, if available.",
  "Gurukul or temple association evidence, if available.",
  "Experience evidence or references, if available.",
  "Government-issued identity evidence during secure verification, when required.",
];

const selectionStandards = [
  "Relevant ritual knowledge.",
  "Professional experience.",
  "Service-area availability.",
  "Language compatibility.",
  "Communication quality.",
  "Accuracy of supplied information.",
  "Ability to guide families about vidhi and samagri.",
  "Professional conduct.",
  "Verification readiness.",
];

const galleryItems = [
  {
    src: "/images/acharya-sursain-brijwasi-pandit-ji-ghaziabad-640.webp",
    alt: "Shastriya Vidhan Pandit Ji speaking at a decorated puja venue",
    caption: "First-party Pandit Ji profile image used by Shastriya Vidhan.",
  },
  {
    src: "/images/diwali-puja.webp",
    alt: "Diwali puja setup with diyas and ritual samagri",
    caption: "Example of devotional setup guidance used across puja requests.",
  },
  {
    src: "/images/rudrabhishek-puja.webp",
    alt: "Rudrabhishek puja arrangement with Shivling and offerings",
    caption: "Ritual pages use first-party or approved local service imagery.",
  },
];

const afterApply = [
  "The application is stored for manual review.",
  "The team may contact you for clarification by phone or WhatsApp.",
  "Sensitive documents are requested only through an approved secure process if your profile is shortlisted.",
  "Selection may depend on current location demand, service fit, availability, and operational requirements.",
];

const faqs = [
  {
    question: "Who can register as a Pandit Ji?",
    answer:
      "Pandit Ji, Acharya, Purohit, Katha Vachak, Vedic scholars, and qualified ritual specialists can apply if they can accurately describe their experience, service areas, languages, and puja specializations.",
  },
  {
    question: "Does submitting the form guarantee approval?",
    answer:
      "No. Submission only starts manual review. Approval depends on profile suitability, verification readiness, current operational needs, and service-area fit.",
  },
  {
    question: "What information is required to apply?",
    answer:
      "The form asks for contact details, city, PIN code, professional background, languages, puja specializations, service modes, availability, and required declarations.",
  },
  {
    question: "Are documents required during the first step?",
    answer:
      "No sensitive identity documents are uploaded in the public form. Shortlisted applicants may be asked for documents later through an approved secure verification process.",
  },
  {
    question: "How is an application reviewed?",
    answer:
      "The team reviews ritual knowledge, professional experience, language fit, service areas, communication quality, conduct expectations, and current network requirements.",
  },
  {
    question: "How will the team contact me?",
    answer:
      "The team may contact you through the mobile number or WhatsApp details submitted in the application.",
  },
  {
    question: "Can I select the cities and areas I serve?",
    answer:
      "Yes. You can mention your primary service city, localities served, travel radius, and whether you can support outstation requests.",
  },
  {
    question: "Can I offer online puja services?",
    answer:
      "Yes. Select online or video-call service mode if you can guide suitable pujas remotely and coordinate clearly with families.",
  },
  {
    question: "Can I choose the pujas I specialize in?",
    answer:
      "Yes. Select only the rituals, paths, ceremonies, and pujas you can responsibly conduct or explain.",
  },
  {
    question: "Does registration guarantee bookings or earnings?",
    answer:
      "No. Registration does not guarantee approval, enquiries, completed bookings, income, or regular work.",
  },
  {
    question: "Can I update my details later?",
    answer:
      "Yes. If the team contacts you for review, you can clarify or update details before any profile is activated.",
  },
  {
    question: "How is my personal information used?",
    answer:
      "Your information is used for application review, verification coordination when required, and communication about the registration process according to the Privacy Policy.",
  },
  {
    question: "Where can I ask questions before registering?",
    answer:
      "You can ask registration questions through the WhatsApp link or contact route listed on this page.",
  },
];

function CheckList({ items }) {
  return (
    <ul className="registration-check-list">
      {items.map((item) => (
        <li key={item}>
          <Check size={17} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function panditRegistrationJsonLd() {
  const url = absoluteUrl(pagePath);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: "en-IN",
        isPartOf: {
          "@id": `${absoluteUrl("/")}#website`,
        },
        about: {
          "@id": `${absoluteUrl("/")}#organization`,
        },
        breadcrumb: {
          "@id": `${url}#breadcrumb`,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          "@id": `${url}#primaryimage`,
          url: absoluteUrl(panditJiImage.schema),
          caption: "Pandit Ji speaking during a Shastriya Vidhan puja gathering",
        },
      },
      breadcrumbJsonLd(
        [
          { name: "Home", path: "/" },
          { name: "Pandit Registration", path: pagePath },
        ],
        pagePath,
      ),
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

export default function PanditRegistrationPage() {
  const jsonLd = panditRegistrationJsonLd();

  return (
    <>
      <section className="section-apple pandit-registration-hero">
        <div className="container">
          <nav aria-label="Breadcrumb" className="service-breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>Pandit Registration</span>
          </nav>

          <div className="pandit-registration-hero-grid">
            <div className="pandit-registration-hero-copy">
              <span className="apple-eyebrow">Pandit Partner Registration</span>
              <h1>Register as a Pandit Ji with Shastriya Vidhan</h1>
              <p>
                Share your qualifications, puja specializations, languages, location and availability.
                Our team will review your application and contact you if your profile matches current
                service requirements.
              </p>
              <PanditRegistrationActions />
              <ul className="pandit-registration-microcopy">
                <li>Application reviewed manually.</li>
                <li>No guaranteed bookings or income.</li>
                <li>Your information is used for application review.</li>
                <li>Identity documents are requested only during secure verification, when required.</li>
              </ul>
            </div>

            <div className="pandit-registration-visual" aria-label="Shastriya Vidhan Pandit Ji photograph">
              <PanditJiPicture
                alt="Pandit Ji speaking during a Shastriya Vidhan puja gathering"
                className="pandit-registration-picture"
                imgClassName="pandit-registration-image"
                sizes="(max-width: 900px) min(88vw, 420px), 390px"
                loading="eager"
                fetchPriority="high"
              />
              <div className="registration-visual-note">
                <span>Manual review</span>
                <strong>Profile fit is checked before activation.</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-apple">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Who can apply</span>
            <h2>Qualified ritual specialists can submit their details.</h2>
            <p>
              This is a partner application path, not an employment vacancy or automatic listing.
              Selection may depend on current operational needs.
            </p>
          </div>
          <div className="registration-two-column">
            <article className="registration-panel">
              <h3>Eligibility checklist</h3>
              <CheckList items={eligibilityItems} />
            </article>
            <article className="registration-panel registration-note-panel">
              <ShieldCheck size={30} aria-hidden="true" />
              <h3>Important expectation</h3>
              <p>
                Registration does not guarantee approval. Approval does not guarantee enquiries,
                and enquiries do not guarantee completed bookings or earnings. Availability depends
                on location, demand, specialization, and platform requirements.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-apple registration-muted-section">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Benefits of joining</span>
            <h2>A structured way to share your puja expertise.</h2>
          </div>
          <div className="registration-card-grid">
            {benefits.map(({ title: benefitTitle, body, icon: Icon }) => (
              <article className="registration-benefit-card" key={benefitTitle}>
                <div className="registration-card-icon">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <h3>{benefitTitle}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-apple">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">How registration works</span>
            <h2>Five steps from application to possible activation.</h2>
          </div>
          <ol className="registration-step-list">
            {processSteps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-apple registration-form-section" aria-labelledby="pandit-registration-form-title">
        <div className="container">
          <div className="registration-form-shell">
            <div>
              <span className="apple-eyebrow">Apply online</span>
              <h2 id="pandit-registration-form-title">Complete your Pandit registration application.</h2>
              <p>
                The form stores applications through Shastriya Vidhan&apos;s server endpoint for manual review.
                It does not collect caste, unrelated personal information, or public document uploads.
              </p>
              <CheckList
                items={[
                  "Step-by-step application on mobile and desktop.",
                  "Required declarations are separate from optional promotional consent.",
                  "Success appears only after server confirmation.",
                ]}
              />
            </div>
            <PanditRegistrationForm />
          </div>
        </div>
      </section>

      <section className="section-apple">
        <div className="container">
          <div className="registration-two-column">
            <article className="registration-panel">
              <span className="apple-product-tag">Document guidance</span>
              <h2>Documents are requested later only if needed.</h2>
              <p>
                The initial application avoids sensitive document upload. If shortlisted, applicants may be
                asked for suitable evidence through an approved secure process.
              </p>
              <CheckList items={documentItems} />
            </article>
            <article className="registration-panel registration-warning-panel">
              <ShieldCheck size={30} aria-hidden="true" />
              <h3>Security rule</h3>
              <p>
                Do not send Aadhaar, PAN, bank information, or identity documents through ordinary WhatsApp
                messages or this unsecured public form.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-apple registration-muted-section">
        <div className="container">
          <div className="registration-two-column">
            <article className="registration-panel">
              <span className="apple-product-tag">Selection standards</span>
              <h2>What the team reviews.</h2>
              <CheckList items={selectionStandards} />
            </article>
            <article className="registration-panel">
              <span className="apple-product-tag">What happens after you apply</span>
              <h2>Review comes before profile activation.</h2>
              <CheckList items={afterApply} />
            </article>
          </div>
        </div>
      </section>

      <section className="section-apple">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">First-party evidence</span>
            <h2>Approved visuals from Shastriya Vidhan pages.</h2>
          </div>
          <div className="registration-gallery">
            {galleryItems.map((item) => (
              <figure key={item.src}>
                <img src={item.src} alt={item.alt} width="640" height="720" loading="lazy" />
                <figcaption>{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section-apple registration-muted-section">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">FAQs</span>
            <h2>Pandit registration questions.</h2>
          </div>
          <div className="registration-faq-list">
            {faqs.map((faq) => (
              <details className="service-faq-item" key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-apple registration-final-cta">
        <div className="container">
          <div className="registration-final-panel">
            <span className="apple-eyebrow">Pandit Partner Registration</span>
            <h2>Ready to apply to the Shastriya Vidhan Pandit network?</h2>
            <p>
              Complete the registration form with accurate information. The team will review your profile
              and contact you regarding the next step when your application matches current requirements.
            </p>
            <PanditRegistrationActions className="registration-final-actions" />
            <p className="registration-contact-note">
              Questions can also be sent through <Link href="/contact">Contact</Link> or WhatsApp at{" "}
              <a href={`tel:${contact.phone}`}>{contact.displayPhone}</a>.
            </p>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
