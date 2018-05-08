import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private products:     Array<any> = [];
  private saveProducts: Array<any> = [];

  private total:   number = 0;
  private perPage: number = 4;
  private page:    number = 1;

  private isDataReady:     boolean = false;
  private isButtonVisible: boolean = false;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getProducts(this.page)
      .subscribe( (res) => {
        this.isDataReady = true;
        this.products = res['entities'];
        this.total = res['total'];
        this.isButtonVisible = true;
        this.getMoreProducts(true);
      });
  }

  getMoreProducts(changesLocked: boolean = false) {
    if (this.products.length >= this.total ) return;
    this.page++;

    if (!this.saveProducts.length && !changesLocked) this.isDataReady = false;

    this.products = this.products.concat(this.saveProducts)
    this.saveProducts = [];

    this.productsService.getProducts(this.page)
      .subscribe( (res) => {
        if (!this.isDataReady) {
          this.products = this.products.concat(res['entities']);
        } else {
          this.saveProducts = res['entities'];
        }
        this.total       = res['total'];
        this.isDataReady = true;
        if (this.products.length >= this.total) this.isButtonVisible = false;
      });
  }


}
