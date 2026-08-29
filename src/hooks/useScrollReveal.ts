import { useEffect, useRef, useState } from 'react';

interface ScrollRevealOptions {
  /** 0–1, portion of element visible before triggering. Default 0.12 */
  threshold?: number;
  /** Delay in ms before adding visible class. Default 0 */
  delay?: number;
  /** Only trigger once (default true — don't re-hide on scroll back up) */
  once?: boolean;
}

/**
 * Attaches an IntersectionObserver to the returned ref.
 * Returns `isVisible` which flips true when the element enters the viewport.
 * Automatically skips animation for users with prefers-reduced-motion.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
): [React.RefObject<T | null>, boolean] {
  const { threshold = 0.12, delay = 0, once = true } = options;

  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion, show everything immediately
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timeoutId = setTimeout(() => setIsVisible(true), delay);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [threshold, delay, once]);

  return [ref, isVisible];
}
