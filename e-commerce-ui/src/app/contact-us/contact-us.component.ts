import { Component, OnInit } from '@angular/core';
import { ContactForm } from '../model/contact-form.model';
import { ContactService } from '../services/contact.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent implements OnInit {
  contactForm: ContactForm = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };
  constructor(private contactService: ContactService, private router: Router) {}
  ngOnInit(): void {}

  sendMessage(contactForm: NgForm) {
    this.contactService.saveContactForm(contactForm.value).subscribe({
      next: (response) => {
        this.router.navigate(['/']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error while sending message...', error);
      },
    });
  }
}
