import React, { Suspense } from 'react';

// Lazy load the demos to avoid loading all at once
const ResonanceRipple = React.lazy(() => import('./demos/ResonanceRipple'));
const GenerativeBloom = React.lazy(() => import('./demos/GenerativeBloom'));
const ConvergenceEngine = React.lazy(() => import('./demos/ConvergenceEngine'));
const TerraformGrid = React.lazy(() => import('./demos/TerraformGrid'));
const CatalystImpact = React.lazy(() => import('./CatalystImpact'));

const LoadingFallback = () => (
    <div style={{
        width: '100%',
        height: '400px',
        background: '#0a0a0f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666'
    }}>
        Loading...
    </div>
);

const DemoCard = ({ title, description, children, keywords }) => (
    <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        borderRadius: '16px',
        overflow: 'hidden',
        marginBottom: '40px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
    }}>
        {children}
        <div style={{ padding: '24px' }}>
            <h2 style={{
                margin: '0 0 12px 0',
                fontSize: '24px',
                fontWeight: '600',
                color: '#fff'
            }}>
                {title}
            </h2>
            <p style={{
                margin: '0 0 16px 0',
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#a0aec0'
            }}>
                {description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {keywords.map((keyword, i) => (
                    <span key={i} style={{
                        padding: '4px 12px',
                        background: 'rgba(99, 179, 237, 0.15)',
                        border: '1px solid rgba(99, 179, 237, 0.3)',
                        borderRadius: '20px',
                        fontSize: '12px',
                        color: '#63b3ed'
                    }}>
                        {keyword}
                    </span>
                ))}
            </div>
        </div>
    </div>
);

export default function AnimationDemo() {
    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%)',
            padding: '40px 20px'
        }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <h1 style={{
                    textAlign: 'center',
                    fontSize: '48px',
                    fontWeight: '700',
                    color: '#fff',
                    marginBottom: '16px'
                }}>
                    Three.js Animation Concepts
                </h1>
                <p style={{
                    textAlign: 'center',
                    fontSize: '18px',
                    color: '#a0aec0',
                    marginBottom: '60px'
                }}>
                    Choose the concept that best represents your brand's impact
                </p>

                <Suspense fallback={<LoadingFallback />}>
                    <DemoCard
                        title="⭐ RECOMMENDED: Catalyst Impact"
                        description="A hybrid animation combining Convergence Engine with Resonance Ripple. Scattered geometric shapes spiral inward and converge at center, triggering a bright flash. The shapes then transform into a unified particle sphere that continuously emits rippling shockwaves. Uses your brand colors: teal blue, light teal, and cyan."
                        keywords={['Hybrid', 'Brand Colors', 'Convergence', 'Ripple', 'Impact Flash', 'Teal/Cyan Palette']}
                    >
                        <div style={{ height: '400px', background: 'linear-gradient(135deg, #f9f9f9 0%, #D4F1F9 100%)' }}>
                            <CatalystImpact />
                        </div>
                    </DemoCard>
                </Suspense>

                <Suspense fallback={<LoadingFallback />}>
                    <DemoCard
                        title="1. Resonance Ripple"
                        description="A sphere of particles that responds to interaction with rippling shockwaves. When triggered (automatically every 5 seconds or on hover), an impact wave spreads outward, displacing particles and shifting their color from muted slate to warm gold. Symbolizes how a single action can create ripples of positive change."
                        keywords={['Subtle', 'Reactive', 'Minimalist', 'Interactive', 'PointsMaterial', 'ShaderMaterial']}
                    >
                        <ResonanceRipple />
                    </DemoCard>
                </Suspense>

                <Suspense fallback={<LoadingFallback />}>
                    <DemoCard
                        title="2. Generative Bloom"
                        description="Starts with a dormant geometric seed that vibrates and glows, then unfurls crystalline tendrils that grow organically outward. Once fully bloomed, it emits golden particles that drift upward. Represents planting an idea and nurturing it into something that gives back to the world."
                        keywords={['Organic', 'Growth', 'Procedural', 'L-systems', 'Bloom Effect', 'Emissive Materials']}
                    >
                        <GenerativeBloom />
                    </DemoCard>
                </Suspense>

                <Suspense fallback={<LoadingFallback />}>
                    <DemoCard
                        title="3. Convergence Engine"
                        description="Scattered, chaotic shapes drift aimlessly until an invisible force draws them together in a Fibonacci spiral. They converge and fuse into a glowing unified structure. Shows how disparate elements can come together to create something greater than the sum of its parts."
                        keywords={['Dynamic', 'Collaborative', 'Physics', 'InstancedMesh', 'God Rays', 'Spiral Motion']}
                    >
                        <ConvergenceEngine />
                    </DemoCard>
                </Suspense>

                <Suspense fallback={<LoadingFallback />}>
                    <DemoCard
                        title="4. Terraform Grid"
                        description="A broken wireframe landscape with jagged edges and damaged nodes. A glowing healing orb traverses the surface, repairing everything it passes—smoothing terrain and shifting colors from red to vibrant green/blue. A clear metaphor for fixing broken systems."
                        keywords={['Tech-Forward', 'Global', 'Vertex Shaders', 'Dynamic Textures', 'Path Following', 'Wireframe']}
                    >
                        <TerraformGrid />
                    </DemoCard>
                </Suspense>

                <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    color: '#718096'
                }}>
                    <p>Hover over the Resonance Ripple to trigger the effect manually</p>
                    <p>All animations loop automatically</p>
                </div>
            </div>
        </div>
    );
}
