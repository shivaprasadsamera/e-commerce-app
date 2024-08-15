import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ContactService } from '../services/contact.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { ContactForm } from '../model/contact-form.model';

@Component({
  selector: 'app-contacted-users',
  templateUrl: './contacted-users.component.html',
  styleUrl: './contacted-users.component.css',
})
export class ContactedUsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  contactForm = new MatTableDataSource<ContactForm>([]);
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'message'];
  constructor(private contactService: ContactService) {}
  ngOnInit(): void {
    this.getAllContactForms();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.contactForm.paginator = this.paginator;
    }
  }

  getAllContactForms() {
    return this.contactService.getAllContactForms().subscribe({
      next: (response: ContactForm[]) => {
        this.contactForm.data = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error fetching contact forms:', error);
      },
    });
  }
}
