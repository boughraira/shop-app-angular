import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { HttpClient } from "@angular/common/http";

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from "rxjs";
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  product=[];
  productSub;
  selectedFile:File;
   

  productForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required]  
  })
 
  constructor(private router: Router,private httpClient: HttpClient, private fb: FormBuilder, private productsService: ProductsService) { 
    this.productSub = new BehaviorSubject<any[]>(this.product);
  }

  ngOnInit() {

    
  }
  addProduct(selectedFile: File, data) {
    const uploadData = new FormData();
    const payload = {image: selectedFile, ...data};
    const keys = Object.keys(payload);
    
    for (const key of keys) {
      uploadData.append(key, payload[key]);
    }    
   
    return this.httpClient.post(`http://localhost:3000/api/product`,uploadData,{
      reportProgress: true,
      observe: 'events'
    });
  }

  clearForm() {
    this.productSub.next([]);
  }
  
  doAdd() {    
    const product = {
      ...this.productForm.value,
      items: this.product,
    };

    this.addProduct(this.selectedFile, product).subscribe(res => {
      console.log(res);
      const snackbar = document.getElementById('snackbar');
      snackbar.innerHTML = 'Product added successfully';
      snackbar.className = 'show';
    
      setTimeout(() => {
        snackbar.className = snackbar.className.replace('show', '');
        this.clearForm();
        this.router.navigate(['/products']);
      }, 3000);
    });
    
  }
  onChangeFile(ev){
    this.selectedFile=ev.target.files[0];
   console.log(this.selectedFile)   ;
  }
}
