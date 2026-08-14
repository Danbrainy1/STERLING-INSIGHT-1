import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; z: number };

export function NeuralCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.innerWidth < 768;
    const count = isSmall ? 34 : 74;
    const linkDist = isSmall ? 120 : 165;

    let width = 0;
    let height = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: 0.5, y: 0.5 };
    const nodes: Node[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        z: 0.4 + Math.random() * 0.6,
      });
    }

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / rect.width;
      pointer.y = (e.clientY - rect.top) / rect.height;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const ox = (pointer.x - 0.5) * 26;
      const oy = (pointer.y - 0.5) * 26;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]!;
        if (!reduced) {
          a.x += a.vx;
          a.y += a.vy;
        }
        if (a.x < 0 || a.x > width) a.vx *= -1;
        if (a.y < 0 || a.y > height) a.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < linkDist) {
            const alpha = (1 - d / linkDist) * 0.4;
            ctx.strokeStyle = `rgba(0, 110, 220, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x + ox * a.z, a.y + oy * a.z);
            ctx.lineTo(b.x + ox * b.z, b.y + oy * b.z);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const px = n.x + ox * n.z;
        const py = n.y + oy * n.z;
        const r = 1.2 + n.z * 1.8;
        const grd = ctx.createRadialGradient(px, py, 0, px, py, r * 5);
        grd.addColorStop(0, "rgba(184, 190, 199, 0.95)");
        grd.addColorStop(1, "rgba(0, 71, 171, 0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(px, py, r * 5, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);
    if (!isSmall) window.addEventListener("pointermove", onPointer);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
