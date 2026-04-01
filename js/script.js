// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      
      // Update icon
      const icon = menuToggle.querySelector('svg');
      if (mobileMenu.classList.contains('active')) {
        // Show X icon
        menuToggle.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
      } else {
        // Show Menu icon
        menuToggle.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
      }
    });

    // Close menu when clicking on a link
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        menuToggle.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
      });
    });
  }

  // Contact Form Handling
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.querySelector('input[name="name"]').value;
      const email = document.querySelector('input[name="email"]').value;
      const phone = document.querySelector('input[name="phone"]').value;
      const subject = document.querySelector('select[name="subject"]').value;
      const message = document.querySelector('textarea[name="message"]').value;

      // Validation
      if (!name || !email || !message) {
        alert('Bitte füllen Sie alle erforderlichen Felder aus');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Bitte geben Sie eine gültige E-Mail-Adresse ein');
        return;
      }

      // Create mailto link
      const mailtoLink = `mailto:fahrlehrer@olli-schult.de?subject=${encodeURIComponent(subject || 'Kontaktanfrage')}&body=${encodeURIComponent(
        `Name: ${name}\nE-Mail: ${email}\nTelefon: ${phone}\n\nNachricht:\n${message}`
      )}`;

      window.location.href = mailtoLink;

      // Reset form
      contactForm.reset();
      alert('Danke für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.');
    });
  }

  // Expandable License Cards
  const licenseCards = document.querySelectorAll('.license-card');
  licenseCards.forEach(card => {
    const header = card.querySelector('.license-card-header');
    const content = card.querySelector('.license-card-content');
    
    if (header && content) {
      header.addEventListener('click', function() {
        card.classList.toggle('expanded');
        
        // Update button text
        const button = card.querySelector('.expand-button');
        if (button) {
          if (card.classList.contains('expanded')) {
            button.textContent = 'Weniger anzeigen';
          } else {
            button.textContent = 'Mehr erfahren';
          }
        }
      });
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});

// Utility function to show notifications
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}
