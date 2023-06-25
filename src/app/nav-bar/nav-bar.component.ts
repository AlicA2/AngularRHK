import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  onSubmit() {
    const customerName = (document.getElementById('customerName') as HTMLInputElement).value;
    const phoneNumber = (document.getElementById('phoneNumber') as HTMLInputElement).value;
    const guests = (document.getElementById('guests') as HTMLInputElement).value;
    const message = (document.getElementById('message') as HTMLTextAreaElement).value;

    console.log('Ime i prezime:', customerName);
    console.log('Broj telefona:', phoneNumber);
    console.log('Broj mjesta:', guests);
    console.log('Poruka:', message);

    // Ovdje možete dodati prilagođeni kod za obradu rezervacije, kao što je slanje podataka na poslužitelj ili spremanje u lokalnu pohranu

    // Opcionalno: Poništite unesene vrijednosti obrasca
    (document.getElementById('customerName') as HTMLInputElement).value = '';
    (document.getElementById('phoneNumber') as HTMLInputElement).value = '';
    (document.getElementById('guests') as HTMLInputElement).value = '';
    (document.getElementById('message') as HTMLTextAreaElement).value = '';
  }
}
