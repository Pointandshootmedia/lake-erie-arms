(function () {
  'use strict';

  // Hero: hide YouTube iframe until video is playing (removes loading icon)
  var heroIframes = document.querySelectorAll('.hero-video-wrap iframe.hero-video');
  if (heroIframes.length) {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(tag, firstScript);

    window.onYouTubeIframeAPIReady = function () {
      heroIframes.forEach(function (iframe) {
        var wrap = iframe.closest('.hero-video-wrap');
        if (!wrap) return;
        try {
          var player = new YT.Player(iframe, {
            events: {
              onStateChange: function (e) {
                if (e.data === YT.PlayerState.PLAYING) {
                  wrap.classList.add('is-playing');
                }
              }
            }
          });
        } catch (err) {
          wrap.classList.add('is-playing');
        }
        setTimeout(function () {
          wrap.classList.add('is-playing');
        }, 8000);
      });
    };
  }

  // Hero loading image: show 2s then fade out
  document.querySelectorAll('.hero-video-wrap').forEach(function (wrap) {
    if (!wrap.querySelector('.hero-loading-image')) return;
    setTimeout(function () {
      wrap.classList.add('loading-faded');
    }, 2000);
  });

  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  var navItemsWithDropdown = document.querySelectorAll('.nav-item.has-dropdown');

  // Mobile nav toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      navLinks.classList.toggle('is-open', !expanded);
      // Close all dropdowns when closing menu
      if (expanded) {
        navItemsWithDropdown.forEach(function (item) {
          item.classList.remove('is-open');
        });
      }
    });

    // Close menu when a top-level link (non-dropdown) is clicked
    navLinks.querySelectorAll('.nav-item:not(.has-dropdown) > a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('is-open');
      });
    });
  }

  // Mobile: toggle dropdown on tap
  navItemsWithDropdown.forEach(function (item) {
    var trigger = item.querySelector(':scope > a');
    if (!trigger) return;
    trigger.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        item.classList.toggle('is-open');
      }
    });
  });

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Classes page: expand/collapse all equipment requirements together
  var equipmentDetails = document.querySelectorAll('.class-equipment');
  if (equipmentDetails.length) {
    equipmentDetails.forEach(function (details) {
      details.addEventListener('toggle', function () {
        var isOpen = details.open;
        equipmentDetails.forEach(function (other) {
          if (other !== details) {
            other.open = isOpen;
          }
        });
      });
    });
  }
})();
