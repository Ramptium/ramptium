import { useEffect, useRef } from "react";

/**
 * Canvas particle network — nodes + flowing connection lines.
 * Uses HSL CSS variables from the design system. Pauses off-screen and
 * respects prefers-reduced-motion.
 */
export function HeroNetwork({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Read theme colors from CSS vars
    const root = getComputedStyle(document.documentElement);
    const primary = `hsl(${root.getPropertyValue("--primary").trim()})`;
    const accent = `hsl(${root.getPropertyValue("--accent").trim()})`;
    const border = `hsl(${root.getPropertyValue("--border").trim()})`;

    type Node = { x: number; y: number; vx: number; vy: number; r: number; hub?: boolean };
    type Pulse = { from: number; to: number; t: number; speed: number; color: string };

    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(38, Math.max(18, Math.floor((width * height) / 22000)));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: i % 7 === 0 ? 2.6 : 1.4,
        hub: i % 7 === 0,
      }));
      pulses = [];
    };

    const spawnPulse = () => {
      if (nodes.length < 2) return;
      const from = Math.floor(Math.random() * nodes.length);
      let to = Math.floor(Math.random() * nodes.length);
      if (to === from) to = (to + 1) % nodes.length;
      pulses.push({
        from,
        to,
        t: 0,
        speed: 0.004 + Math.random() * 0.006,
        color: Math.random() > 0.5 ? accent : primary,
      });
    };

    const MAX_DIST = 140;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Update node positions
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      // Draw connection lines based on proximity
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.35;
            ctx.strokeStyle = border;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      // Draw pulses
      pulses = pulses.filter((p) => {
        p.t += p.speed;
        if (p.t >= 1) return false;
        const a = nodes[p.from];
        const b = nodes[p.to];
        if (!a || !b) return false;
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;

        // Draw line trail
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = 0.5;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Pulse head
        ctx.globalAlpha = 1;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        return true;
      });
      ctx.globalAlpha = 1;

      // Draw nodes
      for (const n of nodes) {
        ctx.fillStyle = n.hub ? accent : primary;
        ctx.globalAlpha = n.hub ? 0.95 : 0.7;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        if (n.hub) {
          ctx.strokeStyle = accent;
          ctx.globalAlpha = 0.25;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 4, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      // Occasionally spawn a pulse
      if (!reduced && pulses.length < 8 && Math.random() < 0.04) spawnPulse();

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
}
