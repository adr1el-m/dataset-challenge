"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

function Particles({ count = 600, animate }: { count?: number; animate: boolean }) {
  const mesh = useRef<THREE.Points>(null);

  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const limeColor = new THREE.Color("#c3ff00");
    const pinkColor = new THREE.Color("#ff1a6c");
    const navyColor = new THREE.Color("#1a2660");

    for (let i = 0; i < count; i++) {
      // Position in a spherical volume
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 5;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Color: mix of lime, pink, and navy
      const t = Math.random();
      const color = t < 0.4
        ? limeColor.clone().lerp(navyColor, Math.random() * 0.5)
        : t < 0.7
        ? pinkColor.clone().lerp(navyColor, Math.random() * 0.5)
        : navyColor.clone().lerp(limeColor, Math.random() * 0.3);

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = 0.02 + Math.random() * 0.06;
    }

    return [positions, colors, sizes];
  }, [count]);

  useFrame((state) => {
    if (!animate) return;
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.y = time * 0.03;
    mesh.current.rotation.x = Math.sin(time * 0.02) * 0.1;

    const positionAttr = mesh.current.geometry.attributes.position;
    const array = positionAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      // Gentle floating animation
      array[ix + 1] += Math.sin(time * 0.5 + i * 0.1) * 0.001;
    }
    positionAttr.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingRing({ radius = 3, color = "#c3ff00", speed = 0.3, animate }: { radius?: number; color?: string; speed?: number; animate: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!animate) return;
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * speed;
    ref.current.rotation.z = t * speed * 0.5;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.008, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.2} />
    </mesh>
  );
}

export default function ParticleArena() {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const shouldAnimate = !reduceMotion && !isMobile;
  const particleCount = isMobile ? 200 : 420;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        frameloop={shouldAnimate ? "always" : "demand"}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <Particles count={particleCount} animate={shouldAnimate} />
        <FloatingRing radius={3.5} color="#c3ff00" speed={0.2} animate={shouldAnimate} />
        <FloatingRing radius={4.5} color="#ff1a6c" speed={0.15} animate={shouldAnimate} />
        <FloatingRing radius={2.5} color="#1a2660" speed={0.25} animate={shouldAnimate} />
      </Canvas>
    </div>
  );
}
