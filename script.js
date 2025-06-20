// --------------------
// Preloader & Logo Animation
// --------------------
window.addEventListener('load', () => {
    const preloader     = document.getElementById('preloader');
    const logoAnimation = document.querySelector('.logo-animation');
    const headerLogo    = document.querySelector('.logo');
  
    // 1) Robot‐type letters (CSS handles opacity)
    setTimeout(() => {
      logoAnimation.classList.add('futuristic');
    }, 2000);
  
    // 2) Fade out preloader, show header logo
    setTimeout(() => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
        headerLogo.style.opacity = '1';
      }, 500);
    }, 3500);
  });
  
  
  // --------------------
  // Typewriter Effect for Stats Numbers
  // --------------------
  const typewriterNumbers = document.querySelectorAll('.typewriter-number');
  typewriterNumbers.forEach(number => {
    const target    = +number.getAttribute('data-target');
    const duration  = 8000;
    const interval  = 50;
    let   current   = 0;
    const increment = target / (duration / interval);
  
    function updateNumber() {
      current += increment;
      if (current < target) {
        number.textContent = Math.ceil(current);
        setTimeout(updateNumber, interval);
      } else {
        number.textContent = target;
        number.classList.add('complete');
      }
    }
    updateNumber();
  });
  
  
  // --------------------
  // Gallery Slideshow
  // --------------------
  let slideIndex = 0;
  function showSlides() {
    const slides = document.querySelectorAll('.slide');
    if (!slides.length) return;
    slides.forEach(s => s.style.display = 'none');
    slideIndex = (slideIndex % slides.length) + 1;
    slides[slideIndex - 1].style.display = 'block';
    setTimeout(showSlides, 3000);
  }
  document.addEventListener('DOMContentLoaded', showSlides);
  
  
  // --------------------
  // Hamburger Menu Toggle
  // --------------------
  const hamburger = document.getElementById('hamburger');
  const nav       = document.querySelector('.nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const isActive = hamburger.classList.toggle('active');
      nav.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isActive);
    });
  }
  
  
  // --------------------
  // Leadership Awards Typewriter + Execute Button + Slider
  // --------------------
  document.addEventListener('DOMContentLoaded', () => {
    // 1) Setup the lines to type
    const awards = [
      '// Leadership Awards from:',
      'const awards = [',
      '  "United States Department of Education",',
      '  "United Nations",',
      '  "Kroger Co.",',
      '  "Maryland Governor\'s Office on Service and Volunteerism",',
      '  "Society for Industrial and Applied Mathematics",',
      '  "Herald Mail",',
      '  "United States Marine Corps",',
      '];'
    ];
    const codeBlock = document.getElementById('code-block');
    const execBtn   = document.getElementById('execute-btn');
    const container = document.querySelector('.leadership-code-section .container');
  
    // 2) Show the Execute button when typing finishes
    function onAwardsTyped() {
      document.querySelector('.execute-container').style.display = 'block';
    }
  
    // 3) Typewriter logic
    let lineIdx = 0;
    function typeLine() {
      if (lineIdx >= awards.length) {
        onAwardsTyped();
        return;
      }
      const line = awards[lineIdx++] + '\n';
      let charIdx = 0;
  
      function typeChar() {
        if (charIdx < line.length) {
          codeBlock.textContent += line[charIdx++];
          setTimeout(typeChar, 40);
        } else {
          setTimeout(typeLine, 200);
        }
      }
      typeChar();
    }
    setTimeout(typeLine, 300);
  
    // 4) Execute button handler → hide code, insert summary & slider
    execBtn.addEventListener('click', () => {
      // Hide code window & button
      document.querySelector('.leadership-code-section .code-window').style.display = 'none';
      document.querySelector('.execute-container').style.display = 'none';
  
      // Insert grey summary text
      const summary = document.createElement('p');
      summary.className = 'awards-summary';
      summary.textContent =
        "EMPOWERR's leadership has been recognized and awarded by these organizations over the past 5 years:";
      container.appendChild(summary);
  
      // Build marquee slider
      const awardsList = [
        'United States Department of Education',
        'United Nations',
        'Kroger Co.',
        "Maryland Governor's Office on Service and Volunteerism",
        'Society for Industrial and Applied Mathematics',
        'Herald Mail',
        'United States Marine Corps'
      ];
      const all = awardsList.concat(awardsList);  // duplicate for a smooth loop
      const slider = document.createElement('div');
      slider.className = 'award-slider active';
      slider.innerHTML = all.map(a => `<span>${a}</span>`).join('');
  
      // Wrap it so we can mask/fade the edges
      const wrap = document.createElement('div');
      wrap.className = 'slider-wrap';
      wrap.appendChild(slider);
  
      container.appendChild(wrap);
    });
  });
  document.addEventListener('DOMContentLoaded', () => {
    const navLogo = document.querySelector('.nav .logo');
    if (navLogo) {
      navLogo.style.cursor = 'pointer';
      navLogo.addEventListener('click', () => {
        navLogo.classList.add('clicked');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 200); // 200ms for the color effect
      });
    }
  });

  // -------------------- 
  // Projects Glass Tilt Effect
  // --------------------
  document.addEventListener('DOMContentLoaded', () => {
    const cards   = document.querySelectorAll('.glass-card');
    const maxTilt = 10;    // lower tilt angle for gentler movement
  
    cards.forEach(card => {
      let ticking = false;
      let targetX = 0, targetY = 0;
  
      card.addEventListener('mousemove', e => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left)/width  - 0.5;  // -0.5→+0.5
        const y = (e.clientY - top )/height - 0.5;
  
        targetY =  x * maxTilt;   // horizontal → Y-axis rotation
        targetX = -y * maxTilt;   // vertical   → X-axis rotation
  
        if (!ticking) {
          window.requestAnimationFrame(() => {
            card.style.transform = `scale(1.03) rotateX(${targetX}deg) rotateY(${targetY}deg)`;
            ticking = false;
          });
          ticking = true;
        }
      });
  
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';  // resets to flat
      });
    });
  });
  const bg = document.querySelector('.projects-bg-particles');
const colors = ['#00ff8899','#00ff8844','#00ff8822','#00ff8855'];
for (let i = 0; i < 12; i++) {
  const size = 40 + Math.random()*100;
  const circle = document.createElementNS('http://www.w3.org/2000/svg','svg');
  circle.setAttribute('class','particle');
  circle.setAttribute('data-i', i);
  circle.setAttribute('width', size);
  circle.setAttribute('height', size);
  const c = document.createElementNS(circle.namespaceURI,'circle');
  c.setAttribute('cx', size/2);
  c.setAttribute('cy', size/2);
  c.setAttribute('r', size/2 * 0.8);
  c.setAttribute('fill', colors[i % colors.length]);
  circle.appendChild(c);
  // random position
  circle.style.top  = `${Math.random()*90}vh`;
  circle.style.left = `${Math.random()*90}vw`;
  bg.appendChild(circle);
}

  
  