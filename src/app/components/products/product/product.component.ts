import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {
  @Input() prodCost:         number;
  @Input() prodDiscountCost: number;
  @Input() isNew:            boolean = false;
  @Input() prodTitle:        string = 'Lorem insup';
  @Input() prodDescription:  string = 'Lorem insup';
  @Input() imageLink:        string;

  @ViewChild ('img') img: ElementRef;

  private apiUrl = 'http://127.0.0.1/fr/'; //  TODO change URL
  private isOver: boolean;
  private animation: boolean = false;
  private defaultImage: string = '../../../assets/img_product.png';

  constructor(private renderer: Renderer2) { }

  ngOnInit() {}

  onLoad() {
    this.renderer.setStyle(this.img.nativeElement, 'opacity', 1);
  }

  onImageError() {
    this.img.nativeElement.setAttribute('src', this.defaultImage);
  }

}
