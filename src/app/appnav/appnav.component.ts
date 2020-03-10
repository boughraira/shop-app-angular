import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { AuthService } from '../services/auth/auth.service';


@Component({
  selector: 'app-appnav',
  templateUrl: './appnav.component.html',
  styleUrls: ['./appnav.component.css']
})
export class AppnavComponent implements OnInit {
  cart = [];
  users=[];
  navbarOpen = false;
 
  constructor(private productsService: ProductsService , private authService: AuthService) { }

  ngOnInit() {
    this.productsService.getCart().subscribe(data => {
      this.cart = [...data];
    });
    this.authService.getUsers().subscribe(data => {
      this.users = [...data];
    });
  }
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  logout() {
    this.authService.doLogout()
  }

}
