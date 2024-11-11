import { LightningElement, track } from 'lwc';
import retrieveAgricultureNews from '@salesforce/apex/AgricultureNewsController.retrieveAgricultureNews';

export default class AgricultureNewsComponent extends LightningElement {
    @track newsArticles = [];

    connectedCallback() {
        this.fetchNews();
    }

    fetchNews() {
        retrieveAgricultureNews()
            .then(result => {
                //this.newsArticles = result.slice(1, 6);
						      this.newsArticles = result;
            })
            .catch(error => {
                console.error('Error fetching news:', error);
            });
    }
}