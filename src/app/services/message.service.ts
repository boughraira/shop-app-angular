import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }
  sendMessage(id) {
    return this.http.post(`http://localhost:3000/api/sendmail/${id}`,{
      headers: { "Content-Type": "application/json" }
    });
  }
}
