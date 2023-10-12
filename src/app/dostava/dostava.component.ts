import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MojConfig} from "../moj-config";

@Component({
  selector: 'app-dostava',
  templateUrl: './dostava.component.html',
  styleUrls: ['./dostava.component.css']
})
export class DostavaComponent implements OnInit {
  kategorije: any[];
  odabranaKategorija: any;
  meniUKategoriji: any[];
  sviMeni: any[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.dohvatiKategorije();
    this.dohvatiSveMeni();
  }

  dohvatiKategorije() {
    this.http.get(MojConfig.adresa_servera+'/Kategorija/GetAll').subscribe((data: any) => {
      this.kategorije = data;
    });
  }

  dohvatiSveMeni() {
    this.http.get(MojConfig.adresa_servera+'/Meni/GetAll').subscribe((data: any) => {
      this.sviMeni = data;
    });
  }

  odaberiKategoriju(kategorija: any) {
    this.odabranaKategorija = kategorija;
    this.meniUKategoriji = this.sviMeni.filter(meni => meni.kategorija_id === kategorija.id);
  }
}
