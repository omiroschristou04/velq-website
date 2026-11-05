import { useEffect, useRef } from "react";

/** One passive, frame-coalesced scroll system for all connected study scenes. */
export function useStudyMotion() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previous = window.scrollY;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      root.dataset['direction'] = y < previous ? "up" : "down";
      root.dataset['compact'] = String(y > 230);
      previous = y;
      root.querySelectorAll<HTMLElement>("[data-scene]").forEach((scene) => {
        const rect = scene.getBoundingClientRect();
        const travel = Math.max(1, rect.height - window.innerHeight);
        const progress = media.matches ? 1 : Math.max(0, Math.min(1, -rect.top / travel));
        scene.style.setProperty("--progress", String(progress));
        scene.dataset['stage'] = String(Math.min(3, Math.floor(progress * 4)));
        if (scene.dataset['scene'] === "gallery") scene.dataset['stage'] = String(Math.min(2, Math.floor(progress * 3)));
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    media.addEventListener("change", schedule);
    document.fonts.ready.then(schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      media.removeEventListener("change", schedule);
    };
  }, []);
  return ref;
}