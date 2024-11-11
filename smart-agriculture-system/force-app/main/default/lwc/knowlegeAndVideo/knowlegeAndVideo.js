import { LightningElement, track } from 'lwc';

export default class LanguageComponent extends LightningElement {
    @track isEnglish = true;
    @track isHindi = false;

    // Card Titles
    titleCropSelection = 'Crop Selection';
    titlePlanting = 'Planting';
    titleHarvesting = 'Harvesting';

    // Handle language change
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