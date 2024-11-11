import { LightningElement, track } from 'lwc';
import saveFeedback from '@salesforce/apex/FeedbackController.saveFeedback';
import getFeedbacks from '@salesforce/apex/FeedbackController.getFeedbacks';

export default class FeedbackComponent extends LightningElement {
    @track name = '';
    @track comment = '';
    @track feedbacks = [];
    @track errorMessage = '';

    connectedCallback() {
        this.loadFeedbacks();
    }

    handleNameChange(event) {
        this.name = event.target.value;
    }

    handleCommentChange(event) {
        this.comment = event.target.value;
    }

    handleSubmit() {
        if (!this.comment) {
            this.errorMessage = 'Feedback cannot be blank';
            return;
        }
        this.errorMessage = '';
        saveFeedback({ name: this.name, comment: this.comment })
            .then(result => {
						 loadFeedbacks() 
                const newFeedback = {
                    Id: result.Id,
                    Name__c: this.name || 'Unknown',
                    Comments__c: this.comment,
                    Date__c: new Date().toISOString()
                };
                this.feedbacks = [newFeedback, ...this.feedbacks];
                this.name = '';
                this.comment = '';
            })
            .catch(error => {
                console.error('Error saving feedback:', error);
            });
    }

    loadFeedbacks() {
        getFeedbacks()
            .then(result => {
                this.feedbacks = result.map(feedback => {
                    return {
                        ...feedback,
                        displayName: feedback.Name__c ? feedback.Name__c : 'Unknown'
                    };
                });
            })
            .catch(error => {
                console.error('Error loading feedbacks:', error);
            });
    }
}


/*
 import { LightningElement, track } from 'lwc';

export default class FeedbackComponent extends LightningElement {
    @track feedback = '';
    @track feedbackList = [];

    handleFeedbackChange(event) {
        this.feedback = event.target.value;
    }

    handleSubmit() {
        if (this.feedback) {
            const newFeedback = {
                id: this.feedbackList.length + 1,
                text: this.feedback,
                date: new Date().toISOString().split('T')[0] // Current date in YYYY-MM-DD format
            };
            this.feedbackList = [...this.feedbackList, newFeedback];
            this.feedback = '';
        }
    }
}
	 
	 */