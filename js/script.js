(function () {
  // Footer year auto-update
  var yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Hamburger menu
  var hamburger = document.getElementById('hamburger');
  var menu = document.getElementById('primary-menu');
  if (hamburger && menu) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      menu.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        menu.classList.remove('open');
      }
    });
  }

  // Header scroll + scroll-up button
  var header = document.getElementById('site-header');
  var scrollBtn = document.getElementById('scroll-up');
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        var sy = window.scrollY;
        if (header) header.classList.toggle('scrolled', sy > 50);
        if (scrollBtn) scrollBtn.classList.toggle('visible', sy > 400);
        ticking = false;
      });
      ticking = true;
    }
  });

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }
})();

function sendByEmail(form) {
  var name = form.name.value.trim();
  var email = form.email.value.trim();
  var subject = form.subject.value.trim();
  var message = form.message.value.trim();
  var errors = form.querySelectorAll('.field-error');
  errors.forEach(function (e) { e.textContent = ''; });
  if (!name) { form.name.focus(); showToast('Please enter your name', 'error'); return false; }
  if (!email || !/\S+@\S+\.\S+/.test(email)) { form.email.focus(); showToast('Please enter a valid email', 'error'); return false; }
  if (!subject) { form.subject.focus(); showToast('Please enter a subject', 'error'); return false; }
  var body = 'Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message;
  window.location.href = 'mailto:service@interverse-tech.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  showToast('Email app opened!', 'success');
  return false;
}

function showToast(msg, type) {
  var t = document.createElement('div');
  t.className = 'toast toast-' + type;
  t.textContent = msg;
  t.setAttribute('role', 'alert');
  document.body.appendChild(t);
  setTimeout(function () { t.classList.add('show'); }, 10);
  setTimeout(function () {
    t.classList.remove('show');
    setTimeout(function () { t.remove(); }, 400);
  }, 3500);
}

// Stars & space effects on hero pages
(function initStars() {
  var hero = document.getElementById('hero');
  if (!hero) return;
  var isMobile = window.innerWidth < 768;
  var starCount = isMobile ? 50 : 120;
  var colors = ['#fff', '#fff', '#fff', '#a8d8ff', '#ffe8b0', '#c8b0ff', '#fff', '#fff', '#b0d8ff', '#fff'];
  var i, star, size, x, y, c;
  // Add nebula blobs to hero
  var nebulaDiv = document.createElement('div');
  nebulaDiv.className = 'nebula';
  for (i = 0; i < 3; i++) {
    var blob = document.createElement('span');
    nebulaDiv.appendChild(blob);
  }
  hero.appendChild(nebulaDiv);
  // Add stardust overlay
  var dust = document.createElement('div');
  dust.className = 'stardust';
  hero.appendChild(dust);

  // Generate stars with color variety
  for (i = 0; i < starCount; i++) {
    star = document.createElement('div');
    size = Math.random() * 3 + 0.5;
    x = Math.random() * 100;
    y = Math.random() * 100;
    c = colors[Math.floor(Math.random() * colors.length)];
    star.className = 'star';
    star.style.cssText = 'width:' + size + 'px;height:' + size + 'px;top:' + y + '%;left:' + x + '%;background:' + c + ';box-shadow:0 0 ' + (size * 2) + 'px ' + c + ';';
    if (i % 4 === 0) {
      star.style.animationDelay = (Math.random() * 4) + 's';
      star.classList.add('twinkle');
    }
    if (i % 7 === 0) {
      star.classList.add('shine');
    }
    hero.appendChild(star);
  }

  // Generate constellation-like clusters
  for (i = 0; i < 3; i++) {
    var cx = Math.random() * 80 + 10;
    var cy = Math.random() * 80 + 10;
    for (var k = 0; k < 5; k++) {
      var cStar = document.createElement('div');
      cStar.className = 'star';
      var cs = Math.random() * 1.2 + 0.4;
      cStar.style.cssText = 'width:' + cs + 'px;height:' + cs + 'px;top:' + (cy + (Math.random() - 0.5) * 8) + '%;left:' + (cx + (Math.random() - 0.5) * 8) + '%;background:rgba(200,220,255,0.3);';
      cStar.classList.add('twinkle');
      hero.appendChild(cStar);
    }
  }

  if (isMobile) return;

  // Shooting stars count on screen
  var activeMeteors = 0;
  var maxMeteors = 3;

  function animateStars() {
    var stars = hero.querySelectorAll('.star:not(.twinkle)');
    if (stars.length < 10) return;
    var count = Math.min(Math.floor(Math.random() * 4) + 2, stars.length);
    for (var j = 0; j < count; j++) {
      var el = stars[Math.floor(Math.random() * stars.length)];
      el.style.transform = 'translate(' + ((Math.random() - 0.5) * 300) + '%,' + ((Math.random() - 0.5) * 300) + '%) scale(2.5)';
      el.style.opacity = '0';
      el.style.transition = 'transform 2s ease-out, opacity 2s ease-out';
      (function (e) {
        setTimeout(function () {
          if (e.parentNode) {
            e.parentNode.removeChild(e);
            var ns = document.createElement('div');
            var s = Math.random() * 3 + 0.5;
            var nx = Math.random() * 100;
            var ny = Math.random() * 100;
            var nc = colors[Math.floor(Math.random() * colors.length)];
            ns.className = 'star';
            ns.style.cssText = 'width:' + s + 'px;height:' + s + 'px;top:' + ny + '%;left:' + nx + '%;background:' + nc + ';box-shadow:0 0 ' + (s * 2) + 'px ' + nc + ';';
            hero.appendChild(ns);
          }
        }, 2000);
      })(el);
    }
  }

  function createMeteor() {
    if (activeMeteors >= maxMeteors) return;
    activeMeteors++;
    var m = document.createElement('div');
    m.className = 'meteor';
    var dot = document.createElement('div');
    dot.className = 'meteor-dot';
    var hue = Math.random() * 60 + 180;
    dot.style.cssText = 'background:hsl(' + hue + ',80%,80%);box-shadow:0 0 8px 3px hsla(' + hue + ',80%,80%,0.6);';
    m.appendChild(dot);
    var trail = document.createElement('div');
    trail.className = 'meteor-trail';
    trail.style.cssText = 'background:linear-gradient(to bottom, hsla(' + hue + ',80%,80%,0.8), transparent);';
    m.appendChild(trail);
    m.style.cssText = 'top:-5%;left:' + (Math.random() * 100) + '%;transform:rotate(' + (Math.random() * 20 + 25) + 'deg);';
    hero.appendChild(m);
    setTimeout(function () {
      if (m.parentNode) m.parentNode.removeChild(m);
      activeMeteors--;
    }, 1500);
  }

  setInterval(animateStars, 2000);
  setInterval(createMeteor, 2000);
})();
