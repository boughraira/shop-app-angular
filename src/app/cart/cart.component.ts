import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart = [];
  cartTotal = 0;
  constructor(private productsService: ProductsService ,private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient
      .get<any>("http://localhost:3000/api/cart", {
        headers: { "Content-Type": "application/json" }
      }).subscribe(data => {
      this.cart = [...data];
      this.cartTotal = this.cart.reduce((acc, cur) => acc + Number(cur.price), 0);
    });
  }
  removeItemFromCart(id) {
    this.productsService.removeFromCart(id);
   this.cart.splice(id,1);
    this.cartTotal = this.cart.reduce((acc, cur) => acc + Number(cur.price), 0);
    console.log('removed succesfuly');
  }

  
}
