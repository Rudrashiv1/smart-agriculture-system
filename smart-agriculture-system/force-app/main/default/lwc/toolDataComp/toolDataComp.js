import { LightningElement, wire, track } from 'lwc';
import fetchToolData from '@salesforce/apex/SmartAgricultureFetchData.fetchToolData';

export default class ToolDisplay extends LightningElement {
    @track tools;
    @track filteredTools;
    error;
    loading = true;

    @wire(fetchToolData)
    wiredToolData({ error, data }) {
        if (data) {
            this.tools = data;
            this.filteredTools = data;
            this.loading = false;
        } else if (error) {
            this.error = error;
            this.loading = false;
        }
    }

    handleSearch(event) {
        const searchKey = event.target.value.toLowerCase();
        this.filteredTools = this.tools.filter(tool => 
            tool.Name.toLowerCase().includes(searchKey)
        );
    }
}