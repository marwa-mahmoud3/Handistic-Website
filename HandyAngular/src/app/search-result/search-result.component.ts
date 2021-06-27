import { AddReviewService } from './../Services/ReviewService';
import { Component, OnInit } from '@angular/core';
import { Product } from '../Models/Product';
import { ProductsService } from '../Services/ProductsService';
import { ProductWishlistService } from '../Services/ProductWishlistService';
import { UserService } from 'src/app/Services/user.service';
import { CartService } from '../Services/CartService';
import { ProductWishlist } from '../Models/ProductWishlist';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  filterTerm: string;
  products: Product[] = [];
  item: number;
  user: any;
  IsLogin :boolean
  constructor(private productWishlistService: ProductWishlistService,
    private UserService: UserService, private productservices: ProductsService,private reviewService:AddReviewService,
    private CartService: CartService, private route: ActivatedRoute,private router:Router
  ) {
  }

  ngOnInit(): void {
    if(localStorage.getItem('username') != undefined)
    {
      this.IsLogin =false;
    }
    else{
      this.IsLogin =true;
    }
    this.UserService.getIdByUserName(localStorage.getItem('username')).subscribe((
      data => {
        this.user = data
      }))
      this.getSelectedPage(1);
    this.route.paramMap.subscribe(
      params => {
        this.currentKeyWord = params.get('searchKey');
        this.productservices.getCountBySearch(this.currentKeyWord).subscribe(data => {
          this.productsCount = data;
          if (data > 0) {
            this.hasProducts = true;
          }
          else this.hasProducts = false;
          this.numberOfPages = Math.ceil(this.productsCount / this.pageSize);
        })
        this.productservices.getProductsBySearchPagination(this.currentKeyWord, this.pageSize, 1).subscribe(
          data => {
            this.productsPerPage = data
            this.currentPageNumber = 1;
          },
          error => {
            this.errorMsg = error;
          }
        )
      }
    )
  }

  /**** WishList ****/
  public productWishlist;
  AddToWishList(id) {
    if(localStorage.getItem('username')!=undefined)
    {
      this.UserService.getIdByUserName(localStorage.getItem('username')).subscribe(
      data => {
        this.user = data;
        this.productWishlistService.GetWishlistByUserId(this.user.id).subscribe(
          product => {
            this.productWishlist = new ProductWishlist(id, product.id);
            this.productWishlistService.CreateProductWishlist(this.productWishlist).subscribe(
            );
          }
        )
      })
    
      location.reload();
        }
    else{
      this.router.navigate(["/Login"]);
    }
  }


  public createImgPath = (serverPath: string) => {
    return `https://localhost:44339/${serverPath}`;
  }

  AddItemToCart(productId: number) {
    if(this.user !=null)
    {
      this.CartService.addItemToCart(this.user.id, productId, null).subscribe();
      location.reload();
    }
    else{
      this.router.navigate(["/Login"]);
    }
  }

  counter(i: number) {
    return new Array(i);
  }
  //pagination 
  errorMsg: string;
  productsPerPage: Product[];
  pageSize: number = 8;
  productsCount = 0
  currentPageNumber: number = 1;
  numberOfPages: number;
  currentKeyWord: string;
  hasProducts: boolean = false;

  Reviews:{[id:number]:number}={};

  getProductsPerPage(currentPageNumber: number) {
    this.productservices.getProductsBySearchPagination(this.route.snapshot.paramMap.get('searchKey'), this.pageSize, currentPageNumber).subscribe(
      data => {
        console.log("sdasfsddf")
        data.forEach(element => {
          this.reviewService.averagerRating(element.id).subscribe(
            num=>
            {
              if(this.Reviews[element.id]!= Number(num))
              {
                this.Reviews[element.id]= Number(num)
              }
            }
          )
        })
        this.productsPerPage = data
        this.currentPageNumber = currentPageNumber;
      },
      error => {
        this.errorMsg = error;
      }
    )
  }

  getSelectedPage(currentPageNumber: number) {
    this.getProductsPerPage(currentPageNumber);
  }
  hasDiscount(product: Product) {
    return product.discount > 0;
  }

  getPriceAfterDiscount(prouct: Product) {
    let res = prouct.unitPrice;
    res -= prouct.unitPrice * (prouct.discount / 100.0);
    return Math.ceil(res);
  }
}