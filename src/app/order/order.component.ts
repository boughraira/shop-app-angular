import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {MessageService} from "../services/message.service";
import {ProductsService} from '../services/products.service';
import { Router } from '@angular/router';


@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"]
})
export class OrderComponent implements OnInit {
  orders = [];
  
  constructor(private httpClient: HttpClient,private router: Router, private messageService:MessageService,private productsService:ProductsService ) {}

  ngOnInit() {
    this.httpClient
      .get<any>("http://localhost:3000/api/orders", {
        headers: { "Content-Type": "application/json" }
      })
      .subscribe(data => (this.orders = [...data]));
  }
  totalEarnings(orders) {
    return orders.reduce((acc, cur) => acc + this.orderTotal(cur.items), 0);
  }
  totalItems(orders) {
    return orders.reduce((acc, cur) => acc + cur.items.length, 0);
  }
  orderTotal(items) {
    return items.reduce((acc, cur) => acc + cur.price, 0);
  }
  message(id){
   
    this.messageService.sendMessage(id).subscribe(res=>{
      const snackbar = document.getElementById('snackbar');
      snackbar.innerHTML = 'Email sended successfully';
      snackbar.className = 'show';

      setTimeout(() => {
        snackbar.className = snackbar.className.replace('show', '');
      }, 3000);
    });
  }
  delete(id){
   
    this.productsService.deleteOrder(id).subscribe(res=>{
      this.orders.splice(id, 1);
      const snackbar = document.getElementById('snackbar');
      snackbar.innerHTML = 'Order deleted successfully';
      snackbar.className = 'show';
     
      setTimeout(() => {
        snackbar.className = snackbar.className.replace('show', '');
      }, 3000);
    });
  }
}
