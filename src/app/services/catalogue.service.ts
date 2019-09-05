import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {Category} from "../model/Category.model";

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  public host: string = "http://localhost:8080/";

  constructor(private httpClient: HttpClient) {
  }

  public getProducts(page: number, size: number):Observable<Product> {
    return this.httpClient.get<Product>(this.host + "products?page=" + page + "&size=" + size);
  }

  public deleteResource(url) {
    return this.httpClient.delete(url);
  }
  public doSearchByKeyWord(keyword: string, page: number, size: number) : Observable<Product> {
    return this.httpClient.get<Product>(this.host + "products/search/designation?desc=" + keyword + "&page=" + page + "&size=" + size);
  }

  public findAllByCategory(id: number, page: number, size: number) : Observable<Product>{
    return this.httpClient.get<Product>(this.host + "products/search/byCategory?c=" + id + "&page=" + page + "&size=" + size);
  }

  public findAllCategory() :Observable<Category>{
    return this.httpClient.get<Category>(this.host + "categories");
  }
  public findCategory(id:number) :Observable<Category>{
    return this.httpClient.get<Category>(this.host + "categories/"+id);
  }

  public postData(value)  {
    return this.httpClient.post(this.host+"products",value);
  }

  public getCategoryOfProduct(url:string) :Observable<Category>{
    return this.httpClient.get<Category>(url);
  }

  public editProduct(url,value) {
    return this.httpClient.put(url, value);
  }
  public findProduct(url:string) : Observable<Product>{
    return this.httpClient.get<Product>(url);
  }


}
