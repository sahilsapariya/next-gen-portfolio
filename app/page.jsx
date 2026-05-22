"use client";

import { useIsMobile, useLiveTime, usePrefersReducedMotion } from "@/hooks";
import { Cursor, FilmGrain, Nav, ScrollProgress } from "@/components/chrome";
import {
  Contact,
  CurrentFocus,
  ExperimentalLab,
  FieldNotes,
  Hero,
  Journey,
  Philosophy,
  SelectedWork,
  Systems,
} from "@/components/sections";

export default function Page() {
  const time = useLiveTime();
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  return (
    <>
      {!isMobile && !reduced && <Cursor />}
      <ScrollProgress />
      <FilmGrain />
      <Nav time={time} />

      <main>
        <Hero reduced={reduced} time={time} />
        <CurrentFocus time={time} />
        <SelectedWork />
        <Systems />
        <FieldNotes />
        <Journey />
        <ExperimentalLab />
        <Philosophy />
        <Contact time={time} />
      </main>
    </>
  );
}
