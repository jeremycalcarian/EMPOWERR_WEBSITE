// Preloader and Logo Animation
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const logoAnimation = document.querySelector('.logo-animation');
    const headerLogo = document.querySelector('.logo');

    // 1. Letters appear robotically (CSS handled)
    // Wait 2s for letters to finish appearing
    setTimeout(() => {
        // 2. Trigger futuristic break-apart animation
        logoAnimation.classList.add('futuristic');
    }, 2000);

    // After break-apart (1s), fade out preloader and show page
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            // Reveal the header logo
            headerLogo.style.opacity = '1';
        }, 500);
    }, 3500); // 2s + 1s break-apart + 0.5s fade

});

// Typewriter Effect for Numbers
const typewriterNumbers = document.querySelectorAll('.typewriter-number');
typewriterNumbers.forEach(number => {
    const target = +number.getAttribute('data-target');
    const duration = 8000;
    const interval = 50;
    let current = 0;
    const increment = target / (duration / interval);

    const updateNumber = () => {
        current += increment;
        if (current < target) {
            number.textContent = Math.ceil(current);
            setTimeout(updateNumber, interval);
        } else {
            number.textContent = target;
            number.classList.add('complete');
        }
    };
    updateNumber();
});

// Slideshow for Gallery Page
let slideIndex = 0;
function showSlides() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        slides.forEach(slide => {
            slide.style.display = 'none';
        });
        slideIndex++;
        if (slideIndex > slides.length) { 
            slideIndex = 1; 
        }
        slides[slideIndex - 1].style.display = 'block';
        setTimeout(showSlides, 3000);
    }
}
document.addEventListener('DOMContentLoaded', showSlides);

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('.nav');
if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
        const isActive = hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive);
    });
}
