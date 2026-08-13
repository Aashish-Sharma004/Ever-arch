import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Disable browser's default scroll restoration memory
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Instantly force window to absolute top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Forces immediate jump without smooth scrolling lag
    });

    // 3. Double-tap scroll reset after a tiny delay to catch any layout shifts
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}