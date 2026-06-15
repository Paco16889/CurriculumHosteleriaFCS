(function () {
  var mq = window.matchMedia('(min-width: 769px)');
  var sections = document.querySelectorAll('.right .section-collapsible');
  var mobileMenu = document.querySelectorAll('.mobile-menu details');

  function syncSections() {
    if (mq.matches) {
      sections.forEach(function (el) {
        el.setAttribute('open', '');
      });
      mobileMenu.forEach(function (el) {
        el.removeAttribute('open');
      });
      return;
    }

    sections.forEach(function (el) {
      el.removeAttribute('open');
    });

    mobileMenu.forEach(function (el) {
      el.removeAttribute('open');
    });

    var contacto = document.querySelector('.mobile-menu .mobile-menu-item');
    if (contacto) {
      contacto.setAttribute('open', '');
    }
  }

  syncSections();
  mq.addEventListener('change', syncSections);
})();
