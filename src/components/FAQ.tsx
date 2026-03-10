"use client";

import { Accordion } from "@/components/ui/Accordion";

const FAQ_ITEMS = [
  {
    question: "What is United Discounts?",
    answer:
      "United Discounts tracks rental price drops across London properties. We aggregate listings from major property portals like Rightmove and highlight properties where landlords have reduced their asking rent, helping you find the best deals.",
  },
  {
    question: "How are price drops calculated?",
    answer:
      "We track the original listing price of each property and compare it to the current asking price. The drop percentage shows how much the rent has been reduced from the original listing price. A 'HOT' deal means 20%+ drop, 'WARM' means 10-20%, and 'FAIR' means 5-10%.",
  },
  {
    question: "Where does the data come from?",
    answer:
      "Currently, our data comes from Rightmove. We're working on adding more sources including Zoopla, PrimeLocation, and OnTheMarket to give you the most comprehensive view of London rental discounts.",
  },
  {
    question: "How often is the data updated?",
    answer:
      "Our system checks for new listings and price changes every hour. When a landlord reduces their asking rent, you'll see the updated price and drop percentage on our site shortly after.",
  },
  {
    question: "Is this service free?",
    answer:
      "Yes, United Discounts is completely free to use. We believe everyone deserves access to information about rental price drops to help them find affordable housing in London.",
  },
];

export function FAQ() {
  return (
    <section className="border-t border-border bg-bg-secondary py-12">
      <div className="mx-auto max-w-[800px] px-4">
        <h2 className="mb-6 font-heading text-3xl text-text-primary">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <div>
          {FAQ_ITEMS.map((item) => (
            <Accordion key={item.question} title={item.question}>
              {item.answer}
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}
