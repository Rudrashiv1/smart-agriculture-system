public without sharing class FeedbackHandler {
    @AuraEnabled
    public static String insertFeedback(String comments, String name) {
        Feedback__c feedback = new Feedback__c();
        feedback.Comments__c = comments;
        feedback.Date__c = Datetime.now().addHours(5).addMinutes(30);  
        
        if (name != null) {
            feedback.Person__c = name;
        }
        insert feedback;
        return 'Feedback Added Successfully';
    }

    @AuraEnabled
    public static List<Feedback__c> showFeedback() {
        return [SELECT Comments__c, Date__c, Names__c, Dates__c FROM Feedback__c ORDER BY Date__c DESC];
    }
}