import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  product=[];
  productForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    image: ['', Validators.required],
   
  });

  constructor(private router: Router, private fb: FormBuilder, private productsService: ProductsService) { }

  ngOnInit() {
  }
  doAdd() {
    const product = {
      ...this.productForm.value,
      items: this.product
    };
    this.productsService.addProduct(product).subscribe(res => {
      const snackbar = document.getElementById('snackbar');
      snackbar.innerHTML = 'Product added successfully';
      snackbar.className = 'show';
      setTimeout(() => {
        snackbar.className = snackbar.className.replace('show', '');
        this.productsService.clearForm();
        this.router.navigate(['/products']);
      }, 3000);
    });
  }
}
