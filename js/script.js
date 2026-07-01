(function () {
  var yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

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

(function initStars() {
  var hero = document.getElementById('hero');
  if (!hero) return;
  var isMobile = window.innerWidth < 768;
  var i, star, size, x, y, c;

  var nebulaDiv = document.createElement('div');
  nebulaDiv.className = 'nebula';
  for (i = 0; i < 3; i++) {
    var blob = document.createElement('span');
    nebulaDiv.appendChild(blob);
  }
  hero.appendChild(nebulaDiv);

  var dust = document.createElement('div');
  dust.className = 'stardust';
  hero.appendChild(dust);

  for (i = 0; i < 200; i++) {
    star = document.createElement('div');
    size = Math.random() * 0.8 + 0.2;
    x = Math.random() * 100;
    y = Math.random() * 100;
    star.className = 'star star-distant';
    star.style.cssText = 'width:' + size + 'px;height:' + size + 'px;top:' + y + '%;left:' + x + '%;';
    if (i % 6 === 0) star.classList.add('twinkle');
    hero.appendChild(star);
  }

  var midColors = ['#fff', '#d8eaff', '#fff', '#ffe8d0', '#fff'];
  for (i = 0; i < 80; i++) {
    star = document.createElement('div');
    size = Math.random() * 1.5 + 0.6;
    x = Math.random() * 100;
    y = Math.random() * 100;
    c = midColors[Math.floor(Math.random() * midColors.length)];
    star.className = 'star star-mid';
    star.style.cssText = 'width:' + size + 'px;height:' + size + 'px;top:' + y + '%;left:' + x + '%;background:' + c + ';box-shadow:0 0 ' + (size * 3) + 'px ' + c + ';';
    if (i % 4 === 0) star.classList.add('twinkle');
    hero.appendChild(star);
  }

  var brightColors = ['#fff', '#d0e8ff', '#fff8e8'];
  for (i = 0; i < 20; i++) {
    star = document.createElement('div');
    size = Math.random() * 2 + 1.5;
    x = Math.random() * 100;
    y = Math.random() * 100;
    c = brightColors[Math.floor(Math.random() * brightColors.length)];
    star.className = 'star star-bright';
    star.style.cssText = 'width:' + size + 'px;height:' + size + 'px;top:' + y + '%;left:' + x + '%;background:' + c + ';box-shadow:0 0 ' + (size * 4) + 'px ' + c + ',0 0 ' + (size * 10) + 'px ' + c + ';';
    star.classList.add('twinkle');
    hero.appendChild(star);
  }

  for (i = 0; i < 4; i++) {
    var cx = Math.random() * 80 + 10;
    var cy = Math.random() * 80 + 10;
    for (var k = 0; k < 6; k++) {
      var cStar = document.createElement('div');
      cStar.className = 'star star-distant';
      var cs = Math.random() * 0.6 + 0.2;
      cStar.style.cssText = 'width:' + cs + 'px;height:' + cs + 'px;top:' + (cy + (Math.random() - 0.5) * 12) + '%;left:' + (cx + (Math.random() - 0.5) * 12) + '%;';
      cStar.classList.add('twinkle');
      hero.appendChild(cStar);
    }
  }

  if (isMobile) return;

  var activeMeteors = 0;
  var maxMeteors = 8;

  function animateStars() {
    var stars = hero.querySelectorAll('.star-mid, .star-bright');
    if (stars.length < 5) return;
    var count = Math.min(Math.floor(Math.random() * 3) + 1, stars.length);
    for (var j = 0; j < count; j++) {
      var el = stars[Math.floor(Math.random() * stars.length)];
      if (el.classList.contains('twinkle')) continue;
      el.style.transform = 'translate(' + ((Math.random() - 0.5) * 200) + '%,' + ((Math.random() - 0.5) * 200) + '%) scale(2)';
      el.style.opacity = '0';
      el.style.transition = 'transform 2s ease-out, opacity 2s ease-out';
      (function (e) {
        setTimeout(function () {
          if (e.parentNode) {
            e.parentNode.removeChild(e);
            var ns = document.createElement('div');
            var s = Math.random() * 2 + 0.6;
            var nx = Math.random() * 100;
            var ny = Math.random() * 100;
            var nc = midColors[Math.floor(Math.random() * midColors.length)];
            ns.className = 'star star-mid';
            ns.style.cssText = 'width:' + s + 'px;height:' + s + 'px;top:' + ny + '%;left:' + nx + '%;background:' + nc + ';box-shadow:0 0 ' + (s * 3) + 'px ' + nc + ';';
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
    var body = document.createElement('div');
    body.className = 'meteor-body';
    var dot = document.createElement('div');
    dot.className = 'meteor-dot';
    var hue = Math.random() * 40 + 190;
    var sat = 60 + Math.random() * 30;
    var isBig = Math.random() > 0.8;
    var dotSize = isBig ? 7 : 3 + Math.random() * 2;
    var trailLen = isBig ? 220 : 120 + Math.random() * 80;
    var trailWid = isBig ? 4 : 2 + Math.random() * 1.5;
    var distX = isBig ? 50 + Math.random() * 30 : 30 + Math.random() * 25;
    var distY = -(10 + Math.random() * 15);
    var angle = Math.atan2(distY, distX) * 180 / Math.PI;
    var trailDur = isBig ? 2.5 : 1.2 + Math.random() * 1;
    var elapsed = isBig ? 5000 + Math.random() * 2000 : 3000 + Math.random() * 2000;
    dot.style.cssText = 'width:' + dotSize + 'px;height:' + dotSize + 'px;background:hsl(' + hue + ',' + sat + '%,90%);box-shadow:0 0 ' + (dotSize * 4) + 'px ' + (dotSize * 2) + 'px hsla(' + hue + ',' + sat + '%,90%,0.9);';
    body.appendChild(dot);
    var trail = document.createElement('div');
    trail.className = 'meteor-trail';
    trail.style.cssText = 'width:' + trailLen + 'px;height:' + trailWid + 'px;background:linear-gradient(to left, hsla(' + hue + ',' + sat + '%,92%,1), hsla(' + hue + ',' + sat + '%,60%,0.5), transparent);';
    body.appendChild(trail);
    m.appendChild(body);
    var startX = Math.random() * 30;
    var startY = 2 + Math.random() * 40;
    m.style.cssText = 'top:' + startY + '%;left:' + startX + '%;--meteor-dur:' + (elapsed / 1000) + 's;--meteor-dist-x:' + distX + 'vw;--meteor-dist-y:' + distY + 'vw;--meteor-trail-dur:' + trailDur + 's;--meteor-angle:' + angle + 'deg;';
    hero.appendChild(m);
    setTimeout(function () {
      if (m.parentNode) m.parentNode.removeChild(m);
      activeMeteors--;
    }, elapsed);
  }

  setInterval(animateStars, 2500);
  setInterval(createMeteor, 60000);

  var wordSpans = document.querySelectorAll('.hero-text h1 span');
  if (wordSpans.length) {
    var specialTimer;
    function scheduleSpecial() {
      clearTimeout(specialTimer);
      specialTimer = setTimeout(triggerStarToWord, 60000);
    }
    function triggerStarToWord() {
      if (activeMeteors >= maxMeteors) { scheduleSpecial(); return; }
      var candidates = hero.querySelectorAll('.star-mid, .star-bright');
      if (!candidates.length) { scheduleSpecial(); return; }
      var star = candidates[Math.floor(Math.random() * candidates.length)];
      var word = wordSpans[Math.floor(Math.random() * wordSpans.length)];
      star.classList.remove('twinkle');
      star.style.transition = 'transform 0.3s, opacity 0.3s, box-shadow 0.3s';
      star.style.transform = 'scale(4)';
      star.style.opacity = '1';
      star.style.boxShadow = '0 0 40px 20px rgba(255,255,255,0.95)';
      setTimeout(function () {
        if (!star.parentNode) { scheduleSpecial(); return; }
        var heroRect = hero.getBoundingClientRect();
        var sl = parseFloat(star.style.left);
        var st = parseFloat(star.style.top);
        var sx = heroRect.left + heroRect.width * sl / 100;
        var sy = heroRect.top + heroRect.height * st / 100;
        var wr = word.getBoundingClientRect();
        var wx = wr.left + wr.width / 2;
        var wy = wr.top + wr.height / 2;
        var dx = wx - sx;
        var dy = wy - sy;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var dur = Math.max(0.6, dist / 1800);
        var hue = 200 + Math.random() * 30;
        var shooter = document.createElement('div');
        shooter.className = 'meteor word-shooter';
        var sbody = document.createElement('div');
        sbody.className = 'meteor-body';
        var dot = document.createElement('div');
        dot.className = 'meteor-dot';
        dot.style.cssText = 'width:6px;height:6px;background:hsl(' + hue + ',80%,92%);box-shadow:0 0 20px 10px hsla(' + hue + ',80%,92%,0.9);';
        sbody.appendChild(dot);
        var trail = document.createElement('div');
        trail.className = 'meteor-trail';
        var tLen = Math.min(dist * 0.3, 150);
        trail.style.cssText = 'width:' + tLen + 'px;height:3px;background:linear-gradient(to left, hsla(' + hue + ',80%,92%,1), hsla(' + hue + ',80%,70%,0.4), transparent);';
        sbody.appendChild(trail);
        shooter.appendChild(sbody);
        var angle = Math.atan2(dy, dx) * 180 / Math.PI;
        shooter.style.cssText = 'top:' + sy + 'px;left:' + sx + 'px;--meteor-dur:' + dur + 's;--meteor-dist-x:' + dx + 'px;--meteor-dist-y:' + dy + 'px;--meteor-trail-dur:0.8s;--meteor-angle:' + angle + 'deg;';
        document.body.appendChild(shooter);
        setTimeout(function () {
          if (shooter.parentNode) shooter.parentNode.removeChild(shooter);
          if (Math.random() < 0.5) {
            word.classList.add('word-crashed');
            word.style.color = '#ff4444';
            setTimeout(function () {
              word.classList.remove('word-crashed');
              word.style.color = '';
              word.style.transition = 'color 0.5s';
              setTimeout(function () {
                word.style.transition = '';
              }, 500);
            }, 700);
          } else {
            word.style.transition = 'text-shadow 0.2s,color 0.2s';
            word.style.textShadow = '0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(110,193,228,0.4)';
            word.style.color = '#fff';
            setTimeout(function () {
              word.style.textShadow = '';
              word.style.color = '';
              word.style.transition = '';
            }, 500);
          }
        }, dur * 1000);
        star.style.transition = 'opacity 0.5s';
        star.style.opacity = '0';
        setTimeout(function () {
          if (star.parentNode) {
            star.parentNode.removeChild(star);
            var ns = document.createElement('div');
            var s = Math.random() * 2 + 0.6;
            ns.className = 'star star-mid';
            ns.style.cssText = 'width:' + s + 'px;height:' + s + 'px;top:' + (Math.random() * 100) + '%;left:' + (Math.random() * 100) + '%;background:#fff;box-shadow:0 0 ' + (s * 3) + 'px #fff;';
            hero.appendChild(ns);
          }
          scheduleSpecial();
        }, 500);
      }, 350);
    }
    scheduleSpecial();
  }
})();
