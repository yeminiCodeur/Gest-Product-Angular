import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../services/catalogue.service";
import {Router} from "@angular/router";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  categories: any;
  products:any;
  size:number=5;
  currentPage:number=0
  totalPages:number=0
  pages:Array<number>;
  category:any;
  private  currentProduct:any;
  constructor(private service:CatalogueService, private router:Router) { }

  ngOnInit() {
    this.onGetProducts();
    this.service.findAllCategory().subscribe(data =>{
      this.categories=data ;
    },error=>{
      console.log(error);
    })
  }

  onGetProducts() {
    this.service.getProducts(this.currentPage, this.size).subscribe(data =>{
      this.totalPages=data["page"].totalPages;
      this.pages= new Array<number>(this.totalPages);
      this.products=data ;
    },error=>{
      console.log(error);
    })
  }

  onProductPage(i: number) {
    this.currentPage=i;
    this.onGetProducts()
  }

  saveProduct(value) {

    this.service.findCategory(value.category).subscribe(data=>{
      this.category = data
    });
    value = {
      "description": value.description,
      "quantity":value.quantity,
      "price":value.price,
      "category": this.category
    }
    this.service.postData(value).subscribe(d =>{
      this.currentProduct =  d;
    return this.router.navigateByUrl("/new-product");
    });
  }

}
