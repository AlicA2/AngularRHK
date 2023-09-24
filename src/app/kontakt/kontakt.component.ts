// contact-form.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './kontakt.component.html',
  styleUrls: ['./kontakt.component.css']
})
export class KontaktComponent implements OnInit {
  isVisible = false;
  animationStyles = {};

  ngOnInit() {
    // Postavite isVisible i animationStyles prema vašim potrebama
    this.isVisible = true; // Postavite na true ako želite da bude vidljivo
    this.animationStyles = {
      'visibility': 'visible',
      'animation-duration': '1000ms',
      'animation-delay': '300ms',
      'animation-name': 'fadeInDown'
    };
  }
}
