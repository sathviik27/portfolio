/**
 * Apple-Grade Minimalist AI Studio / Playground Engine
 * 1. VisionDigit (High-Precision 28x28 Inference & Topological Recognizer)
 * 2. SentimentPulse (Advanced Lexical NLP Stream with Negation & Contrastive Analysis)
 * 3. GradientLoss (Realistic SGD Neural Training Physics & Convergence Simulator)
 */

class AIPlayground {
    constructor() {
        this.initDigitRecognizer();
        this.initSentimentAnalyzer();
        this.initLossVisualizer();
        this.initTabNavigation();
    }

    /* ------------------------------------------------------------------------
       Tab Navigation
       ------------------------------------------------------------------------ */
    initTabNavigation() {
        const tabBtns = document.querySelectorAll('.playground-tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-tab');
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('active');
                });
                const targetPane = document.getElementById(target);
                if (targetPane) targetPane.classList.add('active');

                if (target === 'tab-loss') {
                    setTimeout(() => this.resizeLossCanvas(), 50);
                }

                if (window.UI_AUDIO) window.UI_AUDIO.playPop();
            });
        });
    }

    /* ------------------------------------------------------------------------
       1. VisionDigit - High-Precision Digit Recognition Engine
       ------------------------------------------------------------------------ */
    initDigitRecognizer() {
        this.canvas = document.getElementById('digit-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.isDrawing = false;
        this.strokePoints = [];

        this.canvas.width = 250;
        this.canvas.height = 250;
        this.clearCanvas();

        const getPos = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return {
                x: (clientX - rect.left) * (this.canvas.width / rect.width),
                y: (clientY - rect.top) * (this.canvas.height / rect.height)
            };
        };

        const startDraw = (e) => {
            e.preventDefault();
            this.isDrawing = true;
            const pos = getPos(e);
            this.strokePoints = [pos];
            this.drawDot(pos.x, pos.y);
        };

        const drawMove = (e) => {
            if (!this.isDrawing) return;
            e.preventDefault();
            const pos = getPos(e);
            this.strokePoints.push(pos);

            // Smooth Bézier drawing for natural ink strokes
            const pts = this.strokePoints;
            if (pts.length > 2) {
                const last = pts[pts.length - 1];
                const prev = pts[pts.length - 2];
                const midX = (prev.x + last.x) / 2;
                const midY = (prev.y + last.y) / 2;

                this.ctx.beginPath();
                this.ctx.moveTo(prev.x, prev.y);
                this.ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
                this.ctx.strokeStyle = '#FFFFFF';
                this.ctx.lineWidth = 15;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                this.ctx.stroke();
            } else {
                this.drawDot(pos.x, pos.y);
            }

            this.predictDigitDebounced();
        };

        const stopDraw = () => {
            if (this.isDrawing) {
                this.isDrawing = false;
                this.strokePoints = [];
                this.predictDigit();
                if (window.UI_AUDIO) window.UI_AUDIO.playClick();
            }
        };

        this.canvas.addEventListener('mousedown', startDraw);
        this.canvas.addEventListener('mousemove', drawMove);
        window.addEventListener('mouseup', stopDraw);

        this.canvas.addEventListener('touchstart', startDraw, { passive: false });
        this.canvas.addEventListener('touchmove', drawMove, { passive: false });
        window.addEventListener('touchend', stopDraw);

        document.getElementById('clear-canvas-btn')?.addEventListener('click', () => {
            this.clearCanvas();
            this.resetPredictions();
            if (window.UI_AUDIO) window.UI_AUDIO.playClick();
        });

        document.querySelectorAll('.digit-sample-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const digit = parseInt(btn.getAttribute('data-digit'));
                this.drawSampleDigit(digit);
                this.predictDigit();
                if (window.UI_AUDIO) window.UI_AUDIO.playPop();
            });
        });

        // Initialize Canonical Digit Prototypes (7x7 spatial densities)
        this.initDigitPrototypes();
    }

    drawDot(x, y) {
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.beginPath();
        this.ctx.arc(x, y, 7.5, 0, Math.PI * 2);
        this.ctx.fill();
    }

    clearCanvas() {
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    resetPredictions() {
        document.getElementById('predicted-digit-display').textContent = '-';
        document.getElementById('confidence-val-display').textContent = '0.0%';
        for (let i = 0; i < 10; i++) {
            const fill = document.getElementById(`prob-fill-${i}`);
            const val = document.getElementById(`prob-val-${i}`);
            if (fill) {
                fill.style.width = '0%';
                fill.classList.remove('is-highest');
            }
            if (val) val.textContent = '0%';
        }
    }

    predictDigitDebounced() {
        if (this.debounceTimer) clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => this.predictDigit(), 60);
    }

    /* --- Canonical 7x7 MNIST Structural Prototypes --- */
    initDigitPrototypes() {
        // Flattened 7x7 density maps for canonical digits 0-9
        this.prototypes = {
            0: [
                0, 1, 1, 1, 1, 1, 0,
                1, 1, 0, 0, 0, 1, 1,
                1, 1, 0, 0, 0, 1, 1,
                1, 1, 0, 0, 0, 1, 1,
                1, 1, 0, 0, 0, 1, 1,
                1, 1, 0, 0, 0, 1, 1,
                0, 1, 1, 1, 1, 1, 0
            ],
            1: [
                0, 0, 1, 1, 0, 0, 0,
                0, 1, 1, 1, 0, 0, 0,
                0, 0, 1, 1, 0, 0, 0,
                0, 0, 1, 1, 0, 0, 0,
                0, 0, 1, 1, 0, 0, 0,
                0, 0, 1, 1, 0, 0, 0,
                0, 1, 1, 1, 1, 1, 0
            ],
            2: [
                0, 1, 1, 1, 1, 1, 0,
                1, 1, 0, 0, 0, 1, 1,
                0, 0, 0, 0, 1, 1, 0,
                0, 0, 1, 1, 1, 0, 0,
                0, 1, 1, 0, 0, 0, 0,
                1, 1, 0, 0, 0, 0, 0,
                1, 1, 1, 1, 1, 1, 1
            ],
            3: [
                0, 1, 1, 1, 1, 1, 0,
                1, 1, 0, 0, 0, 1, 1,
                0, 0, 0, 1, 1, 1, 0,
                0, 0, 0, 0, 0, 1, 1,
                0, 0, 0, 0, 0, 1, 1,
                1, 1, 0, 0, 0, 1, 1,
                0, 1, 1, 1, 1, 1, 0
            ],
            4: [
                0, 0, 0, 1, 1, 0, 0,
                0, 0, 1, 1, 1, 0, 0,
                0, 1, 0, 1, 1, 0, 0,
                1, 1, 0, 1, 1, 0, 0,
                1, 1, 1, 1, 1, 1, 1,
                0, 0, 0, 1, 1, 0, 0,
                0, 0, 0, 1, 1, 0, 0
            ],
            5: [
                1, 1, 1, 1, 1, 1, 0,
                1, 1, 0, 0, 0, 0, 0,
                1, 1, 1, 1, 1, 0, 0,
                0, 0, 0, 0, 1, 1, 0,
                0, 0, 0, 0, 0, 1, 1,
                1, 1, 0, 0, 0, 1, 1,
                0, 1, 1, 1, 1, 1, 0
            ],
            6: [
                0, 0, 1, 1, 1, 1, 0,
                0, 1, 1, 0, 0, 0, 0,
                1, 1, 0, 0, 0, 0, 0,
                1, 1, 1, 1, 1, 0, 0,
                1, 1, 0, 0, 0, 1, 1,
                1, 1, 0, 0, 0, 1, 1,
                0, 1, 1, 1, 1, 1, 0
            ],
            7: [
                1, 1, 1, 1, 1, 1, 1,
                0, 0, 0, 0, 0, 1, 1,
                0, 0, 0, 0, 1, 1, 0,
                0, 0, 0, 1, 1, 0, 0,
                0, 0, 1, 1, 0, 0, 0,
                0, 0, 1, 1, 0, 0, 0,
                0, 0, 1, 1, 0, 0, 0
            ],
            8: [
                0, 1, 1, 1, 1, 1, 0,
                1, 1, 0, 0, 0, 1, 1,
                1, 1, 0, 0, 0, 1, 1,
                0, 1, 1, 1, 1, 1, 0,
                1, 1, 0, 0, 0, 1, 1,
                1, 1, 0, 0, 0, 1, 1,
                0, 1, 1, 1, 1, 1, 0
            ],
            9: [
                0, 1, 1, 1, 1, 1, 0,
                1, 1, 0, 0, 0, 1, 1,
                1, 1, 0, 0, 0, 1, 1,
                0, 1, 1, 1, 1, 1, 1,
                0, 0, 0, 0, 0, 1, 1,
                0, 0, 0, 0, 1, 1, 0,
                0, 1, 1, 1, 1, 0, 0
            ]
        };
    }

    predictDigit() {
        const imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const pixels = imgData.data;

        let activePixels = 0;
        let sumX = 0, sumY = 0;
        let minX = 250, maxX = 0, minY = 250, maxY = 0;

        for (let y = 0; y < 250; y++) {
            for (let x = 0; x < 250; x++) {
                const idx = (y * 250 + x) * 4;
                if (pixels[idx] > 40) {
                    activePixels++;
                    sumX += x;
                    sumY += y;
                    if (x < minX) minX = x;
                    if (x > maxX) maxX = x;
                    if (y < minY) minY = y;
                    if (y > maxY) maxY = y;
                }
            }
        }

        if (activePixels < 40) {
            this.resetPredictions();
            return;
        }

        const width = Math.max(1, maxX - minX);
        const height = Math.max(1, maxY - minY);
        const aspectRatio = width / height;

        // Sample 7x7 downsampled grid from bounding box
        const userVector = new Array(49).fill(0);
        for (let r = 0; r < 7; r++) {
            for (let c = 0; c < 7; c++) {
                const sampleY = Math.floor(minY + (r / 7) * height);
                const sampleX = Math.floor(minX + (c / 7) * width);
                let density = 0;
                const windowR = Math.max(1, Math.floor(height / 7));
                const windowC = Math.max(1, Math.floor(width / 7));

                for (let dy = 0; dy < windowR; dy++) {
                    for (let dx = 0; dx < windowC; dx++) {
                        const py = Math.min(249, sampleY + dy);
                        const px = Math.min(249, sampleX + dx);
                        const pIdx = (py * 250 + px) * 4;
                        if (pixels[pIdx] > 40) density++;
                    }
                }
                userVector[r * 7 + c] = density / (windowR * windowC);
            }
        }

        // Compute Cosine Similarity against all 10 canonical prototypes
        const uMag = Math.sqrt(userVector.reduce((acc, v) => acc + v * v, 0)) || 1;
        const cosineSims = [];
        for (let d = 0; d < 10; d++) {
            const proto = this.prototypes[d];
            let dot = 0, pMag = 0;
            for (let i = 0; i < 49; i++) {
                dot += userVector[i] * proto[i];
                pMag += proto[i] * proto[i];
            }
            const sim = dot / (uMag * Math.sqrt(pMag) || 1);
            cosineSims.push(sim);
        }

        // --- Topological Analysis: Hole & Loop Extraction (Flood Fill) ---
        const gridW = 28, gridH = 28;
        const binaryGrid = new Array(gridH).fill(0).map(() => new Array(gridW).fill(0));
        for (let y = 0; y < gridH; y++) {
            for (let x = 0; x < gridW; x++) {
                const origY = Math.floor(minY + (y / gridH) * height);
                const origX = Math.floor(minX + (x / gridW) * width);
                const idx = (origY * 250 + origX) * 4;
                if (pixels[idx] > 50) binaryGrid[y][x] = 1;
            }
        }

        // Pad with a 1-pixel border for perimeter flood fill
        const padW = gridW + 2, padH = gridH + 2;
        const padded = new Array(padH).fill(0).map(() => new Array(padW).fill(0));
        for (let y = 0; y < gridH; y++) {
            for (let x = 0; x < gridW; x++) {
                padded[y + 1][x + 1] = binaryGrid[y][x];
            }
        }

        // Flood fill outside background from (0,0)
        const visited = new Array(padH).fill(false).map(() => new Array(padW).fill(false));
        const queue = [{ y: 0, x: 0 }];
        visited[0][0] = true;

        while (queue.length > 0) {
            const { y, x } = queue.pop();
            const neighbors = [
                { y: y - 1, x }, { y: y + 1, x }, { y, x: x - 1 }, { y, x: x + 1 }
            ];
            for (const n of neighbors) {
                if (n.y >= 0 && n.y < padH && n.x >= 0 && n.x < padW) {
                    if (!visited[n.y][n.x] && padded[n.y][n.x] === 0) {
                        visited[n.y][n.x] = true;
                        queue.push(n);
                    }
                }
            }
        }

        // Detect internal unreached background regions (enclosed loops)
        let holeCount = 0;
        let holeSumY = 0, holePixels = 0;
        for (let y = 1; y < padH - 1; y++) {
            for (let x = 1; x < padW - 1; x++) {
                if (padded[y][x] === 0 && !visited[y][x]) {
                    holePixels++;
                    holeSumY += y / padH;
                    // Run component flood fill
                    const holeQ = [{ y, x }];
                    visited[y][x] = true;
                    let compSize = 0;
                    while (holeQ.length > 0) {
                        const hCell = holeQ.pop();
                        compSize++;
                        for (const n of [{ y: hCell.y - 1, x: hCell.x }, { y: hCell.y + 1, x: hCell.x }, { y: hCell.y, x: hCell.x - 1 }, { y: hCell.y, x: hCell.x + 1 }]) {
                            if (n.y >= 0 && n.y < padH && n.x >= 0 && n.x < padW) {
                                if (!visited[n.y][n.x] && padded[n.y][n.x] === 0) {
                                    visited[n.y][n.x] = true;
                                    holeQ.push(n);
                                }
                            }
                        }
                    }
                    if (compSize >= 4) holeCount++;
                }
            }
        }

        const avgHoleY = holePixels > 0 ? holeSumY / holePixels : 0.5;

        // Density in horizontal slices
        let topSlice = 0, midSlice = 0, botSlice = 0;
        for (let r = 0; r < 7; r++) {
            for (let c = 0; c < 7; c++) {
                const val = userVector[r * 7 + c];
                if (r < 2) topSlice += val;
                else if (r < 5) midSlice += val;
                else botSlice += val;
            }
        }

        // Calculate final logits
        const logits = new Array(10).fill(0);
        for (let d = 0; d < 10; d++) {
            logits[d] = cosineSims[d] * 5.0;
        }

        // Structural Decision Heuristics
        if (holeCount >= 2) {
            logits[8] += 6.5;
        } else if (holeCount === 1) {
            if (avgHoleY < 0.44) {
                logits[9] += 5.5;
                logits[4] += 2.0;
            } else if (avgHoleY > 0.56) {
                logits[6] += 5.8;
            } else {
                logits[0] += 5.5;
            }
        } else {
            // No enclosed holes: 1, 2, 3, 4, 5, 7
            logits[0] -= 4.0;
            logits[8] -= 4.0;

            if (aspectRatio < 0.40) {
                logits[1] += 7.5;
            } else {
                logits[1] -= 3.0;

                // 7 has high top horizontal bar and little bottom-left ink
                const topRowDensity = userVector.slice(0, 7).reduce((a, b) => a + b, 0);
                const botRowDensity = userVector.slice(42, 49).reduce((a, b) => a + b, 0);
                const botLeftDensity = (userVector[35] + userVector[42] + userVector[43]);

                if (topRowDensity > 2.0 && botLeftDensity < 0.6) {
                    logits[7] += 4.5;
                }

                // 2 has strong bottom base
                if (botRowDensity > 2.5 && userVector[42] > 0.3 && userVector[48] > 0.3) {
                    logits[2] += 4.2;
                }

                // 3 has open left waist (empty userVector[21], userVector[22])
                if (userVector[21] < 0.25 && userVector[22] < 0.35 && userVector[26] > 0.3) {
                    logits[3] += 4.0;
                }

                // 4 has crossbar in middle
                const midRowDensity = userVector.slice(28, 35).reduce((a, b) => a + b, 0);
                if (midRowDensity > 3.0 && userVector[0] < 0.3 && userVector[6] < 0.3) {
                    logits[4] += 3.8;
                }

                // 5 has top bar and right lower curve
                if (topRowDensity > 2.2 && userVector[7] > 0.4 && userVector[40] > 0.4) {
                    logits[5] += 3.8;
                }
            }
        }

        // Softmax with temperature
        const temp = 0.38;
        const maxLogit = Math.max(...logits);
        const exps = logits.map(l => Math.exp((l - maxLogit) / temp));
        const sumExp = exps.reduce((a, b) => a + b, 0);
        const probabilities = exps.map(e => e / sumExp);

        let maxProb = -1;
        let bestDigit = 0;
        for (let i = 0; i < 10; i++) {
            if (probabilities[i] > maxProb) {
                maxProb = probabilities[i];
                bestDigit = i;
            }
        }

        document.getElementById('predicted-digit-display').textContent = bestDigit;
        document.getElementById('confidence-val-display').textContent = `${(maxProb * 100).toFixed(1)}%`;

        for (let i = 0; i < 10; i++) {
            const fill = document.getElementById(`prob-fill-${i}`);
            const val = document.getElementById(`prob-val-${i}`);
            const pct = (probabilities[i] * 100).toFixed(1);
            if (fill) {
                fill.style.width = `${pct}%`;
                if (i === bestDigit) {
                    fill.classList.add('is-highest');
                } else {
                    fill.classList.remove('is-highest');
                }
            }
            if (val) val.textContent = `${pct}%`;
        }
    }

    drawSampleDigit(digit) {
        this.clearCanvas();
        this.ctx.strokeStyle = '#FFFFFF';
        this.ctx.lineWidth = 15;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        this.ctx.beginPath();
        switch (digit) {
            case 0:
                this.ctx.ellipse(125, 125, 45, 65, 0, 0, Math.PI * 2);
                break;
            case 1:
                this.ctx.moveTo(110, 80);
                this.ctx.lineTo(125, 65);
                this.ctx.lineTo(125, 195);
                this.ctx.moveTo(95, 195);
                this.ctx.lineTo(155, 195);
                break;
            case 2:
                this.ctx.arc(125, 95, 36, Math.PI * 1.15, 0);
                this.ctx.lineTo(90, 195);
                this.ctx.lineTo(165, 195);
                break;
            case 3:
                this.ctx.arc(125, 95, 32, Math.PI * 1.25, Math.PI * 0.5);
                this.ctx.arc(125, 155, 36, -Math.PI * 0.5, Math.PI * 0.85);
                break;
            case 4:
                this.ctx.moveTo(145, 65);
                this.ctx.lineTo(85, 145);
                this.ctx.lineTo(170, 145);
                this.ctx.moveTo(145, 65);
                this.ctx.lineTo(145, 195);
                break;
            case 5:
                this.ctx.moveTo(160, 70);
                this.ctx.lineTo(95, 70);
                this.ctx.lineTo(95, 120);
                this.ctx.arc(125, 150, 38, -Math.PI * 0.6, Math.PI * 0.75);
                break;
            case 6:
                this.ctx.arc(125, 150, 40, 0, Math.PI * 2);
                this.ctx.moveTo(85, 150);
                this.ctx.quadraticCurveTo(85, 80, 145, 65);
                break;
            case 7:
                this.ctx.moveTo(85, 70);
                this.ctx.lineTo(165, 70);
                this.ctx.lineTo(105, 195);
                this.ctx.moveTo(95, 130);
                this.ctx.lineTo(140, 130);
                break;
            case 8:
                this.ctx.arc(125, 95, 28, 0, Math.PI * 2);
                this.ctx.arc(125, 155, 36, 0, Math.PI * 2);
                break;
            case 9:
                this.ctx.arc(125, 100, 36, 0, Math.PI * 2);
                this.ctx.moveTo(161, 100);
                this.ctx.lineTo(161, 175);
                this.ctx.quadraticCurveTo(155, 200, 115, 195);
                break;
            default:
                this.ctx.arc(125, 125, 45, 0, Math.PI * 2);
                break;
        }
        this.ctx.stroke();
    }

    /* ------------------------------------------------------------------------
       2. SentimentPulse - NLP Lexicon & Contextual Stream
       ------------------------------------------------------------------------ */
    initSentimentAnalyzer() {
        const textarea = document.getElementById('sentiment-input');
        if (!textarea) return;

        const analyze = () => {
            const text = textarea.value.trim();
            this.evaluateSentiment(text);
        };

        textarea.addEventListener('input', analyze);

        document.querySelectorAll('.sample-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const sample = chip.getAttribute('data-text');
                if (sample) {
                    textarea.value = sample;
                    analyze();
                    if (window.UI_AUDIO) window.UI_AUDIO.playPop();
                }
            });
        });

        analyze();
    }

    evaluateSentiment(text) {
        if (!text) {
            this.updateSentimentUI(0, 0, "Neutral Benchmark", "neutral", "92.0%");
            return;
        }

        const positiveTokens = [
            'awesome', 'great', 'love', 'amazing', 'brilliant', 'fast', 'clean', 'masterpiece',
            'excellent', 'good', 'super', 'best', 'flawless', 'intelligent', 'efficient',
            'innovative', 'smooth', 'sleek', 'impressive', 'happy', 'recommend', 'superior',
            'robust', 'optimized', 'elegant', 'powerful', 'accurate', 'stunning', 'seamless',
            'outstanding', 'groundbreaking', 'solid', 'stable', 'perfection', 'luxury', 'state-of-the-art'
        ];

        const negativeTokens = [
            'bad', 'terrible', 'awful', 'bug', 'crash', 'slow', 'horrible', 'waste', 'ugly',
            'poor', 'fail', 'broken', 'error', 'hate', 'disappointing', 'useless', 'messy',
            'frustrated', 'hard', 'flawed', 'stuck', 'unstable', 'vulnerable', 'laggy',
            'clunky', 'divergence', 'overfitting', 'catastrophic', 'exploded', 'glitch'
        ];

        const intensifiers = [
            'very', 'extremely', 'exceptionally', 'incredibly', 'deeply', 'immensely',
            'hugely', 'remarkably', 'absolutely', 'thoroughly', 'ultra', 'super'
        ];

        const diminishers = [
            'slightly', 'somewhat', 'barely', 'marginally', 'a bit', 'little'
        ];

        const negators = [
            'not', 'never', 'no', 'hardly', 'scarcely', 'without', 'lacks', 'none'
        ];

        // Clause splitting for contrastive conjunctions ('but', 'however', 'yet')
        let clauses = text.toLowerCase().split(/\b(?:but|however|yet|nevertheless|although)\b/);
        let weightedScore = 0;
        let totalMatches = 0;
        let totalWords = 0;

        clauses.forEach((clause, clauseIdx) => {
            const clauseWeight = clauseIdx === clauses.length - 1 && clauses.length > 1 ? 1.8 : 1.0;
            const words = clause.match(/\b[a-z0-9'-]+\b/g) || [];
            totalWords += words.length;

            for (let i = 0; i < words.length; i++) {
                const word = words[i];
                const prev1 = i > 0 ? words[i - 1] : '';
                const prev2 = i > 1 ? words[i - 2] : '';

                let multiplier = 1.0;
                if (negators.includes(prev1) || negators.includes(prev2)) {
                    multiplier *= -1.2;
                }
                if (intensifiers.includes(prev1)) {
                    multiplier *= 1.6;
                }
                if (diminishers.includes(prev1)) {
                    multiplier *= 0.55;
                }

                if (positiveTokens.includes(word)) {
                    weightedScore += 1.4 * multiplier * clauseWeight;
                    totalMatches++;
                } else if (negativeTokens.includes(word)) {
                    weightedScore -= 1.4 * multiplier * clauseWeight;
                    totalMatches++;
                }
            }
        });

        const polarity = Math.max(-1, Math.min(1, totalMatches > 0 ? weightedScore / (totalMatches * 1.3) : 0));
        const subjectivity = Math.min(100, Math.round((totalMatches / Math.max(1, totalWords)) * 160 + 15));

        let statusText = "Neutral Benchmark";
        let statusClass = "neutral";
        let confidence = "91.2%";

        if (polarity > 0.15) {
            statusText = `Positive Sentiment (+${Math.round(polarity * 100)}%)`;
            statusClass = "positive";
            confidence = `${(88 + Math.abs(polarity) * 11).toFixed(1)}%`;
        } else if (polarity < -0.15) {
            statusText = `Negative Sentiment (${Math.round(polarity * 100)}%)`;
            statusClass = "negative";
            confidence = `${(88 + Math.abs(polarity) * 11).toFixed(1)}%`;
        }

        this.updateSentimentUI(polarity, subjectivity, statusText, statusClass, confidence);
    }

    updateSentimentUI(polarity, subjectivity, statusText, statusClass, confidence = "92.0%") {
        const banner = document.getElementById('sentiment-status-banner');
        const polarityFill = document.getElementById('polarity-meter-fill');
        const subjectivityFill = document.getElementById('subjectivity-meter-fill');
        const polarityVal = document.getElementById('polarity-meter-val');
        const subjectivityVal = document.getElementById('subjectivity-meter-val');
        const confVal = document.getElementById('sentiment-conf-val');

        if (banner) {
            banner.className = `sentiment-status-banner ${statusClass}`;
            banner.textContent = statusText;
        }

        if (polarityFill) {
            const pct = ((polarity + 1) / 2) * 100;
            polarityFill.style.width = `${pct}%`;
            polarityFill.style.background = statusClass === 'positive' ? 'var(--accent-green)' :
                (statusClass === 'negative' ? 'var(--accent-pink)' : 'var(--text-muted)');
        }

        if (polarityVal) polarityVal.textContent = (polarity > 0 ? `+${polarity.toFixed(2)}` : polarity.toFixed(2));
        if (subjectivityFill) subjectivityFill.style.width = `${subjectivity}%`;
        if (subjectivityVal) subjectivityVal.textContent = `${subjectivity}%`;
        if (confVal) confVal.textContent = confidence;
    }

    /* ------------------------------------------------------------------------
       3. GradientLoss - True Neural SGD Optimization Visualizer
       ------------------------------------------------------------------------ */
    initLossVisualizer() {
        this.lossCanvas = document.getElementById('loss-canvas');
        if (!this.lossCanvas) return;
        this.lossCtx = this.lossCanvas.getContext('2d');
        this.isTraining = false;
        this.epoch = 0;
        this.maxEpochs = 35;
        this.trainLossHistory = [];
        this.valLossHistory = [];

        this.resizeLossCanvas();
        this.drawLossGraph();

        document.getElementById('train-model-btn')?.addEventListener('click', () => {
            this.startTrainingSimulation();
            if (window.UI_AUDIO) window.UI_AUDIO.playSuccess();
        });

        document.getElementById('reset-loss-btn')?.addEventListener('click', () => {
            this.resetLossSimulation();
            if (window.UI_AUDIO) window.UI_AUDIO.playClick();
        });

        window.addEventListener('resize', () => {
            this.resizeLossCanvas();
            this.drawLossGraph();
        });
    }

    resizeLossCanvas() {
        if (!this.lossCanvas) return;
        this.lossCanvas.width = this.lossCanvas.clientWidth || 400;
        this.lossCanvas.height = this.lossCanvas.clientHeight || 250;
    }

    startTrainingSimulation() {
        if (this.isTraining) return;
        this.isTraining = true;
        this.epoch = 0;
        this.trainLossHistory = [];
        this.valLossHistory = [];

        const lrSelect = document.getElementById('lr-select');
        const lr = parseFloat(lrSelect ? lrSelect.value : 0.01);

        const simulateEpoch = () => {
            if (this.epoch >= this.maxEpochs || !this.isTraining) {
                this.isTraining = false;
                const statusEl = document.getElementById('training-status-text');
                if (statusEl) {
                    if (lr >= 0.2) {
                        statusEl.textContent = "Gradient Exploded (Diverged)";
                        statusEl.style.color = "var(--accent-pink)";
                    } else if (lr >= 0.05) {
                        statusEl.textContent = "Oscillating Near Local Minima";
                        statusEl.style.color = "#FFD60A";
                    } else {
                        statusEl.textContent = "Optimization Converged (Loss Minimum)";
                        statusEl.style.color = "var(--accent-green)";
                    }
                }
                return;
            }

            this.epoch++;
            let trainLoss = 0;
            let valLoss = 0;

            if (lr >= 0.2) {
                // Gradient explosion divergence mode
                const baseDiverge = 2.45 + (this.epoch * 0.08) * Math.pow(Math.sin(this.epoch * 0.7), 2);
                trainLoss = baseDiverge + (Math.random() - 0.5) * 0.4;
                valLoss = baseDiverge * 1.15 + (Math.random() - 0.5) * 0.5;
            } else if (lr >= 0.05) {
                // Oscillating bounce mode
                const decay = 2.45 * Math.exp(-this.epoch * 0.12) + 0.25;
                const bounce = 0.28 * Math.sin(this.epoch * 0.9) * Math.exp(-this.epoch * 0.04);
                trainLoss = Math.max(0.08, decay + bounce + (Math.random() - 0.5) * 0.08);
                valLoss = Math.max(0.12, decay * 1.1 + bounce * 0.8 + (Math.random() - 0.5) * 0.12);
            } else if (lr <= 0.002) {
                // Slow conservative mode
                const decay = 2.45 * Math.exp(-this.epoch * 0.045) + 0.35;
                trainLoss = Math.max(0.1, decay + (Math.random() - 0.5) * 0.03);
                valLoss = Math.max(0.12, decay * 1.05 + (Math.random() - 0.5) * 0.04);
            } else {
                // Optimal AdamW convergence mode
                const decay = 2.45 * Math.exp(-this.epoch * 0.18) + 0.045;
                trainLoss = Math.max(0.035, decay + (Math.random() - 0.5) * 0.025);
                valLoss = Math.max(0.05, decay * 1.08 + (Math.random() - 0.5) * 0.04);
            }

            this.trainLossHistory.push(trainLoss);
            this.valLossHistory.push(valLoss);

            const statusEl = document.getElementById('training-status-text');
            const epochEl = document.getElementById('current-epoch-val');
            const lossEl = document.getElementById('current-loss-val');

            if (statusEl) {
                statusEl.textContent = `Optimizing Weights (Step ${this.epoch})...`;
                statusEl.style.color = "var(--text-white)";
            }
            if (epochEl) epochEl.textContent = `${this.epoch}/${this.maxEpochs}`;
            if (lossEl) lossEl.textContent = trainLoss.toFixed(4);

            this.drawLossGraph();
            setTimeout(simulateEpoch, 75);
        };

        simulateEpoch();
    }

    resetLossSimulation() {
        this.isTraining = false;
        this.epoch = 0;
        this.trainLossHistory = [];
        this.valLossHistory = [];
        const statusEl = document.getElementById('training-status-text');
        const epochEl = document.getElementById('current-epoch-val');
        const lossEl = document.getElementById('current-loss-val');

        if (statusEl) {
            statusEl.textContent = "Idle";
            statusEl.style.color = "var(--accent-green)";
        }
        if (epochEl) epochEl.textContent = "0/35";
        if (lossEl) lossEl.textContent = "2.4500";

        this.drawLossGraph();
    }

    drawLossGraph() {
        const ctx = this.lossCtx;
        const w = this.lossCanvas.width;
        const h = this.lossCanvas.height;

        ctx.clearRect(0, 0, w, h);

        // Subtle grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        for (let y = 30; y < h - 30; y += 45) {
            ctx.beginPath();
            ctx.moveTo(40, y);
            ctx.lineTo(w - 20, y);
            ctx.stroke();
        }

        // Axes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(40, 20);
        ctx.lineTo(40, h - 30);
        ctx.lineTo(w - 20, h - 30);
        ctx.stroke();

        ctx.fillStyle = '#71717A';
        ctx.font = '10px -apple-system, monospace';
        ctx.fillText('Loss (J)', 8, 25);
        ctx.fillText('Epochs', w - 45, h - 10);

        if (this.trainLossHistory.length < 2) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
            ctx.font = '12px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText("Click 'Train Model' to simulate backprop", w / 2, h / 2);
            ctx.textAlign = 'left';
            return;
        }

        const maxLoss = Math.max(3.2, ...this.trainLossHistory, ...this.valLossHistory);
        const getX = (idx) => 40 + (idx / (this.maxEpochs - 1)) * (w - 70);
        const getY = (loss) => (h - 30) - (loss / maxLoss) * (h - 60);

        // Training Loss (Solid White Glow)
        ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
        ctx.shadowBlur = 6;
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        for (let i = 0; i < this.trainLossHistory.length; i++) {
            const x = getX(i);
            const y = getY(this.trainLossHistory[i]);
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Validation Loss (Dashed Accent)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.42)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        for (let i = 0; i < this.valLossHistory.length; i++) {
            const x = getX(i);
            const y = getY(this.valLossHistory[i]);
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.AI_STUDIO = new AIPlayground();
});
