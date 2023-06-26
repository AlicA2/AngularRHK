import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @ViewChild('contactForm', { static: true }) contactForm!: NgForm;

  constructor(private http: HttpClient) {}

  onSubmit(form: any): void {
    const contactData = {
      Email: form.Email,
      Name: form.Name,
      Sadrzaj: form.Sadrzaj
    };

    this.http.post('https://localhost:7273/api/Contact', contactData)
      .subscribe(
        response => {
          console.log('Contact stored successfully', response);
          this.contactForm.resetForm();
        },
        error => {
          console.error('Error storing contact', error);
        }
      );
  }
}
