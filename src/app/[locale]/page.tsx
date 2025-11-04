"use client";

import { useState, useEffect, lazy, Suspense, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";

// Professional components (lazy loaded)
import ProfessionalHero from "../components/professional/ProfessionalHero";
const ExperienceTimeline = lazy(
  () => import("../components/professional/ExperienceTimeline")
);
const SkillsPills = lazy(
  () => import("../components/professional/SkillsPills")
);
const VisionSection = lazy(
  () => import("../components/professional/VisionSection")
);

// Personal components (lazy loaded)
import PersonalIntro from "../components/personal/PersonalIntro";
const PassionsGrid = lazy(() => import("../components/personal/PassionsGrid"));
const SideHustle = lazy(() => import("../components/personal/SideHustle"));

// Loading component
function LoadingSection() {
  return (
    <div className="py-20 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
    </div>
  );
}

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const viewFromUrl = searchParams.get("view") as
    | "professional"
    | "personal"
    | null;
  
  // Use URL as single source of truth - no useState
  const view: "professional" | "personal" = viewFromUrl || "professional";

  // Update URL when view changes - Next.js will handle re-render
  const handleViewChange = (newView: "professional" | "personal") => {
    const url = new URL(window.location.href);
    url.searchParams.set("view", newView);
    // Use window.history for immediate URL change
    window.history.pushState({}, '', url.toString());
    // Then trigger router to re-render
    router.push(url.pathname + url.search);
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header view={view} onViewChange={handleViewChange} />

      <main
        id="main-content"
        className="pt-28 md:pt-20"
        role="main"
        aria-label="Main content"
      >
        {view === "professional" ? (
          <>
            <ProfessionalHero />
            <Suspense fallback={<LoadingSection />}>
              <ExperienceTimeline />
            </Suspense>
            <Suspense fallback={<LoadingSection />}>
              <SkillsPills />
            </Suspense>
            <Suspense fallback={<LoadingSection />}>
              <VisionSection />
            </Suspense>
          </>
        ) : (
          <>
            <PersonalIntro />
            <Suspense fallback={<LoadingSection />}>
              <PassionsGrid />
            </Suspense>
            <Suspense fallback={<LoadingSection />}>
              <SideHustle />
            </Suspense>
          </>
        )}
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
