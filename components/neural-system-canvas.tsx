"use client";

import { type RefObject, useEffect, useRef } from "react";

type Point = { x: number; y: number };
type NetworkNode = Point & {
  homeX: number;
  homeY: number;
  layer: number;
  radius: number;
  phase: number;
};

type NeuralSystemCanvasProps = {
  containerRef: RefObject<HTMLElement | null>;
};

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

function seeded(index: number) {
  const value = Math.sin(index * 9283.31 + 17.17) * 43758.5453;
  return value - Math.floor(value);
}

export default function NeuralSystemCanvas({
  containerRef,
}: NeuralSystemCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = containerRef.current;
    if (!canvas || !section) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const pointer = { x: -1000, y: -1000, active: false, burst: 0 };
    let nodes: NetworkNode[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let visible = true;
    let animationFrame = 0;
    let running = false;
    let scrollProgress = 0;
    let lastFrame = 0;

    const corePosition = (architecture = 0) => {
      const mobile = width < 768;
      const start = {
        x: width * (mobile ? 0.5 : 0.76),
        y: height * (mobile ? 0.68 : 0.42),
      };
      const organized = {
        x: width * (mobile ? 0.5 : 0.69),
        y: height * (mobile ? 0.54 : 0.38),
      };

      return {
        x: start.x + (organized.x - start.x) * architecture,
        y: start.y + (organized.y - start.y) * architecture,
      };
    };

    const architectureColumnX = (layer: number) => {
      const mobile = width < 768;
      const columnWidth = mobile ? width * 0.15 : Math.min(width * 0.09, 150);
      const startX = mobile ? width * 0.2 : width * 0.51;
      return startX + layer * columnWidth;
    };

    const createNodes = () => {
      const mobile = width < 768;
      const count = mobile ? 28 : 66;
      const core = corePosition(0);

      nodes = Array.from({ length: count }, (_, index) => {
        const layer = index % 5;
        const angle = seeded(index) * Math.PI * 2;
        const distance =
          (mobile ? 70 : 110) + seeded(index + 4) * (mobile ? 210 : 420);
        const x = core.x + Math.cos(angle) * distance;
        const y = core.y + Math.sin(angle) * distance * 0.62;
        return {
          x,
          y,
          homeX: x,
          homeY: y,
          layer,
          radius: 1.2 + seeded(index + 8) * 2.1,
          phase: seeded(index + 12) * Math.PI * 2,
        };
      });
    };

    const architectureTarget = (node: NetworkNode, index: number) => {
      const mobile = width < 768;
      const itemsInLayer = Math.ceil(nodes.length / 5);
      const row = Math.floor(index / 5);
      const rowHeight = mobile ? 22 : 28;
      const centeredRow = row - (itemsInLayer - 1) / 2;
      const core = corePosition(1);
      const corridor = mobile ? 36 : 52;
      return {
        x: architectureColumnX(node.layer),
        y: core.y + centeredRow * rowHeight + (centeredRow >= 0 ? corridor : -corridor),
      };
    };

    const drawArchitectureBus = (time: number, architecture: number) => {
      if (architecture < 0.02) return;
      const core = corePosition(architecture);
      const firstX = architectureColumnX(0);
      const lastX = architectureColumnX(4);
      const branch = width < 768 ? 30 : 43;

      context.save();
      context.globalAlpha = architecture;
      context.lineWidth = 0.8;
      context.strokeStyle = "rgba(101, 224, 241, 0.22)";
      context.beginPath();
      context.moveTo(firstX, core.y);
      context.lineTo(lastX, core.y);
      context.stroke();

      for (let layer = 0; layer < 5; layer += 1) {
        const x = architectureColumnX(layer);
        context.strokeStyle =
          layer === 2
            ? "rgba(180, 248, 71, 0.38)"
            : "rgba(118, 150, 167, 0.22)";
        context.beginPath();
        context.moveTo(x, core.y - branch);
        context.lineTo(x, core.y + branch);
        context.stroke();

        context.fillStyle =
          layer === 2
            ? "rgba(180, 248, 71, 0.9)"
            : "rgba(101, 224, 241, 0.62)";
        context.save();
        context.translate(x, core.y);
        context.rotate(Math.PI / 4);
        context.fillRect(-2.2, -2.2, 4.4, 4.4);
        context.restore();

        if (!reduceMotion && layer !== 2) {
          const travel = (time * 0.0002 + layer * 0.19) % 1;
          const movingIn = layer < 2;
          const start = movingIn ? x : core.x;
          const end = movingIn ? core.x : x;
          const tokenX = start + (end - start) * travel;
          context.fillStyle =
            layer < 2
              ? "rgba(101, 224, 241, 0.95)"
              : "rgba(180, 248, 71, 0.92)";
          context.shadowColor = context.fillStyle;
          context.shadowBlur = 9;
          context.fillRect(tokenX - 2.5, core.y - 1.25, 5, 2.5);
          context.shadowBlur = 0;
        }
      }
      context.restore();
    };

    const drawCore = (time: number, architecture: number) => {
      const core = corePosition(architecture);
      const pulse = reduceMotion ? 0 : Math.sin(time * 0.0014) * 0.5 + 0.5;
      const radius = (width < 768 ? 42 : 62) * (1 - architecture * 0.08);
      const breathing = reduceMotion ? 0 : Math.sin(time * 0.0011) * 2.2;

      context.save();
      context.translate(core.x, core.y);
      context.rotate((reduceMotion ? 0.12 : time * 0.000035) + architecture * 0.18);
      context.strokeStyle = `rgba(180, 248, 71, ${0.28 + pulse * 0.12})`;
      context.lineWidth = 1;
      context.setLineDash([3, 8]);
      context.beginPath();
      for (let index = 0; index < 8; index += 1) {
        const angle = (index / 8) * Math.PI * 2;
        const edge = index % 2 === 0 ? radius * 1.3 : radius;
        const x = Math.cos(angle) * edge;
        const y = Math.sin(angle) * edge * 0.72;
        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.closePath();
      context.stroke();
      context.setLineDash([]);

      context.rotate(-(reduceMotion ? 0.12 : time * 0.000075));
      context.strokeStyle = `rgba(101, 224, 241, ${0.35 + pointer.burst * 0.35})`;
      context.beginPath();
      context.moveTo(-radius * 0.76, -radius * 0.22);
      context.lineTo(-radius * 0.18, -radius * 0.58);
      context.lineTo(radius * 0.68, -radius * 0.25);
      context.lineTo(radius * 0.46, radius * 0.5);
      context.lineTo(-radius * 0.5, radius * 0.55);
      context.closePath();
      context.stroke();

      for (let satellite = 0; satellite < 3; satellite += 1) {
        const angle =
          (reduceMotion ? 0.7 : time * 0.00018) +
          satellite * ((Math.PI * 2) / 3);
        const satelliteX = Math.cos(angle) * radius * 1.48;
        const satelliteY = Math.sin(angle) * radius * 0.82;
        context.strokeStyle = "rgba(101, 224, 241, 0.12)";
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(satelliteX, satelliteY);
        context.stroke();
        context.save();
        context.translate(satelliteX, satelliteY);
        context.rotate(angle + Math.PI / 4);
        context.fillStyle =
          satellite === 1
            ? "rgba(180, 248, 71, 0.86)"
            : "rgba(101, 224, 241, 0.74)";
        context.fillRect(-2.6, -2.6, 5.2, 5.2);
        context.restore();
      }

      context.save();
      context.rotate(Math.PI / 4);
      context.fillStyle = "rgba(180, 248, 71, 0.92)";
      context.shadowColor = "rgba(180, 248, 71, 0.55)";
      context.shadowBlur = 12 + pulse * 8;
      context.fillRect(-3.5 - breathing * 0.12, -3.5 - breathing * 0.12, 7 + breathing * 0.24, 7 + breathing * 0.24);
      context.restore();

      const automaticPulse = reduceMotion
        ? 0
        : Math.pow(Math.max(0, Math.sin(time * 0.00082)), 10);
      if (automaticPulse > 0.015) {
        context.strokeStyle = `rgba(180, 248, 71, ${automaticPulse * 0.24})`;
        context.lineWidth = 1;
        context.strokeRect(
          -radius * (1.05 + automaticPulse * 0.28),
          -radius * (0.66 + automaticPulse * 0.18),
          radius * 2 * (1.05 + automaticPulse * 0.28),
          radius * 2 * (0.66 + automaticPulse * 0.18),
        );
      }

      context.restore();

      if (pointer.burst > 0.01) {
        context.strokeStyle = `rgba(101, 224, 241, ${pointer.burst * 0.45})`;
        context.lineWidth = 1;
        context.beginPath();
        context.ellipse(
          core.x,
          core.y,
          radius + (1 - pointer.burst) * 110,
          radius * 0.7 + (1 - pointer.burst) * 70,
          0,
          0,
          Math.PI * 2,
        );
        context.stroke();
      }
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      const architecture = clamp((scrollProgress - 0.28) / 0.72);
      const maxDistance = width < 768 ? 122 : 172;

      nodes.forEach((node, index) => {
        const target = architectureTarget(node, index);
        const drift = reduceMotion ? 0 : Math.sin(time * 0.00045 + node.phase) * 7;
        let desiredX = node.homeX + drift;
        let desiredY = node.homeY + Math.cos(time * 0.00038 + node.phase) * 5;

        desiredX += (target.x - desiredX) * architecture;
        desiredY += (target.y - desiredY) * architecture;

        if (pointer.active && !reduceMotion) {
          const dx = node.x - pointer.x;
          const dy = node.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 140) {
            const force = (1 - distance / 140) * 18;
            desiredX += (dx / Math.max(distance, 1)) * force;
            desiredY += (dy / Math.max(distance, 1)) * force;
          }
        }

        node.x += (desiredX - node.x) * (reduceMotion ? 1 : 0.045);
        node.y += (desiredY - node.y) * (reduceMotion ? 1 : 0.045);
      });

      const connections: Array<[NetworkNode, NetworkNode, number]> = [];
      for (let first = 0; first < nodes.length; first += 1) {
        for (let second = first + 1; second < nodes.length; second += 1) {
          const a = nodes[first];
          const b = nodes[second];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          const layered = Math.abs(a.layer - b.layer) <= 1;
          if (distance < maxDistance && (architecture < 0.45 || layered)) {
            connections.push([a, b, distance]);
          }
        }
      }

      connections.forEach(([a, b, distance], index) => {
        const cursorDistance = Math.min(
          Math.hypot((a.x + b.x) / 2 - pointer.x, (a.y + b.y) / 2 - pointer.y),
          220,
        );
        const proximity = pointer.active ? 1 - cursorDistance / 220 : 0;
        const alpha =
          0.045 + (1 - distance / maxDistance) * 0.14 + proximity * 0.24;
        context.strokeStyle = `rgba(118, 150, 167, ${alpha})`;
        context.lineWidth = proximity > 0.35 ? 1 : 0.65;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();

        if (!reduceMotion && index % 9 === 0) {
          const travel = (time * 0.00012 + index * 0.173) % 1;
          const x = a.x + (b.x - a.x) * travel;
          const y = a.y + (b.y - a.y) * travel;
          context.fillStyle = `rgba(101, 224, 241, ${0.5 + proximity * 0.4})`;
          context.beginPath();
          context.arc(x, y, 1.35 + proximity, 0, Math.PI * 2);
          context.fill();
        }
      });

      nodes.forEach((node) => {
        const nearPointer =
          pointer.active && Math.hypot(node.x - pointer.x, node.y - pointer.y) < 130;
        context.fillStyle = nearPointer
          ? "rgba(180, 248, 71, 0.95)"
          : node.layer === 2
            ? "rgba(101, 224, 241, 0.78)"
            : "rgba(169, 190, 199, 0.58)";
        context.beginPath();
        context.arc(
          node.x,
          node.y,
          node.radius + (nearPointer ? 1.4 : 0),
          0,
          Math.PI * 2,
        );
        context.fill();
      });

      drawArchitectureBus(time, architecture);
      drawCore(time, architecture);
      pointer.burst *= 0.965;
      lastFrame = time;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createNodes();
      if (reduceMotion) draw(0);
    };

    const updateScroll = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      scrollProgress = clamp(-rect.top / travel);
      if (reduceMotion) draw(0);
    };

    const loop = (time: number) => {
      if (!running) return;
      if (visible && (!lastFrame || time - lastFrame > 16)) draw(time);
      animationFrame = requestAnimationFrame(loop);
    };

    const pointerPosition = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
      if (event.pointerType !== "mouse") {
        pointer.burst = Math.max(pointer.burst, 0.42);
      }
    };

    const activateCore = (event: PointerEvent) => {
      pointerPosition(event);
      const architecture = clamp((scrollProgress - 0.28) / 0.72);
      const core = corePosition(architecture);
      if (Math.hypot(pointer.x - core.x, pointer.y - core.y) < 120) {
        pointer.burst = 1;
      }
    };

    const leave = () => {
      pointer.active = false;
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (reduceMotion) return;
        if (visible && !running) {
          running = true;
          animationFrame = requestAnimationFrame(loop);
        } else if (!visible && running) {
          running = false;
          cancelAnimationFrame(animationFrame);
        }
      },
      { rootMargin: "120px" },
    );
    const resizeObserver = new ResizeObserver(resize);

    resizeObserver.observe(canvas);
    intersectionObserver.observe(section);
    window.addEventListener("scroll", updateScroll, { passive: true });
    canvas.addEventListener("pointermove", pointerPosition, { passive: true });
    canvas.addEventListener("pointerdown", activateCore, { passive: true });
    canvas.addEventListener("pointerleave", leave, { passive: true });
    updateScroll();
    resize();

    if (!reduceMotion) {
      running = true;
      animationFrame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      running = false;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("scroll", updateScroll);
      canvas.removeEventListener("pointermove", pointerPosition);
      canvas.removeEventListener("pointerdown", activateCore);
      canvas.removeEventListener("pointerleave", leave);
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="neural-system-canvas"
      aria-hidden="true"
    />
  );
}
