import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 3000 }) {
    const mesh = useRef();
    const rippleTime = useRef(-1);
    const hovered = useRef(false);
    const lastTrigger = useRef(0);

    const [positions, originalPositions, colors] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const originalPositions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 2 + (Math.random() - 0.5) * 0.3;

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            originalPositions[i * 3] = x;
            originalPositions[i * 3 + 1] = y;
            originalPositions[i * 3 + 2] = z;

            // Muted slate blue
            colors[i * 3] = 0.4;
            colors[i * 3 + 1] = 0.45;
            colors[i * 3 + 2] = 0.55;
        }

        return [positions, originalPositions, colors];
    }, [count]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Auto-trigger every 5 seconds
        if (time - lastTrigger.current > 5) {
            rippleTime.current = time;
            lastTrigger.current = time;
        }

        const posAttr = mesh.current.geometry.attributes.position;
        const colAttr = mesh.current.geometry.attributes.color;

        for (let i = 0; i < count; i++) {
            const ox = originalPositions[i * 3];
            const oy = originalPositions[i * 3 + 1];
            const oz = originalPositions[i * 3 + 2];

            // Breathing animation
            const breathe = Math.sin(time * 0.5 + i * 0.01) * 0.02;
            let dx = ox * (1 + breathe);
            let dy = oy * (1 + breathe);
            let dz = oz * (1 + breathe);

            // Ripple effect
            if (rippleTime.current > 0) {
                const dist = Math.sqrt(ox * ox + oy * oy + oz * oz);
                const rippleProgress = (time - rippleTime.current) * 3;
                const rippleHit = rippleProgress - dist;

                if (rippleHit > 0 && rippleHit < 2) {
                    const intensity = Math.sin(rippleHit * Math.PI) * Math.exp(-rippleHit * 0.5);
                    const pushOut = intensity * 0.8;
                    dx += (ox / dist) * pushOut;
                    dy += (oy / dist) * pushOut;
                    dz += (oz / dist) * pushOut;

                    // Color shift to gold/cyan
                    const colorMix = intensity;
                    colAttr.array[i * 3] = 0.4 + colorMix * 0.6;
                    colAttr.array[i * 3 + 1] = 0.45 + colorMix * 0.4;
                    colAttr.array[i * 3 + 2] = 0.55 - colorMix * 0.3;
                } else if (rippleHit >= 2) {
                    // Fade back
                    colAttr.array[i * 3] = THREE.MathUtils.lerp(colAttr.array[i * 3], 0.4, 0.02);
                    colAttr.array[i * 3 + 1] = THREE.MathUtils.lerp(colAttr.array[i * 3 + 1], 0.45, 0.02);
                    colAttr.array[i * 3 + 2] = THREE.MathUtils.lerp(colAttr.array[i * 3 + 2], 0.55, 0.02);
                }
            }

            posAttr.array[i * 3] = dx;
            posAttr.array[i * 3 + 1] = dy;
            posAttr.array[i * 3 + 2] = dz;
        }

        posAttr.needsUpdate = true;
        colAttr.needsUpdate = true;

        mesh.current.rotation.y += 0.001;
    });

    const handlePointer = () => {
        rippleTime.current = performance.now() / 1000;
    };

    return (
        <points
            ref={mesh}
            onPointerOver={handlePointer}
        >
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
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                vertexColors
                transparent
                opacity={0.9}
                sizeAttenuation
            />
        </points>
    );
}

export default function ResonanceRipple() {
    return (
        <div style={{ width: '100%', height: '400px', background: '#0a0a0f' }}>
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <Particles />
            </Canvas>
        </div>
    );
}
