import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router) {}

  username: string | null = '';
  ngOnInit() {
    this.username = localStorage.getItem('username');
  }
  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }
}
