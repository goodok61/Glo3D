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
  countTimer('20 april 2020');

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
    let dot = document.querySelectorAll('.dot');

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

      // if (!target.matches(".portfolio-btn", ".dot")) {
      //   return;
      // }

      prevSlide(slide, curentSlide, "portfolio-item-active");
      prevSlide(dot, curentSlide, "dot-active");

      if (target.matches('#arrow-right')) {
        curentSlide++;
      } else if (target.matches('#arrow-left')) {
        curentSlide--;
      } else if (target.classList.contains('dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
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

    teamImg.forEach(item => {
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

  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquare = document.querySelector('.calc-square'),
      calcCount = document.querySelector('.calc-count'),
      calcDay = document.querySelector('.calc-day'),
      totalValue = document.getElementById('total');

    const countSum = () => {

      let total = 0,
        countValue = 1,
        dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }

      totalValue.textContent = Math.ceil(total);

    }

    calcBlock.addEventListener('input', event => {
      const target = event.target;

      if (target.matches('select') || target.matches('input')) {
        countSum();
      }
    })



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
  calc(100);
});

//send-ajax-form

const sendForm = () => {

  const errorMessage = ' Что то пошло не так...',
    loadMessage = 'Загрузка...',
    successMessage = 'Спасибо! Мы скоро с вами свяжемся!',
    statusMessage = document.createElement('div');
  statusMessage.style.cssText = 'font-size: 2rem;';


  const allForms = document.querySelectorAll('form');


  const postData = (body) => {

    return fetch("./server.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  };



  allForms.forEach(item => {
    const inputs = item.querySelectorAll("input");
    item.addEventListener("submit", event => {
      event.preventDefault();
      item.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;
      if (item.getAttribute("id") == 'form3') {
        statusMessage.style.cssText = 'color:#ffffff';
      }
      const formData = new FormData(item);
      let body = {};
      formData.forEach((val, key) => {
        body[key] = val;
      });
      postData(body)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('status network not 200');
          }
          statusMessage.textContent = successMessage;
          inputs.forEach(itemInput => (itemInput.value = ""));
        })
        .catch(()=>{
          statusMessage.textContent = errorMessage;
        });
     


    });
    inputs.forEach(itemInput => {
      itemInput.value = "";
      itemInput.addEventListener("input", e => {
        const target = e.target;

        if (
          target.getAttribute("name") == "user_name" ||
          target.getAttribute("name") == "user_message"
        ) {
          target.value = target.value.replace(/[^\W]/gi, "");
        } else if (target.getAttribute("name") == "user_email") {
          target.value = target.value.replace(/.+@.+\..{1,}&/i, "");
        } else if (target.getAttribute("name") == "user_phone") {
          target.value = target.value.replace(/\+[\d]/g, "");
        }
      });
    });
  })



}
sendForm();

//Валидация форм (23 урок)

/*const valid1 = new Validator({
  selector: "#form1",
  pattern: {},
  method: {
    "form1-name": [["notEmpty"], ["pattern", "name"]],
    "form1-email": [["notEmpty"], ["pattern", "email"]],
    "form1-phone": [["notEmpty"], ["pattern", "phone"]]
  }
});

const valid2 = new Validator({
  selector: "#form2",
  pattern: {},
  method: {
    "form2-name": [["notEmpty"], ["pattern", "name"]],
    "form2-email": [["notEmpty"], ["pattern", "email"]],
    "form2-phone": [["notEmpty"], ["pattern", "phone"]],
    "form2-message": [["notEmpty"], ["pattern", "ruText"]]
  }
});

const valid3 = new Validator({
  selector: "#form3",
  pattern: {},
  method: {
    "form3-name": [["notEmpty"], ["pattern", "name"]],
    "form3-email": [["notEmpty"], ["pattern", "email"]],
    "form3-phone": [["notEmpty"], ["pattern", "phone"]]
  }
});*/