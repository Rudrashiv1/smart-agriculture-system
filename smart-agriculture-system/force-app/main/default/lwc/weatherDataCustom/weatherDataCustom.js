import { LightningElement, track } from 'lwc';
import getWeatherData from '@salesforce/apex/WeatherDataIntegration.getWeatherData';

export default class WeatherDataCustom extends LightningElement {
    @track latitude;
    @track longitude;
    @track weatherIcon;
    @track weatherText;
    @track country;
    @track date;
    @track name;
    @track region;
    @track temp;
    @track mapMarkers = [];
    @track zoomLevel = 16;
    @track listView = "visible";
    @track locationAccess = false;
    @track isMapVisible = false; // Track the visibility of the map content

    connectedCallback() {
        this.getLocation();
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.locationAccess = true;
                this.getWeather();
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    getWeather() {
        getWeatherData({ latitude: this.latitude, longitude: this.longitude })
            .then(result => {
                let weatherdata = JSON.parse(result);
                this.weatherIcon = weatherdata.current.condition.icon;
                this.weatherText = weatherdata.current.condition.text;
                this.country = weatherdata.location.country;
                this.date = weatherdata.location.localtime;
                this.name = weatherdata.location.name;
                this.region = weatherdata.location.region;
                this.temp = weatherdata.current.temp_c;
                this.mapMarkers = [
                    {
                        location: {
                            Latitude: this.latitude,
                            Longitude: this.longitude
                        }
                    }
                ];
                console.log(weatherdata);
            })
            .catch(error => {
                console.log(error);
            });
    }

    toggleMapVisibility() {
        this.isMapVisible = !this.isMapVisible;
    }
}