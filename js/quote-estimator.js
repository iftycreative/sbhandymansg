/**
 * SB Handyman SG - Interactive Quick Quote Estimator
 */

document.addEventListener('DOMContentLoaded', () => {
  initQuoteEstimator();
});

const serviceData = {
  plumbing: {
    name: 'Plumbing Repair',
    basePriceMin: 60,
    basePriceMax: 120,
    issues: [
      { id: 'leak-pipe', name: 'Pipe Leak / Burst Pipe', min: 80, max: 150 },
      { id: 'tap-repair', name: 'Tap / Faucet Replacement', min: 60, max: 110 },
      { id: 'toilet-choke', name: 'Toilet / Drain Choke Clearing', min: 80, max: 140 },
      { id: 'flush-system', name: 'Toilet Flush System Repair', min: 70, max: 130 },
      { id: 'shower-mixer', name: 'Shower Set / Mixer Fitting', min: 75, max: 130 },
      { id: 'other-plumbing', name: 'Other Plumbing Issue', min: 60, max: 120 }
    ]
  },
  electrical: {
    name: 'Electrical Repair',
    basePriceMin: 70,
    basePriceMax: 130,
    issues: [
      { id: 'power-trip', name: 'Circuit Breaker / Power Trip Fix', min: 80, max: 160 },
      { id: 'switch-socket', name: 'Light Switch / Socket Replacement', min: 60, max: 100 },
      { id: 'light-fixture', name: 'Light Fixture / Ceiling Light Install', min: 60, max: 120 },
      { id: 'ceiling-fan', name: 'Ceiling Fan Installation / Repair', min: 80, max: 150 },
      { id: 'heater-switch', name: 'Water Heater Switch Replacement', min: 70, max: 120 },
      { id: 'other-electrical', name: 'Other Electrical Repair', min: 70, max: 140 }
    ]
  },
  painting: {
    name: 'Wall Painting',
    basePriceMin: 120,
    basePriceMax: 350,
    issues: [
      { id: 'wall-patch', name: 'Moisture Stain / Patching & Touch-Up', min: 100, max: 200 },
      { id: 'single-room', name: 'Single Room / Bedroom Painting', min: 180, max: 350 },
      { id: 'living-hall', name: 'Living Room Painting', min: 250, max: 500 },
      { id: 'whole-house', name: 'Full HDB / Condo Unit Repaint', min: 600, max: 1500 },
      { id: 'ceiling-paint', name: 'Ceiling Mould / Waterproof Painting', min: 120, max: 250 }
    ]
  },
  waterproofing: {
    name: 'Waterproofing',
    basePriceMin: 90,
    basePriceMax: 220,
    issues: [
      { id: 'silicone-seal', name: 'Bathroom Silicone Joint Resealing', min: 80, max: 160 },
      { id: 'shower-screen', name: 'Shower Screen / Tub Sealant', min: 90, max: 170 },
      { id: 'kitchen-sink', name: 'Kitchen Sink Perimeter Waterproofing', min: 70, max: 130 },
      { id: 'window-leak', name: 'Window Frame Leakage Sealant', min: 120, max: 260 },
      { id: 'balcony-leak', name: 'Balcony / Floor Waterproofing', min: 150, max: 350 }
    ]
  },
  installation: {
    name: 'Fixture Installation',
    basePriceMin: 60,
    basePriceMax: 140,
    issues: [
      { id: 'tv-mount', name: 'TV Wall Mount Installation', min: 70, max: 130 },
      { id: 'curtain-rod', name: 'Curtain Rod / Blinds Mounting', min: 60, max: 110 },
      { id: 'mirror-shelves', name: 'Heavy Mirror / Floating Shelf Mounting', min: 60, max: 120 },
      { id: 'grab-bars', name: 'Elderly Safety Grab Bar Installation', min: 60, max: 110 },
      { id: 'drilling-hang', name: 'Art Frame & Heavy Wall Drilling', min: 50, max: 100 }
    ]
  },
  aircon: {
    name: 'Aircon Services',
    basePriceMin: 50,
    basePriceMax: 180,
    issues: [
      { id: 'general-servicing', name: 'Standard Aircon Servicing (1-3 Units)', min: 50, max: 120 },
      { id: 'chemical-wash', name: 'Chemical Wash / Deep Clean', min: 90, max: 180 },
      { id: 'aircon-leak', name: 'Water Leaking / Drainpipe Clearing', min: 70, max: 130 },
      { id: 'gas-topup', name: 'Refrigerant Gas Top-Up', min: 80, max: 150 }
    ]
  }
};

function initQuoteEstimator() {
  const serviceChips = document.querySelectorAll('.estimator-service-chip');
  const issueSelect = document.getElementById('estimator-issue');
  const urgencySelect = document.getElementById('estimator-urgency');
  const propertySelect = document.getElementById('estimator-property');
  const priceDisplay = document.getElementById('estimator-price-val');
  const whatsappCta = document.getElementById('estimator-whatsapp-btn');

  if (!serviceChips.length || !issueSelect || !priceDisplay || !whatsappCta) return;

  let currentServiceKey = 'plumbing';

  // Populate issue options based on selected service
  const populateIssues = (serviceKey) => {
    const service = serviceData[serviceKey];
    if (!service) return;

    issueSelect.innerHTML = '';
    service.issues.forEach(issue => {
      const option = document.createElement('option');
      option.value = issue.id;
      option.textContent = issue.name;
      issueSelect.appendChild(option);
    });

    updateEstimate();
  };

  // Calculate price estimate and update WhatsApp link
  const updateEstimate = () => {
    const service = serviceData[currentServiceKey];
    if (!service) return;

    const selectedIssueId = issueSelect.value;
    const currentIssue = service.issues.find(i => i.id === selectedIssueId) || service.issues[0];

    let minPrice = currentIssue ? currentIssue.min : service.basePriceMin;
    let maxPrice = currentIssue ? currentIssue.max : service.basePriceMax;

    // Urgency multiplier
    const urgency = urgencySelect ? urgencySelect.value : 'standard';
    let urgencyText = 'Standard Service';
    if (urgency === 'urgent') {
      minPrice += 20;
      maxPrice += 35;
      urgencyText = 'Urgent / Same-Day (Within 2 Hours)';
    } else if (urgency === 'emergency') {
      minPrice += 40;
      maxPrice += 60;
      urgencyText = 'Emergency 24/7 Night / Weekend Dispatch';
    }

    // Property Type
    const propertyType = propertySelect ? propertySelect.value : 'HDB';

    // Update Price Display
    priceDisplay.innerHTML = `<span>$${minPrice} - $${maxPrice}</span> <small style="font-size: 0.9rem; color: #94A3B8; font-weight: 500;">SGD approx</small>`;

    // Format WhatsApp prefilled message
    const message = `Hi SB Handyman SG, I used the Quick Quote Estimator on your website:
• Service: ${service.name}
• Specific Issue: ${currentIssue ? currentIssue.name : 'General'}
• Property Type: ${propertyType}
• Urgency: ${urgencyText}
• Estimated Range: $${minPrice} - $${maxPrice} SGD

Could you please confirm slot availability and final quotation? Thank you!`;

    const encodedMsg = encodeURIComponent(message);
    whatsappCta.href = `https://wa.me/6581169455?text=${encodedMsg}`;
  };

  // Service chip click handlers
  serviceChips.forEach(chip => {
    chip.addEventListener('click', () => {
      serviceChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentServiceKey = chip.dataset.service;
      populateIssues(currentServiceKey);
    });
  });

  // Change listeners
  if (issueSelect) issueSelect.addEventListener('change', updateEstimate);
  if (urgencySelect) urgencySelect.addEventListener('change', updateEstimate);
  if (propertySelect) propertySelect.addEventListener('change', updateEstimate);

  // Initial population
  populateIssues('plumbing');
}
