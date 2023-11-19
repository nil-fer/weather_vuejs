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

        }
    },

    created () {

        fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            this.capitals = data.map(country => country.capital).flat().filter(capital => capital).sort();this.capitals = data.map(country => ({name: country.capital[0], timezone: country.timezones[0]})).filter(capital => capital.name).sort();
        })
        .catch(error => console.error(error));
        
    //     setInterval(() => {
    //         let selectedCapital = this.capitals.find(capital => capital.name === this.selected);
    //     if (selectedCapital) {
    //         let date = new Date().toLocaleString("en-US", {timeZone: selectedCapital.timezone});
    //         date = new Date(date);
    //         this.time = date.toLocaleTimeString();
    //         let minutes = date.getMinutes().toString().padStart(2, '0');
    //         this.time = date.getHours() + ':' + minutes + ':' + date.getSeconds()
    // }}, 1000)

  setInterval(() => {
    if (this.selected) {
        fetch(`http://worldtimeapi.org/api/timezone/Etc/UTC`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('WorldTimeAPI response:', data); // Debug line
            let date = new Date(data.datetime);
            this.time = date.toLocaleTimeString();
        })
        .catch(error => console.error('Error fetching WorldTimeAPI:', error)); // Debug line
    }
}, 1000);

        setInterval(() => {
        let date = new Date()
        this.date = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()

        let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        this.weekday = weekday[date.getDay()]

        // after sth is selected, ask weather api
        fetch('http://api.openweathermap.org/data/2.5/weather?q=' + this.selected + '&units=metric&appid=ae6723d77e04d1a23c8cdefbc9ddbe7f')
        .then(response => response.json())
        .then(data => {
          this.weather = data.weather[0].main;
          this.temperature = data.main.temp + '°C';
          this.humidity = data.main.humidity + '%';
         })
         .catch(error => console.error(error));

      }, 1000)
    },
    
        mounted() {
        this.$nextTick(() => {
            this.$refs.capital_select_text.value = this.selected;
        });
    }
}).mount('#app')

    
        


