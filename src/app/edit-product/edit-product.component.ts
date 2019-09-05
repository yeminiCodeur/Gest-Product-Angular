import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../services/catalogue.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  url:string
  product:any

  category: any;
  constructor(private  service:CatalogueService,private router:Router,
              private activeRoute:ActivatedRoute
              ) { }

  ngOnInit() {
    this.url=atob(this.activeRoute.snapshot.params.id);
    this.service.findProduct(this.url).subscribe(
        data=>{
          this.product = data
        })
    }

  EditProduct(value: any) {
    this.service.editProduct(this.url, value).subscribe(data=>{
      return this.router.navigateByUrl("/products");
    },error =>{
      console.log(error)
    });

  }
}
