import { Component, OnInit, ViewChild } from '@angular/core';
import { User, UserRole } from '../model/user.model';
import { UserService } from '../services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css',
})
export class AllUsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  users = new MatTableDataSource<User>([]);
  userRole: UserRole[] = [];
  displayedColumns: string[] = [
    'userId',
    'userFirstName',
    'userLastName',
    'userEmail',
    'userPassword',
    'role',
  ];
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.getAllUsers();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.users.paginator = this.paginator;
    }
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (response: User[]) => {
        // Admin details did't show in Users table
        const filteredUsers = response.filter(
          (user) => !user.role.some((role) => role.roleName === 'Admin')
        );
        this.users.data = filteredUsers;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
    });
  }
}
