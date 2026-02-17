"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 2000 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null!);

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const gold = new THREE.Color("#c9a537");
    const purple = new THREE.Color("#8b5cf6");
    const cyan = new THREE.Color("#06b6d4");
    const white = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i++) {
      // Sphere distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 4;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Color variety
      const colorChoice = Math.random();
      const c = colorChoice < 0.35 ? gold : colorChoice < 0.55 ? purple : colorChoice < 0.75 ? cyan : white;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      siz[i] = 0.02 + Math.random() * 0.04;
    }
    return [pos, col, siz];
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.03;
    mesh.current.rotation.x = Math.sin(t * 0.02) * 0.1;

    // Gentle breathing
    const geo = mesh.current.geometry;
    const posAttr = geo.getAttribute("position");
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const origX = positions[ix];
      const origY = positions[ix + 1];
      const origZ = positions[ix + 2];
      const wave = Math.sin(t * 0.5 + i * 0.01) * 0.05;
      posAttr.setXYZ(i, origX + wave, origY + wave * 0.5, origZ + wave * 0.3);
    }
    posAttr.needsUpdate = true;
  });

  // Custom shader material for glow effect
  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
        },
        vertexShader: `
          attribute float size;
          attribute vec3 customColor;
          varying vec3 vColor;
          varying float vAlpha;
          uniform float time;

          void main() {
            vColor = customColor;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            float dist = length(mvPosition.xyz);
            vAlpha = smoothstep(8.0, 2.0, dist) * (0.4 + 0.6 * sin(time + float(gl_VertexID) * 0.1) * 0.5 + 0.5);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vAlpha;

          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float alpha = smoothstep(0.5, 0.0, d) * vAlpha;
            gl_FragColor = vec4(vColor, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useFrame((state) => {
    shaderMaterial.uniforms.time.value = state.clock.getElapsedTime();
  });

  return (
    <points ref={mesh} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-customColor" count={count} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
    </points>
  );
}

function FloatingRing() {
  const ring = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ring.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.3) * 0.1;
    ring.current.rotation.z = t * 0.05;
  });

  return (
    <mesh ref={ring}>
      <torusGeometry args={[3.5, 0.01, 16, 100]} />
      <meshBasicMaterial color="#c9a537" transparent opacity={0.3} />
    </mesh>
  );
}

export default function ParticleArena() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <Particles count={2500} />
        <FloatingRing />
      </Canvas>
    </div>
  );
}
