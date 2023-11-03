import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserAuthService} from "../user-auth.service";
import {MojConfig} from "../moj-config";
import {AutentifikacijaHelper} from "../_helpers/autentifikacija-helper";

declare function porukaSuccess(a: string):any;
declare function porukaError(a: string):any;
@Component({
  selector: 'app-rezervacija',
  templateUrl: './rezervacija.component.html',
  styleUrls: ['./rezervacija.component.css']
})
export class RezervacijaComponent implements OnInit {
  loginInformation = AutentifikacijaHelper.getLoginInfo();
  timeOptions: string[] = [];
  minDate: string;
  constructor(private httpKlijent: HttpClient, private userAuthService: UserAuthService) {
    for (let hour = 8; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        this.timeOptions.push(formattedTime);
      }
    }
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    this.minDate = `${year}-${month}-${day}`;
  }

  onTimeChange(event: any) {
    const selectedTime = event.target.value;
    const selectedTimeParts = selectedTime.split(':');

  }

  ngOnInit(): void {
    this.DohvatiRezervacije();
  }
  rezervacija: any = {
    Ime: '',
    Prezime: '',
    DatumRezervacije: '',
    Vrijeme: '',
    BrojOsoba: '',
    Rezervisano:false
  };
  sveRezervacije:any;
  DohvatiRezervacije()
  {
    this.httpKlijent.get(MojConfig.adresa_servera+"/Rezervacija/SveRezervacije")
      .subscribe(x=>{
        this.sveRezervacije=x;
      })
  }
Slanje()
{
  const datumRezervacije = new Date(this.rezervacija.DatumRezervacije);
  const timeParts = this.rezervacija.Vrijeme.split(':');
  const hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);

  this.rezervacija.Vrijeme = new Date(
    datumRezervacije.getFullYear(),
    datumRezervacije.getMonth(),
    datumRezervacije.getDate(),
    hours,
    minutes
  );
  console.log(this.rezervacija);
this.httpKlijent.post(MojConfig.adresa_servera+"/Rezervacija/DodajRezervaciju",this.rezervacija)
  .subscribe(x=>{
    porukaSuccess("Uspjesno");
  },y=>{
    porukaError("Greska");
  })
}

  updateRezervisano(id: number, newValue: boolean) {
    console.log(id+" "+newValue);
    this.httpKlijent.put(MojConfig.adresa_servera+"/Rezervacija/UpdateRezervisano/"+id,newValue)
      .subscribe(
        (response) => {
          porukaSuccess(`Rezervisano status updateovan na ${newValue}`);
        },
        (error) => {
          porukaError(`Error updateovanje Rezervisanog statusa: ${error}`);
        }
      );
  }


}
