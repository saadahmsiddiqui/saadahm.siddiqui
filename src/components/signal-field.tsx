import { useEffect, useRef } from "react";

/**
 * Background for the hero: a dim grid of pixels with a few signals travelling
 * along it, turning at junctions and leaving a fading trail.
 */

const GAP = 28; // px between grid points
const TURN_CHANCE = 0.18; // per step
const TRAIL_DECAY = 1.6; // per second (exponential)

type Signal = {
  c: number;
  r: number;
  dc: number;
  dr: number;
  t: number; // progress to next point, 0..1
  speed: number; // grid steps per second
  ttl: number; // steps left
};

function cssVar(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

export default function SignalField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dotColor = cssVar("--slate-9", "#696e77");
    const trailColor = cssVar("--slate-12", "#edeef0");
    const headColor = cssVar("--amber-9", "#ffc53d");

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let offsetX = 0;
    let offsetY = 0;
    let heat = new Float32Array(0);
    let signals: Signal[] = [];
    let maxSignals = 0;
    let raf = 0;
    let last = 0;

    const index = (c: number, r: number) => r * cols + c;
    const inside = (c: number, r: number) => c >= 0 && r >= 0 && c < cols && r < rows;

    function spawn() {
      const horizontal = Math.random() < 0.5;
      const sign = Math.random() < 0.5 ? -1 : 1;
      signals.push({
        c: Math.floor(Math.random() * cols),
        r: Math.floor(Math.random() * rows),
        dc: horizontal ? sign : 0,
        dr: horizontal ? 0 : sign,
        t: 0,
        speed: 6 + Math.random() * 6,
        ttl: 10 + Math.floor(Math.random() * 24),
      });
    }

    function update(dt: number) {
      const decay = Math.exp(-dt * TRAIL_DECAY);
      for (let i = 0; i < heat.length; i++) heat[i] *= decay;

      for (const s of signals) {
        s.t += s.speed * dt;
        while (s.t >= 1 && s.ttl > 0) {
          s.t -= 1;
          s.c += s.dc;
          s.r += s.dr;
          s.ttl -= 1;
          if (!inside(s.c, s.r)) {
            s.ttl = 0;
            break;
          }
          heat[index(s.c, s.r)] = 1;
          if (Math.random() < TURN_CHANCE) {
            const turn = Math.random() < 0.5 ? -1 : 1;
            [s.dc, s.dr] = [s.dr * turn, s.dc * turn];
          }
        }
      }
      signals = signals.filter((s) => s.ttl > 0);
      if (signals.length < maxSignals && Math.random() < dt * 2.5) spawn();
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      // Base grid, one batched path.
      ctx!.globalAlpha = 0.28;
      ctx!.fillStyle = dotColor;
      ctx!.beginPath();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          ctx!.rect(offsetX + c * GAP - 0.75, offsetY + r * GAP - 0.75, 1.5, 1.5);
        }
      }
      ctx!.fill();

      // Trails.
      ctx!.fillStyle = trailColor;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const h = heat[index(c, r)];
          if (h < 0.02) continue;
          const size = 1.5 + h * 1.5;
          ctx!.globalAlpha = h * 0.55;
          ctx!.fillRect(offsetX + c * GAP - size / 2, offsetY + r * GAP - size / 2, size, size);
        }
      }

      // Signal heads, between grid points.
      ctx!.fillStyle = headColor;
      ctx!.globalAlpha = 0.85;
      for (const s of signals) {
        const x = offsetX + (s.c + s.dc * s.t) * GAP;
        const y = offsetY + (s.r + s.dr * s.t) * GAP;
        ctx!.fillRect(x - 1.5, y - 1.5, 3, 3);
      }
      ctx!.globalAlpha = 1;
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.floor(width / GAP) + 1;
      rows = Math.floor(height / GAP) + 1;
      offsetX = (width - (cols - 1) * GAP) / 2;
      offsetY = (height - (rows - 1) * GAP) / 2;
      heat = new Float32Array(cols * rows);
      signals = [];
      maxSignals = Math.max(3, Math.min(14, Math.round((cols * rows) / 110)));

      if (reduceMotion) {
        // One still frame with a few settled trails.
        for (let i = 0; i < maxSignals; i++) spawn();
        for (let i = 0; i < 90; i++) update(1 / 60);
      }
      draw();
    }

    function frame(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      update(dt);
      draw();
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (reduceMotion || raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const visibility = new IntersectionObserver(([entry]) =>
      entry.isIntersecting ? start() : stop(),
    );
    visibility.observe(canvas);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibility.disconnect();
    };
  }, []);

  return (
    <div aria-hidden="true" className={`pointer-events-none ${className}`}>
      <canvas ref={ref} className="block h-full w-full" />
    </div>
  );
}
