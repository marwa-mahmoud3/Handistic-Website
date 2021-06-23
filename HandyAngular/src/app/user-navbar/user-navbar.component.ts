import { ProductWishlistService } from './../Services/ProductWishlistService';
import { BillingDetailsService } from './../Services/BillingDetailsService';
import { ClientNotifyService } from './../Services/ClientNotifyService';
import { Notification } from './../Models/Notification';
import { NotificationService } from './../Services/notification.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from '../Models/CartItem';
import { Product } from '../Models/Product';
import { Users } from '../Models/Users';
import { ApiService } from '../Services/api.service';
import { CartService } from '../Services/CartService';
import { ProductsService } from '../Services/ProductsService';
import { sellerService } from './../Services/sellerService';
import { UserService } from '../Services/user.service';
import { ProductWishlist } from '../Models/ProductWishlist';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {
  public User :Users;
  public CurrentUser 
  constructor(private apiservice : ApiService ,private route:ActivatedRoute,private userservice:UserService,
    private router: Router ,private sellerService : sellerService,private UserService:UserService,
     private CartService:CartService,private ProductsService:ProductsService,private _productwishlistServices:ProductWishlistService,
    private ClientNotify :ClientNotifyService) { }
  cartItemList:CartItem[]=[];
  productCartList:Product[]=[];
  Counter :number
  IsRead : boolean[]=[]
  productwishList: ProductWishlist[] = [];
  wishlistID:number;
  IsSeller :boolean
  ngOnInit(): void {
    this.UserService.getIdByUserName(localStorage.getItem('username')).subscribe(
      data => {
        this.user = data;
        this.sellerService.CheckSellerORNot(this.user.id).subscribe(
          data=>{
            this.answer =data;
            if(this.answer)
              this.IsSeller=true;
          })
        })
    this.GetNotifactions();
    this.ClientNotify.notReadedCount(localStorage.getItem('userId')).subscribe(
      count=>{
         this.Counter = count
      }
    )
    this._productwishlistServices.GetWishlistByUserId(localStorage.getItem('userId')).subscribe(
      data2 => {
        this.wishlistID=data2.id;
        this._productwishlistServices.getAllProductWishlists().subscribe((data: any) => {
          data.forEach(product => {
            if (product.wishlistID == data2.id) {
              this.productwishList.push(product);
            }
          });
        });
      })
    this.CurrentUser = new Users(localStorage.getItem('username'),'','','','');
    this.UserService.getIdByUserName(localStorage.getItem('username')).subscribe((
      data =>{
        this.user=data
        this.CartService.getUserCartItems(this.user.id).subscribe((
         data=>{
           this.cartItemList=data;
           data.forEach(item => {
             this.ProductsService.getProductById(item.productId).subscribe((data:any) =>{
               this.productCartList.push(data);
             })
           });
         }
       ))
      }
    )) 
  }
  logout(){
    this.apiservice.logout();
    localStorage.clear()
  }
  users =[] 
  NotificationList :Notification[]=[]
  GetNotifactions()
  {
    this.ClientNotify.getNotifyByuserId(localStorage.getItem('userId')).subscribe((data:any)=>{
      data.forEach(element => {
      this.NotificationList.push(element)
      this.IsRead.push(element.isRead)
      this.userservice.getUserNameByUserId(element.sellerId).subscribe((item=>{
        this.users.push(item.userName)
      }))
     });    
    })
  }
  newNotify 
  MakeRead(id)
  {
    this.ClientNotify.getById(id).subscribe((data=>{
      this.newNotify = data
      this.newNotify.isRead =true 
      this.ClientNotify.changetoRead(id,this.newNotify).subscribe()
    }))
  }
  
  getReadboolean(idx){
    return this.IsRead[idx];
  }
  user =null;
  answer ;
  goToProfile()
  {
    this.UserService.getIdByUserName(localStorage.getItem('username')).subscribe(
      data => {
        this.user = data;
        this.sellerService.CheckSellerORNot(this.user.id).subscribe(
          data=>{
            this.answer =data;
            if(this.answer)
              this.router.navigate([`/SellerProfile/${this.user.userName}`]);
            else 
              this.router.navigate([`/UserProfile/${this.user.userName}`]);
          })
        });
  }
  
getProductName(idx){
  return this.productCartList[idx].productName;
}
getProductPathImg(idx){
  return this.productCartList[idx].productImagePath;
}

getTotalPrice(){
 let total=0;
 this.cartItemList.forEach(e=>{
   total+=e.totalPrice;
 })
 return total;
}

public createImgPath = (serverPath: string) => {
  return `https://localhost:44339/${serverPath}`;
}
public response: {dbPath: ''};
allproduct =null

public uploadFinished = (event) => {
  this.response = event;
}



}
