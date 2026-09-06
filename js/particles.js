/**
 * Apple-Grade Minimalist 3D Dotted Wave Background
 * Undulating mathematical sine/cosine mesh wave with perspective projection & mouse ripple.
 */

class DottedWaveBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');

        // Grid Configuration
        this.cols = 48;
        this.rows = 32;
        this.dotSpacingX = 42;
        this.dotSpacingY = 32;
        this.time = 0;

        // Wave Physics
        this.waveSpeed = 0.016;
        this.waveFrequencyX = 0.08;
        this.waveFrequencyY = 0.12;
        this.waveAmplitude = 34;

        // Camera & 3D Perspective
        this.cameraPitch = 0.48; // Tilt angle in radians
        this.cameraYaw = 0.0;
        this.fov = 420;

        // Mouse Interaction
        this.mouse = { x: null, y: null, targetYaw: 0, targetPitch: 0.48 };

        this.init();
        this.animate();
        this.addEventListeners();
    }

    init() {
        this.resize();
    }

    resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;

        this.ctx.scale(dpr, dpr);

        // Adjust columns and rows based on screen width
        if (this.width < 768) {
            this.cols = 32;
            this.rows = 24;
            this.dotSpacingX = 36;
            this.dotSpacingY = 28;
            this.waveAmplitude = 24;
        } else {
            this.cols = 52;
            this.rows = 34;
            this.dotSpacingX = 44;
            this.dotSpacingY = 34;
            this.waveAmplitude = 34;
        }
    }

    addEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;

            // Subtle interactive camera tilt
            const normX = (e.clientX / this.width) - 0.5;
            const normY = (e.clientY / this.height) - 0.5;
            this.mouse.targetYaw = normX * 0.12;
            this.mouse.targetPitch = 0.48 + normY * 0.08;
        });

        window.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
            this.mouse.targetYaw = 0;
            this.mouse.targetPitch = 0.48;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.time += this.waveSpeed;

        // Smooth camera damping
        this.cameraYaw += (this.mouse.targetYaw - this.cameraYaw) * 0.05;
        this.cameraPitch += (this.mouse.targetPitch - this.cameraPitch) * 0.05;

        const centerX = this.width * 0.5;
        const centerY = this.height * 0.58;

        const gridWidth = (this.cols - 1) * this.dotSpacingX;
        const gridHeight = (this.rows - 1) * this.dotSpacingY;
        const startX = -gridWidth * 0.5;
        const startY = -gridHeight * 0.5;

        const cosPitch = Math.cos(this.cameraPitch);
        const sinPitch = Math.sin(this.cameraPitch);
        const cosYaw = Math.cos(this.cameraYaw);
        const sinYaw = Math.sin(this.cameraYaw);

        // Store dots to sort and render back-to-front
        const projectedDots = [];

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const worldX = startX + c * this.dotSpacingX;
                const worldY = startY + r * this.dotSpacingY;

                // Multi-harmonic mathematical wave equation
                const wave1 = Math.sin(c * this.waveFrequencyX + this.time) * this.waveAmplitude;
                const wave2 = Math.cos(r * this.waveFrequencyY + this.time * 0.8) * (this.waveAmplitude * 0.8);
                const wave3 = Math.sin((c + r) * 0.06 + this.time * 0.6) * (this.waveAmplitude * 0.5);

                let worldZ = wave1 + wave2 + wave3;

                // Mouse proximity dynamic ripple effect
                if (this.mouse.x !== null && this.mouse.y !== null) {
                    const screenDx = (worldX + centerX) - this.mouse.x;
                    const screenDy = (worldY + centerY) - this.mouse.y;
                    const dist = Math.sqrt(screenDx * screenDx + screenDy * screenDy);
                    if (dist < 220) {
                        const ripple = Math.cos(dist * 0.04 - this.time * 3) * (1 - dist / 220) * 16;
                        worldZ += ripple;
                    }
                }

                // 3D Rotations (Yaw around Y, Pitch around X)
                const rotX = worldX * cosYaw - worldY * sinYaw;
                const rotY = worldX * sinYaw + worldY * cosYaw;

                const rotY2 = rotY * cosPitch - worldZ * sinPitch;
                const rotZ2 = rotY * sinPitch + worldZ * cosPitch;

                // Perspective projection
                const depth = rotZ2 + 550;
                if (depth > 20) {
                    const scale = this.fov / depth;
                    const projX = centerX + rotX * scale;
                    const projY = centerY + rotY2 * scale;

                    // Base radius & opacity scaled by depth and wave height
                    const heightFactor = (worldZ + this.waveAmplitude) / (this.waveAmplitude * 2.5);
                    const baseRadius = Math.max(0.6, (1.8 * scale) + (heightFactor * 0.8));
                    const baseOpacity = Math.min(0.65, Math.max(0.08, (scale * 0.55) + (heightFactor * 0.35)));

                    // Edge feathering / vignetting so dots softly disappear at screen edges
                    const edgeDistX = Math.abs(projX - centerX) / (this.width * 0.5);
                    const edgeDistY = Math.abs(projY - centerY) / (this.height * 0.5);
                    const edgeFactor = Math.max(0, 1 - Math.pow(Math.max(edgeDistX, edgeDistY), 2.2));

                    const finalOpacity = baseOpacity * edgeFactor;

                    if (finalOpacity > 0.02) {
                        projectedDots.push({
                            x: projX,
                            y: projY,
                            radius: baseRadius,
                            opacity: finalOpacity,
                            height: worldZ,
                            depth: depth
                        });
                    }
                }
            }
        }

        // Render dots
        for (let i = 0; i < projectedDots.length; i++) {
            const dot = projectedDots[i];

            this.ctx.beginPath();
            this.ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);

            // Dynamic Theme Awareness
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';

            if (isLight) {
                // Apple Light Theme: Slate & Emerald dots on silver/white canvas
                if (dot.height > 15) {
                    this.ctx.fillStyle = `rgba(31, 136, 61, ${dot.opacity * 0.85})`;
                } else if (dot.height < -12) {
                    this.ctx.fillStyle = `rgba(30, 30, 35, ${dot.opacity * 0.22})`;
                } else {
                    this.ctx.fillStyle = `rgba(30, 30, 35, ${dot.opacity * 0.45})`;
                }
            } else {
                // Cupertino Dark Theme: White & Jade dots on black canvas
                if (dot.height > 15) {
                    this.ctx.fillStyle = `rgba(48, 209, 88, ${dot.opacity * 0.9})`;
                } else if (dot.height < -12) {
                    this.ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity * 0.4})`;
                } else {
                    this.ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity * 0.75})`;
                }
            }

            this.ctx.fill();
        }

        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DottedWaveBackground('particles-canvas');
});
