import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createCase from '@salesforce/apex/CaseController.createCase';

export default class ContactCustomerSupport extends LightningElement {
		@track isEnglish = true;
    @track isHindi = false;
    @track subject = '';
    @track description = '';
    @track email = '';
    @track files = [];
		
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

    handleInputChange(event) {
        const field = event.target.dataset.id;
        if (field === 'subject') {
            this.subject = event.target.value;
        } else if (field === 'description') {
            this.description = event.target.value;
        } else if (field === 'email') {
            this.email = event.target.value;
        }
    }

    handleFileChange(event) {
        this.files = event.target.files;
    }

    handleSubmit() {
        createCase({ subject: this.subject, description: this.description, email: this.email, files: this.files })
            .then(result => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Case created successfully!',
                        variant: 'success',
                    }),
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }
}