import { LightningElement } from 'lwc';
import staticResourceURL from '@salesforce/resourceUrl/govtSchemeImg'; 
 
export default class CarouselSlider extends LightningElement {
    // List of image objects containing image name, URL, and a link
    images = [
				{ name: 'Sathi', url: `${staticResourceURL}/govtSchemeImg/saathi.png`, link: 'https://seedtrace.gov.in/ms014/' },
				{ name: 'Kisan Call Center', url: `${staticResourceURL}/govtSchemeImg/kishan-call-center.png`, link: 'https://dackkms.gov.in/' },
        { name: 'Krishi Mapper', url: `${staticResourceURL}/govtSchemeImg/krishimapper.png`, link: 'https://krishimapper.dac.gov.in/' },
        { name: 'PM Kisan Samman Nishi', url: `${staticResourceURL}/govtSchemeImg/pmksn.png`, link: 'https://pmkisan.gov.in/' },
        { name: 'PM Fasal Bima Yojna', url: `${staticResourceURL}/govtSchemeImg/pmfby.png`, link: 'https://pmfby.gov.in/' },
        { name: 'Nation Food Security Mission', url: `${staticResourceURL}/govtSchemeImg/nfsm.png`, link: 'https://www.nfsm.gov.in/' },
        { name: 'Nation Bamboo Mission', url: `${staticResourceURL}/govtSchemeImg/bamboo.png`, link: 'https://nbm.da.gov.in/' },
        { name: 'Soil Health Card', url: `${staticResourceURL}/govtSchemeImg/soilhealth2.png`, link: 'https://soilhealth.dac.gov.in/home' },
        { name: 'NHB Inspection', url: `${staticResourceURL}/govtSchemeImg/nhb.png`, link: 'https://nhb.gov.in/Default.aspx?enc=3ZOO8K5CzcdC/Yq6HcdIxJhqz7e6GQcTK1J92dLzA2o=' },
        { name: 'Agroforestry', url: `${staticResourceURL}/govtSchemeImg/agroforestry.png`, link: 'https://agriwelfare.gov.in/Documents/Operational%20Guidelines%20of%20AGROFOREST%20Y%20under%20RKVY.pdf' }
    ];
 
    currentIndex = 0; // Index to keep track of the first image shown
 
    get displayedImages() {
        // Show 4 images at a time
        return this.images.slice(this.currentIndex, this.currentIndex + 4).map((image,index)=>{
						return{
								...image,
								backgrroundClass:(index %4 <2)?'bg-color-1' : 'bg-color-2'
						};
				});
    }
 
    handleNext() {
        if (this.currentIndex + 4 < this.images.length) {
            this.currentIndex += 4;
        }
    }
 
    handlePrevious() {
        if (this.currentIndex - 4 >= 0) {
            this.currentIndex -= 4;
        }
    }
		
		//for background
		/*
		getBackgroundClass(index){
				return(index %4<2) 
		}
		*/
		findYourScheme(){
				window.open('https://smart-agriculture-system-dev-ed.develop.my.site.com/SmartFarms/s/governmentschemes');

		}
}