let info = document.createElement("div");
document.body.append(info);
info.innerHTML =
  '<span id="timeofday"></span><br>Сегодня: <span id="week">Понедельник</span><br>Текущее время: <span id="time">05:15 PM</span><br>До нового года осталось <span id="newyear">175</span> дней <br>';

const timeNow = new Date(),
  timeOfDay = document.getElementById("timeofday"),
  week = document.getElementById("week"),
  time = document.getElementById("time"),
  newYear = document.getElementById("newyear");


function SetTimeOfDay(x) {
  if ((x >= 0) && (x <= 5) || (x >= 23)) {
    return "Доброй ночи!";
  } else if (x > 5 && x <= 11) {
    return "Доброе утро!";
  } else if (x > 12 && x <= 16) {
    return "Добрый день!";
  } else if (x > 17 && x <= 22) {
    return "Добрый вечер!";
  }
};

const weekday = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота"
];

const options = {
  hour: "numeric",
  minute: "numeric"
};

function whenNewYear(now, newYear) {
const ms = (newYear - now) / 1000,
      days = Math.floor(ms / 60 / 60 / 24 + 1);
  return days
}
console.log();

timeOfDay.textContent = SetTimeOfDay(timeNow.getHours());
week.textContent = weekday[timeNow.getDay()];
time.textContent = timeNow.toLocaleString("en-US", options);
newYear.textContent = whenNewYear(timeNow.getTime(), Date.parse('01 jan 2021'));