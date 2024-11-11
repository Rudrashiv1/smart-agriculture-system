public with sharing class CaseController {
    @AuraEnabled
    public static Case createCase(String subject, String description, String email, List<Attachment> files) {
        Case newCase = new Case(
            Subject = subject,
            Description = description,
            SuppliedEmail = email
        );
        insert newCase;

        // Handle file attachments if any
        if (files != null && !files.isEmpty()) {
            for (Attachment file : files) {
                file.ParentId = newCase.Id;
                insert file;
            }
        }

        // Send notification email
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setToAddresses(new String[] { email });
        mail.setSubject('Case Created');
        mail.setPlainTextBody('Your case has been created successfully.');
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });

        return newCase;
    }
}