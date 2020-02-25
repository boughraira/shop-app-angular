import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  product={};
  productSub;
  productForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    image: ['', Validators.required],
   
  });
  constructor(private router: Router ,private route:ActivatedRoute, private fb: FormBuilder, private productsService: ProductsService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productsService.editProduct(params.id).subscribe(res => {
       this.product=res;
    });
  });
  }
  updateProduct(id){
    const product = {
      ...this.productForm.value,
      items: this.product
    };
    this.productsService.updateProduct(id,product).subscribe(res=>{
      const snackbar = document.getElementById('snackbar');
      snackbar.innerHTML = 'Product updated successfully';
      snackbar.className = 'show';
      setTimeout(() => {
        snackbar.className = snackbar.className.replace('show', '');
       
        this.router.navigate(['/products']);
      }, 3000);
    });
  }
  

}
