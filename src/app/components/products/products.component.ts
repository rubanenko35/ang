import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { childAnimation } from '../../utils/animation';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less'],
  animations: [ childAnimation ]
})
export class ProductsComponent implements OnInit {
  private products:     Array<any> = [];
  private saveProducts: Array<any> = [];

  private total:   number = 0;
  private perPage: number = 4;
  private page:    number = 1;

  private isDataReady:     boolean = false;
  private isButtonVisible: boolean = false;

  private mockData = [
    {
      'title' : 'test title 1',
  'description' : 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
  'cost' : 249,
  'discountCost' : 199,
  'new' : true,
  'img'  : '/img/prod.png',
},
  {
    'title' : 'test title 2',
  'description' : 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
  'cost' : 249,
  'discountCost' : null,
  'new' : false,
  'img'  : '/img/prod2.png',
},
  {
    'title' : 'test title 3',
  'description' : 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
  'cost' : 125,
  'new' : true,
  'discountCost' : null,
  'img'  : '/img/prod3.png',
},
  {
    'title' : 'test title 4',
  'description' : 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
  'cost' : 111,
  'discountCost' : 90,
  'new' : false,
  'img'  : '/img/prod4.png',
},
  {
    'title' : 'test title 5',
  'description' : 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
  'cost' : 249,
  'discountCost' : null,
  'new' : true,
  'img'  : '/img/prod5.png',
},
  {
    'title' : 'test title 6',
  'description' : 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
  'cost' : 249,
  'discountCost' : null,
  'new' : true,
  'img'  : '/img/prod6.png',
},
  {
    'title' : 'test title 7',
  'description' : 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
  'cost' : 249,
  'discountCost' : null,
  'new' : false,
  'img'  : '/img/prod7.png',
},
  {
    'title' : 'test title 8',
  'description' : 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
  'cost' : 249,
  'discountCost' : null,
  'new' : false,
  'img'  : '/img/prod8.png',
}
]


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
