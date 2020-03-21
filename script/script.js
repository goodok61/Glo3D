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
      let {
        target
      } = event;

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

  //слайдер

  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      btn = document.querySelectorAll('.portfolio-btn'),
      slider = document.querySelector('.portfolio-content'),
      
      dots = document.createElement("ul");
      dots.classList.add("portfolio-dots");
      slider.append(dots);
      for (let i = 0; i < slide.length; i++) {
        const oneDot = document.createElement("li");
        oneDot.classList.add("dot");
        dots.append(oneDot);
        if (i == 0) {
          oneDot.classList.add("dot-active");
        }
      }
    const dot = document.querySelectorAll('.dot');
      
    let curentSlide = 0,
      interval;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, curentSlide, 'portfolio-item-active');
      prevSlide(dot, curentSlide, "dot-active");
      curentSlide++;
      if (curentSlide >= slide.length) {
        curentSlide = 0;
      }
      nextSlide(slide, curentSlide, "portfolio-item-active");
      nextSlide(dot, curentSlide, "dot-active");
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time)
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();

      let target = event.target;

      if (!target.matches(".portfolio-btn", ".dot")) {
        return
      }

      prevSlide(slide, curentSlide, "portfolio-item-active");
      prevSlide(dot, curentSlide, "dot-active");

      if (target.matches('#arrow-right')) {
        curentSlide++;
      } else if (target.matches('#arrow-left')) {
        curentSlide--;
        console.log(slide.length);
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target){
            curentSlide = index;
          };
        });
      };
      
      if (curentSlide >= slide.length) {
        curentSlide = 0;
      }
      if (curentSlide < 0) {
        curentSlide = slide.length - 1;
      }

      nextSlide(slide, curentSlide, "portfolio-item-active");
      nextSlide(dot, curentSlide, "dot-active");

    });

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        startSlide();
      }
    })

    startSlide(1500);
  };

  slider();

  const myTeam = () => {
    const teamImg = document.querySelectorAll(".command__photo");

    teamImg.forEach( item => {
      let defaultItemSrc = item.src;      
      item.addEventListener("mouseenter", event => {
        event.target.src = event.target.dataset.img;
      });
      item.addEventListener("mouseleave", event => {
        event.target.src = defaultItemSrc;
      });
    })
  }
  myTeam();

  const calc = () => {
    const calcBlock = document.querySelector('.calc-block'),
      calcSquare = document.querySelector('.calc-square'),
      calcCount = document.querySelector('.calc-count'),
      calcDay = document.querySelector('.calc-day');
      
      calcBlock.addEventListener('input', (e) => {
        const target = e.target;
        if (
          target.closest(".calc-square") ||
          target.closest(".calc-count") ||
          target.closest(".calc-day")
        ) {
          target.value = target.value.replace(/\D/g, '');
        }
      })
      
  }
  calc();
});