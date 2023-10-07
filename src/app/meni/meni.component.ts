import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MojConfig } from "../moj-config";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { LoginInformacije } from "../_helpers/login-informacije";
import { UserAuthService } from "../user-auth.service";
import {DomSanitizer} from "@angular/platform-browser";

declare function porukaSuccess(a: string): any;
declare function porukaError(a: string): any;

@Component({
  selector: 'app-meni',
  templateUrl: './meni.component.html',
  styleUrls: ['./meni.component.css']
})
export class MeniComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  constructor(private httpKlijent: HttpClient,
              private router: Router,
              private loginInformacije: LoginInformacije,
              private userAuthService: UserAuthService,
              private sant:DomSanitizer) { }

  ngOnInit(): void {
  }

  otvoriFormu: boolean = false;
  meniAddVM: {
    Naziv: string,
    Opis: string,
    Cijena: number,
    Slika: string
  } = {
    Naziv: '',
    Opis: '',
    Cijena: 0,
    Slika: ''
  }

  SpasiMeni() {
    if (!this.validateForm()) {
      if (!this.base64string) {
        return;
      }
    }
    console.log(this.meniAddVM);

  }

  resetForm() {
    this.meniAddVM = {
      Naziv: '',
      Opis: '',
      Cijena: 0,
      Slika: ''
    };
    this.base64string = ''; // Clear the Base64 string when resetting the form.
  }

  validateForm() {
    if (!this.meniAddVM.Naziv || !this.meniAddVM.Opis || !this.meniAddVM.Cijena) {
      porukaError("Molimo popunite sva polja.");
      return false;
    }
    return true;
  }

  base64string: string = '';
  url: string = "./assets/biftek.png";

  onSelectFile(e: any) {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.base64string = this.url.split(',')[1];
        console.log('Base64 Data:', this.base64string);
      };
    }
  }
  fileSelected?:Blob;
  imageUrl?:string;
  onSelectNewFile(): void {
    if (this.fileInput && this.fileInput.nativeElement.files) {
      this.fileSelected = this.fileInput.nativeElement.files[0];
      this.imageUrl = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileSelected)) as string;
      console.log(this.base64string);
    }
  }
  ConvertToBase64()
  {
    let reader=new FileReader();
    reader.readAsDataURL(this.fileSelected as Blob);
    reader.onloadend=()=>{
      this.base64string= reader.result as string;
    }
  }
}
