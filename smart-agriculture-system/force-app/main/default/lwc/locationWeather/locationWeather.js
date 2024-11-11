import { LightningElement, track } from 'lwc';

export default class LocationWeather extends LightningElement {
    @track latitude;
    @track longitude;
    @track weather;
    @track locationAccess = false;
		
		@track result;
    @track imageURL;
    @track date;

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.locationAccess = true;
               // this.getWeather();
								this.getWeather2();
								console.log(data);
								console.log(`dekho jara`, endPoint);
								
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    async getWeather() {
        const apiKey = 'ce9c13a101bc284dcfa11d20751cca65';
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        this.weather = `${data.weather[0].description}, ${Math.round(data.main.temp - 273.15)}°C`;
    }
		
		
    async getweather2() {
        let endPoint = `https://api.weatherapi.com/v1/current.json?key=6388b321ff7a4f239de125943230612&q=${this.latitude}&${this.longitude}`;
				
 
                    fetch(endPoint, {
                        method: 'GET'
                    })
                        .then((response) => response.json())
                        .then((data1) => {
                            console.log('Weather data:', data1);
                            this.result1 = data1;
                            this.imageURL = this.result1.current.condition.icon;
												    this.date = this.result1.location.localtime;
                           
                        })
                        .catch((error) => {
                            console.error('Error fetching weather data:', error);
                        });
		}
				 
}