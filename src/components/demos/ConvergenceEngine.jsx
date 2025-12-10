import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, GodRays } from '@react-three/postprocessing';
import * as THREE from 'three';

function Shape({ position, delay, targetPos, geometry, color }) {
    const meshRef = useRef();
    const startPos = useRef(new THREE.Vector3(...position));
    const startTime = useRef(null);
    const merged = useRef(false);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (startTime.current === null) startTime.current = time;
        const elapsed = time - startTime.current;

        if (!meshRef.current) return;

        const animStart = delay;
        const animDuration = 2;
        const mergeTime = animStart + animDuration;

        if (elapsed < animStart) {
            // Idle drifting
            meshRef.current.position.x = startPos.current.x + Math.sin(time * 0.5 + delay) * 0.1;
            meshRef.current.position.y = startPos.current.y + Math.cos(time * 0.3 + delay) * 0.1;
            meshRef.current.position.z = startPos.current.z + Math.sin(time * 0.4 + delay) * 0.1;
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
        } else if (elapsed < mergeTime) {
            // Spiral convergence
            const progress = (elapsed - animStart) / animDuration;
            const eased = 1 - Math.pow(1 - progress, 3);

            const spiralAngle = progress * Math.PI * 4 + delay;
            const spiralRadius = (1 - eased) * 2;

            meshRef.current.position.x = THREE.MathUtils.lerp(startPos.current.x, 0, eased) + Math.cos(spiralAngle) * spiralRadius;
            meshRef.current.position.y = THREE.MathUtils.lerp(startPos.current.y, 0, eased) + Math.sin(spiralAngle * 0.5) * spiralRadius * 0.5;
            meshRef.current.position.z = THREE.MathUtils.lerp(startPos.current.z, 0, eased) + Math.sin(spiralAngle) * spiralRadius;

            meshRef.current.rotation.x += 0.05;
            meshRef.current.rotation.y += 0.05;

            const scale = 1 - eased * 0.5;
            meshRef.current.scale.setScalar(scale);
        } else {
            // Merged state
            merged.current = true;
            meshRef.current.visible = false;
        }

        // Reset loop
        if (elapsed > 8) {
            startTime.current = time;
            merged.current = false;
            meshRef.current.visible = true;
            meshRef.current.scale.setScalar(1);
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            {geometry === 'box' && <boxGeometry args={[0.15, 0.15, 0.15]} />}
            {geometry === 'tetra' && <tetrahedronGeometry args={[0.12]} />}
            {geometry === 'sphere' && <sphereGeometry args={[0.08, 8, 8]} />}
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.3}
            />
        </mesh>
    );
}

function CentralOrb() {
    const meshRef = useRef();
    const startTime = useRef(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (startTime.current === null) startTime.current = time;
        const elapsed = time - startTime.current;

        if (!meshRef.current) return;

        const mergeTime = 3.5;

        if (elapsed < mergeTime) {
            meshRef.current.scale.setScalar(0);
        } else if (elapsed < mergeTime + 0.5) {
            // Flash and appear
            const progress = (elapsed - mergeTime) / 0.5;
            meshRef.current.scale.setScalar(progress * 1.5);
        } else if (elapsed < 8) {
            // Rotate and pulse
            meshRef.current.rotation.y += 0.01;
            const pulse = 1 + Math.sin((elapsed - mergeTime) * 3) * 0.1;
            meshRef.current.scale.setScalar(pulse);
        }

        if (elapsed > 8) {
            startTime.current = time;
        }
    });

    return (
        <mesh ref={meshRef}>
            <icosahedronGeometry args={[0.8, 2]} />
            <meshStandardMaterial
                color="#ffd700"
                emissive="#ffd700"
                emissiveIntensity={2}
                wireframe
            />
        </mesh>
    );
}

function Shapes() {
    const shapes = useMemo(() => {
        const result = [];
        const geometries = ['box', 'tetra', 'sphere'];
        const colors = ['#4a5568', '#2d3748', '#1a202c', '#718096'];

        for (let i = 0; i < 60; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 3 + Math.random() * 2;

            result.push({
                position: [
                    radius * Math.sin(phi) * Math.cos(theta),
                    radius * Math.sin(phi) * Math.sin(theta),
                    radius * Math.cos(phi),
                ],
                delay: 1 + Math.random() * 1.5,
                geometry: geometries[Math.floor(Math.random() * geometries.length)],
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }
        return result;
    }, []);

    return (
        <>
            {shapes.map((shape, i) => (
                <Shape key={i} {...shape} />
            ))}
            <CentralOrb />
        </>
    );
}

export default function ConvergenceEngine() {
    return (
        <div style={{ width: '100%', height: '400px', background: '#0a0a0f' }}>
            <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[0, 0, 0]} intensity={2} color="#ffd700" />
                <Shapes />
                <EffectComposer>
                    <Bloom
                        intensity={1.5}
                        luminanceThreshold={0.3}
                        luminanceSmoothing={0.9}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
