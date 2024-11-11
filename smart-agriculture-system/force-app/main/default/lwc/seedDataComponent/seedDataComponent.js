import { LightningElement, wire, track } from 'lwc';
import fetchSeedData from '@salesforce/apex/SmartAgricultureFetchData.fetchSeedData';

export default class SeedDisplay extends LightningElement {
    @track seeds;
    @track filteredSeeds;
    error;
    loading = true;

    @wire(fetchSeedData)
    wiredSeedData({ error, data }) {
        this.loading = false;
        if (data) {
            this.seeds = data;
            this.filteredSeeds = data;
            this.error = undefined;
        } else if (error) {
            this.error = error.body.message;
            this.seeds = undefined;
        }
    }

    handleSearch(event) {
        const searchKey = event.target.value.toLowerCase();
        this.filteredSeeds = this.seeds.filter(seed => 
            seed.Name.toLowerCase().includes(searchKey)
        );
    }
}