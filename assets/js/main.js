document.addEventListener('DOMContentLoaded', () => {
    
  // 1. Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggle) {
      themeToggle.addEventListener('click', () => {
          const currentTheme = document.documentElement.getAttribute('data-theme');
          const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-theme', newTheme);
          localStorage.setItem('theme', newTheme);
      });
  }

  // 2. RTL Toggle
  const rtlToggle = document.getElementById('rtl-toggle');
  const savedDir = localStorage.getItem('dir');
  if (savedDir === 'rtl') {
      document.documentElement.setAttribute('dir', 'rtl');
  }

  if (rtlToggle) {
      rtlToggle.addEventListener('click', () => {
          const currentDir = document.documentElement.getAttribute('dir');
          const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
          document.documentElement.setAttribute('dir', newDir);
          localStorage.setItem('dir', newDir);
      });
  }

  // 3. Navbar Sticky Effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
      window.addEventListener('scroll', () => {
          if (window.scrollY > 50) {
              navbar.classList.add('scrolled');
          } else {
              navbar.classList.remove('scrolled');
          }
      });
  }

  // 4. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
          navMenu.classList.toggle('show');
      });
  }

  // 5. Ripple Effect for Buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
      btn.addEventListener('click', function (e) {
          let x = e.clientX - e.target.getBoundingClientRect().left;
          let y = e.clientY - e.target.getBoundingClientRect().top;
          
          let ripples = document.createElement('span');
          ripples.style.left = x + 'px';
          ripples.style.top = y + 'px';
          ripples.classList.add('ripple');
          
          this.appendChild(ripples);
          
          setTimeout(() => {
              ripples.remove();
          }, 600);
      });
  });

  // 6. Scroll Reveal Animations
  const reveals = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
      let windowHeight = window.innerHeight;
      let elementVisible = 100;
      
      reveals.forEach(reveal => {
          let elementTop = reveal.getBoundingClientRect().top;
          if (elementTop < windowHeight - elementVisible) {
              reveal.classList.add('active');
          }
      });
  }
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger on load

  // 7. Form Validation (Generic & Password Strength)
  const forms = document.querySelectorAll('.validate-form');
  forms.forEach(form => {
      form.addEventListener('submit', (e) => {
          e.preventDefault(); // Prevent actual submission for demo
          
          let valid = true;
          const requiredInputs = form.querySelectorAll('input[required], textarea[required]');
          
          requiredInputs.forEach(input => {
              if (!input.value.trim()) {
                  valid = false;
                  input.style.borderColor = 'red';
                  // Simple shake animation
                  input.classList.add('shake');
                  setTimeout(() => input.classList.remove('shake'), 500);
              } else {
                  input.style.borderColor = 'var(--clr-border)';
              }
          });

          if (valid) {
              const btn = form.querySelector('button[type="submit"]');
              const originalText = btn.innerHTML;
              btn.innerHTML = 'Success!';
              btn.style.backgroundColor = 'var(--clr-olive)';
              setTimeout(() => {
                  btn.innerHTML = originalText;
                  btn.style.backgroundColor = '';
                  form.reset();
              }, 2000);
          }
      });
  });

  // Password Strength Meter (Register Page)
  const passwordInput = document.getElementById('password');
  const strengthMeter = document.getElementById('strength-meter');
  
  if (passwordInput && strengthMeter) {
      passwordInput.addEventListener('input', () => {
          const val = passwordInput.value;
          let strength = 0;
          
          if (val.length > 5) strength += 1;
          if (val.length > 7) strength += 1;
          if (/[A-Z]/.test(val)) strength += 1;
          if (/[0-9]/.test(val)) strength += 1;
          if (/[^A-Za-z0-9]/.test(val)) strength += 1;

          strengthMeter.style.height = '5px';
          strengthMeter.style.marginTop = '10px';
          strengthMeter.style.transition = 'all 0.3s ease';

          if (val.length === 0) {
              strengthMeter.style.width = '0%';
              strengthMeter.style.backgroundColor = 'transparent';
          } else if (strength < 2) {
              strengthMeter.style.width = '20%';
              strengthMeter.style.backgroundColor = 'red';
          } else if (strength < 4) {
              strengthMeter.style.width = '60%';
              strengthMeter.style.backgroundColor = 'orange';
          } else {
              strengthMeter.style.width = '100%';
              strengthMeter.style.backgroundColor = 'green';
          }
      });
  }

});
