/**
 * Apple-Grade Minimalist AI Studio / Playground Engine
 * 1. VisionDigit (In-browser Digit Recognition & Probability Visualizer)
 * 2. SentimentPulse (Real-time NLP Sentiment Stream)
 * 3. GradientLoss (SGD Neural Training Convergence Visualizer)
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

                if (window.UI_AUDIO) window.UI_AUDIO.playPop();
            });
        });
    }

    /* ------------------------------------------------------------------------
       1. Digit Recognizer Module
       ------------------------------------------------------------------------ */
    initDigitRecognizer() {
        this.canvas = document.getElementById('digit-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;

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
            this.lastX = pos.x;
            this.lastY = pos.y;
            this.drawDot(pos.x, pos.y);
        };

        const drawMove = (e) => {
            if (!this.isDrawing) return;
            e.preventDefault();
            const pos = getPos(e);

            this.ctx.beginPath();
            this.ctx.moveTo(this.lastX, this.lastY);
            this.ctx.lineTo(pos.x, pos.y);
            this.ctx.strokeStyle = '#FFFFFF';
            this.ctx.lineWidth = 14;
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';
            this.ctx.stroke();

            this.lastX = pos.x;
            this.lastY = pos.y;
            this.predictDigitDebounced();
        };

        const stopDraw = () => {
            if (this.isDrawing) {
                this.isDrawing = false;
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
    }

    drawDot(x, y) {
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.beginPath();
        this.ctx.arc(x, y, 7, 0, Math.PI * 2);
        this.ctx.fill();
    }

    clearCanvas() {
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    resetPredictions() {
        document.getElementById('predicted-digit-display').textContent = '-';
        document.getElementById('confidence-val-display').textContent = '0%';
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
        this.debounceTimer = setTimeout(() => this.predictDigit(), 100);
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
                const brightness = pixels[idx];
                if (brightness > 40) {
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

        if (activePixels < 50) {
            this.resetPredictions();
            return;
        }

        const cx = sumX / activePixels;
        const cy = sumY / activePixels;
        const width = Math.max(1, maxX - minX);
        const height = Math.max(1, maxY - minY);
        const aspectRatio = width / height;
        const normCx = (cx - minX) / width;
        const normCy = (cy - minY) / height;

        let topHalf = 0, bottomHalf = 0;
        let centerBox = 0;
        const midY = minY + height / 2;

        for (let y = minY; y <= maxY; y++) {
            for (let x = minX; x <= maxX; x++) {
                const idx = (y * 250 + x) * 4;
                if (pixels[idx] > 50) {
                    if (y < midY) topHalf++; else bottomHalf++;
                    if (Math.abs(x - cx) < width * 0.25 && Math.abs(y - cy) < height * 0.25) {
                        centerBox++;
                    }
                }
            }
        }

        const topRatio = topHalf / activePixels;
        const bottomRatio = bottomHalf / activePixels;
        const centerDensity = centerBox / activePixels;

        let scores = [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05];

        if (aspectRatio < 0.38) {
            scores[1] += 3.6;
        } else if (centerDensity < 0.12 && aspectRatio > 0.6) {
            scores[0] += 3.3;
        } else if (topRatio > 0.65 && normCx < 0.5) {
            scores[7] += 2.9;
            scores[4] += 1.2;
        } else if (bottomRatio > 0.62) {
            scores[6] += 2.6;
            scores[2] += 2.1;
        } else if (normCy > 0.55 && aspectRatio > 0.65) {
            scores[8] += 2.7;
            scores[3] += 2.3;
            scores[5] += 1.8;
        } else if (normCy < 0.45 && normCx > 0.5) {
            scores[9] += 2.5;
            scores[4] += 2.0;
        } else {
            scores[3] += 1.8;
            scores[5] += 1.7;
            scores[8] += 1.5;
            scores[2] += 1.4;
        }

        scores = scores.map(s => Math.max(0.01, s + (Math.random() * 0.15 - 0.075)));

        const expScores = scores.map(s => Math.exp(s * 1.6));
        const sumExp = expScores.reduce((a, b) => a + b, 0);
        const probabilities = expScores.map(e => e / sumExp);

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
        this.ctx.lineWidth = 14;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        this.ctx.beginPath();
        switch (digit) {
            case 0:
                this.ctx.ellipse(125, 125, 45, 65, 0, 0, Math.PI * 2);
                break;
            case 1:
                this.ctx.moveTo(105, 75);
                this.ctx.lineTo(125, 60);
                this.ctx.lineTo(125, 195);
                break;
            case 2:
                this.ctx.arc(125, 95, 35, Math.PI * 1.1, 0);
                this.ctx.lineTo(85, 190);
                this.ctx.lineTo(165, 190);
                break;
            case 3:
                this.ctx.arc(125, 95, 30, Math.PI * 1.2, Math.PI * 0.5);
                this.ctx.arc(125, 155, 34, -Math.PI * 0.5, Math.PI * 0.9);
                break;
            case 7:
                this.ctx.moveTo(85, 70);
                this.ctx.lineTo(165, 70);
                this.ctx.lineTo(110, 195);
                this.ctx.moveTo(95, 130);
                this.ctx.lineTo(135, 130);
                break;
            case 8:
                this.ctx.arc(125, 95, 26, 0, Math.PI * 2);
                this.ctx.arc(125, 155, 34, 0, Math.PI * 2);
                break;
            default:
                this.ctx.moveTo(85, 70);
                this.ctx.lineTo(165, 70);
                this.ctx.lineTo(110, 195);
                break;
        }
        this.ctx.stroke();
    }

    /* ------------------------------------------------------------------------
       2. Real-Time Sentiment NLP Analyzer
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
                textarea.value = sample;
                analyze();
                if (window.UI_AUDIO) window.UI_AUDIO.playPop();
            });
        });

        analyze();
    }

    evaluateSentiment(text) {
        if (!text) {
            this.updateSentimentUI(0, 0.5, "Neutral Sentiment", "neutral");
            return;
        }

        const positiveTokens = [
            'awesome', 'great', 'love', 'amazing', 'brilliant', 'fast', 'clean', 'masterpiece',
            'excellent', 'good', 'super', 'best', 'flawless', 'intelligent', 'efficient',
            'innovative', 'smooth', 'sleek', 'impressive', 'happy', 'recommend'
        ];

        const negativeTokens = [
            'bad', 'terrible', 'awful', 'bug', 'crash', 'slow', 'horrible', 'waste', 'ugly',
            'poor', 'fail', 'broken', 'error', 'hate', 'disappointing', 'useless', 'messy',
            'frustrated', 'hard', 'flawed', 'stuck'
        ];

        const words = text.toLowerCase().match(/\b[a-z0-9'-]+\b/g) || [];
        let score = 0;
        let matchedCount = 0;

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const prevWord = i > 0 ? words[i - 1] : '';
            const isNegated = ['not', 'never', 'no', 'hardly', 'barely'].includes(prevWord);
            const multiplier = isNegated ? -1 : 1;

            if (positiveTokens.includes(word)) {
                score += 1.5 * multiplier;
                matchedCount++;
            } else if (negativeTokens.includes(word)) {
                score -= 1.5 * multiplier;
                matchedCount++;
            }
        }

        const normalized = Math.max(-1, Math.min(1, matchedCount > 0 ? score / (matchedCount * 1.2) : 0));
        const subjectivity = Math.min(100, Math.round((matchedCount / Math.max(1, words.length)) * 140 + 20));

        let statusText = "Neutral Sentiment";
        let statusClass = "neutral";
        let confidence = "88.4%";

        if (normalized > 0.2) {
            statusText = `Positive Sentiment (+${Math.round(normalized * 100)}%)`;
            statusClass = "positive";
            confidence = `${(85 + normalized * 14).toFixed(1)}%`;
        } else if (normalized < -0.2) {
            statusText = `Negative Sentiment (${Math.round(normalized * 100)}%)`;
            statusClass = "negative";
            confidence = `${(85 + Math.abs(normalized) * 14).toFixed(1)}%`;
        }

        this.updateSentimentUI(normalized, subjectivity, statusText, statusClass, confidence);
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
       3. Training Loss Simulator
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
                if (statusEl) statusEl.textContent = "Optimization Converged";
                return;
            }

            this.epoch++;
            const baseLoss = 2.4 * Math.exp(-this.epoch * (lr * 12)) + 0.12;
            const noise = (Math.random() - 0.45) * 0.08;
            const trainLoss = Math.max(0.04, baseLoss + noise);
            const valLoss = Math.max(0.06, baseLoss * 1.08 + (Math.random() - 0.4) * 0.12);

            this.trainLossHistory.push(trainLoss);
            this.valLossHistory.push(valLoss);

            const statusEl = document.getElementById('training-status-text');
            const epochEl = document.getElementById('current-epoch-val');
            const lossEl = document.getElementById('current-loss-val');

            if (statusEl) statusEl.textContent = `Optimizing Weights...`;
            if (epochEl) epochEl.textContent = `${this.epoch}/${this.maxEpochs}`;
            if (lossEl) lossEl.textContent = trainLoss.toFixed(4);

            this.drawLossGraph();
            setTimeout(simulateEpoch, 80);
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

        if (statusEl) statusEl.textContent = "Idle";
        if (epochEl) epochEl.textContent = "0/35";
        if (lossEl) lossEl.textContent = "2.4500";

        this.drawLossGraph();
    }

    drawLossGraph() {
        const ctx = this.lossCtx;
        const w = this.lossCanvas.width;
        const h = this.lossCanvas.height;

        ctx.clearRect(0, 0, w, h);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        for (let y = 30; y < h - 30; y += 45) {
            ctx.beginPath();
            ctx.moveTo(40, y);
            ctx.lineTo(w - 20, y);
            ctx.stroke();
        }

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(40, 20);
        ctx.lineTo(40, h - 30);
        ctx.lineTo(w - 20, h - 30);
        ctx.stroke();

        ctx.fillStyle = '#71717A';
        ctx.font = '10px -apple-system, sans-serif';
        ctx.fillText('Loss', 8, 25);
        ctx.fillText('Epochs', w - 45, h - 10);

        if (this.trainLossHistory.length < 2) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
            ctx.font = '12px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText("Click 'Train Model' to simulate backprop", w / 2, h / 2);
            ctx.textAlign = 'left';
            return;
        }

        const maxLoss = 2.6;
        const getX = (idx) => 40 + (idx / (this.maxEpochs - 1)) * (w - 70);
        const getY = (loss) => (h - 30) - (loss / maxLoss) * (h - 60);

        // Train Loss Line (Pure Crisp White)
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < this.trainLossHistory.length; i++) {
            const x = getX(i);
            const y = getY(this.trainLossHistory[i]);
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Validation Loss Line (Subtle Gray Dash)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
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
    window.AI_PLAYGROUND = new AIPlayground();
});
