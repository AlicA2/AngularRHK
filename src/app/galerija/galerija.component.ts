import { Component } from '@angular/core';

@Component({
  selector: 'app-galerija',
  templateUrl: './galerija.component.html',
  styleUrls: ['./galerija.component.css']
})
export class GalerijaComponent {
  images: string[] = ['assets/galerija1.PNG','assets/galerija2.PNG','assets/galerija3.PNG','assets/galerija4.PNG','assets/galerija5.PNG','assets/galerija6.PNG','assets/galerija7.PNG','assets/galerija8.PNG','assets/galerija9.PNG','assets/galerija10.PNG','assets/biftek.png', 'assets/curetina.png'];
  showModal: boolean = false;
  selectedImage: string = '';

  openImage(image: string) {
    this.selectedImage = image;
    this.showModal = true;
  }

  closeImage() {
    this.showModal = false;
    this.selectedImage = '';
  }
}
