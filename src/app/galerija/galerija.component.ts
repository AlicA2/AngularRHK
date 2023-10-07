import { Component, ViewChild, ElementRef } from '@angular/core';
import {AutentifikacijaHelper} from "../_helpers/autentifikacija-helper";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import {Router} from "@angular/router";
import {LoginInformacije} from "../_helpers/login-informacije";
import {UserAuthService} from "../user-auth.service";
import { MojConfig } from "../moj-config";

@Component({
  selector: 'app-galerija',
  templateUrl: './galerija.component.html',
  styleUrls: ['./galerija.component.css']
})

export class GalerijaComponent {
  @ViewChild('slikaInput') slikaInputRef!: ElementRef<HTMLInputElement>;

  showModal: boolean = false;
  selectedImage: string = '';

  loginInformation = AutentifikacijaHelper.getLoginInfo();

  constructor(private httpKlijent: HttpClient, private sanitizer: DomSanitizer) {}

  openImage(image: string) {
    this.selectedImage = image;
    this.showModal = true;
  }

  closeImage() {
    this.showModal = false;
    this.selectedImage = '';
  }

  slike: any[] = [];
  ngOnInit() {
    this.getSlike();
  }

  getSlike() {
    this.httpKlijent
      .get<string[]>(MojConfig.adresa_servera + '/Galerija/GetAllSlike')
      .subscribe((response) => {
        this.slike = response.map((base64String) =>
          this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + base64String)
        );
      });
  }





  novaSlika:string;
  slikainput:any;
  dodajSliku()
  {
    let podaci = {
      novaSlika: this.novaSlika
    }
    console.log(podaci);
    this.httpKlijent.post(MojConfig.adresa_servera+'/Galerija/DodajSliku', podaci, MojConfig.http_opcije()).subscribe(x=>{
      this.slikainput=null;
      this.ngOnInit();
    });
  }
  // Add this method to handle the picture deletion
  deleteSlika(id: number) {
    this.httpKlijent
      .delete(MojConfig.adresa_servera + `/Galerija/DeleteSlika/${id}`)
      .subscribe(() => {
        this.ngOnInit(); // Refresh the gallery after deletion
      });
  }


  Preview() {
    // @ts-ignore
    var file = document.getElementById("slika-input").files[0];
    if (file) {
      var reader = new FileReader();
      let this2=this;
      reader.onload = function () {
        this2.novaSlika = reader.result?.toString();
      }
      reader.readAsDataURL(file);
    }
  }
}




