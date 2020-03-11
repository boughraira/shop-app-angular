import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { ProductsService } from '../services/products.service';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart = [];
  cartTotal = 0;
  imagesURL = environment.imagesLink;
 
 quantity=1;

 
  constructor(private productsService: ProductsService ,private httpClient: HttpClient) { }

  ngOnInit() {
    this.productsService.getCart().subscribe(data => {
      this.cart = [...data];
      this.cartTotal = this.cart.reduce((acc, cur) => acc + Number(cur.price), 0);
    });
  }
  removeItemFromCart(id) {
  this.productsService.removeFromCart(id);
   
    this.cartTotal = this.cart.reduce((acc, cur) => acc + Number(cur.price), 0);
    console.log('removed succesfuly');
  }
increment(){
  
  this.quantity+=1;
this.cartTotal +=this.cart.reduce((acc, cur) => acc + Number(cur.price), 0);

}
decrement(){
  if(this.quantity>1){
    this.quantity-=1;
    this.cartTotal -=this.cart.reduce((acc, cur) => acc + Number(cur.price), 0);

  }
}

  
}
