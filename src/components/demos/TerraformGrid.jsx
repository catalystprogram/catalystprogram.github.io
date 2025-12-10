import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function Grid() {
    const meshRef = useRef();
    const orbRef = useRef();
    const startTime = useRef(null);

    const gridData = useMemo(() => {
        const size = 20;
        const segments = 40;
        const positions = new Float32Array((segments + 1) * (segments + 1) * 3);
        const colors = new Float32Array((segments + 1) * (segments + 1) * 3);
        const originalY = new Float32Array((segments + 1) * (segments + 1));
        const repaired = new Float32Array((segments + 1) * (segments + 1));

        let idx = 0;
        for (let i = 0; i <= segments; i++) {
            for (let j = 0; j <= segments; j++) {
                const x = (i / segments - 0.5) * size;
                const z = (j / segments - 0.5) * size;

                // Create jagged terrain
                const brokenness = Math.random() > 0.7 ? (Math.random() - 0.5) * 2 : 0;

                positions[idx * 3] = x;
                positions[idx * 3 + 1] = brokenness;
                positions[idx * 3 + 2] = z;

                originalY[idx] = brokenness;
                repaired[idx] = 0;

                // Broken = red/dark, healthy = blue/green
                if (Math.abs(brokenness) > 0.3) {
                    colors[idx * 3] = 0.6;
                    colors[idx * 3 + 1] = 0.1;
                    colors[idx * 3 + 2] = 0.1;
                } else {
                    colors[idx * 3] = 0.2;
                    colors[idx * 3 + 1] = 0.2;
                    colors[idx * 3 + 2] = 0.3;
                }

                idx++;
            }
        }

        // Create indices for wireframe grid
        const indices = [];
        for (let i = 0; i < segments; i++) {
            for (let j = 0; j < segments; j++) {
                const a = i * (segments + 1) + j;
                const b = a + 1;
                const c = a + segments + 1;
                const d = c + 1;

                indices.push(a, b, b, d, d, c, c, a);
            }
        }

        return { positions, colors, originalY, repaired, indices: new Uint16Array(indices), segments, size };
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (startTime.current === null) startTime.current = time;
        const elapsed = time - startTime.current;

        // Orb path - circular around the grid
        const orbAngle = elapsed * 0.5;
        const orbRadius = 4;
        const orbX = Math.cos(orbAngle) * orbRadius;
        const orbZ = Math.sin(orbAngle) * orbRadius;

        if (orbRef.current) {
            orbRef.current.position.x = orbX;
            orbRef.current.position.y = 0.5;
            orbRef.current.position.z = orbZ;
        }

        // Update grid based on orb position
        if (meshRef.current) {
            const posAttr = meshRef.current.geometry.attributes.position;
            const colAttr = meshRef.current.geometry.attributes.color;

            let idx = 0;
            for (let i = 0; i <= gridData.segments; i++) {
                for (let j = 0; j <= gridData.segments; j++) {
                    const x = posAttr.array[idx * 3];
                    const z = posAttr.array[idx * 3 + 2];

                    const distToOrb = Math.sqrt(
                        Math.pow(x - orbX, 2) + Math.pow(z - orbZ, 2)
                    );

                    // Repair effect
                    if (distToOrb < 2) {
                        gridData.repaired[idx] = Math.min(gridData.repaired[idx] + 0.05, 1);
                    }

                    const repair = gridData.repaired[idx];
                    const targetY = THREE.MathUtils.lerp(gridData.originalY[idx], 0, repair);
                    posAttr.array[idx * 3 + 1] = THREE.MathUtils.lerp(
                        posAttr.array[idx * 3 + 1],
                        targetY,
                        0.1
                    );

                    // Color transition
                    const targetR = THREE.MathUtils.lerp(colAttr.array[idx * 3], 0.1, repair * 0.1);
                    const targetG = THREE.MathUtils.lerp(0.2, 0.8, repair);
                    const targetB = THREE.MathUtils.lerp(0.3, 0.6, repair);

                    colAttr.array[idx * 3] = THREE.MathUtils.lerp(colAttr.array[idx * 3], targetR, 0.05);
                    colAttr.array[idx * 3 + 1] = THREE.MathUtils.lerp(colAttr.array[idx * 3 + 1], targetG, 0.05);
                    colAttr.array[idx * 3 + 2] = THREE.MathUtils.lerp(colAttr.array[idx * 3 + 2], targetB, 0.05);

                    idx++;
                }
            }

            posAttr.needsUpdate = true;
            colAttr.needsUpdate = true;
        }

        // Reset loop
        if (elapsed > 15) {
            startTime.current = time;
            // Reset repair state
            for (let i = 0; i < gridData.repaired.length; i++) {
                gridData.repaired[i] = 0;
            }
        }
    });

    return (
        <>
            <lineSegments ref={meshRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={gridData.positions.length / 3}
                        array={gridData.positions}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={gridData.colors.length / 3}
                        array={gridData.colors}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="index"
                        count={gridData.indices.length}
                        array={gridData.indices}
                        itemSize={1}
                    />
                </bufferGeometry>
                <lineBasicMaterial vertexColors transparent opacity={0.8} />
            </lineSegments>

            {/* Healing orb */}
            <mesh ref={orbRef}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial
                    color="#00ff88"
                    emissive="#00ff88"
                    emissiveIntensity={3}
                />
            </mesh>

            {/* Trail light */}
            <pointLight
                position={[0, 0.5, 0]}
                intensity={2}
                color="#00ff88"
                distance={4}
            />
        </>
    );
}

export default function TerraformGrid() {
    return (
        <div style={{ width: '100%', height: '400px', background: '#0a0a0f' }}>
            <Canvas camera={{ position: [8, 6, 8], fov: 50 }}>
                <ambientLight intensity={0.1} />
                <Grid />
                <EffectComposer>
                    <Bloom
                        intensity={1}
                        luminanceThreshold={0.4}
                        luminanceSmoothing={0.9}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
