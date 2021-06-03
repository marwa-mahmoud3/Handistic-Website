import { ProductsService } from './../../Services/products.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Shared/Product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: Product [] = [];
  productList: Product []=[];
  item :number;
  constructor(private HomeService: ProductsService , private productservices: ProductsService) {
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productservices.getAllProducts()
        .subscribe(
            (products: any[]) => {
                this.products = products;
                this.products.forEach(product => {
                    this.productList.push(product);
                })
            },
        );
}
}
