public without sharing class SmartAgricultureFetchData {
 
    // Get the seeds data
    @AuraEnabled(cacheable=true)
    public static List<Seed__c> fetchSeedData() {
        List<Seed__c> seedData = [
            SELECT Id, Name, Description__c, Seed_Image__c, More_Info__c, Image_Url__c FROM Seed__c
        ];
        return seedData;
    }
    //Get Fertilizer Data
    @AuraEnabled(cacheable=true)
    public static List<Manuer__c> fetchManuerData() {
        List<Manuer__c> manuerData = [
            Select id, Name, Manner_Image__c, More_Info__c,Description__c, Image_Url__c from Manuer__c 
        ];
        return manuerData;
    }
    //Get tool Data
    @AuraEnabled(cacheable=true)
    public static List<Tool__c> fetchToolData() {
        List<Tool__c> toolData = [
            select id, Name, Tool_Image__c,   More_Info__c, Description__c, Image_Url__c from Tool__c 
        ];
        return toolData;
    }
    //getFeedback/Suggestions
    @AuraEnabled
    public static String submitFeedback(String fullName, String email, Integer rating, String comments, String feedbackType, Boolean recommend) {
        try {
            Feedback__c feedback = new Feedback__c();
            feedback.FullName__c = fullName;
            feedback.Email__c = email;
            feedback.Rating__c = rating;
            feedback.Comments__c = comments;
            feedback.FeedbackType__c = feedbackType;
            //feedback.Recommend__c = recommend;
            
            insert feedback;
            return 'Thank you for your suggestion/feedback!';
        } catch (Exception e) {
            throw new AuraHandledException('Error while submitting feedback: ' + e.getMessage());
        }
    }
}
  

/*
public with sharing class SmartAgricultureFetchData {
    @AuraEnabled
    public static List<SeedWrapper> fetchSeedData() {
        List<Seed__c> seeds = [SELECT Id, Name, Description__c, Seed_Image__c, More_Info__c FROM Seed__c];
        List<SeedWrapper> seedWrappers = new List<SeedWrapper>();
        
        for (Seed__c seed : seeds) {
            String imageUrl = extractImageUrl(seed.Seed_Image__c);
            seedWrappers.add(new SeedWrapper(seed, imageUrl));
        }
        
        return seedWrappers;
    }
    
    public static String extractImageUrl(String richText) {
        if (String.isNotBlank(richText)) {
            Matcher m = Pattern.compile('<img[^>]+src="([^">]+)"').matcher(richText);
            if (m.find()) {
                return m.group(1);
            }
        }
        return null;
    }
    
    public class SeedWrapper {
        @AuraEnabled
        public Seed__c seed { get; set; }
        @AuraEnabled
        public String imageUrl { get; set; }
        
        public SeedWrapper(Seed__c seed, String imageUrl) {
            this.seed = seed;
            this.imageUrl = imageUrl;
        }
    }
}
*/