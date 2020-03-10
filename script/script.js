window.addEventListener('DOMContentLoaded', function () {
  'use strict'

  function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
      return {
        timeRemaining,
        hours,
        minutes,
        seconds
      };
    }

    function updateClock() {
      let timer = getTimeRemaining();

      timerHours.textContent = timer.hours < 10 ? "0" + timer.hours : timer.hours;
      timerMinutes.textContent = timer.minutes < 10 ? "0" + timer.minutes : timer.minutes;
      timerSeconds.textContent = timer.seconds < 10 ? "0" + timer.seconds : timer.seconds;

      if (timer.timeRemaining < 0) {
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
    }

    setInterval(updateClock, 1000);

  }

  countTimer('20 mart 2020');

  const toogleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul>li>a');

    const handlerMenu = () => menu.classList.toggle('active-menu');
    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener("click", handlerMenu);

    menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
  }
  toogleMenu();

  //popup

  const tooglePopUp = () => {
    const popup = document.querySelector(".popup"),
      popupBtn = document.querySelectorAll(".popup-btn"),
      popUpClose = document.querySelector(".popup-close"),
      popUpContent = document.querySelector(".popup-content");

    popupBtn.forEach((elem) => elem.addEventListener('click', () => {
      popup.style.display = "block";
      popUpContent.style.opacity = "0";


      if (screen.width > 768) {
        animate({
          duration: 1000,
          timing: function (timeFraction) {
            return timeFraction;
          },
          draw: function (progress) {
            let progressPopup = Math.floor(progress * 100) / 100;
            popUpContent.style.opacity = `${progressPopup}`;
          }
        });
      } else {
        popup.style.display = "block";
        popUpContent.style.opacity = "1";
      }


    }));
    popUpClose.addEventListener('click', () => popup.style.display = "none");

    function animate({
      timing,
      draw,
      duration
    }) {
      let start = performance.now();

      requestAnimationFrame(function animate(time) {
        // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        // вычисление текущего состояния анимации
        let progress = timing(timeFraction);

        draw(progress); // отрисовать её

        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        }
      });
    }
  };
  tooglePopUp();

});