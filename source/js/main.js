(function () {
  var btns = document.querySelectorAll('.btn[href]');
  var panels = document.querySelectorAll('.panel');
  var animationBtn = null;

  var btnAnimated = function (evt) {
    var href = this.getAttribute('href');
    evt.preventDefault();
    window.location.hash = '';
    window.location.hash = href;
    animationBtn = this;
  }

  var openPanel = function () {
    var panel;
    if (window.location.hash && window.location.hash != '#') {
      panel = window.location.hash;
    } else {
      panel = '#home';
    }

    for (var i = 0; i < panels.length; i++) {
      if (('#' + panels[i].getAttribute('id')) == panel) {
        panel = panel[i];
        animationBtn.classList.add('btn--active');
        setTimeout(function() {
          panel.classList.add('panel-disabled');
        }, 150);

      }
    }
  }

  window.addEventListener('hashchange', openPanel);

  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', btnAnimated);
  }
})();
