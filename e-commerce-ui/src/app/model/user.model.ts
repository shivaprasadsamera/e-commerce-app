export interface UserRole {
  roleName: string;
  roleDescription: string;
}

export interface User {
  userName: string;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPassword: string;
  role: UserRole[];
}
