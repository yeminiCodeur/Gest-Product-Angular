import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../services/catalogue.service";

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
  constructor(private service:CatalogueService) { }

  ngOnInit() {

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
}
