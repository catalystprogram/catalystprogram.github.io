import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Colors for shapes and particles
const COLORS = {
    primary: '#041820',  // Near-black teal
    dark: '#010508',     // Near black for shapes
};

function ConvergenceParticle({ startPosition, delay, index, phase, convergeStartTime }) {
    const meshRef = useRef();
    const startPos = useRef(new THREE.Vector3(...startPosition));
    const capturedPos = useRef(null); // Capture position when convergence starts

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (!meshRef.current) return;

        if (phase === 'idle') {
            // Idle drifting - shapes visible and floating
            meshRef.current.visible = true;
            meshRef.current.position.x = startPos.current.x + Math.sin(time * 0.5 + index) * 0.2;
            meshRef.current.position.y = startPos.current.y + Math.cos(time * 0.3 + index) * 0.2;
            meshRef.current.position.z = startPos.current.z + Math.sin(time * 0.4 + index) * 0.2;
            meshRef.current.rotation.x += 0.008;
            meshRef.current.rotation.y += 0.008;
            meshRef.current.scale.setScalar(1);
            return;
        }

        if (phase === 'converging' && convergeStartTime !== null) {
            meshRef.current.visible = true;

            const elapsed = time - convergeStartTime;
            const convergeDuration = 2.5;
            const myDelay = delay * 0.5;

            // Capture current position when convergence starts
            if (capturedPos.current === null) {
                capturedPos.current = meshRef.current.position.clone();
            }

            if (elapsed < myDelay) {
                // Still waiting - stay at captured position with subtle drift
                const drift = Math.sin(time * 2 + index) * 0.02;
                meshRef.current.position.x = capturedPos.current.x + drift;
                meshRef.current.position.y = capturedPos.current.y + drift * 0.5;
                meshRef.current.position.z = capturedPos.current.z + drift;
            } else if (elapsed < myDelay + convergeDuration) {
                // Smooth spiral from captured position to center
                const progress = (elapsed - myDelay) / convergeDuration;
                const eased = 1 - Math.pow(1 - progress, 3);

                const spiralAngle = progress * Math.PI * 6 + index;
                const spiralRadius = (1 - eased) * 2.5;

                meshRef.current.position.x = THREE.MathUtils.lerp(capturedPos.current.x, 0, eased) + Math.cos(spiralAngle) * spiralRadius;
                meshRef.current.position.y = THREE.MathUtils.lerp(capturedPos.current.y, 0, eased) + Math.sin(spiralAngle * 0.5) * spiralRadius * 0.3;
                meshRef.current.position.z = THREE.MathUtils.lerp(capturedPos.current.z, 0, eased) + Math.sin(spiralAngle) * spiralRadius;

                meshRef.current.rotation.x += 0.08;
                meshRef.current.rotation.y += 0.08;

                const scale = 1 - eased * 0.7;
                meshRef.current.scale.setScalar(scale);
            } else {
                // Merged - hide
                meshRef.current.visible = false;
            }
        }

        if (phase === 'ripple') {
            // Hidden during ripple phase
            meshRef.current.visible = false;
            capturedPos.current = null; // Reset for next convergence
        }
    });

    const geometry = useMemo(() => {
        const types = ['box', 'tetra', 'octa'];
        return types[index % types.length];
    }, [index]);

    return (
        <mesh ref={meshRef} position={startPosition}>
            {geometry === 'box' && <boxGeometry args={[0.15, 0.15, 0.15]} />}
            {geometry === 'tetra' && <tetrahedronGeometry args={[0.12]} />}
            {geometry === 'octa' && <octahedronGeometry args={[0.1]} />}
            <meshStandardMaterial
                color={COLORS.dark}
                emissive={COLORS.primary}
                emissiveIntensity={0.4}
            />
        </mesh>
    );
}

function Globe({ phase }) {
    const groupRef = useRef();
    const globeRef = useRef();
    const textureRef = useRef(null);

    // Rotation state
    const rotationY = useRef(0);
    const rotationVelocity = useRef(0.2); // Base spin speed
    const isDragging = useRef(false);
    const lastMouseX = useRef(0);
    const dragVelocity = useRef(0);

    // Transition state
    const scaleProgress = useRef(0);

    // Tilt angle (negative = top-right, bottom-left orientation)
    const tiltAngle = -Math.PI / 6;

    // Load Earth texture
    useMemo(() => {
        const loader = new THREE.TextureLoader();
        loader.load('/BlueMarbleNG-TB_2048x1024_atlas_ocean_emphasis.jpg', (texture) => {
            textureRef.current = texture;
            if (globeRef.current) {
                globeRef.current.material.map = texture;
                globeRef.current.material.needsUpdate = true;
            }
        });
    }, []);

    // Mouse event handlers
    const handlePointerDown = useCallback((e) => {
        if (phase !== 'ripple') return;
        e.stopPropagation();
        isDragging.current = true;
        lastMouseX.current = e.clientX;
        dragVelocity.current = 0;
    }, [phase]);

    const handlePointerMove = useCallback((e) => {
        if (!isDragging.current) return;
        const deltaX = e.clientX - lastMouseX.current;
        dragVelocity.current = deltaX * 0.002; // Track velocity for momentum
        rotationY.current += deltaX * 0.005;
        lastMouseX.current = e.clientX;
    }, []);

    const handlePointerUp = useCallback(() => {
        if (isDragging.current) {
            isDragging.current = false;
            // Set rotation velocity based on drag direction, but keep constant speed
            if (Math.abs(dragVelocity.current) > 0.001) {
                rotationVelocity.current = Math.sign(dragVelocity.current) * 0.2;
            }
        }
    }, []);

    // Add global mouse events for drag
    useEffect(() => {
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, [handlePointerMove, handlePointerUp]);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // Only visible in ripple phase
        const visible = phase === 'ripple';
        groupRef.current.visible = visible;

        if (!visible) {
            // Reset for next appearance
            scaleProgress.current = 0;
            return;
        }

        // Smooth fade-in/scale-up transition
        if (scaleProgress.current < 1) {
            scaleProgress.current = Math.min(1, scaleProgress.current + delta * 0.8);
        }
        const easeOut = 1 - Math.pow(1 - scaleProgress.current, 3);
        groupRef.current.scale.setScalar(easeOut);

        // Auto-rotate when not dragging
        if (!isDragging.current) {
            rotationY.current += rotationVelocity.current * delta;
        }

        // Apply rotation to the group
        groupRef.current.rotation.order = 'ZYX';
        groupRef.current.rotation.z = tiltAngle;
        groupRef.current.rotation.y = rotationY.current;
        groupRef.current.rotation.x = 0;

        // Update globe material opacity for fade-in
        if (globeRef.current && globeRef.current.material) {
            globeRef.current.material.opacity = easeOut;
        }
    });

    const GLOBE_RADIUS = 2.5;

    return (
        <group ref={groupRef} visible={false} onPointerDown={handlePointerDown}>
            {/* Earth sphere with texture */}
            <mesh ref={globeRef}>
                <sphereGeometry args={[GLOBE_RADIUS, 64, 48]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0} />
            </mesh>

            {/* Atmosphere glow */}
            <mesh>
                <sphereGeometry args={[GLOBE_RADIUS + 0.1, 32, 24]} />
                <meshBasicMaterial
                    color="#4a9dbd"
                    transparent
                    opacity={0.08}
                    side={1}
                />
            </mesh>
        </group>
    );
}


function Scene({ phase, setPhase, convergeStartTime, setConvergeStartTime }) {
    const particles = useMemo(() => {
        const result = [];
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 3.5 + Math.random() * 2;

            result.push({
                position: [
                    radius * Math.sin(phi) * Math.cos(theta),
                    radius * Math.sin(phi) * Math.sin(theta),
                    radius * Math.cos(phi),
                ],
                delay: 0.8 + Math.random() * 1.2,
            });
        }
        return result;
    }, []);

    // Handle phase transitions
    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (phase === 'converging' && convergeStartTime !== null) {
            // After 4 seconds, switch to ripple phase
            if (time - convergeStartTime > 4) {
                setPhase('ripple');
                setConvergeStartTime(null);
            }
        }
    });

    return (
        <>
            {/* Converging shapes */}
            {particles.map((particle, i) => (
                <ConvergenceParticle
                    key={i}
                    startPosition={particle.position}
                    delay={particle.delay}
                    index={i}
                    phase={phase}
                    convergeStartTime={convergeStartTime}
                />
            ))}

            {/* Rotating globe */}
            <Globe phase={phase} />
        </>
    );
}

function SceneController({ phase, setPhase, convergeStartTime, setConvergeStartTime }) {
    useFrame((state) => {
        if (phase === 'converging' && convergeStartTime === null) {
            setConvergeStartTime(state.clock.getElapsedTime());
        }
    });

    return (
        <Scene
            phase={phase}
            setPhase={setPhase}
            convergeStartTime={convergeStartTime}
            setConvergeStartTime={setConvergeStartTime}
        />
    );
}

export default function CatalystImpact() {
    const [phase, setPhase] = useState('idle'); // Start with idle drifting shapes
    const [convergeStartTime, setConvergeStartTime] = useState(null);

    // Handle click to trigger convergence
    const handleClick = useCallback(() => {
        if (phase === 'idle') {
            setPhase('converging');
        }
    }, [phase]);

    // Handle scroll to trigger convergence
    useEffect(() => {
        let hasTriggered = false;

        const handleScroll = () => {
            if (hasTriggered || phase !== 'idle') return;

            // Trigger immediately on any scroll
            setPhase('converging');
            hasTriggered = true;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [phase]);

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                background: 'transparent',
                cursor: phase === 'idle' ? 'pointer' : 'default',
                position: 'relative',
                overflow: 'hidden'
            }}
            onClick={handleClick}
            title={phase === 'idle' ? 'Click to trigger impact animation' : ''}
        >
            <Canvas
                camera={{ position: [0, 0, 6], fov: 50 }}
                gl={{ antialias: true }}
                dpr={1}
                resize={{ scroll: false, debounce: { scroll: 0, resize: 0 } }}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            >
                <ambientLight intensity={2} />
                <directionalLight position={[5, 5, 5]} intensity={1.5} />
                <directionalLight position={[-3, -3, 2]} intensity={0.5} />
                <SceneController
                    phase={phase}
                    setPhase={setPhase}
                    convergeStartTime={convergeStartTime}
                    setConvergeStartTime={setConvergeStartTime}
                />
            </Canvas>
        </div>
    );
}

