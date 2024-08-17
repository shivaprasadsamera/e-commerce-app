import { Component, OnInit } from '@angular/core';
import { ContactForm } from '../model/contact-form.model';
import { ContactService } from '../services/contact.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  constructor(
    private contactService: ContactService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {}

  sendMessage(contactForm: NgForm) {
    this.contactService.saveContactForm(contactForm.value).subscribe({
      next: (response) => {
        // Show success notification
        this.snackBar.open('Message sent successfully!', 'Close', {
          duration: 3000,
          panelClass: ['custom-snackbar-success'],
        });
        //navigate to home
        this.router.navigate(['/']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error while sending message...', error);
        // Show error notification
        this.snackBar.open(
          'Failed to send message. Please try again.',
          'Close',
          {
            duration: 3000,
            panelClass: ['custom-snackbar-error'],
          }
        );
      },
    });
  }
}
