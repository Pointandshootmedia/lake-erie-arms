(function () {
  'use strict';

  // Hero: hide video until playing, then seek to 0 and reveal so it starts from the beginning
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
        var player = null;
        var revealed = false;
        var reveal = function () {
          if (revealed) return;
          revealed = true;
          if (player && typeof player.seekTo === 'function') {
            player.seekTo(0);
          }
          wrap.classList.add('is-playing');
          wrap.classList.add('loading-faded');
        };
        try {
          player = new YT.Player(iframe, {
            events: {
              onStateChange: function (e) {
                if (e.data === YT.PlayerState.PLAYING) {
                  reveal();
                }
              }
            }
          });
        } catch (err) {
          reveal();
        }
        setTimeout(reveal, 2000);
      });
    };
  }

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
