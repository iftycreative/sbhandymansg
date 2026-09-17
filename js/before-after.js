/**
 * SB Handyman SG - Interactive Before & After Slider
 */

document.addEventListener('DOMContentLoaded', () => {
  initBeforeAfterSlider();
  initBeforeAfterTabs();
});

// Data for various before & after demonstration scenarios
const beforeAfterData = {
  plumbing: {
    title: 'Leaking Pipe & Valve Replacement',
    beforeImg: 'assets/images/ba-plumbing-after.jpg',
    afterImg: 'assets/images/ba-plumbing-before.jpg',
    beforeAlt: 'Corroded leaking water pipe before repair',
    afterAlt: 'Clean professional stainless steel plumbing installation after repair'
  },
  painting: {
    title: 'Wall Moisture Stain Repair & Repainting',
    beforeImg: 'assets/images/ba-painting-after.jpg',
    afterImg: 'assets/images/ba-painting-before.jpg',
    beforeAlt: 'Peeling paint and wall stains before repair',
    afterAlt: 'Fresh smooth immaculate painted interior wall'
  },
  cabinet: {
    title: 'Kitchen Cabinet & Soft-Close Hinge Realignment',
    beforeImg: 'assets/images/ba-cabinet-after.jpg',
    afterImg: 'assets/images/ba-cabinet-before.jpg',
    beforeAlt: 'Sagging broken cabinet door with loose hinge',
    afterAlt: 'Perfect aligned soft-close cabinet door hardware'
  },
  waterproofing: {
    title: 'Bathroom Sealant & Waterproof Barrier Restoration',
    beforeImg: 'assets/images/ba-waterproofing-after.jpg',
    afterImg: 'assets/images/ba-waterproofing-before.jpg',
    beforeAlt: 'Deteriorated silicone sealant with mould seepage',
    afterAlt: 'Waterproof antimicrobial silicone perimeter barrier'
  },
  general: {
    title: 'Door Latch & Hardware Replacement',
    beforeImg: 'assets/images/ba-general-after.jpg',
    afterImg: 'assets/images/ba-general-before.jpg',
    beforeAlt: 'Jamming worn door handle mechanism',
    afterAlt: 'Smooth modern stainless lockset and latch'
  }
};

function initBeforeAfterSlider() {
  const container = document.querySelector('.ba-slider-card');
  const beforeWrap = document.querySelector('.ba-before-container');
  const handle = document.querySelector('.ba-handle');

  if (!container || !beforeWrap || !handle) return;

  let isDragging = false;

  const setSliderPosition = (xPos) => {
    const rect = container.getBoundingClientRect();
    let offsetX = xPos - rect.left;
    
    // Clamp offset within container bounds
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    const percentage = (offsetX / rect.width) * 100;
    beforeWrap.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  };

  // Mouse Events
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    setSliderPosition(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch Events
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches.length > 0) {
      setSliderPosition(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      setSliderPosition(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });
}

function initBeforeAfterTabs() {
  const tabs = document.querySelectorAll('.ba-tab-btn');
  const beforeImg = document.querySelector('.ba-before-container img');
  const afterImg = document.querySelector('.ba-after-container img');
  const beforeWrap = document.querySelector('.ba-before-container');
  const handle = document.querySelector('.ba-handle');

  if (!tabs.length || !beforeImg || !afterImg) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const key = tab.dataset.service;
      const data = beforeAfterData[key];

      if (data) {
        beforeImg.src = data.beforeImg;
        beforeImg.alt = data.beforeAlt;
        afterImg.src = data.afterImg;
        afterImg.alt = data.afterAlt;

        // Reset to 50% slider split
        if (beforeWrap && handle) {
          beforeWrap.style.width = '50%';
          handle.style.left = '50%';
        }
      }
    });
  });
}
