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
        this.renderRoadmap();
        this.renderCertifications();
        this.initNavigation();
        this.initProjectFilter();
        this.initModals();
        this.initContactForm();
        this.initCopyPills();
        this.initLucideIcons();
    }

    initLucideIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
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
                                <i data-lucide="github" style="width: 13px; height: 13px;"></i> Code
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
                <div>
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
       7. Roadmap & Milestones
       ------------------------------------------------------------------------ */
    renderRoadmap() {
        const timeline = document.getElementById('roadmap-timeline');
        if (!timeline) return;

        timeline.innerHTML = this.data.roadmap.map(item => `
            <div class="roadmap-item ${item.status}">
                <div class="roadmap-node"></div>
                <div class="roadmap-card">
                    <div class="roadmap-header">
                        <span class="roadmap-year">${item.year}</span>
                        <span class="badge ${item.status === 'current' ? 'badge-green' : 'badge-neutral'}">${item.badge}</span>
                    </div>
                    <h4 style="font-size: 1rem; margin-bottom: 0.35rem; color: var(--text-white); font-weight: 600;">${item.title}</h4>
                    <ul class="roadmap-bullets">
                        ${item.milestones.map(m => `<li>${m}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');
    }

    renderCertifications() {
        const certGrid = document.getElementById('cert-grid');
        if (!certGrid) return;

        certGrid.innerHTML = this.data.certifications.map(c => `
            <div class="cert-card">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.35rem;">
                    <h4 style="font-size: 0.92rem; color: var(--text-white); font-weight: 600;">${c.name}</h4>
                    <span class="badge badge-neutral" style="font-size: 0.68rem;">${c.date}</span>
                </div>
                <div style="color: var(--accent-green); font-size: 0.78rem; font-family: var(--font-mono); margin-bottom: 0.25rem;">${c.issuer}</div>
                <div style="color: var(--text-muted); font-size: 0.75rem;">${c.skills}</div>
            </div>
        `).join('');
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
                        <i data-lucide="github" style="width: 13px; height: 13px;"></i> View Repository
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
       10. Contact Form Dispatch Simulation
       ------------------------------------------------------------------------ */
    initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name').value;

            this.showToast(`Message sent. Thank you, ${name}.`);
            if (window.UI_AUDIO) window.UI_AUDIO.playSuccess();
            form.reset();
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
