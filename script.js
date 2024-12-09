// Preloader and Logo Animation
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const logoAnimation = document.querySelector('.logo-animation');

    // Trigger exit animation after logo letters have animated in
    setTimeout(() => {
        logoAnimation.classList.add('exit');
    }, 2000); // Wait for logo letters to finish animating in (1s animation + delays)

    // Wait for the exit animation to finish before hiding the preloader
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 3000); // Total duration: 2s + 1s exit animation
});

// Typewriter Effect for Numbers
const typewriterNumbers = document.querySelectorAll('.typewriter-number');

typewriterNumbers.forEach(number => {
    const target = +number.getAttribute('data-target');
    const duration = 8000; // 4 seconds for slower animation
    const interval = 50; // Update every 50ms
    let current = 0;
    const increment = target / (duration / interval);

    const updateNumber = () => {
        current += increment;
        if (current < target) {
            number.textContent = Math.ceil(current);
            setTimeout(updateNumber, interval);
        } else {
            number.textContent = target;
            // After reaching target, remove the caret and center the number
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
    slides[slideIndex - 1].style.display = 'block';
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}
document.addEventListener('DOMContentLoaded', showSlides);
