"use client";

import { useEffect } from "react";

export default function ScrollAnimations() {
  useEffect(() => {
    // Intersection Observer for fade-up animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-up").forEach((el) => {
      observer.observe(el);
    });

    // Animated counters
    const counters = document.querySelectorAll(".counter");
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const target = el.getAttribute("data-target");
            if (!target) return;

            const targetNum = parseInt(target, 10);
            const suffix = el.getAttribute("data-suffix") || "";
            if (targetNum === 0) {
              el.textContent = "0";
              counterObserver.unobserve(el);
              return;
            }
            let current = 0;
            const increment = Math.max(1, Math.floor(targetNum / 40));
            const format = (n: number) => {
              if (targetNum >= 1000) return Math.floor(n / 1000) + "K";
              return n.toString();
            };
            const timer = setInterval(() => {
              current += increment;
              if (current >= targetNum) {
                current = targetNum;
                clearInterval(timer);
              }
              el.textContent = format(current) + suffix;
            }, 30);

            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((el) => {
      counterObserver.observe(el);
    });

    return () => {
      observer.disconnect();
      counterObserver.disconnect();
    };
  }, []);

  return null;
}
