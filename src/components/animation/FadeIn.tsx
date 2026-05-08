"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FadeIn({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const el = useRef(null);

  useGSAP(() => {
    gsap.from(el.current, {
      y: 40,
      opacity: 0,
      duration: 1,
      delay: delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: el });

  return <div ref={el}>{children}</div>;
}