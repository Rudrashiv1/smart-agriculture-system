public with sharing class FeedbackController {
       @AuraEnabled
       public static Feedback__c saveFeedback(String name, String comment) {
           try{ Feedback__c feedback = new Feedback__c();
           feedback.Person__c = name;
           feedback.Comments__c = comment;
           feedback.Date__c= Datetime.now();
           insert feedback;
           return feedback;
              }          
           catch (Exception e) {
            System.debug('Error saving feedback: ' + e.getMessage());
            throw new AuraHandledException('Error saving feedback: ' + e.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<Feedback__c> getFeedbacks() {
        return [SELECT Id, Names__c, Comments__c, Date__c, Dates__c FROM Feedback__c ORDER BY Date__c DESC];
    }
   }