const { createApp, ref } = Vue

createApp({
    data () {
        return {
            time: '-:--:--',
            date: '-.--.----',
            weather: '',
            capitals: [],
            humidity:'',
            selected: '',
            timezones: [],
        }
    },

     created() {
    setInterval(() => {
      let date = new Date();
      let minutes = date.getMinutes().toString().padStart(2, '0');
      this.time = date.getHours() + ':' + minutes + ':' + date.getSeconds();
    }, 1000);

    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        this.capitals = data.map(country => ({name: country.capital[0], timezone: country.timezones[0]})).filter(capital => capital.name).sort();
      })
      .catch(error => console.error(error));

    setInterval(() => {
      let date = new Date();
      this.date = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();

      let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      this.weekday = weekday[date.getDay()];

      if (this.selected) {
        fetch('http://api.openweathermap.org/data/2.5/weather?q=' + this.selected + '&units=metric&appid=ae6723d77e04d1a23c8cdefbc9ddbe7f')
          .then(response => response.json())
          .then(data => {
            this.weather = data.weather[0].main;
            this.temperature = data.main.temp + '°C';
            this.humidity = data.main.humidity + '%';
          })
          .catch(error => console.error(error));
      }
    }, 1000);
  },
  // other options
}).mount('#app');