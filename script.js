// GitHub Resume Script
// Replace with your GitHub username
const GITHUB_USERNAME = 'vincentviitala';

// GitHub API base URL
const GITHUB_API_BASE = 'https://api.github.com';

// DOM elements
const reposCount = document.getElementById('repos-count');
const followersCount = document.getElementById('followers-count');
const followingCount = document.getElementById('following-count');
const starsCount = document.getElementById('stars-count');
const contributionChart = document.getElementById('github-contribution-chart');

// Initialize the resume
document.addEventListener('DOMContentLoaded', function() {
    fetchGitHubStatsWithAnimation();
    loadContributionChart();
    setAvatarFromGitHub();
    initBackgroundModes();
});

// Fetch GitHub user statistics
async function fetchGitHubStats() {
    try {
        // Fetch user data
        const userResponse = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
        if (!userResponse.ok) {
            throw new Error('Failed to fetch user data');
        }
        const userData = await userResponse.json();

        // Update stats
        reposCount.textContent = userData.public_repos || 0;
        followersCount.textContent = userData.followers || 0;
        followingCount.textContent = userData.following || 0;

        // Fetch starred repositories count
        const starredResponse = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/starred?per_page=1`);
        const starredLink = starredResponse.headers.get('link');

        if (starredLink) {
            const match = starredLink.match(/page=(\d+)>; rel="last"/);
            if (match) {
                starsCount.textContent = match[1];
            }
        }

    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        // Set default values if API fails
        reposCount.textContent = 'N/A';
        followersCount.textContent = 'N/A';
        followingCount.textContent = 'N/A';
        starsCount.textContent = 'N/A';
    }
}

// Load GitHub contribution chart
function loadContributionChart() {
    // Using GitHub's contribution chart image
    // Note: This is a simplified approach. For more detailed charts,
    // you might want to use GitHub's API or third-party services
    const chartUrl = `https://ghchart.rshah.org/${GITHUB_USERNAME}`;
    contributionChart.src = chartUrl;
    contributionChart.alt = `${GITHUB_USERNAME}'s GitHub Contribution Chart`;

    // Handle image load error
    contributionChart.onerror = function() {
        this.style.display = 'none';
        console.log('Could not load contribution chart. Make sure the username is correct.');
    };
}

// Attempt to load GitHub avatar into hero circle
async function setAvatarFromGitHub() {
    try {
        const res = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
        if (!res.ok) return;
        const data = await res.json();
        const avatar = document.getElementById('avatar');
        if (!avatar) return;
        avatar.style.backgroundImage = `url(${data.avatar_url})`;
        avatar.style.backgroundSize = 'cover';
        avatar.style.backgroundPosition = 'center';
        // hide fallback icon for cleaner look
        const icon = avatar.querySelector('i');
        if (icon) icon.style.display = 'none';
    } catch (e) {
        // ignore
    }
}

// Utility function to format numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Animation for stat counters
function animateCounter(element, target) {
    if (isNaN(target)) return;

    const startValue = 0;
    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);

        element.textContent = formatNumber(currentValue);

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = formatNumber(target);
        }
    }

    updateCounter();
}

// Enhanced stats fetching with animation
async function fetchGitHubStatsWithAnimation() {
    try {
        const userResponse = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
        if (!userResponse.ok) {
            throw new Error('Failed to fetch user data');
        }
        const userData = await userResponse.json();

        // Animate counters
        animateCounter(reposCount, userData.public_repos || 0);
        animateCounter(followersCount, userData.followers || 0);
        animateCounter(followingCount, userData.following || 0);

        // Fetch and animate starred count
        const starredResponse = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/starred?per_page=1`);
        const starredLink = starredResponse.headers.get('link');

        let stars = 0;
        if (starredLink) {
            const match = starredLink.match(/page=(\d+)>; rel="last"/);
            if (match) {
                stars = parseInt(match[1]);
            }
        }
        animateCounter(starsCount, stars);

    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        reposCount.textContent = 'N/A';
        followersCount.textContent = 'N/A';
        followingCount.textContent = 'N/A';
        starsCount.textContent = 'N/A';
    }
}

// Replace the simple fetch with animated version
if (typeof fetchGitHubStats !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        if (GITHUB_USERNAME !== 'your-username') {
            fetchGitHubStatsWithAnimation();
            loadContributionChart();
        }
    });
}

// Add smooth scrolling for navigation (if you add navigation later)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add print styles
function addPrintStyles() {
    const printStyles = `
        @media print {
            body { background: white; }
            .container { box-shadow: none; }
            .social-links { display: none; }
            .project-link { color: black !important; }
        }
    `;

    const style = document.createElement('style');
    style.textContent = printStyles;
    document.head.appendChild(style);
}

// Add print styles on load
addPrintStyles();

// -------- Background Manager (Graph Network) --------
function initBackgroundModes() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    initGraphBackground();
}

// -------- Graph Theory Inspired Network Background --------
function initGraphBackground() {
    const canvas = document.getElementById('bg-aurora');
    if (!canvas) return () => {};

    const ctx = canvas.getContext('2d');
    let width = 0, height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    function applySize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    applySize();

    // Theme colors
    const edgeColor = [94,182,255]; // cyan-blue
    const edgeAlt = [43,182,115];   // green

    // Build nodes
    let nodes = [];
    let grid = new Map();
    let cellSize = 120; // neighbor search radius
    let linkDist = 120;
    let nodeCount = 0;

    function spawnNodes() {
        nodeCount = Math.max(60, Math.min(160, Math.round((width * height) / 14000)));
        nodes = new Array(nodeCount).fill(0).map((_, i) => {
            const x = Math.random() * width;
            const y = Math.random() * height;
            return {
                x, y,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                phase: Math.random() * Math.PI * 2,
                speed: 0.4 + Math.random() * 0.7,
                degree: 0
            };
        });
    }
    spawnNodes();

    // Pointer influence
    let pointer = { x: width * 0.5, y: height * 0.5, active: false };
    function onPointerMove(eX, eY) {
        pointer.x = eX; pointer.y = eY; pointer.active = true;
    }
    const handleMouse = (e) => onPointerMove(e.clientX, e.clientY);
    const handleTouch = (e) => { if (e.touches && e.touches[0]) onPointerMove(e.touches[0].clientX, e.touches[0].clientY); };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });

    function rebuildGrid() {
        grid.clear();
        const inv = 1 / cellSize;
        for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            const cx = Math.floor(n.x * inv);
            const cy = Math.floor(n.y * inv);
            const key = cx + ',' + cy;
            let bucket = grid.get(key);
            if (!bucket) { bucket = []; grid.set(key, bucket); }
            bucket.push(i);
        }
    }

    function getNeighbors(n) {
        const neighbors = [];
        const inv = 1 / cellSize;
        const cx = Math.floor(n.x * inv);
        const cy = Math.floor(n.y * inv);
        for (let oy = -1; oy <= 1; oy++) {
            for (let ox = -1; ox <= 1; ox++) {
                const key = (cx + ox) + ',' + (cy + oy);
                const bucket = grid.get(key);
                if (bucket) neighbors.push(...bucket);
            }
        }
        return neighbors;
    }

    let rafId = 0;
    let time = 0;

    function draw() {
        time += 0.016;
        ctx.clearRect(0, 0, width, height);

        // Update nodes with a lightweight curl-like field
        for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            const ang = Math.sin((n.x + time * 50) * 0.002) + Math.cos((n.y - time * 40) * 0.002);
            n.vx += Math.cos(ang) * 0.02;
            n.vy += Math.sin(ang) * 0.02;

            // mild drag and clamp
            n.vx *= 0.96; n.vy *= 0.96;

            // pointer attraction
            if (pointer.active) {
                const dx = pointer.x - n.x;
                const dy = pointer.y - n.y;
                const d2 = dx * dx + dy * dy;
                const f = Math.min(1.5 / Math.max(d2, 4000), 0.02);
                n.vx += dx * f; n.vy += dy * f;
            }

            n.x += n.vx; n.y += n.vy;
            if (n.x < -10) n.x = width + 10; else if (n.x > width + 10) n.x = -10;
            if (n.y < -10) n.y = height + 10; else if (n.y > height + 10) n.y = -10;
        }

        // Spatial hash for edges
        rebuildGrid();

        // Draw edges (limit per node for performance/clarity)
        ctx.lineWidth = 1;
        for (let i = 0; i < nodes.length; i++) {
            const a = nodes[i];
            let degree = 0;
            const neigh = getNeighbors(a);
            for (let k = 0; k < neigh.length && degree < 4; k++) {
                const j = neigh[k];
                if (j <= i) continue; // avoid duplicate lines
                const b = nodes[j];
                const dx = a.x - b.x; const dy = a.y - b.y;
                const d2 = dx * dx + dy * dy;
                if (d2 < linkDist * linkDist) {
                    const d = Math.sqrt(d2);
                    const t = 1 - d / linkDist;
                    const mix = (Math.sin((a.phase + b.phase + time) * 0.8) * 0.5 + 0.5);
                    const r = Math.round(edgeColor[0] * mix + edgeAlt[0] * (1 - mix));
                    const g = Math.round(edgeColor[1] * mix + edgeAlt[1] * (1 - mix));
                    const bcol = Math.round(edgeColor[2] * mix + edgeAlt[2] * (1 - mix));
                    ctx.strokeStyle = `rgba(${r},${g},${bcol},${0.15 + t * 0.55})`;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                    degree++;
                }
            }
        }

        // Draw nodes on top
        ctx.fillStyle = 'rgba(230, 237, 243, 0.9)';
        for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            const size = 1.2 + Math.abs(Math.sin(time * n.speed + n.phase)) * 1.2;
            ctx.beginPath();
            ctx.arc(n.x, n.y, size, 0, Math.PI * 2);
            ctx.fill();
        }

        // Soft vignette for focus
        const vignette = ctx.createRadialGradient(width * 0.5, height * 0.5, Math.max(width, height) * 0.45, width * 0.5, height * 0.5, Math.max(width, height) * 0.9);
        vignette.addColorStop(0, 'rgba(0,0,0,0)');
        vignette.addColorStop(1, 'rgba(0,0,0,0.5)');
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, width, height);

        rafId = requestAnimationFrame(draw);
    }

    function resize() {
        applySize();
        cellSize = Math.max(90, Math.min(160, Math.round(Math.min(width, height) * 0.12)));
        linkDist = cellSize;
        spawnNodes();
    }
    window.addEventListener('resize', resize);

    const onVis = () => {
        if (document.hidden) cancelAnimationFrame(rafId);
        else rafId = requestAnimationFrame(draw);
    };
    document.addEventListener('visibilitychange', onVis);

    rafId = requestAnimationFrame(draw);

    return function stop() {
        cancelAnimationFrame(rafId);
        window.removeEventListener('resize', resize);
        document.removeEventListener('visibilitychange', onVis);
        window.removeEventListener('mousemove', handleMouse);
        window.removeEventListener('touchmove', handleTouch);
        ctx.clearRect(0, 0, width, height);
    };
}
