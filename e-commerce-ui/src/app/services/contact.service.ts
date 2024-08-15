import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactForm } from '../model/contact-form.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private httpClient: HttpClient) {}

  saveContactForm(contactForm: ContactForm): Observable<any> {
    return this.httpClient.post<any>(
      'http://localhost:8585/api/contact/submitContactForm',
      contactForm
    );
  }

  getAllContactForms(): Observable<ContactForm[]> {
    return this.httpClient.get<ContactForm[]>(
      'http://localhost:8585/api/contact/getAllContactForms'
    );
  }
}
