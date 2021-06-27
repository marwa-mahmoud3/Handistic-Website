import { ProductWishlist } from 'src/app/Models/ProductWishlist';
import { ProductWishlistService } from './../Services/ProductWishlistService';
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
import { ShopService } from '../Services/shopService';

@Component({
  selector: 'app-seller-navbar',
  templateUrl: './seller-navbar.component.html',
  styleUrls: ['./seller-navbar.component.css']
})
export class SellerNavbarComponent implements OnInit {
  public User :Users;
  public CurrentUser 
  constructor(private apiservice : ApiService ,private route:ActivatedRoute,private userservice:UserService,
    private router: Router ,private sellerService : sellerService,private UserService:UserService,
     private CartService:CartService,private ProductsService:ProductsService,
     private notify:NotificationService,private _productwishlistServices:ProductWishlistService) { }
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
    this.notify.notReadedCount(localStorage.getItem('userId')).subscribe(
      count=>{
         this.Counter = count
      }
    )
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
 
  users:{[id:number]:string}={};
  NotificationList :Notification[]=[]
  GetNotifactions()
  {
    this.users=[]
    this.notify.getNotificationById(localStorage.getItem('userId')).subscribe((data=>{
     data.forEach(element => {
      this.NotificationList.push(element)
      this.IsRead.push(element.isRead)
      this.userservice.getUserNameByUserId(element.userId).subscribe((item=>{
        if(this.users[element.id]!= item.userName )
        {
          this.users[element.id]=item.userName
        }      
      }))
     });    
    }))
  }
  newNotify 
  MakeRead(id)
  {
    this.notify.getById(id).subscribe((data=>{
      this.newNotify = data
      this.newNotify.isRead =true 
      this.notify.changetoRead(id,this.newNotify).subscribe()
    }))
  }
  Currentuser
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