(function () {
  var btns = document.querySelectorAll('.btn[href]');
  var panels = document.querySelectorAll('.panel');
  var copyright = document.querySelector('.copyright');
  var animationBtn = null;
  var panel;

  window.onload = function () {
    history.replaceState({}, document.title, ".");
    document.querySelector('body').scrollTop -= 9999;
    setTimeout(function () {
      panels[0].classList.add('panel--active');
      copyright.classList.add('copyright--active');
    }, 100);
  }

  var btnAnimated = function (evt) {
    animationBtn = this;
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
            //            document.querySelector('body').scrollTo(0, 0);
            document.querySelector('body').scrollTop -= 9999;
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
  var listWork = document.querySelectorAll('.work-list');
  var btnOpen = document.querySelector('#btnWorkList');
  var btnClose = document.querySelectorAll('.work-list__btn');
  var overlay = document.querySelector('.overlay');
  var sizeWindow;

  var openWorkList = function () {
    if (document.body.clientWidth > 735) {
      sizeWindow = 0;
    } else {
      sizeWindow = 1;
      overlay.classList.add('overlay--active');
    }
    listWork[sizeWindow].style.display = 'flex';
    setTimeout(function () {
      listWork[sizeWindow].scrollTop -= 9999;
      listWork[sizeWindow].classList.add('work-list--active');
    }, 100);
  }

  var closeWorkList = function () {
    listWork[sizeWindow].classList.remove('work-list--active');
    setTimeout(function () {
      listWork[sizeWindow].style.display = 'none';
      if (sizeWindow == 1) {
        overlay.classList.remove('overlay--active');
      }
      sizeWindow = null;
    }, 300);

  }

  if (btnOpen) {
    btnOpen.addEventListener('click', openWorkList);
  }

  if (btnClose) {
    for (var i = 0; i < btnClose.length; i++) {
      btnClose[i].addEventListener('click', closeWorkList);
    }
  }
})();
