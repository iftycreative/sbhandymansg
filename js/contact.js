/**
 * SB Handyman SG - Contact & Quotation Enquiry Handler
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById('enquiry-form');
  const statusMsg = document.getElementById('form-status-msg');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('client-name').value.trim();
    const phone = document.getElementById('client-phone').value.trim();
    const service = document.getElementById('client-service').value;
    const message = document.getElementById('client-message').value.trim();

    if (!name || !phone) {
      alert('Please provide your name and contact phone number.');
      return;
    }

    // Build pre-filled WhatsApp message
    let whatsappText = `Hi SB Handyman SG, my name is ${name}.\nI would like to enquire about ${service || 'Handyman Services'}.`;
    if (message) {
      whatsappText += `\n\nDetails: ${message}`;
    }
    whatsappText += `\nMy Contact: ${phone}`;

    const encodedText = encodeURIComponent(whatsappText);
    const whatsappUrl = `https://wa.me/6581169455?text=${encodedText}`;

    // Display confirmation notice
    if (statusMsg) {
      statusMsg.className = 'form-status success';
      statusMsg.textContent = 'Enquiry prepared! Redirecting to WhatsApp to send your request directly to SB Handyman SG...';
      statusMsg.style.display = 'block';
    }

    // Redirect to WhatsApp after short delay
    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      form.reset();
      if (statusMsg) {
        statusMsg.textContent = 'Enquiry sent! We will assist you promptly.';
      }
    }, 800);
  });
}
