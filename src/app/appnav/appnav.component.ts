import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';


@Component({
  selector: 'app-appnav',
  templateUrl: './appnav.component.html',
  styleUrls: ['./appnav.component.css']
})
export class AppnavComponent implements OnInit {
  cart = [];
  navbarOpen = false;
 
  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getCart().subscribe(data => {
      this.cart = [...data];
    });
  }
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }


}
