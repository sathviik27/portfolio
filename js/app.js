/**
 * Apple-Grade Minimalist Application Controller
 * Sathvik - Dayananda Sagar University (DSU)
 * Handles dynamic rendering, interactive Bento toolkit,
 * blog reading view, Web Audio sound synthesis, theme toggling, and copy pills.
 */

// Synthesized Web Audio Sound System (Subtle Acoustic Feedback)
class MinimalistAudio {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
        }
    }

    playPop() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(480, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(720, this.ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
    }

    playClick() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.03);

        gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.03);
    }

    playSuccess() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        [523.25, 659.25, 783.99].forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + i * 0.05);

            gain.gain.setValueAtTime(0.04, now + i * 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.12);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + i * 0.05);
            osc.stop(now + i * 0.05 + 0.12);
        });
    }
}

window.UI_AUDIO = new MinimalistAudio();

// Main App Controller
class App {
    constructor() {
        this.data = PORTFOLIO_DATA;
        this.init();
    }

    init() {
        this.renderCoursework();
        this.renderToolkit();
        this.renderBlogs();
        this.initThemeToggle();
        this.initNavigation();
        this.initModals();
        this.initCopyPills();
        this.initLucideIcons();
    }

    initLucideIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
        this.renderBrandIcons();
    }

    renderBrandIcons() {
        const ghSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="brand-svg"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>`;
        const inSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="brand-svg"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>`;
        const twSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="brand-svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>`;

        document.querySelectorAll('[data-lucide="github"]').forEach(el => { el.outerHTML = ghSvg; });
        document.querySelectorAll('[data-lucide="linkedin"]').forEach(el => { el.outerHTML = inSvg; });
        document.querySelectorAll('[data-lucide="twitter"]').forEach(el => { el.outerHTML = twSvg; });
    }

    initThemeToggle() {
        const toggleBtn = document.getElementById('theme-toggle-btn');
        if (!toggleBtn) return;

        toggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', nextTheme);
            localStorage.setItem('sathvik_theme', nextTheme);

            if (window.UI_AUDIO) window.UI_AUDIO.playPop();
            this.showToast(`Theme: ${nextTheme === 'light' ? 'Apple Light' : 'Cupertino Dark'}`);
        });
    }

    /* ------------------------------------------------------------------------
       1. Navigation & Scroll Spy
       ------------------------------------------------------------------------ */
    initNavigation() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const navLinksList = document.querySelector('.nav-links');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 120;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        if (menuToggle && navLinksList) {
            menuToggle.addEventListener('click', () => {
                navLinksList.classList.toggle('open');
            });
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navLinksList.classList.remove('open');
                });
            });
        }
    }

    /* ------------------------------------------------------------------------
       2. Coursework Bento
       ------------------------------------------------------------------------ */
    renderCoursework() {
        const list = document.getElementById('coursework-list');
        if (!list) return;

        list.innerHTML = this.data.coursework.map(c => `
            <div class="coursework-item">
                <div class="coursework-header">
                    <span class="coursework-title">${c.title}</span>
                    <span class="coursework-grade">${c.grade}</span>
                </div>
                <p class="coursework-desc">${c.description}</p>
            </div>
        `).join('');
    }

    /* ------------------------------------------------------------------------
       3. Redesigned Apple Bento Toolkit (Languages & Frameworks)
       ------------------------------------------------------------------------ */
    renderToolkit() {
        const container = document.getElementById('toolkit-bento-grid');
        if (!container || !this.data.toolkit) return;

        const iconMap = {
            cpp: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon><line x1="12" y1="22" x2="12" y2="15.5"></line><polyline points="22 8.5 12 15.5 2 8.5"></polyline><polyline points="2 15.5 12 8.5 22 15.5"></polyline></svg>`,
            java: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FB923C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>`,
            python: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H8a4 4 0 0 0-4 4v4a4 4 0 0 0 4 4h4v-2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4v2h2V4a2 2 0 0 0-2-2z"></path><path d="M12 22h4a4 4 0 0 0 4-4v-4a4 4 0 0 0-4-4h-4v2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4v-2h-2v2a2 2 0 0 0 2 2z"></path><circle cx="9" cy="6" r="1" fill="#38BDF8"></circle><circle cx="15" cy="18" r="1" fill="#38BDF8"></circle></svg>`,
            pytorch: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`,
            scikit: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M3 9h18"></path><path d="M3 15h18"></path><path d="M9 3v18"></path><path d="M15 3v18"></path></svg>`,
            opencv: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="4"></circle><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line></svg>`,
            transformers: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" y1="22" x2="12" y2="12"></line></svg>`,
            matrix: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h4v16H4"></path><path d="M20 4h-4v16h4"></path><circle cx="9" cy="9" r="1" fill="currentColor"></circle><circle cx="15" cy="9" r="1" fill="currentColor"></circle><circle cx="9" cy="15" r="1" fill="currentColor"></circle><circle cx="15" cy="15" r="1" fill="currentColor"></circle></svg>`,
            calculus: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
            stats: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#818CF8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>`,
            database: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`,
            git: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F87171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="6" y1="9" x2="6" y2="15"></line><path d="M18 15a9 9 0 0 0-9-9"></path></svg>`,
            linux: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E2E8F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>`,
            terminal: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A3E635" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>`
        };

        const domains = [
            { key: 'systems', colSpan: 'col-span-12' },
            { key: 'ai', colSpan: 'col-span-6' },
            { key: 'mathematics', colSpan: 'col-span-6' },
            { key: 'toolchain', colSpan: 'col-span-12' }
        ];

        container.innerHTML = domains.map(({ key, colSpan }) => {
            const domain = this.data.toolkit[key];
            if (!domain) return '';

            return `
                <div class="toolkit-domain-card ${colSpan}">
                    <div class="toolkit-domain-header">
                        <div>
                            <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.35rem;">
                                <h3 class="toolkit-domain-title">${domain.category}</h3>
                            </div>
                            <p class="toolkit-domain-subtitle">${domain.subtitle}</p>
                        </div>
                        <span class="badge badge-neutral">${domain.badge}</span>
                    </div>

                    <div class="toolkit-items-grid">
                        ${domain.items.map(item => `
                            <div class="toolkit-item">
                                <div class="toolkit-item-top">
                                    <div class="toolkit-item-icon">
                                        ${iconMap[item.icon] || iconMap.terminal}
                                    </div>
                                    <div class="toolkit-item-head-text">
                                        <div class="toolkit-item-name">${item.name}</div>
                                        <div class="toolkit-item-level">${item.level}</div>
                                    </div>
                                </div>
                                <p class="toolkit-item-desc">${item.desc}</p>
                                <div class="toolkit-item-tags">
                                    ${item.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }

    /* ------------------------------------------------------------------------
       4. Engineering Journal / Blogs Rendering
       ------------------------------------------------------------------------ */
    renderBlogs() {
        const grid = document.getElementById('journal-grid');
        if (!grid) return;

        grid.innerHTML = this.data.blogs.map(b => `
            <a href="blog.html?article=${b.id}" class="journal-card" style="text-decoration: none; color: inherit;">
                ${b.thumbnail ? `
                <div class="journal-thumb-wrap">
                    <img src="${b.thumbnail}" alt="${b.title}" class="journal-thumb-img" loading="lazy">
                </div>
                ` : ''}
                <div class="journal-card-body">
                    <div class="journal-meta">
                        <span class="badge badge-neutral" style="font-size: 0.7rem;">${b.category}</span>
                        <span class="journal-date">${b.date} • ${b.readTime}</span>
                    </div>
                    <h3 class="journal-title">${b.title}</h3>
                    <p class="journal-excerpt">${b.subtitle}</p>
                </div>
                <div class="journal-footer">
                    <span>Read Article</span>
                    <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i>
                </div>
            </a>
        `).join('');

        this.initLucideIcons();
    }

    /* ------------------------------------------------------------------------
       5. Modals: Resume
       ------------------------------------------------------------------------ */
    initModals() {
        const resumeModal = document.getElementById('resume-modal');

        document.querySelectorAll('.modal-close-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (resumeModal) resumeModal.classList.remove('active');
                if (window.UI_AUDIO) window.UI_AUDIO.playClick();
            });
        });

        if (resumeModal) {
            resumeModal.addEventListener('click', (e) => {
                if (e.target === resumeModal) {
                    resumeModal.classList.remove('active');
                }
            });
        }

        document.querySelectorAll('.open-resume-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (resumeModal) resumeModal.classList.add('active');
                if (window.UI_AUDIO) window.UI_AUDIO.playPop();
            });
        });
    }

    /* ------------------------------------------------------------------------
       6. Copy to Clipboard Pills
       ------------------------------------------------------------------------ */
    initCopyPills() {
        document.querySelectorAll('.copy-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                const text = pill.getAttribute('data-copy');
                if (text) {
                    navigator.clipboard.writeText(text).then(() => {
                        this.showToast(`Copied ${text} to clipboard`);
                        if (window.UI_AUDIO) window.UI_AUDIO.playSuccess();
                    }).catch(() => {
                        this.showToast(`Selected: ${text}`);
                    });
                }
            });
        });
    }

    /* ------------------------------------------------------------------------
       7. Apple Dynamic Island Style Toast System
       ------------------------------------------------------------------------ */
    showToast(message) {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <span class="pulse-dot"></span>
            <span>${message}</span>
        `;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'toastDropOut 0.25s forwards';
            setTimeout(() => toast.remove(), 250);
        }, 2800);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.APP = new App();
});
