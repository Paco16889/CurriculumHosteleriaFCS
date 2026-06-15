(function () {
  var mq = window.matchMedia('(min-width: 769px)');
  var sections = document.querySelectorAll('.right .section-collapsible');

  function syncSections() {
    sections.forEach(function (el) {
      if (mq.matches) {
        el.setAttribute('open', '');
      }
    });
  }

  if (!mq.matches) {
    sections.forEach(function (el) { el.removeAttribute('open'); });
  }

  syncSections();
  mq.addEventListener('change', syncSections);
})();
