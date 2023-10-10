import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MojConfig } from "../moj-config";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { LoginInformacije } from "../_helpers/login-informacije";
import { UserAuthService } from "../user-auth.service";
import {DomSanitizer} from "@angular/platform-browser";
import {AutentifikacijaHelper} from "../_helpers/autentifikacija-helper";

declare function porukaSuccess(a: string): any;
declare function porukaError(a: string): any;

@Component({
  selector: 'app-meni',
  templateUrl: './meni.component.html',
  styleUrls: ['./meni.component.css']
})
export class MeniComponent implements OnInit {
novaForma:boolean=false;

kategorije:any;
menii:any;
kategorija={
  Naziv:''
};
meni={
  Naziv:'',
  Opis:'',
  Cijena:0,
  kategorija_id:1
};

  constructor(private httpKlijent: HttpClient,
              private router: Router,
              private loginInformacije: LoginInformacije,
              private userAuthService: UserAuthService,
              private sant:DomSanitizer) { }
// Dodajte ovu funkciju u vaš TypeScript fajl
  getJelaByKategorija(kategorijaId: number) {
    return this.menii.filter((prikaz: any) => prikaz.kategorija_id === kategorijaId);
  }

  ngOnInit(): void {
    this.GetKategorije();
    this.menii=this.GetMeni();
  }

  otvoriFormu: boolean = false;


  SpasiMeni() {
    if(!this.ValidirajMeni())
    {
      return;
    }
    this.httpKlijent.post(MojConfig.adresa_servera+"/Meni/DodajMeni",this.meni)
      .subscribe((x)=>{
        porukaSuccess("Uspjesno dodan meni");
        this.GetMeni();
        this.GetKategorije();
        this.resetirajFormuMenia();
      },(y)=>{
        porukaError("Greska");
      })
  }
resetirajFormuMenia()
{
  this.meni=
    {
      Naziv:'',
      Opis:'',
      Cijena:0.00,
      kategorija_id:1
    }
}
  loginInformation = AutentifikacijaHelper.getLoginInfo();
GetMeni()
{
  this.httpKlijent.get(MojConfig.adresa_servera+"/Meni/GetAll")
    .subscribe(x=>{
      this.menii=x;
      console.log("Data received from server:", x);
      console.log("menii array:", this.menii);
    })
}
SpasiKategoriju()
{
  if(!this.ValidirajKategoriju())
  {
    return;
  }
  this.httpKlijent.post(MojConfig.adresa_servera+"/Kategorija/DodajKategoriju",this.kategorija)
    .subscribe((x)=>{
      porukaSuccess("Uspjesno dodana kategorija");
      this.GetMeni();
      this.GetKategorije();
      this.resetirajFormuKategorije();
    },(y)=>{
      porukaError("Greska");
    })
}
resetirajFormuKategorije()
{
  this.kategorija=
    {
      Naziv:''
    }
}
ValidirajKategoriju()
{
  if (!this.kategorija.Naziv) {
    porukaError("Molimo popunite polje.");
    return false;
  }
  return true;
}
  getCategorieName(kategorija_id: number): string {
    const kategorija = this.kategorije.find((k:any) => k.id === kategorija_id);
    return kategorija ? kategorija.naziv : 'N/A';
  }
  ValidirajMeni()
  {
    if (!this.meni.Opis||!this.meni.Naziv||!this.meni.Cijena||!this.meni.kategorija_id) {
      porukaError("Molimo popunite polje.");
      return false;
    }
    return true;
  }
GetKategorije()
{
  this.httpKlijent.get(MojConfig.adresa_servera+"/Kategorija/GetAll")
    .subscribe(x=>{
      this.kategorije=x;
      console.log(this.kategorije);
    })
}
}
