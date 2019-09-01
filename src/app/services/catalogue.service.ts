import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  public host: string = "http://localhost:8080/";

  constructor(private httpClient: HttpClient) {
  }

  public getProducts(page: number, size: number) {
    return this.httpClient.get(this.host + "products?page=" + page + "&size=" + size);
  }

  public deleteResource(url) {
    return this.httpClient.delete(url);
  }
  public doSearchByKeyWord(keyword: string, page: number, size: number) {
    return this.httpClient.get(this.host + "products/search/designation?desc=" + keyword + "&page=" + page + "&size=" + size);
  }

  public findAllByCategory(id: number, page: number, size: number) {
    return this.httpClient.get(this.host + "products/search/byCategory?c=" + id + "&page=" + page + "&size=" + size);
  }

  public findAllCategory() {
    return this.httpClient.get(this.host + "categories");
  }


}
