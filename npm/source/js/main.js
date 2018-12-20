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
    panels[0].classList.add('panel--active');
    copyright.classList.add('copyright--active');
  }

  var openPanel = function () {
    if (!window.location.hash) {
      location = location;
    }
    if (animationBtn) {
      animationBtn.classList.add('btn--active');
    }
    for (var i = 0; i < panels.length; i++) {
      if (panels[i].classList.contains('panel--active')) {
        panel = panels[i];
        setTimeout(function () {
          panel.classList.remove('panel--active');
          copyright.classList.remove('copyright--active');
          setTimeout(function () {
            panel.style.display = 'none';
            document.querySelector('body').scrollTo(0, 0);
            if (animationBtn) {
              animationBtn.classList.remove('btn--active');
              animationBtn = null;
            }
            for (var i = 0; i < panels.length; i++) {
              if (('#' + panels[i].getAttribute('id')) == window.location.hash) {
                panel = panels[i];
                panels[i].style.display = 'flex';
                setTimeout(function () {
                  panel.classList.add('panel--active');
                  copyright.classList.add('copyright--active');
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
  var listWork = document.querySelector('.work-list');
  var btnOpen = document.querySelector('#btnWorkList');
  var btnClose = document.querySelector('.work-list__btn');

  var openWorkList = function () {
    listWork.classList.add('work-list--active');
  }

  var closeWorkList = function () {
    listWork.classList.remove('work-list--active');
  }

  if (btnOpen) {
    btnOpen.addEventListener('click', openWorkList);
  }

  if (btnClose) {
    btnClose.addEventListener('click', closeWorkList);
  }
})();
