/**
 * Apple-Grade Minimalist Application Controller
 * Handles dynamic rendering, interactive modals, project filters,
 * blog reading view, Web Audio sound synthesis, and copy-to-clipboard.
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
        this.activeFilter = 'all';
        this.init();
    }

    init() {
        this.renderHeroStats();
        this.renderCoursework();
        this.renderSkills();
        this.renderProjects();
        this.renderBlogs();
        this.initThemeToggle();
        this.initNavigation();
        this.initProjectFilter();
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
       2. Hero Stats Rendering
       ------------------------------------------------------------------------ */
    renderHeroStats() {
        const statsRow = document.getElementById('hero-stats-row');
        if (!statsRow) return;

        statsRow.innerHTML = this.data.profile.stats.map(stat => `
            <div class="hero-stat-card">
                <div class="hero-stat-value">${stat.value}</div>
                <div class="hero-stat-label">${stat.label}</div>
                <div class="hero-stat-sub">${stat.change}</div>
            </div>
        `).join('');
    }

    /* ------------------------------------------------------------------------
       3. Coursework Bento
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
       4. Skills Categories
       ------------------------------------------------------------------------ */
    renderSkills() {
        const container = document.getElementById('skills-container');
        if (!container) return;

        container.innerHTML = this.data.skillCategories.map(cat => `
            <div class="skill-category-card">
                <div class="skill-cat-header">
                    <span class="skill-cat-title">${cat.category}</span>
                    <span class="badge badge-neutral">${cat.badge}</span>
                </div>
                <div class="skill-list">
                    ${cat.skills.map(skill => `
                        <div class="skill-item">
                            <div class="skill-item-header">
                                <span class="skill-item-name">
                                    <i data-lucide="${skill.icon || 'check'}" style="width: 14px; height: 14px; color: var(--text-muted);"></i>
                                    ${skill.name}
                                </span>
                                <span class="skill-item-pct">${skill.level}%</span>
                            </div>
                            <div class="skill-bar-track">
                                <div class="skill-bar-fill" style="width: ${skill.level}%;"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    /* ------------------------------------------------------------------------
       5. Featured Projects & Filter
       ------------------------------------------------------------------------ */
    renderProjects() {
        const grid = document.getElementById('projects-grid');
        if (!grid) return;

        const filtered = this.activeFilter === 'all'
            ? this.data.projects
            : this.data.projects.filter(p => p.category.toLowerCase().includes(this.activeFilter.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(this.activeFilter.toLowerCase())));

        grid.innerHTML = filtered.map(p => `
            <div class="project-card">
                <div class="project-thumbnail">
                    <img src="${p.image}" alt="${p.title}" loading="lazy">
                    <div class="project-badge-overlay">
                        <span class="badge badge-green">${p.accuracy}</span>
                    </div>
                </div>
                <div class="project-content">
                    <div class="project-category">${p.category}</div>
                    <h3 class="project-title">${p.title}</h3>
                    <p class="project-desc">${p.description}</p>
                    <div class="project-tags">
                        ${p.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="project-footer-actions">
                        <button class="btn btn-glass btn-sm view-arch-btn" data-project-id="${p.id}">
                            <i data-lucide="layers" style="width: 13px; height: 13px;"></i> Architecture
                        </button>
                        <div style="display: flex; gap: 0.45rem;">
                            <a href="${p.githubUrl}" target="_blank" class="btn btn-glass btn-sm" title="View Code">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 4px;"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>Code
                            </a>
                            <a href="${p.liveDemoUrl}" class="btn btn-primary-white btn-sm">
                                <i data-lucide="play" style="width: 13px; height: 13px;"></i> Demo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        this.initLucideIcons();

        document.querySelectorAll('.view-arch-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-project-id');
                this.openProjectModal(id);
                if (window.UI_AUDIO) window.UI_AUDIO.playPop();
            });
        });
    }

    initProjectFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.activeFilter = btn.getAttribute('data-filter');
                this.renderProjects();
                if (window.UI_AUDIO) window.UI_AUDIO.playClick();
            });
        });
    }

    /* ------------------------------------------------------------------------
       6. Engineering Journal / Blogs Rendering
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
       8. Modals: Project Architecture & Resume
       ------------------------------------------------------------------------ */
    initModals() {
        const projModal = document.getElementById('project-modal');
        const resumeModal = document.getElementById('resume-modal');

        document.querySelectorAll('.modal-close-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (projModal) projModal.classList.remove('active');
                if (resumeModal) resumeModal.classList.remove('active');
                if (window.UI_AUDIO) window.UI_AUDIO.playClick();
            });
        });

        [projModal, resumeModal].forEach(modal => {
            if (!modal) return;
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });

        document.querySelectorAll('.open-resume-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (resumeModal) resumeModal.classList.add('active');
                if (window.UI_AUDIO) window.UI_AUDIO.playPop();
            });
        });
    }

    openProjectModal(projectId) {
        const p = this.data.projects.find(item => item.id === projectId);
        if (!p) return;

        const titleEl = document.getElementById('modal-project-title');
        const bodyEl = document.getElementById('modal-project-body');
        const modal = document.getElementById('project-modal');

        if (titleEl) titleEl.textContent = p.title;
        if (bodyEl) {
            bodyEl.innerHTML = `
                <div style="margin-bottom: 1.2rem;">
                    <span class="badge badge-green" style="margin-bottom: 0.8rem;">${p.accuracy}</span>
                    <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6;">${p.description}</p>
                </div>

                <div style="background: rgba(0,0,0,0.5); border: 1px solid var(--border-hairline); border-radius: var(--radius-md); padding: 1.2rem; margin-bottom: 1.4rem;">
                    <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.5rem; letter-spacing: 0.05em;">NEURAL ARCHITECTURE SPECIFICATION</div>
                    <div style="font-family: var(--font-mono); font-size: 0.8rem; color: #E4E4E7; background: #000000; padding: 0.8rem; border-radius: 6px; border: 1px solid var(--border-hairline); word-break: break-word;">
                        ${p.architecture}
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.8rem; margin-bottom: 1.6rem;">
                    ${p.metrics.map(m => `
                        <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-hairline); border-radius: 8px; padding: 0.8rem;">
                            <div style="font-size: 0.72rem; color: var(--text-muted);">${m.label}</div>
                            <div style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 700; color: var(--text-white);">${m.value}</div>
                        </div>
                    `).join('')}
                </div>

                <div style="display: flex; justify-content: flex-end; gap: 0.6rem;">
                    <a href="${p.githubUrl}" target="_blank" class="btn btn-glass btn-sm">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 5px;"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>View Repository
                    </a>
                    ${p.isPlaygroundLinked ? `
                        <a href="#playground" class="btn btn-primary-white btn-sm modal-jump-playground">
                            <i data-lucide="play" style="width: 13px; height: 13px;"></i> Open in AI Studio
                        </a>
                    ` : ''}
                </div>
            `;

            this.initLucideIcons();

            const jumpBtn = bodyEl.querySelector('.modal-jump-playground');
            if (jumpBtn) {
                jumpBtn.addEventListener('click', () => {
                    modal.classList.remove('active');
                });
            }
        }

        if (modal) modal.classList.add('active');
    }

    /* ------------------------------------------------------------------------
       9. Copy to Clipboard Pills
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
       11. Apple Dynamic Island Style Toast System
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
