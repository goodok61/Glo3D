window.addEventListener('DOMContentLoaded', () => {
  'use strict'

  const countTimer = (deadline) => {
    const timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    const getTimeRemaining = () => {
      const dateStop = new Date(deadline).getTime(),
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

    const updateClock = () => {
      const timer = getTimeRemaining();

      timerHours.textContent = timer.hours < 10 ? "0" + timer.hours : timer.hours;
      timerMinutes.textContent = timer.minutes < 10 ? "0" + timer.minutes : timer.minutes;
      timerSeconds.textContent = timer.seconds < 10 ? "0" + timer.seconds : timer.seconds;

      if (timer.timeRemaining < 0) {
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
    }
    updateClock();
    setInterval(updateClock, 1000);

  }
  countTimer('20 march 2020');

  const toogleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      handlerMenu = () => menu.classList.toggle('active-menu');

    menu.addEventListener('click', (event) => {
      let {target} = event;

      if (target.closest('a')) handlerMenu();
    });

    btnMenu.addEventListener('click', handlerMenu);
  }
  toogleMenu();

  //popup

  const tooglePopUp = () => {
    const popUp = document.querySelector(".popup"),
      popUpBtn = document.querySelectorAll(".popup-btn"),
      popUpContent = document.querySelector(".popup-content");

    popUpBtn.forEach((elem) => elem.addEventListener('click', () => {
      popUp.style.display = "block";
      popUpContent.style.opacity = "0";


      if (screen.width > 768) {
        animate({
          duration: 1000,
          timing: function (timeFraction) {
            return timeFraction;
          },
          draw: function (progress) {
            let progressPopUp = Math.floor(progress * 100) / 100;
            popUpContent.style.opacity = `${progressPopUp}`;
          }
        });
      } else {
        popUp.style.display = "block";
        popUpContent.style.opacity = "1";
      }


    }));

    popUp.addEventListener('click', (event) => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popUp.style.display = "none";
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          popUp.style.display = "none";
        }
      }

    })

    function animate({
      timing,
      draw,
      duration
    }) {
      let start = performance.now();

      requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        let progress = timing(timeFraction);

        draw(progress);

        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        }
      });
    }
  };
  tooglePopUp();

  //табы

  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');
    const toogleTabContent = (index => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add("d-none");
        }

      }
    })
    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toogleTabContent(i);

          }
        })
      }
    })

  }
  tabs();
});