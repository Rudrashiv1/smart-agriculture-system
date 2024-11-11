public class WeatherDataIntegration {
    
    @AuraEnabled
    /*public static string getWeatherData(string city){
        HttpRequest req = new HttpRequest();
        req.setEndPoint('callout:WeatherApiNC/current.json?q='+city);
        req.setMethod('GET');
        HttpResponse res = new HttpResponse();
        Http http = new Http();
        res = http.send(req);
        system.debug(res);
        return res.getBody();
    }*/
     public static string getWeatherData(Double latitude, Double longitude){
        HttpRequest req = new HttpRequest();
        req.setEndPoint('https://api.weatherapi.com/v1/current.json?key=b04d610d65ea409088b92538240411&q=' + latitude + ',' + longitude);
        req.setMethod('GET');
        HttpResponse res = new HttpResponse();
        Http http = new Http();
        res = http.send(req);
        system.debug(res);
        return res.getBody();
    }

}