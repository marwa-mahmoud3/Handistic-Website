import { AddReviewService } from './../Services/ReviewService';
import { CategoryService } from './../Services/CategoryService';
import { CartService } from './../Services/CartService';
import { UserService } from 'src/app/Services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Models/Product';
import { ProductsService } from '../Services/ProductsService';
import { ProductWishlistService } from '../Services/ProductWishlistService';
import { ProductWishlist } from '../Models/ProductWishlist';
import { Category } from '../Models/Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
 
  filterTerm: string;
  products: Product[] = [];
  item: number;
  user: any;
  IsLogin :boolean
  currentCategory:Category;
  constructor(private productWishlistService: ProductWishlistService,
    private UserService: UserService, private productservices: ProductsService,
    private CartService: CartService, private route: ActivatedRoute,private router:Router,
    private _categoryService : CategoryService,private reviewService:AddReviewService,
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
    this.getSelectedPage(1);
    this.UserService.getIdByUserName(localStorage.getItem('username')).subscribe((
      data => {
        this.user = data
      }))
    this.route.paramMap.subscribe(
      params => {
        this.currentCategoryId =+ params.get('id');
        this._categoryService.getCategoryByID(this.currentCategoryId).subscribe(data=>{
          this.currentCategory=data;
        });
        this.productservices.GetProductsByCategoryId
        (this.currentCategoryId).subscribe(data => {
          this.productsCount = data.length;
          if (data.length > 0) {
            this.hasProducts = true;
          }
          else this.hasProducts = false;
          this.numberOfPages = Math.ceil(this.productsCount / this.pageSize);
        })
        this.productservices.getProductsByCategoryPaging(this.currentCategoryId, this.pageSize, 1).subscribe(
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
  currentCategoryId: number;
  hasProducts: boolean = false;

  Reviews:{[id:number]:number}={};

  getProductsPerPage(currentPageNumber: number) {
    this.productservices.getProductsByCategoryPaging(Number(this.route.snapshot.paramMap.get('id')), this.pageSize, currentPageNumber).subscribe(
      data => {
        this.productsPerPage = data
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
