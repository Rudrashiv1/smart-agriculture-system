import { LightningElement, track } from 'lwc';
import submitFeedback from '@salesforce/apex/SmartAgricultureFetchData.submitFeedback';
import feedbackimg from '@salesforce/resourceUrl/feedbackimg';
import insertFeedback from '@salesforce/apex/FeedbackHandler.insertFeedback';
import showFeedback from '@salesforce/apex/FeedbackHandler.showFeedback';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class FeedbackForm extends LightningElement {
		 @track isEnglish = true;
    @track isHindi = false;
     @track comments;
    @track name;
    @track feedbackData = [];

    handleCommentsChange(event) {
        this.comments = event.target.value;
    }

    handleNameChange(event) {
        this.name = event.target.value;
    }

    handleSubmitClick() {
        if (!this.comments) {
            this.dispatchEvent(new ShowToastEvent({
                title: "You cannot submit empty feedback",
                variant: "warning"
            }));
        } else {
            insertFeedback({ comments: this.comments, name: this.name })
                .then(result => {
                    this.showFeedback();
                    this.comments = '';
                    this.name = '';
                    this.dispatchEvent(new ShowToastEvent({
                        title: "Your feedback was submitted successfully",
                        variant: "success"
                    }));
                }).catch(error => {
                    this.dispatchEvent(new ShowToastEvent({
                        title: "Error submitting feedback",
                        message: error.body.message,
                        variant: "error"
                    }));
                });
        }
    }

    connectedCallback() {
        this.showFeedback();
    }

    showFeedback() {
        showFeedback()
            .then(result => {
                this.feedbackData = result;
            }).catch(error => {
                this.dispatchEvent(new ShowToastEvent({
                    title: "Error loading feedback",
                    message: error.body.message,
                    variant: "error"
                }));
            });
    }
		handleLanguageChange(event) {
        const isChecked = event.target.checked;
        if (isChecked) {
            this.isEnglish = false;
            this.isHindi = true;
        } else {
            this.isEnglish = true;
            this.isHindi = false;
        }
    }
}