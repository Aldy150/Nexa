
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function GSAPProvider({ children }: { children: React.ReactNode }) {
  // Ce composant peut rester vide ou servir à initialiser 
  // des réglages globaux (ex: ScrollTrigger.config)
  return <>{children}</>;
}