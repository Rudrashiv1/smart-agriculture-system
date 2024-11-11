import { LightningElement, track } from 'lwc';
import getPlantData from '@salesforce/apex/PerenualController.getPlantData';
import getDiseaseData from '@salesforce/apex/PerenualController.getDiseaseData';

export default class PerenualIntegration extends LightningElement {
		@track isEnglish = true;
    @track isHindi = false;
    @track plantData = [];
    @track diseaseData = [];
    @track filteredPlantData = [];
    @track filteredDiseaseData = [];
    @track error;
    @track showPlantTab = true;
    @track showDiseaseTab = false;
    @track plantPage = 1;
    @track diseasePage = 1;
    @track hasMorePlants = true;
    @track hasMoreDiseases = true;
		
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
		get searchLabel() {
        return this.isEnglish ? 'Search' : 'खोज';
    }

    get commonNameLabel() {
        return this.isEnglish ? 'Common Name:' : 'सामान्य नाम:';
    }

    get scientificNameLabel() {
        return this.isEnglish ? 'Scientific Name:' : 'वैज्ञानिक नाम:';
    }

    get otherNamesLabel() {
        return this.isEnglish ? 'Other Names:' : 'अन्य नाम:';
    }

    get cycleLabel() {
        return this.isEnglish ? 'Cycle:' : 'चक्र:';
    }

    get wateringLabel() {
        return this.isEnglish ? 'Watering:' : 'सिंचाई:';
    }

    get sunlightLabel() {
        return this.isEnglish ? 'Sunlight:' : 'धूप:';
    }

    get viewMoreLabel() {
        return this.isEnglish ? 'View More' : 'और देखें';
    }

    get descriptionLabel() {
        return this.isEnglish ? 'Description:' : 'विवरण:';
    }

    get solutionLabel() {
        return this.isEnglish ? 'Solution:' : 'समाधान:';
    }

    connectedCallback() {
        this.fetchPlantData();
        this.fetchDiseaseData();
    }

    fetchPlantData() {
        getPlantData()
            .then(result => {
                this.plantData = result.data.map(plant => ({
                    ...plant,
                    scientific_name: plant.scientific_name.join(', '),
                    other_name: plant.other_name ? plant.other_name.join(', ') : '',
                    sunlight: plant.sunlight.join(', '),
                    default_image: plant.default_image || {}
                }));
                this.filteredPlantData = this.plantData.slice(0, 6);
                this.hasMorePlants = this.plantData.length > 6;
                this.error = undefined;
            })
            .catch(error => {
                this.error = 'Error retrieving plant data';
                this.plantData = [];
                this.filteredPlantData = [];
                this.hasMorePlants = false;
                console.error('Error:', error);
            });
    }

    fetchDiseaseData() {
        getDiseaseData()
            .then(result => {
                this.diseaseData = result.data.map(disease => ({
                    ...disease,
                    scientific_name: disease.scientific_name,
                    description: disease.description.map(desc => desc.description).join(' '),
                    solution: disease.solution.map(sol => sol.description).join(' '),
                    images: disease.images || []
                }));
                this.filteredDiseaseData = this.diseaseData.slice(0, 6);
                this.hasMoreDiseases = this.diseaseData.length > 6;
                this.error = undefined;
            })
            .catch(error => {
                this.error = 'Error retrieving disease data';
                this.diseaseData = [];
                this.filteredDiseaseData = [];
                this.hasMoreDiseases = false;
                console.error('Error:', error);
            });
    }

    handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase();
        if (this.showPlantTab) {
            this.filteredPlantData = this.plantData.filter(plant =>
                plant.common_name.toLowerCase().includes(searchTerm) ||
                plant.scientific_name.toLowerCase().includes(searchTerm)
            ).slice(0, 6);
            this.hasMorePlants = this.filteredPlantData.length < this.plantData.length;
        } else if (this.showDiseaseTab) {
            this.filteredDiseaseData = this.diseaseData.filter(disease =>
                disease.common_name.toLowerCase().includes(searchTerm) ||
                disease.scientific_name.toLowerCase().includes(searchTerm)
            ).slice(0, 6);
            this.hasMoreDiseases = this.filteredDiseaseData.length < this.diseaseData.length;
        }
    }

    showPlants() {
        this.showPlantTab = true;
        this.showDiseaseTab = false;
    }

    showDiseases() {
        this.showPlantTab = false;
        this.showDiseaseTab = true;
    }

    loadMorePlants() {
        const nextPage = this.plantPage + 1;
        const newRecords = this.plantData.slice(0, nextPage * 6);
        this.filteredPlantData = newRecords;
        this.plantPage = nextPage;
        this.hasMorePlants = newRecords.length < this.plantData.length;
    }

    loadMoreDiseases() {
        const nextPage = this.diseasePage + 1;
        const newRecords = this.diseaseData.slice(0, nextPage * 6);
        this.filteredDiseaseData = newRecords;
        this.diseasePage = nextPage;
        this.hasMoreDiseases = newRecords.length < this.diseaseData.length;
    }
}