(function () {
  'use strict';

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
