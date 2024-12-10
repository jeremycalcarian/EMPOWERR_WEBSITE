// Preloader and Logo Animation
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const logoAnimation = document.querySelector('.logo-animation');

    // Trigger exit animation after logo letters have animated in
    setTimeout(() => {
        logoAnimation.classList.add('exit');
    }, 2000);

    // Wait for the exit animation to finish before hiding the preloader
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 3000); 
});

// Typewriter Effect for Numbers
const typewriterNumbers = document.querySelectorAll('.typewriter-number');

typewriterNumbers.forEach(number => {
    const target = +number.getAttribute('data-target');
    const duration = 8000; // slower animation
    const interval = 50; // update every 50ms
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
    slides.forEach(slide => {
        slide.style.display = 'none';
    });
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1; 
    }
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = 'block';
    }
    setTimeout(showSlides, 3000);
}
document.addEventListener('DOMContentLoaded', showSlides);

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('.nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
});

