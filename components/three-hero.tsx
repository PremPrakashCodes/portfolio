"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import TypingAnimation from "./typing-animation";

function WireframeIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.15;
    meshRef.current.rotation.x +=
      (pointer.y * 0.2 - meshRef.current.rotation.x) * 0.02;
    meshRef.current.rotation.y +=
      (pointer.x * 0.2 - meshRef.current.rotation.y) * 0.02;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshBasicMaterial
          wireframe
          color="#6366f1"
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <WireframeIcosahedron />
    </>
  );
}

export default function ThreeHero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2 },
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3",
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3",
      );
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0">
        {!isMobile ? (
          <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            dpr={[1, 1.5]}
            style={{ background: "transparent" }}
          >
            <Scene />
          </Canvas>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-violet-500/10" />
        )}
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 opacity-0"
        >
          <span className="gradient-text">Prem Prakash</span>
          <br />
          <span className="text-foreground/90">Sharma</span>
        </h1>

        <div className="text-xl md:text-2xl font-medium mb-6 h-8">
          <TypingAnimation />
        </div>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0"
        >
          Building production grade web and AI systems. Specializing in
          TypeScript, Python, and cloud native architecture.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-wrap justify-center gap-4 opacity-0"
        >
          <Button
            size="lg"
            className="rounded-full bg-blue-500 hover:bg-blue-600 text-white px-8 shadow-lg shadow-blue-500/25"
            asChild
          >
            <Link href="/projects" className="flex items-center gap-2">
              View Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-white/20 hover:bg-white/5 px-8"
            asChild
          >
            <a href="/Prem_Prakash_Sharma_Resume.pdf" download>
              Download Resume
            </a>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
}
