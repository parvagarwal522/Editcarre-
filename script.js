/**
 * EditCarre - Premium Marketplace Interactive Features
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarEffect();
  initScrollReveal();
  initSearchTags();
  initSmoothScroll();
  initInteractiveElements();
  initAnimatedPlaceholder();
  initQuickView();
});

/**
 * Quick View Modal Logic
 */
function initQuickView() {
  const modal = document.getElementById('quickViewModal');
  const btns = document.querySelectorAll('.quick-view-btn');
  const closeBtn = document.querySelector('.close-modal');

  if (!modal || !btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const card = btn.closest('.service-card');
      const title = card.querySelector('.service-title').textContent;
      const img = card.querySelector('.service-thumbnail img').src;
      const avatar = card.querySelector('.seller-avatar').src;
      const name = card.querySelector('.seller-name').textContent;
      const price = card.querySelector('.price-amount').textContent;

      document.getElementById('modalTitle').textContent = title;
      document.getElementById('modalImg').src = img;
      document.getElementById('modalAvatar').src = avatar;
      document.getElementById('modalSellerName').textContent = name;
      document.getElementById('modalPrice').textContent = price;

      modal.style.display = 'block';
    });
  });

  if (closeBtn) {
    closeBtn.onclick = () => modal.style.display = 'none';
  }

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}

/**
 * Animated Search Placeholder Effect
 */
function initAnimatedPlaceholder() {
  const input = document.getElementById('heroSearchInput');
  if (!input) return;

  const suggestions = [
    'professional video editing...',
    'stunning photo retouching...',
    'modern logo design...',
    'viral youtube thumbnails...',
    'creative reels editing...',
    'custom AI art creation...'
  ];

  let suggestionIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const current = suggestions[suggestionIndex];

    if (isDeleting) {
      input.placeholder = 'Try "' + current.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      input.placeholder = 'Try "' + current.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === current.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      suggestionIndex = (suggestionIndex + 1) % suggestions.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/**
 * Navbar scroll behavior
 */
function initNavbarEffect() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check
}

/**
 * Reveal elements as they enter viewport
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-reveal]');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Handle popular search tags
 */
function initSearchTags() {
  const tags = document.querySelectorAll('.tag');
  const searchInput = document.querySelector('.search-bar input');

  tags.forEach(tag => {
    tag.addEventListener('click', (e) => {
      e.preventDefault();
      const value = tag.textContent;
      if (searchInput) {
        searchInput.value = value;
        searchInput.focus();
        // Trigger any search logic here if needed
      }
    });
  });
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 85;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Miscellaneous interactive polish
 */
function initInteractiveElements() {
  // Simple notification system for demo purposes
  const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <div class="toast-content">
        <i class="fas fa-info-circle"></i>
        <span>${message}</span>
      </div>
    `;

    // Quick inline styling for the toast
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '30px',
      left: '50%',
      transform: 'translateX(-50%) translateY(100px)',
      background: '#1a1a1a',
      color: '#fff',
      padding: '12px 24px',
      borderRadius: '50px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      zIndex: '10000',
      transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      display: 'flex',
      alignItems: 'center',
      fontSize: '0.9rem',
      fontWeight: '600'
    });

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => toast.style.transform = 'translateX(-50%) translateY(0)', 100);

    // Auto remove
    setTimeout(() => {
      toast.style.transform = 'translateX(-50%) translateY(100px)';
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  };

  // Attach to project buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.getAttribute('href') === '#') {
        e.preventDefault();
        showToast('This feature is coming soon!');
      }
    });
  });

  // Log EC Monogram for dev fun
  console.log('%cEC %cEditCarre Redesign v2.0', 'color: #00ff99; font-weight: 800; font-size: 20px;', 'color: #111; font-weight: 600; font-size: 16px;');
}

