import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../services/catalogue.service";

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
  constructor(private service:CatalogueService) { }

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

    this.onGetProducts();
  }

  getCategory(href:string) {

  }
}
