public with sharing class PerenualController {
    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getPlantData() {
        try {
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint('https://perenual.com/api/species-list?key=sk-lRR2670a2324e38947218&page=1');
            request.setMethod('GET');
            HttpResponse response = http.send(request);
            if (response.getStatusCode() == 200) {
                Map<String, Object> result = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
                return result;
            } else {
                throw new CalloutException('Error from external API: ' + response.getStatus());
            }
        } catch (Exception e) {
            throw new AuraHandledException('Failed to fetch plant data: ' + e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getDiseaseData() {
        try {
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint('https://perenual.com/api/pest-disease-list?key=sk-lRR2670a2324e38947218&page=1');
            request.setMethod('GET');
            HttpResponse response = http.send(request);
            if (response.getStatusCode() == 200) {
                Map<String, Object> result = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
                return result;
            } else {
                throw new CalloutException('Error from external API: ' + response.getStatus());
            }
        } catch (Exception e) {
            throw new AuraHandledException('Failed to fetch disease data: ' + e.getMessage());
        }
    }
}