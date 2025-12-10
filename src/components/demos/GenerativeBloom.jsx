import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function Seed() {
    const groupRef = useRef();
    const branchesRef = useRef([]);
    const particlesRef = useRef();
    const [phase, setPhase] = useState('dormant');
    const startTime = useRef(null);

    const branchData = useMemo(() => {
        const branches = [];
        const numBranches = 8;

        for (let i = 0; i < numBranches; i++) {
            const angle = (i / numBranches) * Math.PI * 2;
            const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(Math.cos(angle) * 0.5, 0.3, Math.sin(angle) * 0.5),
                new THREE.Vector3(Math.cos(angle) * 1.2, 0.8 + Math.random() * 0.3, Math.sin(angle) * 1.2),
                new THREE.Vector3(Math.cos(angle) * 1.8, 1.5 + Math.random() * 0.5, Math.sin(angle) * 1.8),
            ]);
            branches.push({
                curve,
                angle,
                color: new THREE.Color().setHSL(0.5 + Math.random() * 0.2, 0.8, 0.6),
            });
        }
        return branches;
    }, []);

    const particles = useMemo(() => {
        const count = 100;
        const positions = new Float32Array(count * 3);
        const velocities = [];

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 0.5;
            positions[i * 3 + 1] = 1.5 + Math.random() * 0.5;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
            velocities.push({
                x: (Math.random() - 0.5) * 0.01,
                y: 0.01 + Math.random() * 0.02,
                z: (Math.random() - 0.5) * 0.01,
            });
        }
        return { positions, velocities, count };
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (startTime.current === null) startTime.current = time;
        const elapsed = time - startTime.current;

        // Phase transitions
        if (elapsed < 1) {
            setPhase('dormant');
        } else if (elapsed < 4) {
            setPhase('growing');
        } else {
            setPhase('bloomed');
        }

        // Core seed rotation and glow
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.005;

            const coreScale = phase === 'dormant'
                ? 1 + Math.sin(time * 3) * 0.1
                : phase === 'growing'
                    ? 0.8
                    : 0.6;

            groupRef.current.children[0]?.scale.setScalar(coreScale);
        }

        // Animate particles in bloomed phase
        if (phase === 'bloomed' && particlesRef.current) {
            const posAttr = particlesRef.current.geometry.attributes.position;
            for (let i = 0; i < particles.count; i++) {
                posAttr.array[i * 3] += particles.velocities[i].x;
                posAttr.array[i * 3 + 1] += particles.velocities[i].y;
                posAttr.array[i * 3 + 2] += particles.velocities[i].z;

                // Reset particles that go too high
                if (posAttr.array[i * 3 + 1] > 4) {
                    posAttr.array[i * 3] = (Math.random() - 0.5) * 0.5;
                    posAttr.array[i * 3 + 1] = 1.5;
                    posAttr.array[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
                }
            }
            posAttr.needsUpdate = true;
        }

        // Reset animation loop
        if (elapsed > 8) {
            startTime.current = time;
        }
    });

    const growthProgress = useMemo(() => {
        return (phase) => {
            if (phase === 'dormant') return 0;
            if (phase === 'growing') return 0.8;
            return 1;
        };
    }, []);

    return (
        <group ref={groupRef}>
            {/* Core Seed */}
            <mesh>
                <icosahedronGeometry args={[0.3, 1]} />
                <meshStandardMaterial
                    color="#4fd1c5"
                    emissive="#4fd1c5"
                    emissiveIntensity={phase === 'dormant' ? 0.5 + Math.sin(Date.now() * 0.003) * 0.3 : 1}
                    wireframe
                />
            </mesh>

            {/* Branches */}
            {(phase === 'growing' || phase === 'bloomed') && branchData.map((branch, i) => (
                <mesh key={i}>
                    <tubeGeometry
                        args={[branch.curve, 20, 0.02, 8, false]}
                    />
                    <meshStandardMaterial
                        color={branch.color}
                        emissive={branch.color}
                        emissiveIntensity={0.8}
                        transparent
                        opacity={phase === 'bloomed' ? 1 : 0.7}
                    />
                </mesh>
            ))}

            {/* Floating particles */}
            {phase === 'bloomed' && (
                <points ref={particlesRef}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={particles.count}
                            array={particles.positions}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <pointsMaterial
                        size={0.05}
                        color="#ffd700"
                        transparent
                        opacity={0.8}
                    />
                </points>
            )}
        </group>
    );
}

export default function GenerativeBloom() {
    return (
        <div style={{ width: '100%', height: '400px', background: '#0a0a0f' }}>
            <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[5, 5, 5]} intensity={1} />
                <Seed />
                <EffectComposer>
                    <Bloom
                        intensity={1.5}
                        luminanceThreshold={0.2}
                        luminanceSmoothing={0.9}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
