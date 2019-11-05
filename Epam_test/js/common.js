document.addEventListener('DOMContentLoaded', function(){
  var dateTime = new Date();

  var weather = [  
  {
    date: dateTime.getTime() + 86000 * -1000,
    temperature: {
      night: -3,
      day: 2,
    },
    cloudiness: 'Ясно',
    snow: false,
    rain: false,
  },
  {
    date: dateTime.getTime(),
    temperature: {
      night: 0,
      day: 4,
    },
    cloudiness: 'Ясно',
    snow: false,
    rain: true,
  },
  {
    date: dateTime.getTime() + 86000 * 1000,
    temperature: {
      night: -9,
      day: -1,
    },
    cloudiness: 'Облачно',
    snow: true,
    rain: true,
  },
  {
    date: dateTime.getTime() + 86000 * 2000,
    temperature: {
      night: -2,
      day: 1,
    },
    cloudiness: 'Облачно',
    snow: false,
    rain: false,
  },
  {
    date: dateTime.getTime() + 86000 * 3000,
    temperature: {
      night: -12,
      day: -2,
    },
    cloudiness: 'Облачно',
    snow: true,
    rain: true,
  },
  {
    date: dateTime.getTime() + 86000 * -2000,
    temperature: {
      night: -10,
      day: -1,
    },
    cloudiness: 'Облачно',
    snow: true,
    rain: true,
  },
  {
    date: dateTime.getTime() + 86000 * -3000,
    temperature: {
      night: -6,
      day: 1,
    },
    cloudiness: 'Ясно',
    snow: true,
    rain: false,
  },
  {
    date: dateTime.getTime() + 86000 * 4000,
    temperature: {
      night: -6,
      day: 0,
    },
    cloudiness: 'Облачно',
    snow: true,
    rain: false,
  },
  {
    date: dateTime.getTime() + 86000 * 5000,
    temperature: {
      night: -1,
      day: 4,
    },
    cloudiness: 'Ясно',
    snow: false,
    rain: false,
  },
  {
    date: dateTime.getTime() + 86000 * 6000,
    temperature: {
      night: -2,
      day: 1,
    },
    cloudiness: 'Облачно',
    snow: true,
    rain: true,
  },
]
;

  function getWeekDayName(date) {
    var days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    return days[date];
  }

  function getMonthName(date) {
    var days = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября' , 'ноября', 'декабря'];

    return days[date];
  }

  function sortWeather(){
    weather.sort(function(a, b){
      return a.date-b.date;
    });
  }

  function createWeatherBlock(dayWeek = 'тест', dayMonth = 'тест', tempDay = 'тест', tempNight = 'тест', imgWeather = '__', other = 'тест'){
    var swiperWrapper = document.querySelector('#weather .swiper-wrapper')
    var swiperSlide = document.createElement('div');    
    var dayWeek = dayWeek;
    var dayMonth = dayMonth;
    var tempDay = tempDay;
    var tempNigth = tempNigth;
    var other = other;

    swiperSlide.classList.add('swiper-slide');
    swiperSlide.innerHTML = '<div class="weatherBlock"><div class="weatherWeekDay">' + dayWeek + '</div><div class="weatherNameDay">' + dayMonth + '</div><div class="weatherImg"><img src="img/weather_'+ imgWeather +'.png" alt=""></div><div class="weatherTemperature"><div class="temperatureDay">Днем ' + tempDay + '<sup class="tempIndex">о</sup></div><div class="temperatureNight">Ночью ' + tempNight + '<sup class="tempIndex">о</sup></div></div><div class="weatherOther">' + other + '</div></div>';

    swiperWrapper.appendChild(swiperSlide);
  }

  

  function preRenderWeather(){
    var initialSlide = 0;
    
    weather.forEach(function(weather, i){
      var weatherDate = new Date(weather.date);
      var weatherMonth = getMonthName(weatherDate.getMonth());//Наименование месяца
      var dayWeek = getWeekDayName(weatherDate.getDay());//Наименование дня недели
      var dayMonth = weatherDate.getDate() + ' ' + weatherMonth;//День месяца
      var tempDay = weather.temperature.day;
      var tempNight = weather.temperature.night;
      var imgWeather;
      var other;

      if (weather.cloudiness == 'Ясно') {
        imgWeather = 'sunny';        
      } else if (weather.cloudiness == 'Облачно') {
        imgWeather = 'cloud';
      }

      if (weather.rain == false && weather.snow == false) {
        other = 'Без осадков';
      }

      if (weather.rain == true && weather.snow == true) {
        other = 'Дождь со снегом';
        imgWeather = 'rain_snow';
      } else if (weather.rain == true && weather.snow == false) {
        other = 'Дождь';
        imgWeather = 'rain';
      } else if (weather.rain == false && weather.snow == true) {
        other = 'Снег';
        imgWeather = 'snow';
      }

      if (dateTime.getDate() ==  weatherDate.getDate()) {
        createWeatherBlock('Сегодня', dayMonth, tempDay, tempNight, imgWeather, other);
        //initialSlide = i;
      } else if(dateTime.getDate() < weatherDate.getDate()){
        createWeatherBlock(dayWeek, dayMonth, tempDay, tempNight, imgWeather, other);
      }

    });

    postRenderWeather(initialSlide);
  }

  function postRenderWeather(initialSlide = 0){

    var mySwiper = new Swiper ('.swiper-container', {      
        wrapperClass: 'swiper-wrapper',    
        // Optional parameters
        direction: 'horizontal',
        loop: false,
        initialSlide: initialSlide,
        slidesPerView: 4,
        slidesPerGroup: 1,
        spaceBetween: 10,
        autoplay: {
          delay: 5000,
        },
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          1280: {
            slidesPerView: 4
          },
          992: {
            slidesPerView: 4
          },
          768: {
            slidesPerView: 3
          },
          480: {
            slidesPerView: 2
          },
          300: {
            slidesPerView: 1
          }
        }
      });
  }

  preRenderWeather();
});
