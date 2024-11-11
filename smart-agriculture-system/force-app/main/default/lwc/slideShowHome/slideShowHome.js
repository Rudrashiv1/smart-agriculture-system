import { LightningElement, track } from 'lwc';
import staticResourceURL from '@salesforce/resourceUrl/slideShowImg'; 

export default class CarouselComponent extends LightningElement {
    @track images = [
        { id: 0, url: `${staticResourceURL}/slideShowImg/image0.jpg`, alt: 'Image 0', link: 'https://smart-agriculture-system-dev-ed.develop.my.site.com/SmartFarms/s/' },
        { id: 1, url: `${staticResourceURL}/slideShowImg/image1.jpg`, alt: 'Image 1', link: 'https://www.india.gov.in/spotlight/pm-electric-drive-revolution-innovative-vehicle-enhancement-pm-e-drive' },
        { id: 2, url: `${staticResourceURL}/slideShowImg/image2.jpg`, alt: 'Image 2', link: 'https://isea.gov.in/' },
        { id: 3, url: `${staticResourceURL}/slideShowImg/image3.jpg`, alt: 'Image 3', link: 'https://www.mygov.in/group-issue/inviting-ideas-mann-ki-baat-prime-minister-narendra-modi-24th-november-2024/?target=inapp&type=group_issue&nid=354914' },
        { id: 4, url: `${staticResourceURL}/slideShowImg/image4.jpg`, alt: 'Image 4', link: 'https://krishinivesh.gov.in/' },
        { id: 5, url: `${staticResourceURL}/slideShowImg/image5.jpg`, alt: 'Image 5', link: 'https://www.india.gov.in/spotlight/ayushman-bharat-pradhan-mantri-jan-arogya-yojana' }
    ];
    @track currentIndex = 0;
    @track isPlaying = true;
    intervalId;

    connectedCallback() {
        this.startSlideshow();
    }

    startSlideshow() {
        this.intervalId = setInterval(() => {
            this.nextImage();
        }, 5000);
    }

    stopSlideshow() {
        clearInterval(this.intervalId);
    }

    togglePlay() {
        this.isPlaying = !this.isPlaying;
        if (this.isPlaying) {
            this.startSlideshow();
        } else {
            this.stopSlideshow();
        }
    }

    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateImageClasses();
    }

    previousImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateImageClasses();
    }

    navigateToLink() {
        const image = this.images[this.currentIndex];
        window.open(image.link, '_blank');
    }

    get playButtonLabel() {
        return this.isPlaying ? '❚❚' : '▶';
    }

    updateImageClasses() {
        this.images = this.images.map((image, index) => ({
            ...image,
            class: index === this.currentIndex ? 'carousel-image active' : 'carousel-image'
        }));
    }
}