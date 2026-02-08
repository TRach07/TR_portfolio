/**
 * 3D particle background — interactive floating particles using React Three Fiber.
 * Particles respond to mouse movement and change color based on the current theme.
 * Loaded lazily via next/dynamic to avoid SSR issues.
 */

"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSettingsStore } from "@/store/useSettingsStore";

/** Number of particles to render */
const PARTICLE_COUNT = 200;

/** Particle system mesh that animates each frame */
function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const theme = useSettingsStore((s) => s.theme);
  const mouseRef = useRef({ x: 0, y: 0 });

  /** Generate initial random particle positions */
  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;     // x
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10; // y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5;  // z
    }
    return arr;
  }, []);

  /** Track mouse position normalized to viewport */
  const handlePointerMove = useMemo(
    () => (e: { clientX: number; clientY: number }) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    },
    []
  );

  // Listen for mouse movement on the window
  useMemo(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handlePointerMove);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", handlePointerMove);
      }
    };
  }, [handlePointerMove]);

  /** Animate particles: slow floating + subtle mouse influence */
  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const positionsAttr = meshRef.current.geometry.attributes.position;
    const arr = positionsAttr.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Gentle floating motion
      arr[i3 + 1] += Math.sin(time * 0.3 + i * 0.1) * 0.001;
      arr[i3] += Math.cos(time * 0.2 + i * 0.05) * 0.0005;

      // Subtle attraction toward mouse
      arr[i3] += mouseRef.current.x * 0.0003;
      arr[i3 + 1] += mouseRef.current.y * 0.0003;
    }

    positionsAttr.needsUpdate = true;

    // Slow overall rotation
    meshRef.current.rotation.y = time * 0.02;
    meshRef.current.rotation.x = time * 0.01;
  });

  /** Theme-based particle color */
  const color = theme === "dark" ? "#6c63ff" : "#4f46e5";

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Wrapper component that creates the Three.js canvas */
export function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
