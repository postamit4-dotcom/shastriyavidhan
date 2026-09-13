import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  PhoneCall,
  Calendar,
  Clock,
  AlertTriangle,
  Home,
  UserCheck,
  Languages,
  MapPin,
  Receipt,
  PackageCheck,
  FileText,
  Award,
  ShieldAlert,
  CheckCheck,
  Send,
  Leaf,
  ChevronDown,
  ChevronRight,
  Check,
  Flame,
  Info,
} from "lucide-react";
import GaneshChaturthiBookingForm from "@/components/GaneshChaturthiBookingForm";
import TrackedContactLink from "@/components/TrackedContactLink";
import { contact, site } from "@/lib/site-data";
import { absoluteUrl } from "@/lib/seo";

export const metadata = {
  title: "Ganesh Chaturthi Puja 2026: Vidhi, Muhurat & Pandit Booking | Shastriya Vidhan",
  description:
    "Plan Ganesh Chaturthi Puja 2026 with complete Shodashopachara vidhi, shubh muhurat timings, and samagri list. Book a verified Vedic Pandit Ji in Delhi NCR & Noida with quote clarity before payment.",
  keywords: [
    "ganesh chaturthi puja",
    "ganesh chaturthi 2026",
    "ganesh chaturthi puja vidhi",
    "ganesh chaturthi puja muhurat",
    "book pandit for ganesh chaturthi",
    "ganesh puja pandit in noida",
    "ganesh puja pandit in delhi ncr",
    "ganesh sthapana vidhi",
    "ganesh puja samagri list",
  ],
  alternates: {
    canonical: absoluteUrl("/ganesh-chaturthi-puja"),
  },
  openGraph: {
    title: "Ganesh Chaturthi Puja 2026: Vidhi, Muhurat & Pandit Booking | Shastriya Vidhan",
    description:
      "Plan Ganesh Chaturthi Puja 2026 with complete Shodashopachara vidhi, shubh muhurat timings, and samagri list. Book a verified Vedic Pandit Ji in Delhi NCR & Noida.",
    url: absoluteUrl("/ganesh-chaturthi-puja"),
    siteName: site.name,
    locale: "en_IN",
    type: "article",
    images: [
      {
        url: "/images/ganesh-chaturthi-puja.jpg",
        width: 1200,
        height: 630,
        alt: "Ganesh Chaturthi Puja Altar Setup with clay Ganesha and traditional lamps",
      },
    ],
    modifiedTime: "2026-09-13",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ganesh Chaturthi Puja 2026: Vidhi, Muhurat & Pandit Booking",
    description:
      "Authentic Vedic Ganesh Sthapana & Puja in Delhi NCR. Check shubh muhurat, 16-step vidhi, and book a verified Pandit Ji.",
    images: ["/images/ganesh-chaturthi-puja.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${site.productionUrl}/ganesh-chaturthi-puja#webpage`,
      url: `${site.productionUrl}/ganesh-chaturthi-puja`,
      name: "Ganesh Chaturthi Puja 2026: Vidhi, Muhurat & Pandit Booking | Shastriya Vidhan",
      description:
        "Plan Ganesh Chaturthi Puja 2026 with complete Shodashopachara vidhi, shubh muhurat timings, and samagri list. Book a verified Vedic Pandit Ji in Delhi NCR & Noida.",
      inLanguage: "en-IN",
      isPartOf: {
        "@id": `${site.productionUrl}/#website`,
      },
      breadcrumb: {
        "@id": `${site.productionUrl}/ganesh-chaturthi-puja#breadcrumb`,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${site.productionUrl}/ganesh-chaturthi-puja#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${site.productionUrl}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Puja Services",
          item: `${site.productionUrl}/puja-services`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Festival Pujas",
          item: `${site.productionUrl}/puja-services/festival-pujas`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Ganesh Chaturthi Puja",
          item: `${site.productionUrl}/ganesh-chaturthi-puja`,
        },
      ],
    },
    {
      "@type": "Service",
      "@id": `${site.productionUrl}/ganesh-chaturthi-puja#service`,
      name: "Ganesh Chaturthi Puja Service",
      serviceType: "Hindu Puja and Vedic Ritual Services",
      category: "Festival Puja",
      description:
        "Request-first Vedic Pandit Ji booking for Ganesh Sthapana and Shodashopachara Puja at home, office, society pandals, or online video. Includes timing guidance and samagri review.",
      provider: {
        "@type": "Organization",
        name: "Shastriya Vidhan",
        url: `${site.productionUrl}/`,
        telephone: contact.phone,
      },
      areaServed: [
        { "@type": "City", name: "Noida" },
        { "@type": "City", name: "Greater Noida" },
        { "@type": "City", name: "Delhi" },
        { "@type": "City", name: "Gurugram" },
        { "@type": "City", name: "Ghaziabad" },
        { "@type": "Country", name: "Online / Worldwide" },
      ],
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        description:
          "Transparent quotes confirmed manually based on ritual duration, format, and travel feasibility before payment.",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${site.productionUrl}/ganesh-chaturthi-puja#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "When is Ganesh Chaturthi in 2026?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ganesh Chaturthi falls on Monday, September 14, 2026. The Chaturthi Tithi begins at 04:31 PM on September 13 and concludes at 03:02 PM on September 14.",
          },
        },
        {
          "@type": "Question",
          name: "What is the most auspicious puja muhurat for Ganesh Sthapana?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Lord Ganesha was born during the Madhyahna (midday) period. For New Delhi and NCR, the most auspicious Madhyahna Puja Muhurat on September 14, 2026, is from 11:09 AM to 01:38 PM (2 hours 29 minutes duration).",
          },
        },
        {
          "@type": "Question",
          name: "Why is sighting the moon prohibited on Ganesh Chaturthi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "According to the Ganesha Purana, sighting the moon on Bhadrapada Shukla Chaturthi causes Mithya Kalank (unjust false accusations). Devotees avoid looking at the moon during the prohibited evening hours.",
          },
        },
        {
          "@type": "Question",
          name: "Who provides the puja samagri?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Shastriya Vidhan provides a transparent checklist. Devotee families typically arrange fresh household items (milk, fruits, flowers, modaks), while ritual-specific items can be arranged by our booking desk upon request.",
          },
        },
        {
          "@type": "Question",
          name: "How does the Pandit Ji booking process work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Shastriya Vidhan operates on a request-first model. You submit your preferred date, timing, and address. Our team reviews Pandit availability, confirms ritual scope and samagri, shares a clear quote, and only requests payment upon mutual confirmation.",
          },
        },
      ],
    },
  ],
};

const shodashaSteps = [
  {
    step: "01",
    title: "Atma Shuddhikaran",
    desc: 'Sprinkling Gangajal over oneself and puja items while chanting "Om Apavitrah Pavitro Va..." for outer and inner purification.',
  },
  {
    step: "02",
    title: "Deep Prajwalan",
    desc: "Lighting the primary pure cow ghee diya to witness the puja, seeking divine illumination and dispelling ignorance.",
  },
  {
    step: "03",
    title: "Swasti Vachan & Sankalp",
    desc: "Vedic peace chanting followed by taking water, akshat, and flower in hand to declare family names, gotra, place, and devotional intent.",
  },
  {
    step: "04",
    title: "Kalash Sthapana",
    desc: "Placing water, supari, coin, mango leaves, and a coconut tied with mauli over a copper or brass pot to invoke holy rivers.",
  },
  {
    step: "05",
    title: "Avahana & Pran Pratishtha",
    desc: "The core ritual: chanting Rigvedic mantras to invoke cosmic Ganesha consciousness into the clay murti seated on red cloth.",
  },
  {
    step: "06",
    title: "Asana Samarpana",
    desc: "Offering sacred flowers and unbroken raw rice (akshat) as a respectful seat (Asana) for Bhagwan Ganesha.",
  },
  {
    step: "07",
    title: "Padya & Arghya",
    desc: "Symbolically washing Lord Ganesha's holy feet (Padya) and offering water with chandan and flowers to His hands (Arghya).",
  },
  {
    step: "08",
    title: "Achamaniya",
    desc: "Offering clean water infused with cardamom, clove, and nutmeg for divine sipping and ritual mouth purification.",
  },
  {
    step: "09",
    title: "Snan & Panchamrit",
    desc: "Bathing the deity with milk, curd, honey, ghee, sugar, and sacred water. (For unbaked clay idols, snan is sprinkled with a flower).",
  },
  {
    step: "10",
    title: "Vastra & Yajnopavita",
    desc: "Adorning the Lord with fresh red/yellow cloth, sacred cotton yarn (Kalawa), and investing the sacred Janeu thread.",
  },
  {
    step: "11",
    title: "Gandha, Sindoor & Akshat",
    desc: "Applying cooling red sandalwood paste (Chandan), sacred orange vermilion (Sindoor), and whole unbroken akshat to the forehead.",
  },
  {
    step: "12",
    title: "21 Durva & Red Flowers",
    desc: "Offering 21 sprigs of fresh Durva grass and Lord Ganesha's favorite red hibiscus (Gudhul) while chanting His 12 sacred names.",
  },
  {
    step: "13",
    title: "Dhoop & Deep",
    desc: "Waving natural herbal dhoop incense to purify atmospheric prana, followed by a dedicated ghee lamp offering.",
  },
  {
    step: "14",
    title: "21 Modak Naivedya & Paan",
    desc: "Presenting 21 steamed Ukadiche or motichoor modaks, seasonal fruits (banana, pomegranate), betel leaf with supari, and dakshina.",
  },
  {
    step: "15",
    title: "Ganesh Aarti & Hawan",
    desc: "Singing Jai Ganesh Deva and Sukhkarta Dukhharta with camphor lamp. If requested, concluding with a short apartment-safe hawan.",
  },
  {
    step: "16",
    title: "Pushpanjali & Kshama",
    desc: "Offering final handful of flowers with pradakshina, and chanting the Kshama Prarthana seeking pardon for any unintentional mistakes.",
  },
];

const samagriFamilyItems = [
  { item: "Clay Ganesha Murti (Mitti ke Ganpati)", qty: "1 Idol" },
  { item: "Wooden Chowki (Bajot) & Fresh Red Cloth", qty: "1 set" },
  { item: "Copper or Brass Kalash with Coconut", qty: "1 Kalash + 1 Nariyal" },
  { item: "Fresh Durva Grass (Wash cleanly in water)", qty: "21 or 108 sprigs" },
  { item: "Red Hibiscus (Gudhul) & Marigold Garlands", qty: "Fresh bunch" },
  { item: "Panchamrit (Raw milk, curd, honey, ghee, sugar)", qty: "Small bowl" },
  { item: "Modak Prasad (Ukadiche or Motichoor)", qty: "21 pieces" },
  { item: "5 Types of Seasonal Fruits (Banana, Apple, etc.)", qty: "5 varieties" },
  { item: "Matchbox, Cotton Wicks (Batti), Brass Thali", qty: "Household" },
];

const samagriPanditItems = [
  { item: "Pure Gangajal & Gulab Jal (Rose Water)", qty: "Sealed bottles" },
  { item: "Kumkum (Roli), Sindoor & Pure Sandalwood (Chandan)", qty: "Pure grade" },
  { item: "Whole Akshat (Unbroken basmati rice grains)", qty: "250g" },
  { item: "Sacred Thread (Janeu) & Mauli (Kalawa)", qty: "2 pairs" },
  { item: "Supari (Betel nuts) for Navagraha & Ganesha", qty: "11 pieces" },
  { item: "Cardamom (Elaichi), Clove (Laung) & Camphor (Kapur)", qty: "Standard packet" },
  { item: "Herbal Guggul / Loban Dhoop Cones", qty: "Smoke-calm grade" },
  { item: "Attar (Natural non-alcoholic fragrance)", qty: "1 vial" },
  { item: "Hawan Samagri & Mango Wood (If hawan is booked)", qty: "Optional addition" },
];

const bookingFormats = [
  {
    tag: "Most Popular",
    tagClass: "bg-orange-100 text-orange-800",
    title: "Home Ganesh Sthapana",
    duration: "60 – 120 Minutes • At Your Residence",
    desc: "Designed for families welcoming Bappa into their home temple. Includes family sankalp, full Shodashopachara, Atharvashirsha path, aarti, and optional short hawan.",
  },
  {
    tag: "Corporate & Retail",
    tagClass: "bg-blue-100 text-blue-800",
    title: "Office & Gaddi Puja",
    duration: "45 – 75 Minutes • Workplace Friendly",
    desc: "Tailored for commercial offices, retail shops, and startups. Focuses on Vighnaharta blessings for business success, accounts/gaddi pujan, and smoke-alarm-safe aarti.",
  },
  {
    tag: "Community Groups",
    tagClass: "bg-purple-100 text-purple-800",
    title: "Society & Pandal Sthapana",
    duration: "90 – 150 Minutes • High Gathering",
    desc: "For residential societies and welfare associations hosting community murtis. Guided by 1–2 senior Vedic Pandits with loudspeaker-friendly shloka chanting.",
  },
  {
    tag: "Global & NRI",
    tagClass: "bg-emerald-100 text-emerald-800",
    title: "Online Live Video Puja",
    duration: "45 – 90 Minutes • Private 2-Way HD",
    desc: "Private live video guidance for overseas families (USA, UK, Canada, Dubai) and remote devotees. The Pandit Ji guides you step-by-step matched to your local time zone.",
  },
];

const faqItems = [
  {
    q: "When is Ganesh Chaturthi in 2026?",
    a: "Ganesh Chaturthi falls on Monday, September 14, 2026. The Chaturthi Tithi begins at 04:31 PM on September 13 and concludes at 03:02 PM on September 14. As per Shastric rules, the festival is observed on the day when Chaturthi prevails during midday (Madhyahna Kaal).",
  },
  {
    q: "What is the best puja muhurat for Ganesh Sthapana in Delhi NCR?",
    a: "The most auspicious Madhyahna Ganesha Puja Muhurat on September 14, 2026, is from 11:09 AM to 01:38 PM (total duration: 2 hours 29 minutes). This midday window corresponds with Lord Ganesha's sacred manifestation timing.",
  },
  {
    q: "Why is sighting the moon prohibited on Ganesh Chaturthi?",
    a: "In the Ganesha Purana, the Moon ridiculed Ganesha's form, leading to a curse that anyone sighting the moon on Bhadrapada Shukla Chaturthi would incur unjust slander (Mithya Kalank). In 2026, the prohibited window is Sept 13 (07:12 PM – 08:35 PM) and Sept 14 (09:18 AM – 08:58 PM).",
  },
  {
    q: "Who arranges the puja samagri?",
    a: "Shastriya Vidhan provides a clear two-part checklist. Families arrange fresh perishable items (milk, fruits, modaks, flowers), while specialized sacred samagri (Gangajal, Janeyu, Roli, pure Chandan, Dhoop, Hawan wood) can be arranged by our booking desk as an optional quoted kit.",
  },
  {
    q: "Can a hawan be performed safely in high-rise apartments?",
    a: "Yes. Our Pandits are experienced in conducting smoke-calm apartment hawan rituals using pure dry cow dung cakes, pure ghee, and natural herbs without dense black smoke, ensuring residential smoke detectors are not triggered.",
  },
  {
    q: "What if our family requires a specific language (e.g. Marathi, Tamil, Bengali, or English)?",
    a: "While the core Vedic mantras are chanted in authentic Sanskrit, our Pandits explain the meaning and instructions in Hindi or English. If your family has specific regional preferences (e.g., Maharashtrian Aarti traditions or South Indian Ganapathi Homam), please specify this during your request.",
  },
  {
    q: "How does the booking and quotation process work?",
    a: "Shastriya Vidhan never forces immediate checkout. You submit your preferred date, locality, and venue. Our desk checks Pandit travel feasibility, verifies samagri requirements, shares a transparent quote, and only takes payment once you are fully satisfied with the plan.",
  },
];

export default function GaneshChaturthiPujaPage() {
  return (
    <>
      {/* 1. Top Festive Reassurance Banner */}
      <aside className="ganesh-top-banner" aria-label="Booking Notice">
        <div className="container ganesh-top-banner-inner">
          <span className="ganesh-banner-badge">
            <Sparkles size={14} /> Festival Booking Notice
          </span>
          <span className="ganesh-banner-text">
            Ganesh Chaturthi 2026 Madhyahna slots in Delhi NCR are reviewed manually for travel feasibility.
          </span>
          <span className="ganesh-banner-highlight">Quotes confirmed before payment.</span>
        </div>
      </aside>

      {/* 2. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="ganesh-breadcrumbs">
        <div className="container ganesh-breadcrumbs-inner">
          <Link href="/">Home</Link>
          <ChevronRight size={13} aria-hidden="true" />
          <Link href="/puja-services">Puja Services</Link>
          <ChevronRight size={13} aria-hidden="true" />
          <Link href="/puja-services/festival-pujas">Festival Pujas</Link>
          <ChevronRight size={13} aria-hidden="true" />
          <span aria-current="page">Ganesh Chaturthi Puja</span>
        </div>
      </nav>

      {/* 3. Hero Section */}
      <section className="section-apple ganesh-hero-section" aria-label="Hero Introduction">
        <div className="container">
          <div className="ganesh-hero-grid">
            {/* Left Column */}
            <div className="ganesh-hero-copy">
              <div className="ganesh-hero-tag">
                <ShieldCheck size={16} /> Request-First Vedic Festival Puja Booking
              </div>

              <h1 className="ganesh-hero-title">
                Ganesh Chaturthi Puja 2026: <br />
                <span className="text-gradient">Vidhi, Shubh Muhurat &amp; Pandit Booking</span>
              </h1>

              <p className="ganesh-hero-description">
                Perform authentic Ganesh Sthapana and 16-step Shodashopachara Puja with scriptural purity. Check verified 2026 Madhyahna Muhurat timings, printable samagri lists, and book an experienced Gurukul-trained Vedic Pandit Ji across <strong>Noida, Delhi, Gurugram, Ghaziabad</strong>, or worldwide via interactive live video.
              </p>

              <div className="ganesh-hero-actions">
                <a href="#booking-section" className="apple-btn-pill apple-btn-primary">
                  Request a Puja Slot <ArrowRight size={16} />
                </a>
                <TrackedContactLink
                  href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
                    "Namaste Shastriya Vidhan, I need help booking Ganesh Chaturthi Puja 2026."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-btn-pill apple-btn-secondary"
                  channel="whatsapp"
                  action="ganesh_hero_whatsapp"
                >
                  <MessageCircle size={16} className="text-emerald-500" /> WhatsApp Assistance
                </TrackedContactLink>
                <TrackedContactLink
                  href={`tel:${contact.phone}`}
                  className="apple-btn-pill apple-btn-secondary"
                  channel="phone"
                  action="ganesh_hero_call"
                >
                  <PhoneCall size={16} /> Call Booking Desk
                </TrackedContactLink>
              </div>

              {/* Trust Badges */}
              <div className="ganesh-hero-trust-grid">
                <div className="ganesh-trust-item">
                  <CheckCircle2 size={16} />
                  <span>Manual slot availability check</span>
                </div>
                <div className="ganesh-trust-item">
                  <CheckCircle2 size={16} />
                  <span>Clear samagri division</span>
                </div>
                <div className="ganesh-trust-item">
                  <CheckCircle2 size={16} />
                  <span>Quote clarity before payment</span>
                </div>
                <div className="ganesh-trust-item">
                  <CheckCircle2 size={16} />
                  <span>No fear or outcome claims</span>
                </div>
                <div className="ganesh-trust-item">
                  <CheckCircle2 size={16} />
                  <span>Hindi, Sanskrit &amp; English</span>
                </div>
                <div className="ganesh-trust-item">
                  <CheckCircle2 size={16} />
                  <span>NRI video-call friendly</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Muhurat Card & Media */}
            <div className="ganesh-hero-visual">
              <div className="ganesh-muhurat-card">
                <div className="ganesh-muhurat-header">
                  <span className="ganesh-sacred-badge">
                    <Calendar size={14} /> Panchang Reference 2026
                  </span>
                  <span className="ganesh-location-tag">New Delhi &amp; NCR</span>
                </div>

                <div className="ganesh-muhurat-body">
                  <div>
                    <span className="ganesh-date-label">Festival Date</span>
                    <h3 className="ganesh-date-value">Monday, September 14, 2026</h3>
                    <p className="ganesh-tithi-sub">Bhadrapada Shukla Paksha Chaturthi</p>
                  </div>

                  <div className="ganesh-muhurat-highlight-box">
                    <div className="ganesh-muhurat-box-header">
                      <span className="ganesh-muhurat-box-title">
                        <Clock size={16} /> Madhyahna Puja Muhurat
                      </span>
                      <span className="ganesh-muhurat-box-badge">Most Auspicious</span>
                    </div>
                    <div className="ganesh-muhurat-time">11:09 AM – 01:38 PM</div>
                    <p className="ganesh-muhurat-duration">
                      Duration: <strong>2 Hours 29 Minutes</strong> (Ideal for Idol Sthapana &amp; Pran Pratishtha)
                    </p>
                  </div>

                  <div className="ganesh-tithi-box">
                    <div className="ganesh-tithi-row">
                      <span>Chaturthi Tithi Begins:</span>
                      <strong>Sep 13, 2026 at 04:31 PM</strong>
                    </div>
                    <div className="ganesh-tithi-row">
                      <span>Chaturthi Tithi Ends:</span>
                      <strong>Sep 14, 2026 at 03:02 PM</strong>
                    </div>
                  </div>

                  <div className="ganesh-chandra-warning">
                    <AlertTriangle size={18} className="ganesh-warning-icon" />
                    <span>
                      <strong>Chandra Darshan Warning:</strong> Avoid looking at the moon on Sept 13 (07:12 PM – 08:35 PM) &amp; Sept 14 (09:18 AM – 08:58 PM) to avoid Mithya Kalank.
                    </span>
                  </div>
                </div>

                <div className="ganesh-muhurat-footer">
                  <a href="#booking-section" className="apple-btn-pill apple-btn-primary full-width">
                    Book This Muhurat Window
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Quick Facts: What to Know Before You Request */}
      <section className="section-apple ganesh-facts-section" id="quick-facts">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Essential Overview</span>
            <h2>What to Know Before You Request a Pandit Ji</h2>
            <p>Transparent ritual details, duration expectations, and samagri clarity before any payment is taken.</p>
          </div>

          <div className="ganesh-facts-grid">
            <div className="apple-product-card ganesh-fact-card">
              <div className="ganesh-fact-icon-wrap">
                <Home size={20} />
              </div>
              <span className="ganesh-fact-label">Puja Modes</span>
              <p className="ganesh-fact-val">Home, Office &amp; Online</p>
              <span className="ganesh-fact-sub">Society pandals on request</span>
            </div>

            <div className="apple-product-card ganesh-fact-card">
              <div className="ganesh-fact-icon-wrap">
                <Clock size={20} />
              </div>
              <span className="ganesh-fact-label">Duration</span>
              <p className="ganesh-fact-val">60 – 120 Mins</p>
              <span className="ganesh-fact-sub">Depends on sankalp &amp; hawan</span>
            </div>

            <div className="apple-product-card ganesh-fact-card">
              <div className="ganesh-fact-icon-wrap">
                <UserCheck size={20} />
              </div>
              <span className="ganesh-fact-label">Pandit Standards</span>
              <p className="ganesh-fact-val">Gurukul Trained</p>
              <span className="ganesh-fact-sub">Verified identity &amp; conduct</span>
            </div>

            <div className="apple-product-card ganesh-fact-card">
              <div className="ganesh-fact-icon-wrap">
                <Languages size={20} />
              </div>
              <span className="ganesh-fact-label">Languages</span>
              <p className="ganesh-fact-val">Hindi &amp; Sanskrit</p>
              <span className="ganesh-fact-sub">English coordination available</span>
            </div>

            <div className="apple-product-card ganesh-fact-card">
              <div className="ganesh-fact-icon-wrap">
                <MapPin size={20} />
              </div>
              <span className="ganesh-fact-label">Service Area</span>
              <p className="ganesh-fact-val">Delhi NCR &amp; Noida</p>
              <span className="ganesh-fact-sub">Gurugram &amp; Ghaziabad</span>
            </div>

            <div className="apple-product-card ganesh-fact-card">
              <div className="ganesh-fact-icon-wrap">
                <Receipt size={20} />
              </div>
              <span className="ganesh-fact-label">Pricing Model</span>
              <p className="ganesh-fact-val">Quote First</p>
              <span className="ganesh-fact-sub">No payment before review</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Sticky TOC Subnav */}
      <nav className="service-page-toc-section ganesh-toc-sticky" aria-label="Page Sections Navigation">
        <div className="container">
          <div className="service-page-toc">
            <a href="#muhurat-details">Date &amp; Muhurat</a>
            <a href="#shodashopachara-vidhi">16-Step Vidhi</a>
            <a href="#samagri-checklist">Samagri List</a>
            <a href="#diy-vs-pandit">DIY vs Pandit</a>
            <a href="#booking-formats">Puja Formats</a>
            <a href="#visarjan-guidance">Visarjan Vidhi</a>
            <a href="#how-it-works">How Booking Works</a>
            <a href="#delhi-ncr-coverage">Delhi NCR Service</a>
            <a href="#faqs">FAQs</a>
            <a href="#booking-section" className="ganesh-toc-book-btn">Book Now</a>
          </div>
        </div>
      </nav>

      {/* 6. Section 1: Detailed 2026 Date & Muhurat */}
      <section className="section-apple" id="muhurat-details">
        <div className="container">
          <div className="apple-section-header" style={{ textAlign: "left", maxWidth: "800px" }}>
            <span className="apple-eyebrow">Vedic Time Calculations</span>
            <h2>Ganesh Chaturthi 2026 Date, Tithi &amp; Puja Muhurat</h2>
            <p>
              Unlike many other Hindu festivals observed during Pradosh Kaal (evening), Lord Ganesha’s sthapana and invocation are prescribed strictly for <strong>Madhyahna Kaal</strong> (midday), corresponding to the exact puranic hour of His manifestation.
            </p>
          </div>

          <div className="ganesh-timing-grid">
            <div className="apple-product-card ganesh-timing-card border-saffron">
              <span className="ganesh-timing-tag">Primary Puja Muhurat</span>
              <h3 className="ganesh-timing-title">Madhyahna Ganesha Puja</h3>
              <div className="ganesh-timing-box">
                <span className="ganesh-big-time text-saffron">11:09 AM – 01:38 PM</span>
                <span className="ganesh-time-duration">Duration: 2 Hours 29 Minutes</span>
              </div>
              <p className="ganesh-timing-desc">
                The ideal astrological window for performing idol sthapana, pran pratishtha, chanting of Atharvashirsha, and offering 21 Modaks.
              </p>
            </div>

            <div className="apple-product-card ganesh-timing-card border-amber">
              <span className="ganesh-timing-tag">Tithi Start &amp; End</span>
              <h3 className="ganesh-timing-title">Chaturthi Tithi Span</h3>
              <div className="ganesh-timing-box">
                <div className="ganesh-tithi-line">
                  <span>Begins:</span> <strong>Sep 13, 2026 (04:31 PM)</strong>
                </div>
                <div className="ganesh-tithi-line">
                  <span>Ends:</span> <strong>Sep 14, 2026 (03:02 PM)</strong>
                </div>
              </div>
              <p className="ganesh-timing-desc">
                Because Chaturthi spans across midday on September 14, standard panchang consensus across India fixes the festival date on <strong>Monday, September 14, 2026</strong>.
              </p>
            </div>

            <div className="apple-product-card ganesh-timing-card border-red">
              <span className="ganesh-timing-tag">Puranic Caution</span>
              <h3 className="ganesh-timing-title">Mithya Kalank Avoidance</h3>
              <div className="ganesh-timing-box">
                <div className="ganesh-tithi-line">
                  <span>Sep 13:</span> <strong>07:12 PM to 08:35 PM</strong>
                </div>
                <div className="ganesh-tithi-line">
                  <span>Sep 14:</span> <strong>09:18 AM to 08:58 PM</strong>
                </div>
              </div>
              <p className="ganesh-timing-desc">
                According to the <em>Ganesha Purana</em>, looking at the moon during these intervals invites false accusations (*Mithya Dosha*). If seen accidentally, chanting the Syamantaka Jewel mantra is advised.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Section 2: Complete 16-Step Shodashopachara Vidhi */}
      <section className="section-apple" id="shodashopachara-vidhi" style={{ backgroundColor: "var(--apple-gray-bg)" }}>
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Scriptural Ritual Flow</span>
            <h2>Complete 16-Step Ganesh Chaturthi Puja Vidhi</h2>
            <p>
              Authentic Vedic worship follows the <em>Shodashopachara</em> (16 divine offerings) tradition, sanctifying the space, invoking life force into the clay murti, and concluding with aarti and pushpanjali.
            </p>
          </div>

          <div className="ganesh-shodasha-grid">
            {shodashaSteps.map((item) => (
              <div key={item.step} className="apple-product-card ganesh-shodasha-card">
                <div className="ganesh-step-num">{item.step}</div>
                <h3 className="ganesh-step-title">{item.title}</h3>
                <p className="ganesh-step-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Section 3: Samagri Checklist */}
      <section className="section-apple" id="samagri-checklist">
        <div className="container">
          <div className="apple-section-header" style={{ textAlign: "left", maxWidth: "800px" }}>
            <span className="apple-eyebrow">Preparation Clarity</span>
            <h2>Ganesh Chaturthi Puja Samagri Checklist</h2>
            <p>
              To eliminate last-minute confusion on festival morning, Shastriya Vidhan clearly separates everyday household kitchen items from specialized ritual items.
            </p>
          </div>

          <div className="ganesh-samagri-grid">
            {/* Family Arranges */}
            <div className="apple-product-card ganesh-samagri-card">
              <div className="ganesh-samagri-header">
                <div className="ganesh-samagri-badge bg-emerald-100 text-emerald-800">
                  <Home size={18} />
                </div>
                <div>
                  <h3 className="ganesh-samagri-title">Everyday Items Arranged by Family</h3>
                  <span className="ganesh-samagri-sub">Easily arranged from home kitchen &amp; local flower market</span>
                </div>
              </div>

              <ul className="ganesh-samagri-list">
                {samagriFamilyItems.map((row) => (
                  <li key={row.item}>
                    <span>{row.item}</span>
                    <span className="ganesh-qty-tag">{row.qty}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pandit Kit */}
            <div className="apple-product-card ganesh-samagri-card">
              <div className="ganesh-samagri-header">
                <div className="ganesh-samagri-badge bg-orange-100 text-orange-800">
                  <PackageCheck size={18} />
                </div>
                <div>
                  <h3 className="ganesh-samagri-title">Specialized Ritual Samagri (Pandit Kit)</h3>
                  <span className="ganesh-samagri-sub">Can be arranged by Shastriya Vidhan as a confirmed package</span>
                </div>
              </div>

              <ul className="ganesh-samagri-list">
                {samagriPanditItems.map((row) => (
                  <li key={row.item}>
                    <span>{row.item}</span>
                    <span className="ganesh-qty-tag">{row.qty}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="ganesh-samagri-cta">
            <TrackedContactLink
              href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
                "Namaste Shastriya Vidhan, please send me the printable Ganesh Chaturthi Samagri PDF."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-btn-pill apple-btn-secondary"
              channel="whatsapp"
              action="ganesh_samagri_pdf"
            >
              <FileText size={16} /> Request Printable PDF Samagri Checklist via WhatsApp
            </TrackedContactLink>
          </div>
        </div>
      </section>

      {/* 9. Section 4: DIY Home Puja vs Booking a Vedic Pandit Ji */}
      <section className="section-apple" id="diy-vs-pandit" style={{ backgroundColor: "var(--apple-gray-bg)" }}>
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Honest Guidance</span>
            <h2>Performing at Home vs. Booking a Trained Pandit Ji</h2>
            <p>We believe in transparent spiritual clarity. Here is how to decide what is best for your household.</p>
          </div>

          <div className="service-table-wrap">
            <table className="service-comparison-table">
              <thead>
                <tr>
                  <th scope="col">Puja Dimension</th>
                  <th scope="col">Self-Guided Home Puja (DIY)</th>
                  <th scope="col" style={{ color: "var(--brand-yellow)" }}>
                    Booking Shastriya Vidhan Pandit Ji
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Ritual Scope</th>
                  <td>Simplified <em>Panchopachara</em> (5 basic offerings).</td>
                  <td>Full <em>Shodashopachara</em> (16 offerings) with Kalash &amp; Navagraha invocation.</td>
                </tr>
                <tr>
                  <th scope="row">Mantra Chanting</th>
                  <td>Simple stutis like <em>Vakratunda Mahakaya</em> or audio recording.</td>
                  <td>Authentic Vedic recitation of <em>Rigvedic Ganapati Suktam</em> &amp; <em>Atharvashirsha</em> with proper swara.</td>
                </tr>
                <tr>
                  <th scope="row">Pran Pratishtha</th>
                  <td>Ideal for existing home brass/silver murtis that do not need re-consecration.</td>
                  <td>Essential for new clay idols (*Mitti ke Ganpati*) requiring life-force infusion.</td>
                </tr>
                <tr>
                  <th scope="row">Sankalp Accuracy</th>
                  <td>Informal mental prayer in mother tongue.</td>
                  <td>Accurate Sanskrit astronomical sankalp citing Manvantara, Nakshatra, and Gotra.</td>
                </tr>
                <tr>
                  <th scope="row">Best Suited For</th>
                  <td>Working bachelors, students, or daily morning routine.</td>
                  <td>Families, multi-generational households, office gaddi setups, and community pandals.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 10. Section 5: Booking Formats */}
      <section className="section-apple" id="booking-formats">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Flexible Formats</span>
            <h2>Ganesh Chaturthi Booking Formats</h2>
            <p>Select the booking format best matched to your venue, family size, and schedule.</p>
          </div>

          <div className="ganesh-formats-grid">
            {bookingFormats.map((fmt) => (
              <div key={fmt.title} className="apple-product-card ganesh-format-card">
                <div>
                  <span className={`ganesh-format-tag ${fmt.tagClass}`}>{fmt.tag}</span>
                  <h3 className="ganesh-format-title">{fmt.title}</h3>
                  <p className="ganesh-format-duration">{fmt.duration}</p>
                  <p className="ganesh-format-desc">{fmt.desc}</p>
                </div>
                <div className="ganesh-format-action">
                  <a href="#booking-section" className="apple-btn-pill apple-btn-secondary full-width">
                    Select {fmt.title}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Section 6: Ganesh Visarjan Vidhi & Eco-Friendly Immersion */}
      <section className="section-apple" id="visarjan-guidance" style={{ backgroundColor: "var(--apple-gray-bg)" }}>
        <div className="container">
          <div className="ganesh-visarjan-grid">
            <div className="ganesh-visarjan-copy">
              <span className="apple-eyebrow">Concluding Rites</span>
              <h2>Ganesh Visarjan Vidhi: Respectful &amp; Eco-Friendly Immersion</h2>
              <p>
                Whether your family hosts Bhagwan Ganesha for 1.5 days, 3 days, 5 days, 7 days, or up to Anant Chaturdashi (10 days), the farewell ritual must be performed with the exact same reverence as the welcome.
              </p>

              <div className="ganesh-visarjan-steps">
                <div className="ganesh-visarjan-step-item">
                  <div className="ganesh-v-num">1</div>
                  <div>
                    <strong>Uttar Puja (The Farewell Offering):</strong> Light a ghee diya, apply fresh chandan, offer modak bhog, and sing the concluding aarti. Move the murti slightly forward on its chowki to signify the departure.
                  </div>
                </div>

                <div className="ganesh-visarjan-step-item">
                  <div className="ganesh-v-num">2</div>
                  <div>
                    <strong>Chanting Farewell Stotras:</strong> Recite <em>&ldquo;Gange Cha Yamune Chaiva...&rdquo;</em> and <em>&ldquo;Ganpati Bappa Morya, Pudhchya Varshi Laukariya&rdquo;</em> asking Bappa to return early next year with prosperity.
                  </div>
                </div>

                <div className="ganesh-visarjan-step-item">
                  <div className="ganesh-v-num">3</div>
                  <div>
                    <strong>Home Water Bucket Immersion (For Clay Idols):</strong> Fill a clean, dedicated bucket or tub with clean water and fresh flowers. Slowly lower the clay idol until it dissolves completely. Use the sacred clay water to nourish household garden plants or Tulsi pot.
                  </div>
                </div>
              </div>
            </div>

            <div className="ganesh-visarjan-side">
              <div className="ganesh-eco-card">
                <div className="ganesh-eco-header">
                  <Leaf size={20} className="text-emerald-500" />
                  <h3>Eco-Friendly Living in Delhi NCR</h3>
                </div>
                <p>
                  To protect local water bodies like the Yamuna River and comply with municipal environmental guidelines in Noida and Delhi, Shastriya Vidhan actively advocates the use of <strong>100% natural clay (*Shadu Maati*)</strong> and respectful balcony/garden bucket immersion.
                </p>
                <div className="ganesh-eco-tips">
                  <div>✓ Avoid toxic Plaster of Paris (PoP) idols</div>
                  <div>✓ Avoid synthetic chemical paint varnishes</div>
                  <div>✓ Remove reusable brass jewelry and crowns before visarjan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Section 7: The Shastriya Vidhan Standard */}
      <section className="section-apple" id="why-us">
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">The Shastriya Standard</span>
            <h2>Clear Process. No Fear Claims.</h2>
            <p>A dignified, peaceful puja experience designed for modern families who value ritual authenticity without commercial pressure.</p>
          </div>

          <div className="ganesh-trust-cards-grid">
            <div className="apple-product-card ganesh-trust-feature-card">
              <div className="ganesh-feature-icon-wrap">
                <Award size={24} />
              </div>
              <h3>Vetted Vedic Gurukul Pandits</h3>
              <p>
                Every Pandit Ji affiliated with Shastriya Vidhan is verified for authentic Sanskrit pronunciation, Gurukul lineage, ritual knowledge, personal conduct, and respectful household demeanor.
              </p>
            </div>

            <div className="apple-product-card ganesh-trust-feature-card">
              <div className="ganesh-feature-icon-wrap">
                <ShieldAlert size={24} />
              </div>
              <h3>Strict &ldquo;No Fear&rdquo; Ethical Policy</h3>
              <p>
                We never use fear-based marketing, superstitious claims, or promises of guaranteed financial and medical windfalls. Pujas are sacred devotional practices performed for peace, mental clarity, and gratitude.
              </p>
            </div>

            <div className="apple-product-card ganesh-trust-feature-card">
              <div className="ganesh-feature-icon-wrap">
                <CheckCheck size={24} />
              </div>
              <h3>Quotes Before Any Payment</h3>
              <p>
                No unexpected demands or awkward bargaining on festival morning. All dakshina, travel arrangements, and samagri inclusions are confirmed beforehand in a written quotation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 13. Section 8: How Booking Works */}
      <section className="section-apple" id="how-it-works" style={{ backgroundColor: "var(--apple-gray-bg)" }}>
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Simple &amp; Calming</span>
            <h2>How Ganesh Chaturthi Puja Booking Works</h2>
            <p>A 5-step transparent workflow built for peace of mind.</p>
          </div>

          <div className="ganesh-pipeline-grid">
            <div className="ganesh-pipeline-card">
              <span className="ganesh-pipeline-step">Step 01</span>
              <h3>Submit Request</h3>
              <p>Share your preferred date, locality (e.g. Noida Sector 78), and puja format via form or WhatsApp.</p>
            </div>

            <div className="ganesh-pipeline-card">
              <span className="ganesh-pipeline-step">Step 02</span>
              <h3>Availability Check</h3>
              <p>Our booking desk reviews Pandit Ji schedules and travel feasibility for your preferred Madhyahna slot.</p>
            </div>

            <div className="ganesh-pipeline-card">
              <span className="ganesh-pipeline-step">Step 03</span>
              <h3>Samagri Scope</h3>
              <p>We confirm what you will arrange at home vs. what specialized samagri is included in the Pandit kit.</p>
            </div>

            <div className="ganesh-pipeline-card">
              <span className="ganesh-pipeline-step">Step 04</span>
              <h3>Quote Confirmation</h3>
              <p>A clear, all-inclusive quotation is shared. You review everything before making any advance or payment.</p>
            </div>

            <div className="ganesh-pipeline-card">
              <span className="ganesh-pipeline-step">Step 05</span>
              <h3>Peaceful Puja</h3>
              <p>The assigned Vedic Pandit arrives on time to guide your family through a sacred, peaceful celebration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 14. Section 9: Local Service Availability: Noida, Delhi & Gurugram */}
      <section className="section-apple" id="delhi-ncr-coverage">
        <div className="container">
          <div className="apple-section-header" style={{ textAlign: "left", maxWidth: "800px" }}>
            <span className="apple-eyebrow">Verified Offline Reach</span>
            <h2>Pandit Ji Service Across Noida, Delhi &amp; Delhi NCR</h2>
            <p>On-site visits are provided strictly where experienced Vedic Pandits can arrive punctually with realistic festival traffic buffers.</p>
          </div>

          <div className="ganesh-coverage-grid">
            <div className="apple-product-card ganesh-coverage-card">
              <div className="ganesh-cov-header">
                <MapPin size={18} />
                <h3>Noida &amp; Greater Noida</h3>
              </div>
              <p>
                Full coverage across Central Noida (Sectors 50, 62, 74, 75, 76, 78, 79), Noida Expressway (Sectors 93, 128, 137, 143, 168), and Greater Noida West (Noida Extension).
              </p>
              <span className="ganesh-cov-badge bg-emerald-100 text-emerald-800">
                High Availability Zone
              </span>
            </div>

            <div className="apple-product-card ganesh-coverage-card">
              <div className="ganesh-cov-header">
                <MapPin size={18} />
                <h3>Delhi (South, East &amp; West)</h3>
              </div>
              <p>
                Serving residential and commercial localities across South Delhi (Vasant Kunj, Saket, GK), East Delhi (Mayur Vihar, Preet Vihar), and West Delhi (Dwarka, Janakpuri).
              </p>
              <span className="ganesh-cov-badge bg-neutral-100 text-neutral-800">
                Book 5–7 Days Early for Muhurat
              </span>
            </div>

            <div className="apple-product-card ganesh-coverage-card">
              <div className="ganesh-cov-header">
                <MapPin size={18} />
                <h3>Gurugram &amp; Ghaziabad</h3>
              </div>
              <p>
                Active service across Gurugram (Golf Course Road, DLF Cyber City, Sohna Road) and Ghaziabad (Indirapuram, Vaishali, Vasundhara, Raj Nagar Extension).
              </p>
              <span className="ganesh-cov-badge bg-neutral-100 text-neutral-800">
                Slot Subject to Route Check
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 15. Section 10: Interactive Booking Request Form */}
      <section className="section-apple" id="booking-section">
        <div className="container">
          <GaneshChaturthiBookingForm />
        </div>
      </section>

      {/* 16. Section 11: Comprehensive FAQs */}
      <section className="section-apple" id="faqs" style={{ backgroundColor: "var(--apple-gray-bg)" }}>
        <div className="container">
          <div className="apple-section-header">
            <span className="apple-eyebrow">Frequently Asked Questions</span>
            <h2>Answers to Common Questions</h2>
            <p>Everything you need to know about timings, samagri, rituals, and booking terms.</p>
          </div>

          <div className="ganesh-faqs-wrap">
            {faqItems.map((faq, idx) => (
              <details key={faq.q} className="apple-product-card ganesh-faq-item" open={idx === 0}>
                <summary className="ganesh-faq-summary">
                  <span>{faq.q}</span>
                  <ChevronDown size={18} className="ganesh-faq-chevron" />
                </summary>
                <div className="ganesh-faq-content">
                  <p>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 17. Legal & Religious Disclaimer */}
      <section className="section-apple" id="religious-disclaimer">
        <div className="container">
          <div className="ganesh-disclaimer-card">
            <div className="ganesh-disc-line">
              <Info size={16} />
              <strong>Service Feasibility Notice:</strong> On-site Pandit Ji service is strictly subject to scheduling, date review, Delhi NCR festive traffic feasibility, and advance confirmation before payment.
            </div>
            <div className="ganesh-disc-line">
              <ShieldAlert size={16} />
              <strong>Religious &amp; Legal Disclaimer:</strong> Hindu puja rituals are devotional spiritual observances. Shastriya Vidhan strictly abides by an ethical code and does not promise or guarantee medical, financial, career, legal, or material outcomes.
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
