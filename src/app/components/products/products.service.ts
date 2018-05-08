import { Injectable, OnInit } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductsService {

  constructor(protected http: HttpService) {}

  public getProducts(_page = 1, _per_page = 4): Observable<any> {
    return this.http.getData('/fr/list.php', { query: { page: _page, per_page: _per_page } });
  }





}
