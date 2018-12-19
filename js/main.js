(function () {
  var btns = document.querySelectorAll('.btn[href]');
  var panels = document.querySelectorAll('.panel');
  var copyright = document.querySelector('.copyright');
  var animationBtn = null;
  var panel;

  var btnAnimated = function (evt) {
    animationBtn = this;
  }

  window.onload = function () {
    history.replaceState({}, document.title, ".");
    setTimeout(function () {
      panels[0].classList.remove('panel--disabled');
      copyright.classList.remove('copyright--disabled');
    }, 250);
  }

  var openPanel = function () {
    if (!window.location.hash) {
      location = location;
    }
    if (animationBtn) {
      animationBtn.classList.add('btn--active');
    }
    for (var i = 0; i < panels.length; i++) {
      if (!panels[i].classList.contains('panel--disabled')) {
        panel = panels[i];
        setTimeout(function () {
          panel.classList.add('panel--disabled');
          copyright.classList.add('copyright--disabled');
          setTimeout(function () {
            panel.style.display = 'none';
            window.scrollBy(0, document.body.scrollTop);
            if (animationBtn) {
              animationBtn.classList.remove('btn--active');
              animationBtn = null;
            }
            for (var i = 0; i < panels.length; i++) {
              if (('#' + panels[i].getAttribute('id')) == window.location.hash) {
                panel = panels[i];
                panels[i].style.display = 'flex';
                setTimeout(function () {
                  panel.classList.remove('panel--disabled');
                  copyright.classList.remove('copyright--disabled');
                }, 150);
              }
            }
          }, 350);
        }, 150);
      }
    }
  }

  window.addEventListener('hashchange', openPanel);

  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', btnAnimated);
  }
})();


(function () {
  var listWork = document.querySelector('.work-list')
  var linkOpen = document.querySelector('.link');
  var linkClose = document.querySelector('.work-list__btn');

  var openWorkList = function () {
    listWork.classList.add('work-list--active');
  }

  var closeWorkList = function() {
    listWork.classList.remove('work-list--active');
  }
  
  if (linkOpen) {
    linkOpen.addEventListener('click', openWorkList);
  }
  
  if (linkClose) {
    linkClose.addEventListener('click', closeWorkList);
  }
})();