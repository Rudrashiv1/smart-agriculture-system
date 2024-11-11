public with sharing class AgricultureNewsController {
    @AuraEnabled(cacheable=true)
    public static List<NewsArticle> retrieveAgricultureNews() {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://newsapi.org/v2/everything?q=agriculture&apiKey=c9541031c5884a698005b08c9c184384');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        if (response.getStatusCode() == 200) {
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            List<Object> articles = (List<Object>) results.get('articles');
            List<NewsArticle> newsArticles = new List<NewsArticle>();
            for (Object articleObj : articles) {
                Map<String, Object> article = (Map<String, Object>) articleObj;
                newsArticles.add(new NewsArticle(
                    (String) article.get('title'), 
                    (String) article.get('description'), 
                    (String) article.get('urlToImage')
                ));
            }
            return newsArticles;
        } else {
            throw new AuraHandledException('Failed to retrieve news');
        }
    }
    
    public class NewsArticle {
        @AuraEnabled public String title;
        @AuraEnabled public String description;
        @AuraEnabled public String imageUrl;
        
        public NewsArticle(String title, String description, String imageUrl) {
            this.title = title;
            this.description = description;
            this.imageUrl = imageUrl;
        }
    }
}