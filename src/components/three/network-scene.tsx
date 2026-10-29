"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  AdditiveBlending,
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  MathUtils,
} from "three";
import { exceedsFrameBudget } from "./frame-budget";

const nodes: [number, number, number][] = [
  [-1.8, 1.1, 0.3],
  [0.1, 1.9, -0.5],
  [1.9, 0.7, 0.2],
  [1.5, -1.5, -0.4],
  [-0.6, -2, 0.4],
  [0.2, -0.1, 0.8],
  [-2, -0.8, -0.8],
  [1.1, 1.4, -1.1],
];
const edges: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 0],
  [0, 5],
  [1, 5],
  [2, 5],
  [3, 5],
  [4, 5],
  [0, 3],
  [1, 4],
  [6, 0],
  [6, 4],
  [6, 5],
  [7, 1],
  [7, 2],
  [7, 5],
];

function Network({ active, onReady, onFailure }: SceneProps) {
  const group = useRef<Group>(null);
  const elapsed = useRef(0);
  const samples = useRef<number[]>([]);
  const last = useRef(0);
  const frames = useRef(0);
  const { gl, invalidate, pointer } = useThree();
  const geometry = useMemo(() => {
    const value = new BufferGeometry();
    value.setAttribute(
      "position",
      new Float32BufferAttribute(
        edges.flatMap(([a, b]) => [...nodes[a]!, ...nodes[b]!]),
        3,
      ),
    );
    return value;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event: Event) => {
      event.preventDefault();
      onFailure();
    };
    canvas.addEventListener("webglcontextlost", lost);
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [gl, onFailure]);
  useEffect(() => {
    last.current = 0;
    samples.current = [];
    frames.current = 0;
    if (!active) return;
    // Demand rendering capped at roughly 30 fps; no timer while hidden/offscreen.
    invalidate();
    const timer = window.setInterval(invalidate, 1000 / 30);
    return () => window.clearInterval(timer);
  }, [active, invalidate]);

  useFrame((_, delta) => {
    if (!active || !group.current) return;
    elapsed.current += Math.min(delta, 0.05);
    const t = elapsed.current;
    const smoothing = 1 - Math.exp(-Math.min(delta, 0.05) * 3);
    group.current.rotation.x = MathUtils.lerp(
      group.current.rotation.x,
      Math.sin(t * 0.15) * 0.07 - pointer.y * 0.06,
      smoothing,
    );
    group.current.rotation.y = MathUtils.lerp(
      group.current.rotation.y,
      Math.sin(t * 0.12) * 0.13 + pointer.x * 0.1,
      smoothing,
    );
    group.current.position.y = Math.sin(t * 0.35) * 0.045;
    frames.current++;
    if (frames.current === 2) onReady();
    const now = performance.now();
    if (frames.current > 60 && last.current) {
      samples.current.push(now - last.current);
      if (samples.current.length === 60) {
        if (exceedsFrameBudget(samples.current)) onFailure();
        samples.current = [];
      }
    }
    last.current = now;
  });

  return (
    <group ref={group}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial color="#8187ef" transparent opacity={0.42} />
      </lineSegments>
      {nodes.map((position, index) => (
        <group key={index} position={position}>
          <mesh>
            <sphereGeometry args={[index === 5 ? 0.13 : 0.065, 16, 12]} />
            <meshBasicMaterial
              color={index === 5 || index % 3 === 0 ? "#38bdf8" : "#947cff"}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[index === 5 ? 0.26 : 0.13, 16, 12]} />
            <meshBasicMaterial
              color={index === 5 ? "#38bdf8" : "#7357f5"}
              transparent
              opacity={0.1}
              depthWrite={false}
              blending={AdditiveBlending}
            />
          </mesh>
        </group>
      ))}
      <mesh rotation={[0.7, 0.4, 0.3]}>
        <torusGeometry args={[2.65, 0.006, 4, 96]} />
        <meshBasicMaterial color="#8291bd" transparent opacity={0.16} />
      </mesh>
      <mesh rotation={[-0.6, -0.2, -0.4]}>
        <torusGeometry args={[2.65, 0.006, 4, 96]} />
        <meshBasicMaterial color="#7357f5" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

type SceneProps = {
  active: boolean;
  onReady: () => void;
  onFailure: () => void;
};
export default function NetworkScene(props: SceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 43 }}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      frameloop="demand"
    >
      <Network {...props} />
    </Canvas>
  );
}
