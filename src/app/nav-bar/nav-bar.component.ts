import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @ViewChild('reservationForm', { static: true }) reservationForm!: NgForm;

  constructor(private http: HttpClient) {}

  onSubmit(form: any): void {
    const contactData = {
      fullName: form.fullName,
      phoneNumber: form.phoneNumber,
      numberOfGuests: form.numberOfGuests,
      dateTime: form.dateTime
    };

    this.http.post('https://localhost:7273/api/Reservation', contactData)
      .subscribe(
        response => {
          console.log('Reservation stored successfully!', response);
          this.reservationForm.resetForm();
        },
        error => {
          console.error('Error storing reservation!', error);
        }
      );
  }
}
