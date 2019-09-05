import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../services/catalogue.service";
import {Router} from "@angular/router";
import {Category} from "../model/Category.model";

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  products:any;
  size:number=5;
  currentPage:number=0
  totalPages:number=0
  pages:Array<number>;
  categories: any;
  category:Category
  constructor(private service:CatalogueService, private router:Router) { }

  ngOnInit() {

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

  onTapeKeyword (value){
    this.service.doSearchByKeyWord(value.keyword,this.currentPage,this.size).subscribe(data =>{
      this.products=data ;
    },error=>{
      console.log(error);
    })
  }

  onProductPage(i: number) {
    this.currentPage=i;
    this.onGetProducts()
  }

  onDeleteProduct(p) {
    let conf=confirm("Etes-vous de supprimer cet element?")
    if (conf){
      this.service.deleteResource(p._links.self.href).subscribe( success=>{
        this.onGetProducts();
      },erro=>{
        console.log(erro)
      });

    }
  }

  onChangeSelect(value) {
    this.service.findAllByCategory(value.id,this.currentPage,this.size).subscribe(data =>{
      this.products=data ;
    },error=>{
      console.log(error);
    })
  }


  getCategory(href:string){
    return this.service.getCategoryOfProduct(href).subscribe(c =>{
      this.category=c
      console.log(this.category);
      return "ok";
    });
  }

  onEditProduct(p) {
    let url =  p._links.self.href;
    return this.router.navigateByUrl("/edit-product/"+ btoa(url));
  }
}
