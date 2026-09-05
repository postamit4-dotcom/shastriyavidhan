"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { homeFaqs } from "@/lib/site-data";

export default function FaqAccordion() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="apple-accordion-list">
      {homeFaqs.map((faq, idx) => {
        const isOpen = openFaq === idx;
        return (
          <div key={faq.question} className={`apple-accordion-row ${isOpen ? "open" : ""}`}>
            <button
              type="button"
              className="apple-accordion-toggle"
              id={`faq-toggle-${idx}`}
              onClick={() => setOpenFaq(isOpen ? -1 : idx)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${idx}`}
            >
              <span>{faq.question}</span>
              <span className="apple-accordion-chevron">
                <ChevronDown size={18} aria-hidden="true" />
              </span>
            </button>
            <div
              className={`apple-accordion-content ${isOpen ? "open" : ""}`}
              id={`faq-panel-${idx}`}
              role="region"
              aria-labelledby={`faq-toggle-${idx}`}
              aria-hidden={!isOpen}
            >
              <div>
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
