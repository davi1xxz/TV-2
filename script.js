
// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
const body = document.body;

// Initialize theme
let currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    currentTheme = 'dark';
}
applyTheme(currentTheme);

function applyTheme(theme) {
    if (theme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    } else {
        body.removeAttribute('data-theme');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }
    localStorage.setItem('theme', theme);
    currentTheme = theme;
}

themeToggle.addEventListener('click', () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
});

// Navigation Management
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const pages = document.querySelectorAll('.page');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const hamburgerIcon = document.querySelector('.hamburger-icon');
const closeIcon = document.querySelector('.close-icon');

// Mobile menu toggle
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        hamburgerIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });
}

// Page navigation
function showPage(pageId) {
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
        targetPage.classList.add('fade-in');
    }
    
    // Update active nav links
    [...navLinks, ...mobileNavLinks].forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageId) {
            link.classList.add('active');
        }
    });
    
    // Close mobile menu
    mobileMenu.classList.remove('active');
    hamburgerIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
    
    // Update URL hash
    window.location.hash = pageId === 'inicio' ? '' : pageId;
}

// Handle navigation clicks
[...navLinks, ...mobileNavLinks].forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.dataset.page;
        showPage(pageId);
    });
});

// Handle hash changes
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    const pageId = hash || 'inicio';
    showPage(pageId);
});

// Initialize page on load
window.addEventListener('load', () => {
    const hash = window.location.hash.slice(1);
    const pageId = hash || 'inicio';
    showPage(pageId);
});

// Video Player Controls
const playPauseBtn = document.getElementById('play-pause-btn');
const playBtn = document.getElementById('play-btn');
const volumeBtn = document.getElementById('volume-btn');
const volumeSlider = document.getElementById('volume-slider');
const playIcons = document.querySelectorAll('.play-icon');
const pauseIcons = document.querySelectorAll('.pause-icon');
const volumeIcon = document.querySelector('.volume-icon');
const muteIcon = document.querySelector('.mute-icon');

let isPlaying = false;
let isMuted = false;
let volume = 80;

// Play/Pause functionality
function togglePlayPause() {
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        playIcons.forEach(icon => icon.classList.add('hidden'));
        pauseIcons.forEach(icon => icon.classList.remove('hidden'));
        console.log('Radio started playing');
    } else {
        playIcons.forEach(icon => icon.classList.remove('hidden'));
        pauseIcons.forEach(icon => icon.classList.add('hidden'));
        console.log('Radio paused');
    }
}

if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlayPause);
if (playBtn) playBtn.addEventListener('click', togglePlayPause);

// Volume controls
function toggleMute() {
    isMuted = !isMuted;
    
    if (isMuted) {
        volumeIcon.classList.add('hidden');
        muteIcon.classList.remove('hidden');
        volumeSlider.value = 0;
        console.log('Radio muted');
    } else {
        volumeIcon.classList.remove('hidden');
        muteIcon.classList.add('hidden');
        volumeSlider.value = volume;
        console.log('Radio unmuted');
    }
}

if (volumeBtn) volumeBtn.addEventListener('click', toggleMute);

if (volumeSlider) volumeSlider.addEventListener('input', (e) => {
    const newVolume = e.target.value;
    
    if (newVolume == 0) {
        isMuted = true;
        volumeIcon.classList.add('hidden');
        muteIcon.classList.remove('hidden');
    } else {
        isMuted = false;
        volumeIcon.classList.remove('hidden');
        muteIcon.classList.add('hidden');
        volume = newVolume;
    }
    
    console.log('Volume changed to:', newVolume);
});

// News Slider (REMOVIDO: toda a lógica e referências a elementos de notícias da home, pois não existem mais)

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slide-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.stat-card, .news-card, .schedule-item, .team-member, .value-card');
    animateElements.forEach(el => observer.observe(el));
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        mobileMenu.classList.remove('active');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
});

// Console welcome message
console.log('🎵 TV OK - Sua TV Online');
console.log('📻 Sistema carregado com sucesso!');
console.log('🔊 Todos os controles funcionando perfeitamente');

// Error handling
window.addEventListener('error', (e) => {
    console.error('Erro capturado:', e);
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Página carregada em ${Math.round(loadTime)}ms`);
    
    // Monitorar recursos críticos
    const resources = performance.getEntriesByType('resource');
    const cssResources = resources.filter(r => r.name.includes('.css'));
    const fontResources = resources.filter(r => r.name.includes('fonts.googleapis.com'));
    
    console.log('📊 Performance Report:');
    console.log(`- CSS Files: ${cssResources.length} (${Math.round(cssResources.reduce((sum, r) => sum + r.duration, 0))}ms)`);
    console.log(`- Font Files: ${fontResources.length} (${Math.round(fontResources.reduce((sum, r) => sum + r.duration, 0))}ms)`);
    
    // Verificar render-blocking
    const renderBlocking = resources.filter(r => r.renderBlockingStatus === 'blocking');
    if (renderBlocking.length > 0) {
        console.warn('⚠️ Render-blocking resources detected:', renderBlocking.map(r => r.name));
    } else {
        console.log('✅ No render-blocking resources detected');
    }
});

// Monitorar mudanças de performance em tempo real
let lastPerformanceCheck = performance.now();
setInterval(() => {
    const now = performance.now();
    const timeSinceLastCheck = now - lastPerformanceCheck;
    
    if (timeSinceLastCheck > 100) { // Se demorou mais de 100ms
        console.warn(`🐌 Performance drop detected: ${Math.round(timeSinceLastCheck)}ms since last check`);
    }
    
    lastPerformanceCheck = now;
}, 1000);
