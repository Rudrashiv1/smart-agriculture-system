import { LightningElement, wire, track } from 'lwc';
import fetchManuerData from '@salesforce/apex/SmartAgricultureFetchData.fetchManuerData';

export default class ManuerDisplay extends LightningElement {
    @track manuers;
    @track filteredManuers;
    error;
    loading = true;

    @wire(fetchManuerData)
    wiredManuerData({ error, data }) {
        if (data) {
            this.manuers = data;
            this.filteredManuers = data;
            this.loading = false;
        } else if (error) {
            this.error = error;
            this.loading = false;
        }
    }

    handleSearch(event) {
        const searchKey = event.target.value.toLowerCase();
        this.filteredManuers = this.manuers.filter(manuer => 
            manuer.Name.toLowerCase().includes(searchKey)
        );
    }
}