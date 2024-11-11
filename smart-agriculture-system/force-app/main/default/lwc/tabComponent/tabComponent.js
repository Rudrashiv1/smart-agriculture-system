import { LightningElement, track } from 'lwc';

export default class TabComponent extends LightningElement {
    @track showTools = true;
    @track showSeeds = false;
    @track showManure = false;

    handleTabClick(event) {
        const tabId = event.target.dataset.id;
        this.showTools = tabId === 'tools';
        this.showSeeds = tabId === 'seeds';
        this.showManure = tabId === 'manure';
    }
}