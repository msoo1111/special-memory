// ============================================
// CHIKU BIRTHDAY WEBSITE - JAVASCRIPT
// Interactive elements and animations
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeIntro();
    initializeScrollAnimations();
    initializeMusic();
    initializeSecretSurprise();
    initializeWishCandle();
});

// ============================================
// INTRO SECTION
// ============================================
function initializeIntro() {
    const openButton = document.getElementById('openSurprise');
    const introSection = document.getElementById('intro');
    const mainContent = document.getElementById('mainContent');
    
    if (openButton) {
        openButton.addEventListener('click', function() {
            // Add clicked animation
            openButton.classList.add('clicked');
            
            // Create confetti burst
            createConfetti(50);
            
            // Increase floating hearts temporarily
            increaseFloatingHearts();
            
            // After a short delay, hide intro and show main content
            setTimeout(() => {
                introSection.classList.add('hidden');
                mainContent.classList.add('visible');
                
                // Smooth scroll to hero section
                setTimeout(() => {
                    document.getElementById('hero').scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                }, 300);
            }, 800);
        });
    }
}

function createConfetti(count) {
    const colors = ['#fce4ec', '#e1bee7', '#ffd700', '#f8bbd9', '#ce93d8', '#ffcc80'];
    const shapes = ['circle', 'square', 'triangle'];
    
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random properties
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const left = Math.random() * 100;
        const size = Math.random() * 10 + 5;
        const duration = Math.random() * 2 + 2;
        const delay = Math.random() * 0.5;
        
        confetti.style.left = left + '%';
        confetti.style.backgroundColor = color;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        confetti.style.animationDuration = duration + 's';
        confetti.style.animationDelay = delay + 's';
        
        // Shape styling
        if (shape === 'circle') {
            confetti.style.borderRadius = '50%';
        } else if (shape === 'triangle') {
            confetti.style.width = '0';
            confetti.style.height = '0';
            confetti.style.backgroundColor = 'transparent';
            confetti.style.borderLeft = size + 'px solid transparent';
            confetti.style.borderRight = size + 'px solid transparent';
            confetti.style.borderBottom = size * 1.5 + 'px solid ' + color;
        }
        
        document.body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, (duration + delay) * 1000);
    }
}

function increaseFloatingHearts() {
    const introSection = document.getElementById('intro');
    const floatingElements = introSection.querySelector('.floating-elements');
    
    // Add extra hearts temporarily
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = '💗';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        floatingElements.appendChild(heart);
        
        // Remove after 3 seconds
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initializeScrollAnimations() {
    const traitCards = document.querySelectorAll('.trait-card');
    const chapterCards = document.querySelectorAll('.chapter-card');
    
    // Intersection Observer for trait cards
    const traitObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
                traitObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    traitCards.forEach(card => {
        traitObserver.observe(card);
    });
    
    // Intersection Observer for chapter cards
    const chapterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = entry.target.style.transform.replace('scale(0.8)', '').replace('translateY(30px)', '');
                chapterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    chapterCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = card.style.transform + ' scale(0.8) translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        card.style.transitionDelay = (index * 0.1) + 's';
        chapterObserver.observe(card);
    });
}

// ============================================
// MUSIC PLAYER
// ============================================
function initializeMusic() {
    const playButton = document.getElementById('playMusic');
    const audio = document.getElementById('birthdayAudio');
    const musicIcon = playButton.querySelector('.music-icon');
    const musicText = playButton.querySelector('.music-text');
    
    if (playButton && audio) {
        playButton.addEventListener('click', function() {
            if (audio.paused) {
                audio.play()
                    .then(() => {
                        musicIcon.textContent = '⏸️';
                        musicText.textContent = 'Pause';
                        playButton.classList.add('playing');
                    })
                    .catch(error => {
                        console.log('Audio play failed:', error);
                        // Show a friendly message if audio fails
                        musicText.textContent = 'Add birthday-song.mp3';
                    });
            } else {
                audio.pause();
                musicIcon.textContent = '▶️';
                musicText.textContent = 'Play Birthday Song';
                playButton.classList.remove('playing');
            }
        });
        
        // Reset button when audio ends
        audio.addEventListener('ended', function() {
            musicIcon.textContent = '▶️';
            musicText.textContent = 'Play Birthday Song';
            playButton.classList.remove('playing');
        });
    }
}

// ============================================
// SECRET SURPRISE
// ============================================
function initializeSecretSurprise() {
    const openButton = document.getElementById('openSecret');
    const secretContent = document.getElementById('secretContent');
    
    if (openButton && secretContent) {
        openButton.addEventListener('click', function() {
            // Create confetti
            createConfetti(30);
            
            // Hide button
            openButton.style.display = 'none';
            
            // Show secret content
            secretContent.classList.remove('hidden');
            
            // Scroll to secret content
            secretContent.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        });
    }
}

// ============================================
// WISH CANDLE
// ============================================
function initializeWishCandle() {
    const blowButton = document.getElementById('blowCandle');
    const flame = document.getElementById('flame');
    const wishMessage = document.getElementById('wishMessage');
    
    if (blowButton && flame && wishMessage) {
        blowButton.addEventListener('click', function() {
            // Blow out the flame
            flame.classList.add('blown');
            
            // Disable button
            blowButton.disabled = true;
            blowButton.textContent = '✨ Wish Sent! ✨';
            
            // Show wish message after flame animation
            setTimeout(() => {
                wishMessage.classList.remove('hidden');
                
                // Create subtle confetti
                createConfetti(20);
            }, 600);
        });
    }
}

// ============================================
// SMOOTH SCROLL FOR NAVIGATION
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ============================================
// KEYBOARD ACCESSIBILITY
// ============================================
document.addEventListener('keydown', function(e) {
    // Allow Escape to close any overlays (if added in future)
    if (e.key === 'Escape') {
        // Future: close modals, overlays, etc.
    }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Reduce animations for low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.documentElement.style.setProperty('--animation-duration', '0.5s');
}

// ============================================
// ERROR HANDLING
// ============================================
window.addEventListener('error', function(e) {
    console.log('An error occurred:', e.message);
});

// Image error handling is handled in HTML with onerror attributes
