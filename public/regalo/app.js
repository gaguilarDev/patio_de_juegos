/* ==========================================================================
   Quotes Database & Transition Logic
   ========================================================================== */
const quotes = [
    {
        text: "Por que hay trenes que solo pasan una vez, que ya no vuelven. Y te subes sin dudar, aunque sepas que van a estrellarse. Por que es más fácil seguir viviendo con la certeza de lo que no fue que con la incertidumbre de lo que podría haber sido.",
        author: "Cuando no queden más estrellas que contar - María Martínez"
    },
    {
        text: "Imagina que no tenemos tiempo, quizas el mundo se acabe mañana, que harias si solo te quedan 10 minutos, pues entonces harias lo que mas quisieras y probablemente nadie podria detenerte. Asi es como se siente, el sentimiento que me come la cabeza y me dice que disfrutes cada segundo y que no deje de amarte.",
        author: "Interpretación de Kafka"
    },
    {
        text: "Andábamos sin buscarnos, pero sabiendo que andábamos para encontrarnos. Como si dos líneas trazadas al azar en un plano infinito descubrieran de pronto que sus ecuaciones estaban condenadas a cruzarse en un único y necesario punto del espacio.",
        author: "Julio Cortázar (Adaptación)"
    },
    {
        text: "Nadie se baña dos veces en el mismo río, porque todo fluye y nada permanece. Sin embargo, hay una sutil persistencia en el fluir: una estela luminosa que el agua retiene en secreto, recordándonos que ciertas corrientes corren paralelas mucho antes de fundirse en el mar.",
        author: "Filosofía del Cambio"
    },
    {
        text: "La gravedad no es una fuerza de atracción misteriosa, sino la insistencia del espacio por curvarse allí donde hay presencia. Así, las órbitas celestes no se buscan por voluntad, sino por seguir la hermosa e inevitable deformación que el otro imprime en el vacío.",
        author: "Relatividad del Espacio"
    },
    {
        text: "Hay una geometría silenciosa en los encuentros que no necesita palabras para justificarse. Se revela en la forma en que los silencios encajan con exactitud arqueológica, donde el vacío del uno es el relieve del otro, completando una figura que el tiempo no puede desgastar.",
        author: "Geometría del Alma"
    },
    {
        text: "Dos péndulos acoplados lanzados al azar describen trayectorias complejas, aparentemente erráticas y caóticas. Pero tras cada oscilación salvaje, sus ritmos se sincronizan mediante vibraciones invisibles, demostrando que incluso en la libertad del caos existe una armonía secreta.",
        author: "Sincronía del Caos"
    }
];

let currentQuoteIndex = 0;
const quoteCard = document.getElementById('quoteCard');
const quoteTextEl = document.getElementById('quoteText');
const quoteAuthorEl = document.getElementById('quoteAuthor');
const nextQuoteBtn = document.getElementById('nextQuote');

function showNextQuote() {
    quoteTextEl.style.opacity = '0';
    quoteAuthorEl.style.opacity = '0';
    
    setTimeout(() => {
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * quotes.length);
        } while (nextIndex === currentQuoteIndex && quotes.length > 1);
        
        currentQuoteIndex = nextIndex;
        const newQuote = quotes[currentQuoteIndex];
        
        quoteTextEl.textContent = newQuote.text;
        quoteAuthorEl.textContent = newQuote.author;
        
        quoteTextEl.style.opacity = '1';
        quoteAuthorEl.style.opacity = '1';
    }, 500);
}

quoteTextEl.style.transition = 'opacity 0.5s ease';
quoteAuthorEl.style.transition = 'opacity 0.5s ease';
nextQuoteBtn.addEventListener('click', showNextQuote);


/* ==========================================================================
   Canvas Setup & Layout Parameters
   ========================================================================== */
const canvas = document.getElementById('mandalaCanvas');
const canvasSection = document.querySelector('.canvas-section');
const ctx = canvas.getContext('2d');

let width, height, cx, cy, minDim;
const symmetry = 24; // Permanently set to 24 symmetry for gorgeous, dense designs

let isAuto = true;
let hue = 0;
let time = 0;
let patternMode = 'mandala'; // 'mandala' or 'fractal'
let frameCount = 0;

// Mouse & Touch states
let isDrawing = false;
let mouseX = 0;
let mouseY = 0;
let lastMouseX = 0;
let lastMouseY = 0;
let isMouseInCanvas = false;

// Design index states (6 designs each)
let mandalaDesignIndex = 0;
let fractalDesignIndex = 0;
let activeDrawMode = 'line'; // 'line' or 'dots'

/* ==========================================================================
   6 Mandala Presets (Spirographs & Lissajous configurations)
   ========================================================================== */
const mandalaPresets = [
    {
        name: "Danza Cósmica",
        drawMode: "line",
        dancers: [
            { r: [0.08, 0.04, 0.02], s: [0.015, -0.048, 0.12], offset: 0, weight: 1.4 },
            { r: [0.16, 0.07, 0.03], s: [-0.007, 0.028, -0.065], offset: 60, weight: 1.6 },
            { r: [0.24, 0.08, 0.02], s: [0.003, -0.019, 0.042], offset: 130, weight: 1.3 },
            { r: [0.20, 0.11, 0.04], s: [0.005, -0.009, 0.031], offset: 200, weight: 1.5 },
            { r: [0.33, 0.05, 0.01], s: [-0.002, 0.016, -0.038], offset: 270, weight: 1.1 }
        ]
    },
    {
        name: "Flor Celestial",
        drawMode: "line",
        dancers: [
            { r: [0.15, 0.05], s: [0.01, -0.05], offset: 30, weight: 1.5 },
            { r: [0.25, 0.08], s: [-0.01, 0.03], offset: 150, weight: 1.8 },
            { r: [0.32, 0.04], s: [0.005, -0.04], offset: 270, weight: 1.3 }
        ]
    },
    {
        name: "Estrella del Destino",
        drawMode: "line",
        dancers: [
            { r: [0.12, 0.09], s: [0.011, -0.077], offset: 0, weight: 1.4 },
            { r: [0.22, 0.13], s: [-0.005, 0.055], offset: 120, weight: 1.6 },
            { r: [0.30, 0.07], s: [0.013, -0.091], offset: 240, weight: 1.2 }
        ]
    },
    {
        name: "Laberinto del Tiempo",
        drawMode: "line",
        dancers: [
            { r: [0.20, 0.18], s: [0.002, -0.003], offset: 90, weight: 1.3 },
            { r: [0.28, 0.06], s: [-0.001, 0.005], offset: 180, weight: 1.5 },
            { r: [0.12, 0.10], s: [0.003, -0.007], offset: 320, weight: 1.2 }
        ]
    },
    {
        name: "Lluvia de Estrellas",
        drawMode: "dots",
        dancers: [
            { r: [0.10, 0.05], s: [0.012, -0.04], offset: 0, weight: 1.5 },
            { r: [0.20, 0.08], s: [-0.008, 0.024], offset: 120, weight: 1.8 },
            { r: [0.30, 0.12], s: [0.004, -0.016], offset: 240, weight: 1.4 },
            { r: [0.35, 0.03], s: [-0.002, 0.012], offset: 310, weight: 1.2 }
        ]
    },
    {
        name: "Anillo de la Unidad",
        drawMode: "line",
        dancers: [
            { r: [0.32, 0.08, 0.02], s: [0.002, -0.032, 0.08], offset: 10, weight: 1.4 },
            { r: [0.28, 0.04], s: [-0.001, 0.024], offset: 140, weight: 1.6 },
            { r: [0.34, 0.06], s: [0.003, -0.048], offset: 250, weight: 1.2 }
        ]
    }
];

/* ==========================================================================
   Mathematical Dancers Class
   ========================================================================== */
class Dancer {
    constructor(rFactors, speedFactors, colorOffset, lineWeight) {
        this.rFactors = rFactors;       
        this.speedFactors = speedFactors; 
        this.colorOffset = colorOffset;   
        this.lineWeight = lineWeight;     
        
        this.prevX = null;
        this.prevY = null;
    }
    
    update(t) {
        let x = 0;
        let y = 0;
        const breath = 1.0 + Math.sin(t * 0.005) * 0.18;
        
        for (let i = 0; i < this.rFactors.length; i++) {
            const r = minDim * this.rFactors[i] * breath;
            const theta = t * this.speedFactors[i] + Math.sin(t * 0.002) * 0.15;
            x += Math.cos(theta) * r;
            y += Math.sin(theta) * r;
        }
        
        return { x, y };
    }
    
    draw(currentX, currentY, baseHue, drawMode = 'line') {
        const h = (baseHue + this.colorOffset) % 360;
        
        for (let s = 0; s < symmetry; s++) {
            const angle = s * (2 * Math.PI / symmetry);
            
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(angle);
            
            if (drawMode === 'dots') {
                // Drawing stardust glowing circles
                ctx.beginPath();
                ctx.arc(currentX, currentY, this.lineWeight * 1.6, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${h}, 100%, 82%, 0.8)`;
                ctx.fill();
            } else {
                if (this.prevX !== null && this.prevY !== null) {
                    // Glow
                    ctx.beginPath();
                    ctx.moveTo(this.prevX, this.prevY);
                    ctx.lineTo(currentX, currentY);
                    ctx.strokeStyle = `hsla(${h}, 100%, 72%, 0.12)`;
                    ctx.lineWidth = this.lineWeight * 3.5;
                    ctx.lineCap = 'round';
                    ctx.stroke();
                    
                    // Core
                    ctx.beginPath();
                    ctx.moveTo(this.prevX, this.prevY);
                    ctx.lineTo(currentX, currentY);
                    ctx.strokeStyle = `hsla(${h}, 100%, 85%, 0.75)`;
                    ctx.lineWidth = this.lineWeight;
                    ctx.lineCap = 'round';
                    ctx.stroke();
                }
            }
            
            ctx.restore();
        }
        
        this.prevX = currentX;
        this.prevY = currentY;
    }
    
    reset() {
        this.prevX = null;
        this.prevY = null;
    }
}

const dancers = [];

function loadMandalaPreset(index) {
    const preset = mandalaPresets[index];
    dancers.length = 0;
    preset.dancers.forEach(d => {
        dancers.push(new Dancer(d.r, d.s, d.offset, d.weight));
    });
    activeDrawMode = preset.drawMode;
    document.querySelector('.btn-number').textContent = `${index + 1}/6`;
}

// Load Mandala 1 initially
loadMandalaPreset(0);

function resetDancers() {
    dancers.forEach(dancer => dancer.reset());
}


/* ==========================================================================
   6 Fractal Modes (Love-themed geometries and recursive logic)
   ========================================================================== */
let particles = [];
let currentBending = 0;

// Base Heart Drawing function
function drawHeart(x, y, size, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    const s = size / 30; 
    
    ctx.moveTo(0, -3 * s);
    ctx.bezierCurveTo(-5 * s, -10 * s, -15 * s, -5 * s, -15 * s, 2 * s);
    ctx.bezierCurveTo(-15 * s, 10 * s, -5 * s, 17 * s, 0, 24 * s);
    ctx.bezierCurveTo(5 * s, 17 * s, 15 * s, 10 * s, 15 * s, 2 * s);
    ctx.bezierCurveTo(15 * s, -5 * s, 5 * s, -10 * s, 0, -3 * s);
    
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
}

// Particle class for drifting hearts
class HeartParticle {
    constructor(x, y, size, speedX, speedY, maxLife, hueOffset) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.life = maxLife;
        this.maxLife = maxLife;
        this.hueOffset = hueOffset;
        this.decay = 0.008 + Math.random() * 0.012;
        this.swaySpeed = 0.01 + Math.random() * 0.025;
        this.swayOffset = Math.random() * Math.PI * 2;
    }
    
    update(t) {
        this.x += this.speedX + Math.sin(t * this.swaySpeed + this.swayOffset) * 0.35;
        this.y += this.speedY;
        this.life -= this.decay;
    }
    
    draw() {
        const opacity = Math.max(0, this.life);
        const h = (hue + this.hueOffset) % 360;
        const color = `hsla(${h}, 100%, 70%, ${opacity})`;
        drawHeart(this.x, this.y, this.size, color);
    }
}

function spawnInteractiveHearts(x, y) {
    for (let i = 0; i < 2; i++) {
        const speedX = (Math.random() - 0.5) * 2;
        const speedY = -1.2 - Math.random() * 1.8;
        const size = 8 + Math.random() * 14;
        const maxLife = 0.7 + Math.random() * 0.4;
        const hueOffset = Math.random() * 40 - 20;
        particles.push(new HeartParticle(x, y, size, speedX, speedY, maxLife, hueOffset));
    }
}

function updateAndDrawParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update(time);
        p.draw();
        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }
}

// 1. Recursive Tree Drawing (Ternary branching)
function drawTree(x, y, length, angle, depth, maxDepth, bending, baseHueOffset) {
    if (depth > maxDepth) return;
    
    const x2 = x + Math.cos(angle) * length;
    const y2 = y + Math.sin(angle) * length;
    
    const branchWidth = (maxDepth - depth + 1) * 1.5;
    const branchHue = (baseHueOffset + depth * 14) % 360; 
    ctx.strokeStyle = `hsla(${branchHue}, 82%, 55%, ${0.92 - depth * 0.12})`;
    ctx.lineWidth = branchWidth;
    ctx.lineCap = 'round';
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    
    if (depth === maxDepth) {
        const leafHue = (baseHueOffset + 40 + Math.sin(time * 0.05) * 15) % 360;
        const leafColor = `hsla(${leafHue}, 100%, 70%, 0.88)`;
        drawHeart(x2, y2, 10 + Math.sin(time * 0.06 + x2) * 2, leafColor);
        
        if (Math.random() < 0.0035) {
            const speedX = (Math.random() - 0.5) * 0.5;
            const speedY = -0.4 - Math.random() * 0.6;
            const size = 5 + Math.random() * 5;
            const maxLife = 0.6 + Math.random() * 0.4;
            particles.push(new HeartParticle(x2, y2, size, speedX, speedY, maxLife, baseHueOffset - hue));
        }
        return;
    }
    
    const angleSway = Math.sin(time * 0.025 + depth) * 0.015;
    const leftAngleOffset = -0.38 + bending + angleSway;
    const centerAngleOffset = 0 + bending + angleSway;
    const rightAngleOffset = 0.38 + bending + angleSway;
    
    const lengthFactor = 0.68;
    
    drawTree(x2, y2, length * lengthFactor, angle + leftAngleOffset, depth + 1, maxDepth, bending, baseHueOffset);
    drawTree(x2, y2, length * lengthFactor, angle + centerAngleOffset, depth + 1, maxDepth, bending, baseHueOffset);
    drawTree(x2, y2, length * lengthFactor, angle + rightAngleOffset, depth + 1, maxDepth, bending, baseHueOffset);
}

// 2. Recursive Cardioid Heart Fractal
function drawHeartFractal(x, y, size, angle, depth, maxDepth) {
    if (depth > maxDepth) return;
    
    const h = (hue + depth * 35) % 360;
    const color = `hsla(${h}, 100%, 70%, ${0.9 - depth * 0.16})`;
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    drawHeart(0, 0, size, color);
    ctx.restore();
    
    const nextSize = size * 0.48;
    const dist = size * 0.65;
    const sway = currentBending * 0.5;
    
    drawHeartFractal(x + Math.cos(angle - Math.PI/3) * dist, y + Math.sin(angle - Math.PI/3) * dist, nextSize, angle - 0.5 + sway, depth + 1, maxDepth);
    drawHeartFractal(x + Math.cos(angle + Math.PI/3) * dist, y + Math.sin(angle + Math.PI/3) * dist, nextSize, angle + 0.5 + sway, depth + 1, maxDepth);
    drawHeartFractal(x + Math.cos(angle + Math.PI) * dist, y + Math.sin(angle + Math.PI) * dist, nextSize, angle + Math.PI + sway, depth + 1, maxDepth);
}

// 3. Sierpinski Triangle of Hearts
function drawSierpinskiHearts(x, y, size, depth, maxDepth) {
    if (depth > maxDepth) return;
    
    const h = (hue + depth * 40) % 360;
    const color = `hsla(${h}, 100%, 72%, ${0.85 - depth * 0.14})`;
    drawHeart(x, y - size * 0.1, size * 0.45, color);
    
    const nextSize = size * 0.5;
    const heightOffset = size * 0.35;
    const offset = currentBending * 15;
    
    drawSierpinskiHearts(x + offset, y - heightOffset, nextSize, depth + 1, maxDepth);
    drawSierpinskiHearts(x - size * 0.25, y + heightOffset, nextSize, depth + 1, maxDepth);
    drawSierpinskiHearts(x + size * 0.25, y + heightOffset, nextSize, depth + 1, maxDepth);
}

// 4. Fibonacci Heart Spiral
function drawFibonacciHearts() {
    const baseSize = minDim * 0.08;
    const totalElements = 60;
    
    for (let i = 0; i < totalElements; i++) {
        const theta = i * 2.39996 + time * 0.008 + currentBending * 1.8;
        const r = minDim * 0.0048 * Math.pow(i, 1.1);
        
        const x = cx + Math.cos(theta) * r;
        const y = cy + Math.sin(theta) * r;
        
        const size = baseSize * (1 - i / totalElements * 0.8) * (1.0 + Math.sin(time * 0.02 + i * 0.1) * 0.1);
        const h = (hue + i * 8) % 360;
        const color = `hsla(${h}, 100%, 70%, ${0.9 - i / totalElements * 0.7})`;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(theta + Math.PI/2);
        drawHeart(0, 0, size, color);
        ctx.restore();
    }
}

// 5. Deep Love Forest
function drawLoveForest(totalBending) {
    const treeSpacing = minDim * 0.14;
    const baseHeight = minDim * 0.13;
    
    const forestConfigs = [
        { x: cx - treeSpacing * 2.2, h: baseHeight * 0.85, angleOffset: 0.05, hue: 190, depth: 4 },
        { x: cx - treeSpacing * 1.1, h: baseHeight * 1.1, angleOffset: -0.03, hue: 280, depth: 4 },
        { x: cx,                     h: baseHeight * 1.35, angleOffset: 0.0,   hue: 345, depth: 4 },
        { x: cx + treeSpacing * 1.1, h: baseHeight * 1.1, angleOffset: 0.03,  hue: 280, depth: 4 },
        { x: cx + treeSpacing * 2.2, h: baseHeight * 0.85, angleOffset: -0.05, hue: 190, depth: 4 }
    ];
    
    forestConfigs.forEach((cfg, idx) => {
        const individualSway = Math.sin(time * 0.02 + idx * 0.8) * 0.03;
        const combinedBending = totalBending * 0.8 + individualSway;
        drawTree(cfg.x, height * 0.95, cfg.h, -Math.PI / 2 + cfg.angleOffset, 1, cfg.depth, combinedBending, cfg.hue);
    });
}

// 6. Apollonian Gasket of Hearts
function drawApollonianHearts(x, y, r, angle, depth, maxDepth) {
    if (depth > maxDepth) return;
    
    const h = (hue + depth * 35) % 360;
    
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.strokeStyle = `hsla(${h}, 80%, 50%, ${0.5 - depth * 0.12})`;
    ctx.lineWidth = 1.0;
    ctx.stroke();
    
    drawHeart(x, y, r * 0.72, `hsla(${h}, 100%, 70%, ${0.85 - depth * 0.15})`);
    
    const nextR = r * 0.464;
    const dist = r * 0.536;
    const rot = angle + currentBending * 0.5;
    
    for (let i = 0; i < 3; i++) {
        const phi = rot + i * (2 * Math.PI / 3);
        const nx = x + Math.cos(phi) * dist;
        const ny = y + Math.sin(phi) * dist;
        drawApollonianHearts(nx, ny, nextR, phi, depth + 1, maxDepth);
    }
}

// Master selector for Fractales
function drawFractal(index, totalBending) {
    if (index === 0) {
        // 1. Intertwined Trees of Love
        const treeOffset = minDim * 0.12;
        const trunkHeight = minDim * 0.20;
        drawTree(cx - treeOffset, height * 0.95, trunkHeight, -Math.PI / 2 + 0.08, 1, 5, totalBending, 290);
        drawTree(cx + treeOffset, height * 0.95, trunkHeight, -Math.PI / 2 - 0.08, 1, 5, totalBending, 345);
    } 
    else if (index === 1) {
        // 2. Cardioid Heart Cascade
        drawHeartFractal(cx, cy, minDim * 0.23, -Math.PI/2, 1, 4);
    } 
    else if (index === 2) {
        // 3. Valentine Snowflake / Sierpinski Gasket
        drawSierpinskiHearts(cx, cy, minDim * 0.44, 1, 4);
    } 
    else if (index === 3) {
        // 4. Fibonacci Heart Spiral
        drawFibonacciHearts();
    } 
    else if (index === 4) {
        // 5. Holy Forest of Love
        drawLoveForest(totalBending);
    } 
    else if (index === 5) {
        // 6. Apollonian Gasket of Hearts
        drawApollonianHearts(cx, cy, minDim * 0.44, time * 0.005, 1, 4);
    }
}


/* ==========================================================================
   Canvas Sizing and Lifecycle
   ========================================================================== */
function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    
    width = canvasSection.clientWidth;
    height = canvasSection.clientHeight;
    cx = width / 2;
    cy = height / 2;
    minDim = Math.min(width, height);
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    ctx.scale(dpr, dpr);
    
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);
    
    resetDancers();
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

/* ==========================================================================
   Interaction Handler (Mouse & Touch)
   ========================================================================== */
function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
}

function handleStart(e) {
    isDrawing = true;
    isMouseInCanvas = true;
    const pos = getMousePos(e);
    lastMouseX = pos.x;
    lastMouseY = pos.y;
    mouseX = pos.x;
    mouseY = pos.y;
    
    if (patternMode === 'fractal') {
        spawnInteractiveHearts(mouseX, mouseY);
    }
}

function handleMove(e) {
    const pos = getMousePos(e);
    mouseX = pos.x;
    mouseY = pos.y;
    isMouseInCanvas = true;
    
    if (patternMode === 'mandala') {
        if (!isDrawing) return;
        
        const pX = lastMouseX - cx;
        const pY = lastMouseY - cy;
        const cX = mouseX - cx;
        const cY = mouseY - cy;
        
        for (let s = 0; s < symmetry; s++) {
            const angle = s * (2 * Math.PI / symmetry);
            
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(angle);
            
            ctx.beginPath();
            ctx.moveTo(pX, pY);
            ctx.lineTo(cX, cY);
            ctx.strokeStyle = `hsla(${hue}, 100%, 65%, 0.15)`;
            ctx.lineWidth = 6;
            ctx.lineCap = 'round';
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(pX, pY);
            ctx.lineTo(cX, cY);
            ctx.strokeStyle = `hsla(${hue}, 100%, 90%, 0.95)`;
            ctx.lineWidth = 2.0;
            ctx.lineCap = 'round';
            ctx.stroke();
            
            ctx.restore();
        }
        
        lastMouseX = mouseX;
        lastMouseY = mouseY;
    } else {
        if (isDrawing) {
            spawnInteractiveHearts(mouseX, mouseY);
        }
    }
}

function handleEnd() {
    isDrawing = false;
}

canvas.addEventListener('mousedown', handleStart);
window.addEventListener('mousemove', handleMove);
window.addEventListener('mouseup', handleEnd);

canvas.addEventListener('mouseenter', () => {
    isMouseInCanvas = true;
});
canvas.addEventListener('mouseleave', () => {
    isMouseInCanvas = false;
    handleEnd();
});

canvas.addEventListener('touchstart', (e) => {
    handleStart(e);
    if (e.cancelable) e.preventDefault();
}, { passive: false });

window.addEventListener('touchmove', (e) => {
    handleMove(e);
    if (isDrawing && e.cancelable) e.preventDefault();
}, { passive: false });

window.addEventListener('touchend', handleEnd);


/* ==========================================================================
   Animation Loop (Main Engine)
   ========================================================================== */
function animate() {
    frameCount++;
    
    if (patternMode === 'mandala') {
        // Slow continuous fade to pitch black (fades over ~60 seconds)
        if (frameCount % 50 === 0) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, width, height);
        }
        
        if (isAuto) {
            time += 0.32;
            dancers.forEach(dancer => {
                const currentPos = dancer.update(time);
                dancer.draw(currentPos.x, currentPos.y, hue, activeDrawMode);
            });
        }
    } else {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);
        
        if (isAuto) {
            time += 0.32;
        }
        
        updateAndDrawParticles();
        
        let targetBending = 0;
        if (isMouseInCanvas) {
            targetBending = ((mouseX - cx) / width) * 0.7;
        }
        
        currentBending += (targetBending - currentBending) * 0.07;
        
        const wind = Math.sin(time * 0.015) * 0.05;
        const totalBending = currentBending + wind;
        
        drawFractal(fractalDesignIndex, totalBending);
    }
    
    hue = (hue + 0.08) % 360;
    
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);


/* ==========================================================================
   Toolbar Controls Binding
   ========================================================================== */
const toggleAutoBtn = document.getElementById('toggleAuto');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');

const modeMandalaBtn = document.getElementById('modeMandala');
const modeFractalBtn = document.getElementById('modeFractal');
const nextDesignBtn = document.getElementById('nextDesign');
const designNumberEl = document.querySelector('.btn-number');

// Auto Draw toggle setup
toggleAutoBtn.classList.add('active');
playIcon.classList.add('hidden');
pauseIcon.classList.remove('hidden');

toggleAutoBtn.addEventListener('click', () => {
    isAuto = !isAuto;
    
    if (isAuto) {
        toggleAutoBtn.classList.add('active');
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
        resetDancers();
    } else {
        toggleAutoBtn.classList.remove('active');
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
    }
});

// Switch to Mandala Mode button
modeMandalaBtn.addEventListener('click', () => {
    patternMode = 'mandala';
    modeMandalaBtn.classList.add('active');
    modeFractalBtn.classList.remove('active');
    
    // Reset visual canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);
    particles = [];
    
    // Load current Mandala preset
    loadMandalaPreset(mandalaDesignIndex);
    frameCount = 0;
});

// Switch to Fractal Mode button
modeFractalBtn.addEventListener('click', () => {
    patternMode = 'fractal';
    modeFractalBtn.classList.add('active');
    modeMandalaBtn.classList.remove('active');
    
    // Reset visual canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);
    particles = [];
    resetDancers();
    
    // Update design number text
    designNumberEl.textContent = `${fractalDesignIndex + 1}/6`;
    frameCount = 0;
});

// Cycle Designs button (nextDesign)
nextDesignBtn.addEventListener('click', () => {
    // Clean canvas for clean transition
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);
    particles = [];
    resetDancers();
    frameCount = 0;
    
    if (patternMode === 'mandala') {
        mandalaDesignIndex = (mandalaDesignIndex + 1) % 6;
        loadMandalaPreset(mandalaDesignIndex);
    } else {
        fractalDesignIndex = (fractalDesignIndex + 1) % 6;
        designNumberEl.textContent = `${fractalDesignIndex + 1}/6`;
    }
    
    // Flash button state visually
    nextDesignBtn.classList.add('active');
    setTimeout(() => {
        nextDesignBtn.classList.remove('active');
    }, 200);
});
