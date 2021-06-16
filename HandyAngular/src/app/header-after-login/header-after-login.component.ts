import { ProductsService } from '../Services/ProductsService';
import { sellerService } from './../Services/sellerService';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../Models/Users';
import { ApiService } from '../Services/api.service';
import { UserService } from '../Services/user.service';
import { CartItem } from '../Models/CartItem';
import { Product } from '../Models/Product';
import { CartService } from '../Services/CartService';

@Component({
  selector: 'app-header-after-login',
  templateUrl: './header-after-login.component.html',
  styleUrls: ['./header-after-login.component.css']
})
export class HeaderAfterLoginComponent implements OnInit {
  public User :Users;
  public CurrentUser 
  constructor(private apiservice : ApiService ,private route:ActivatedRoute,private userservice:UserService,
    private router: Router ,private sellerService : sellerService,private UserService:UserService,
     private CartService:CartService,private ProductsService:ProductsService) { }
  cartItemList:CartItem[]=[];
  productCartList:Product[]=[];
 
  ngOnInit(): void {
    this.getUser(this.route.snapshot.paramMap.get('email'));
    this.getId();
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
  Currentuser
  getId()
  {
    this.userservice.getIdByUserName(localStorage.getItem('username')).subscribe(result => {
      this.Currentuser = result;
      localStorage.setItem('userId',this.Currentuser.id)
    })
  }
  
  user =null;
  getUser(email) {
    this.userservice.getUserByEmail(email)
      .subscribe(
        (data => {
          localStorage.setItem('username',data.userName)
        }))
  }
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
              this.router.navigate(["/SellerProfile"]);
            else 
              this.router.navigate(["/UserProfile"]);
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