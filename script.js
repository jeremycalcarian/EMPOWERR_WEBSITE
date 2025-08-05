/* --------------------------------------------------
   1.  PRELOADER  &  LOGO  ANIMATION
--------------------------------------------------*/
window.addEventListener('load', () => {
    const preloader     = document.getElementById('preloader');
    const logoAnimation = document.querySelector('.logo-animation');
    const headerLogo    = document.querySelector('.logo');
  
    // A) futuristic letter flash
    setTimeout(() => logoAnimation?.classList.add('futuristic'), 2000);
  
    // B) fade out preloader, reveal header logo
    setTimeout(() => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
        headerLogo.style.opacity = '1';
      }, 500);
    }, 3500);
  });
  
  /* --------------------------------------------------
     2.  DOM-DEPENDENT FEATURES
  --------------------------------------------------*/
  document.addEventListener('DOMContentLoaded', () => {
  
    /* ---------- 2-A  Stats Number Typewriter ---------- */
    document.querySelectorAll('.typewriter-number').forEach(num => {
      const target    = +num.dataset.target;
      const duration  = 8000;
      const interval  = 50;
      const increment = target / (duration / interval);
      let current     = 0;
  
      (function update() {
        current += increment;
        if (current < target) {
          num.textContent = Math.ceil(current);
          setTimeout(update, interval);
        } else {
          num.textContent = target;
          num.classList.add('complete');
        }
      })();
    });
  
    /* ---------- 2-B  Gallery Slideshow ---------- */
    (function showSlides(){
      const slides = document.querySelectorAll('.slide');
      if (!slides.length) return;
      slides.forEach(s => s.style.display = 'none');
      showSlides.idx = (showSlides.idx ?? 0) % slides.length;
      slides[showSlides.idx].style.display = 'block';
      showSlides.idx++;
      setTimeout(showSlides, 3000);
    })();
  
    /* ---------- 2-C  Hamburger Menu Toggle ---------- */
    const hamburger = document.getElementById('hamburger');
    const nav       = document.querySelector('.nav');
    if (hamburger && nav) {
      hamburger.addEventListener('click', () => {
        const isActive = hamburger.classList.toggle('active'); // bar → X
        nav.classList.toggle('active');                        // show menu
        hamburger.setAttribute('aria-expanded', isActive);
      });
    }
  

    /* ---------- 2-E  Nav Logo Click (back to home) ---------- */
    const navLogo = document.querySelector('.nav .logo');
    navLogo?.addEventListener('click', () => {
      navLogo.classList.add('clicked');
      setTimeout(()=>window.location.href='index.html', 200);
    });
  
    /* ---------- 2-F  Projects Card Tilt ---------- */
    const cards   = document.querySelectorAll('.glass-card');
    const maxTilt = 10;
    cards.forEach(card => {
      let ticking = false, rotX=0, rotY=0;
      card.addEventListener('mousemove', e => {
        const {left,top,width,height} = card.getBoundingClientRect();
        const dx = (e.clientX-left)/width  - 0.5;
        const dy = (e.clientY-top )/height - 0.5;
        rotY =  dx * maxTilt;
        rotX = -dy * maxTilt;
        if (!ticking){
          requestAnimationFrame(()=>{
            card.style.transform = `scale(1.03) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
            ticking = false;
          });
          ticking = true;
        }
      });
      card.addEventListener('mouseleave', ()=>card.style.transform='');
    });
  
    /* ---------- 2-G  Floating Background Particles ---------- */
    (function generateParticles(){
      const bg = document.querySelector('.projects-bg-particles');
      if (!bg) return;
      const colors = ['#00ff8899','#00ff8844','#00ff8822','#00ff8855'];
      for (let i=0;i<12;i++){
        const size = 40 + Math.random()*100;
        const svg  = document.createElementNS('http://www.w3.org/2000/svg','svg');
        svg.classList.add('particle');
        svg.style.top  = `${Math.random()*90}vh`;
        svg.style.left = `${Math.random()*90}vw`;
        svg.setAttribute('width', size);
        svg.setAttribute('height', size);
        svg.setAttribute('data-i', i);
        const circ = document.createElementNS(svg.namespaceURI,'circle');
        circ.setAttribute('cx', size/2);
        circ.setAttribute('cy', size/2);
        circ.setAttribute('r' , size/2 * 0.8);
        circ.setAttribute('fill', colors[i%colors.length]);
        svg.appendChild(circ);
        bg.appendChild(svg);
      }
    })();
  
  }); // end DOMContentLoaded
  window.addEventListener('load', () => {
    const track = document.getElementById('gallery-scroll');
    if (!track) return;
  
    const SPEED      = 1.5;   // px per frame (~30 px/sec)
    const PAUSE_MS   = 3000;  // resume delay after user interaction
    const END_PAUSE  = 3000;  // pause at the end
    let paused       = false;
    let pauseTimer   = null;
    let atEndPause   = false;
  
    function autoMove() {
      if (!paused) {
        track.scrollLeft += SPEED;
  
        // reached end
        if (track.scrollLeft >= track.scrollWidth - track.clientWidth && !atEndPause) {
          paused = true;
          atEndPause = true;
          clearTimeout(pauseTimer);
  
          pauseTimer = setTimeout(() => {
            track.scrollLeft = 0; // jump back after end pause
            paused = false;
            atEndPause = false;
          }, END_PAUSE);
        }
      }
      requestAnimationFrame(autoMove);
    }
    autoMove();
  
    /* -------- pause helpers -------- */
    const pause = () => {
      paused = true;
      clearTimeout(pauseTimer);
      pauseTimer = setTimeout(() => (paused = false), PAUSE_MS);
    };
  
    /* -------- drag / touch -------- */
    let dragging = false, startX = 0, startLeft = 0;
  
    const startDrag = x => {
      pause();
      dragging = true;
      startX = x;
      startLeft = track.scrollLeft;
    };
    const doDrag = x => {
      if (!dragging) return;
      track.scrollLeft = startLeft - (x - startX);
    };
    const endDrag = () => (dragging = false);
  
    track.addEventListener('mousedown', e => startDrag(e.clientX));
    window.addEventListener('mousemove', e => doDrag(e.clientX));
    window.addEventListener('mouseup',   endDrag);
  
    track.addEventListener('touchstart', e => startDrag(e.touches[0].clientX), {passive:true});
    track.addEventListener('touchmove',  e => { doDrag(e.touches[0].clientX); e.preventDefault(); }, {passive:false});
    track.addEventListener('touchend',   endDrag);
  
    /* simple click/tap also pauses */
    track.addEventListener('click', pause);
  });
  
