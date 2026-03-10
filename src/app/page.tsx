"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PropertyListingSection } from "@/components/PropertyListingSection";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [stats, setStats] = useState({
    totalCount: 0,
    dropsCount: 0,
    biggestDrop: 0,
  });

  const handleStatsUpdate = useCallback(
    (newStats: {
      totalCount: number;
      dropsCount: number;
      biggestDrop: number;
    }) => {
      setStats(newStats);
    },
    []
  );

  return (
    <main className="min-h-screen">
      <Header />
      <Hero
        totalCount={stats.totalCount}
        dropsCount={stats.dropsCount}
        biggestDrop={stats.biggestDrop}
      />
      <PropertyListingSection onStatsUpdate={handleStatsUpdate} />
      <FAQ />
      <Footer />
    </main>
  );
}
