import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {MessageService} from "../services/message.service";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"]
})
export class OrderComponent implements OnInit {
  orders = [];
  
  constructor(private httpClient: HttpClient, private messageService:MessageService ) {}

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
  message(){
    this.messageService.sendMessage(this.orders.map(order=>order.items)).subscribe(res=>{
      const snackbar = document.getElementById('snackbar');
      snackbar.innerHTML = 'Email sended successfully';
      snackbar.className = 'show';
      setTimeout(() => {
        snackbar.className = snackbar.className.replace('show', '');
      }, 3000);
    });
  }
}
